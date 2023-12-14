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

// medium is the middle sized image, used for the image gallery
const MEDIUM_MAX_HEIGHT = 960;
const MEDIUM_MAX_WIDTH = 960;
const MEDIUM_PREFIX = 'medium_';

const generateThumbnail = async (object: any) => {
    functions.logger.log('Generating thumbnail for', object);
    // File and directory paths.
    const file_path = object.name;
    const file_name = path.basename(file_path);
    const file_id = path.parse(file_name).name;
    functions.logger.log(`generateThumbnail - file_path: ${file_path}`)

    // Exit if the image is already a thumbnail.
    if (file_name.startsWith(THUMB_PREFIX)) {
        functions.logger.log('Already a Thumbnail.');
        return null;
    }

    if (file_name.startsWith(MEDIUM_PREFIX)) {
        functions.logger.log('Already a Medium.');
        return null;
    }

    // Check if the file is in the viewer-logs/ directory
    if (file_path.startsWith('viewer-logs/')) {
        functions.logger.log('File is in the viewer-logs/ directory. Skipping.');
        return null;
    }

    // Exit if this is a move or deletion event.
    if (object.resourceState === 'not_exists') {
        functions.logger.log('This is a deletion event.');
        return null;
    }

    const bucket = admin.storage().bucket(object.bucket);

    // calculate file size
    const file = bucket.file(object.name)
    const [metadata] = await file.getMetadata();

    const media_file_size = parseInt(metadata.size);
    if(!isNaN(media_file_size)) {
        const token_meta_ref = admin.firestore().collection('token-meta').doc(file_id);
        await token_meta_ref.set({ media_size: media_file_size }, { merge: true });
        functions.logger.log("finished setting file size: ", media_file_size)
    } else {
        functions.logger.log("error getting file size: ", media_file_size)
    }
    

    const temp_local_thumb_file = await generateResizedFile(bucket, file_path, THUMB_PREFIX, THUMB_MAX_WIDTH, THUMB_MAX_HEIGHT);
    if (temp_local_thumb_file) {
        // get aspect ratio of thumbnail
        await calculateImageAspectRatio(file_id, temp_local_thumb_file);
        fs.unlinkSync(temp_local_thumb_file);
    }

    const temp_local_medium_file = await generateResizedFile(bucket, file_path, MEDIUM_PREFIX, MEDIUM_MAX_WIDTH, MEDIUM_MAX_HEIGHT);
    if (temp_local_medium_file) {
        fs.unlinkSync(temp_local_medium_file);
    }

    return true;
}

const calculateImageAspectRatio = async (file_id: string, temp_local_file: string) => {
    const thumbnail_metadata = await sharp(temp_local_file).metadata()
    const width = thumbnail_metadata.width;
    const height = thumbnail_metadata.height;

    // calculate aspect ratio
    const aspect_ratio = width / height;
    functions.logger.log("Calculated aspect ratio of thumbnail: ", aspect_ratio)

    functions.logger.log("Updating aspect ratio of token-meta document: ", file_id)
    // save aspect ratio to firestore
    const token_meta_ref = admin.firestore().collection('token-meta').doc(file_id);
    await token_meta_ref.set({ aspect_ratio: aspect_ratio }, { merge: true });
    functions.logger.log("Successfully update firestore document with aspect ratio: ", aspect_ratio)
}

const generateResizedFile = async (bucket: any, file_path: string, new_file_prefix: string, width: number, height: number): Promise<string | null> => {
    const file = bucket.file(file_path);
    const metadata = {
        contentType: "image/jpeg",
        'Cache-Control': 'public, max-age=31536000',
    }

    const file_dir = path.dirname(file_path);
    const file_name = path.basename(file_path);
    const file_name_no_ext = path.parse(file_name).name; // this is also the document id of the firestore record
    const temp_local_file = path.join(os.tmpdir(), file_path);
    const temp_local_dir = path.dirname(temp_local_file);

    // Create the temp directory where the storage file will be downloaded.
    await mkdirp(temp_local_dir);

    const new_file_path = path.normalize(path.join(file_dir, `${new_file_prefix}${file_name_no_ext}.jpg`));
    const temp_local_new_file = path.join(os.tmpdir(), new_file_path);

    // if the file already exists we return null
    const new_file_exists_arr = await bucket.file(new_file_path).exists()
    if (new_file_exists_arr && new_file_exists_arr[0]) {
        return null;
    }

    // process image
    if (file_name.endsWith('.png') || file_name.endsWith('.jpg') || file_name.endsWith('.jpeg')) {
        // Generate an image using ImageMagick.
        functions.logger.log("Starting download for file: ", file_path)
        await file.download({ destination: temp_local_file, start: 0, end: 20000000 });
        functions.logger.log(`Creating ${new_file_prefix} for image ${file_name} with imagemajick`);
        // -auto-orient flag causes portrait images to preserve their rotation (without it they will sometimes be rotated landscape)
        await spawn('convert', [temp_local_file, '-thumbnail', `${width}x${height}>`, '-auto-orient', temp_local_new_file], { capture: ['stdout', 'stderr'] });
        fs.unlinkSync(temp_local_file);
    } else { // process video
        // signing is broken on the emulator, use publicURL for local file urls
        let url: string;
        if (process.env.FUNCTIONS_EMULATOR) {
            url = await file.publicUrl()
        } else {
            const url_list = await file.getSignedUrl({ action: 'read', expires: '03-09-2491' })
            url = url_list[0]
        }

        functions.logger.log(`Creating thumbnail for video ${url} with ffmpeg`);
        await new Promise((resolve, reject) => {
            ffmpeg(url)
                .inputOptions("-ss 00:00:05")
                .outputOptions(["-frames:v 1", "-q:v 5", `-vf scale=${width}:${height}:force_original_aspect_ratio=decrease`])
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
                .save(temp_local_new_file);
        });
    }

    await bucket.upload(temp_local_new_file, { destination: new_file_path, metadata: metadata });
    functions.logger.log(`${new_file_prefix} uploaded to Storage at ${new_file_path}`);
    return temp_local_new_file;
}

// generateThumbnail upon media upload
exports.autoGenerateThumbnail = functions.runWith({ memory: "2GB", timeoutSeconds: 360 }).storage.object().onFinalize(async (object: any) => {
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
const generateThumbnailHandler = functions.runWith({ memory: "2GB", timeoutSeconds: 360 }).https.onRequest(async (req: any, res: any) => {
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
const generateAllThumbnailsHandler = functions.runWith({ memory: "2GB", timeoutSeconds: 360 }).https.onRequest(async (req: any, res: any) => {
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
exports.app = functions.runWith({ memory: "2GB", timeoutSeconds: 360 }).https.onRequest(app);