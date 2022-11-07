'use-strict';

const functions = require('firebase-functions');
const mkdirp = require('mkdirp');
const admin = require('firebase-admin');
admin.initializeApp();
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');
const express = require('express')
const cookieParser = require('cookie-parser')();
const cors = require('cors')({ origin: true });
const app = express();

// Max height and width of the thumbnail in pixels.
const THUMB_MAX_HEIGHT = 200;
const THUMB_MAX_WIDTH = 200;
const THUMB_PREFIX = 'thumb_';

const generateThumbnail = async (object: any) => {

    // File and directory paths.
    const file_path = object.name;
    functions.logger.log(`generateThumbnail - file_path: ${file_path}`)
    const content_type = object.contentType;
    const file_dir = path.dirname(file_path);
    const file_name = path.basename(file_path);
    const file_name_no_ext = path.parse(file_name).name;
    const thumbnail_file_path = path.normalize(path.join(file_dir, `${THUMB_PREFIX}${file_name_no_ext}.jpg`));
    const temp_local_file = path.join(os.tmpdir(), file_path);
    const temp_local_dir = path.dirname(temp_local_file);
    const temp_local_thumb_file = path.join(os.tmpdir(), thumbnail_file_path);

    // Exit if this is triggered on a file that is not an image.
    /* if (!object.contentType.startsWith('image/')) {
        functions.logger.log('This is not an image.');
        return null;
    } */

    // Exit if the image is already a thumbnail.
    if (file_name.startsWith(THUMB_PREFIX)) {
        functions.logger.log('Already a Thumbnail.');
        return null;
    }

    // Exit if this is a move or deletion event.
    if (object.resourceState === 'not_exists') {
        functions.logger.log('This is a deletion event.');
        return null;
    }

    const bucket = admin.storage().bucket(object.bucket);
    // Exit if thumbnail already exists
    /* if (await bucket.file(thumbnail_file_path).exists()) {
        functions.logger.log('Thumbnail already exists.');
        return null;
    } */

    // Cloud Storage files.
    const file = bucket.file(file_path);
    //const thumb_file = bucket.file(thumbnail_file_path);
    const metadata = {
        contentType: content_type,
        'Cache-Control': 'public, max-age=31536000',
    }

    // Create the temp directory where the storage file will be downloaded.
    await mkdirp(temp_local_dir);

    // Download file from bucket.
    await file.download({ destination: temp_local_file });
    functions.logger.log('The file has been downloaded to', temp_local_file);

    // Generate a thumbnail using ImageMagick.
    if (file_name.endsWith('.png') || file_name.endsWith('.jpg') || file_name.endsWith('.jpeg')) {
        functions.logger.log(`Creating thumbnail for image ${file_name} with imagemajick`);
        await spawn('convert', [temp_local_file, '-thumbnail', `${THUMB_MAX_WIDTH}x${THUMB_MAX_HEIGHT}>`, temp_local_thumb_file], { capture: ['stdout', 'stderr'] });
    } else {
        functions.logger.log(`Creating thumbnail for video ${file_name} with ffmpeg`);
        await spawn('ffmpeg', ['-ss', '00:00:01.00', '-i', temp_local_file, '-vf', 'scale=320:320:force_original_aspect_ratio=decrease', '-vframes', '1', temp_local_thumb_file], { capture: ['stdout', 'stderr'] });
    }

    functions.logger.log('Thumbnail created at', temp_local_thumb_file);
    // Uploading the Thumbnail.
    await bucket.upload(temp_local_thumb_file, { destination: thumbnail_file_path, metadata: metadata });
    functions.logger.log('Thumbnail uploaded to Storage at', thumbnail_file_path);
    // Once the image has been uploaded delete the local files to free up disk space.
    fs.unlinkSync(temp_local_file);
    fs.unlinkSync(temp_local_thumb_file);
    return true;
}

// generateThumbnail upon media upload
exports.autoGenerateThumbnail = functions.storage.object().onFinalize(async (object: any) => {
    generateThumbnail(object);
})


// express app below, admin only

// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
const validateFirebaseIdToken = async (req: any, res: any, next: any) => {
    functions.logger.log('Check if request is authorized with Firebase ID token');

    if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
        !(req.cookies && req.cookies.__session)) {
        functions.logger.error(
            'No Firebase ID token was passed as a Bearer token in the Authorization header.',
            'Make sure you authorize your request by providing the following HTTP header:',
            'Authorization: Bearer <Firebase ID Token>',
            'or by passing a "__session" cookie.'
        );
        res.status(403).send('Unauthorized');
        return;
    }

    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        functions.logger.log('Found "Authorization" header');
        // Read the ID Token from the Authorization header.
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else if (req.cookies) {
        functions.logger.log('Found "__session" cookie');
        // Read the ID Token from cookie.
        idToken = req.cookies.__session;
    } else {
        // No cookie
        res.status(403).send('Unauthorized');
        return;
    }

    try {
        const decodedIdToken = await admin.auth().verifyIdToken(idToken);
        if (!admin_whitelist.includes(decodedIdToken.user_id)) {
            res.status(403).send("Unauthorized user")
        }
        functions.logger.log('ID Token correctly decoded', decodedIdToken);
        req.user = decodedIdToken;
        next();
        return;
    } catch (error) {
        functions.logger.error('Error while verifying Firebase ID token:', error);
        res.status(403).send('Unauthorized');
        return;
    }
};

// generateThumbnail upon user request with filepath as a query parameter
const generateThumbnailHandler = functions.https.onRequest(async (req: any, res: any) => {
    functions.logger.log("generateThumbnail user", req.user)
    const file_path = req.query.filepath;
    functions.logger.log("generateThumbnail called with filepath: ", file_path);

    if (!file_path) {
        res.status(400).send("Invalid filepath");
        return;
    }
    const bucket = admin.storage().bucket();
    const file = bucket.file(file_path);
    const object = await file.getMetadata();
    generateThumbnail(object[0]);
    res.status(200).send('Starting thumbnail generation');
});

// generateAllThumnailsHandler iterates through all firestore token metas and creates thumbnails for all media
const generateAllThumbnailsHandler = functions.https.onRequest(async (req: any, res: any) => {
    functions.logger.log("generateAllThumbnails user", req.user)
    const token_metas = await admin.firestore().collection('token-meta').get();
    functions.logger.log(`generateAllThumbnails starting generation for ${token_metas.size} tokens`);
    for (let i = 0 ; i < token_metas.size ; i++) {
        const token_meta = token_metas.docs[i];
        const token_data = token_meta.data();
        functions.logger.log(`generateAllThumbnails starting generation for token ${token_data.name}`);
        const file_path = `${token_data.media_id}${token_data.media_type}`

        functions.logger.log(`generateAllThumbnails filepath ${file_path}`);
        const bucket = admin.storage().bucket();

        try {
            const file = bucket.file(file_path);
            const object = await file.getMetadata();
            await generateThumbnail(object[0]);
            // wait one second
            //await new Promise(resolve => setTimeout(resolve, 300));
        } catch (err) {
            functions.logger.log(`generateAllThumbnails error for token ${token_data.name}`, err)
        }
    }
    res.status(200).send('Starting thumbnail generation');
});



app.use(cors)
app.use(cookieParser);
app.use(validateFirebaseIdToken);
app.get('/generate-thumbnail', generateThumbnailHandler);
app.get('/generate-all-thumbnails', generateAllThumbnailsHandler);

const admin_whitelist = [
    "S1rNu5NLTz4NYaWf1kGWSBd8f2Vp" // jkurtz678@gmail.com
];
exports.app = functions.https.onRequest(app);