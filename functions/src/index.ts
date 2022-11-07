'use-strict';
const functions = require('firebase-functions');
const mkdirp = require('mkdirp');
const admin = require('firebase-admin');
admin.initializeApp();
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');

// Max height and width of the thumbnail in pixels.
const THUMB_MAX_HEIGHT = 200;
const THUMB_MAX_WIDTH = 200;
const THUMB_PREFIX = 'thumb_';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript


exports.generateThumbnail = functions.storage.object().onFinalize(async (object: any ) => {
    // File and directory paths.
    const file_path = object.name;
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

    // Cloud Storage files.
    const bucket = admin.storage().bucket(object.bucket);
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
    // Get the Signed URLs for the thumbnail and original image.
   /*  const results = await Promise.all([
        thumb_file.getSignedUrl({
            action: 'read',
            expires: '03-01-2500',
        }),
        file.getSignedUrl({
            action: 'read',
            expires: '03-01-2500',
        }),
    ]);
    functions.logger.log('Got Signed URLs.');
    const thumb_result = results[0];
    const original_result = results[1];
    const thumb_file_url = thumb_result[0];
    const file_url = original_result[0];
    // Add the URLs to the Database
    //await admin.database().ref('images').push({ path: file_url, thumbnail: thumb_file_url });
    return functions.logger.log('Thumbnail URLs saved to database.'); */
})