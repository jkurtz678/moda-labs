'use-strict';
//import { TokenMeta } from "../../src/types/types";
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
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const ffmpeg = require('fluent-ffmpeg');
const sharp = require('sharp');

const app = express();

// Max height and width of the thumbnail in pixels.
const THUMB_MAX_HEIGHT = 200;
const THUMB_MAX_WIDTH = 200;
const THUMB_PREFIX = 'thumb_';

const generateThumbnail = async (object: any) => {
    functions.logger.log('Generating thumbnail for', object);
    // File and directory paths.
    const file_path = object.name;
    functions.logger.log(`generateThumbnail - file_path: ${file_path}`)
    //const content_type = object.contentType;
    const file_dir = path.dirname(file_path);
    const file_name = path.basename(file_path);
    const file_name_no_ext = path.parse(file_name).name; // this is also the document id of the firestore record
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
    const file_exists_arr = await bucket.file(thumbnail_file_path).exists()
    if (file_exists_arr && file_exists_arr[0]) {
        functions.logger.log('Thumbnail already exists.');
        return null;
    } 

    // Cloud Storage files.
    const file = bucket.file(file_path);
    //const thumb_file = bucket.file(thumbnail_file_path);
    const metadata = {
        contentType: "image/jpeg",
        'Cache-Control': 'public, max-age=31536000',
    }

    // Create the temp directory where the storage file will be downloaded.
    await mkdirp(temp_local_dir);

    // Download file from bucket.
    //

    // firebase file get the download url
    //const url = await file.getSignedUrl({ action: 'read', expires: '03-09-2491' });

    // download the first two seconds of the video
    /* const download_ffmpeg_cmd = `ffmpeg -t 2 -i '${url}' ${temp_local_file}`
    functions.logger.log("download_ffmpeg_cmd: ", download_ffmpeg_cmd)
    const { stdout, stderr } = await exec(download_ffmpeg_cmd)
    functions.logger.log("stdout: ", stdout)
    functions.logger.log("stderr: ", stderr)
    functions.logger.log('The file has been downloaded to', temp_local_file); */

    // Generate a thumbnail using ImageMagick.
    if (file_name.endsWith('.png') || file_name.endsWith('.jpg') || file_name.endsWith('.jpeg')) {
        functions.logger.log("Starting download for file: ", file_path)
        await file.download({ destination: temp_local_file, start: 0, end: 20000000 });
        functions.logger.log(`Creating thumbnail for image ${file_name} with imagemajick`);
        await spawn('convert', [temp_local_file, '-thumbnail', `${THUMB_MAX_WIDTH}x${THUMB_MAX_HEIGHT}>`, temp_local_thumb_file], { capture: ['stdout', 'stderr'] });
        fs.unlinkSync(temp_local_file);
    } else {

        // signing is broken on the emulator, use publicURL for local file urls
        let url: string;
        if (process.env.FUNCTIONS_EMULATOR) {
            url = await file.publicUrl()
        } else {
            const url_list = await file.getSignedUrl({ action: 'read', expires: '03-09-2491' })
            url = url_list[0]
        }
        
        //const url = await file.getDownloadURL()
        functions.logger.log("media cloud url: ", url)
        functions.logger.log(`Creating thumbnail for video ${url} with ffmpeg`);
        //await spawn('ffmpeg', ['-ss', '00:00:01', '-i', url, '-vf', 'scale=320:320:force_original_aspect_ratio=decrease', '-vframes', '1', temp_local_thumb_file], { capture: ['stdout', 'stderr'] });
        await new Promise((resolve, reject) => {
            ffmpeg(url)
                .inputOptions("-ss 00:00:01")
                .outputOptions(["-frames:v 1", "-q:v 5", "-vf scale=320:320:force_original_aspect_ratio=decrease"])
                .on('end', function () {
                    functions.logger.log('file has been converted succesfully');
                    resolve(null);
                })
                .on('error', function (err: any, stdout: any, stderr: any) {
                    functions.logger.log('An error occurred: ' + err.message);
                    functions.logger.log('stdout: ' + stdout);
                    functions.logger.log('stderr: ' + stderr);
                    reject(err);
                })
                .save(temp_local_thumb_file);
        });
    }

    functions.logger.log('Thumbnail created at', temp_local_thumb_file);
    // Uploading the Thumbnail.
    await bucket.upload(temp_local_thumb_file, { destination: thumbnail_file_path, metadata: metadata });
    functions.logger.log('Thumbnail uploaded to Storage at', thumbnail_file_path);

    // get aspect ratio of thumbnail
    const thumbnail_metadata = await sharp(temp_local_thumb_file).metadata()
    const width = thumbnail_metadata.width;
    const height = thumbnail_metadata.height;

    // calculate aspect ratio
    const aspect_ratio = width / height;
    functions.logger.log("Calculated aspect ratio of thumbnail: ", aspect_ratio)

    functions.logger.log("Updating aspect ratio of token-meta document: ", file_name_no_ext)
    // save aspect ratio to firestore
    const token_meta_ref = admin.firestore().collection('token-meta').doc(file_name_no_ext);
    await token_meta_ref.set({aspect_ratio: aspect_ratio}, {merge: true});
    
    functions.logger.log("Successfully update firestore document with aspect ratio: ", aspect_ratio)

    // Once the image has been uploaded delete the local files to free up disk space.
    fs.unlinkSync(temp_local_thumb_file);
    return true;
}

// generateThumbnail upon media upload
exports.autoGenerateThumbnail = functions.runWith({memory: "2GB", timeoutSeconds: 360}).storage.object().onFinalize(async (object: any) => {
    await generateThumbnail(object);
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
const generateThumbnailHandler = functions.runWith({memory: "2GB", timeoutSeconds: 360}).https.onRequest(async (req: any, res: any) => {
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
    await generateThumbnail(object[0]);
    res.status(200).send('Starting thumbnail generation');
});

// generateAllThumnailsHandler iterates through all firestore token metas and creates thumbnails for all media
const generateAllThumbnailsHandler = functions.runWith({memory: "2GB", timeoutSeconds: 360}).https.onRequest(async (req: any, res: any) => {
    functions.logger.log("generateAllThumbnails user", req.user)
    const token_metas = await admin.firestore().collection('token-meta').get();
    functions.logger.log(`generateAllThumbnails starting generation for ${token_metas.size} tokens`);
    for (let i = 0; i < token_metas.size; i++) {
        const token_meta = token_metas.docs[i];
        const token_data = token_meta.data();
        functions.logger.log("token data", token_data)
        if (!token_data.media_id || token_data.media_type != ".mp4" || !admin_whitelist.includes(token_data.user_id || "")) {
            continue;
        }
        functions.logger.log(`generateAllThumbnails starting generation for token ${token_data.name}`);
        const file_path = `${token_data.media_id}${token_data.media_type}`

        functions.logger.log(`generateAllThumbnails filepath ${file_path}`);
        const bucket = admin.storage().bucket();

        try {
            const file = bucket.file(file_path);
            // get object from file

            const object = await file.getMetadata();
            functions.logger.log("generateAllThumbnails object", object);
            await generateThumbnail(object[0]);
            // wait one second
            //await new Promise(resolve => setTimeout(resolve, 500));
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
    "S1rNu5NLTz4NYaWf1kGWSBd8f2Vp", // jkurtz678@gmail.com local
    "9jtkHhU6XOVK2TUxYHawnP2yULD3" // jkurtz678@gmail.com live
];
exports.app = functions.runWith({memory: "2GB", timeoutSeconds: 360}).https.onRequest(app);