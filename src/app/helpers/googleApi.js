const { google } = require('googleapis')
const path = require("path");
const fs = require("fs");
const process = require('process');
require('dotenv').config();


//connected to gg 
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
});
class GoogleHelper {
    //get all list file in folder ggdriver
    async listFiles(googleFolderId) {
        let arr = [];
        const response = await
            drive.files.list({
                fields: 'nextPageToken, files(*)',
                q: `'${googleFolderId}' in parents`,
            });
        if (response.data) {
            console.log(response.data.files.length)
            response.data.files.map((file) => {
                arr.push(file);
            })
        }
        return arr;
    }
    //upload file folder
    async uploadFileDrive(targetFolderId, namePhoto) {
        const fileMetadata = {
            name: namePhoto + '.webp',
            parents: [targetFolderId]

        };
        console.log("process.cwd())", process.cwd());
        const media = {
            mimeType: 'image/jpeg/webp',

            body: fs.createReadStream(`${process.cwd()}/src/app/controllers/admin/convert-upload/` + namePhoto + '.webp'),
        };
        try {
            const file = await drive.files.create({
                resource: fileMetadata,
                media: media,
                fields: 'id',
            });
            console.log('File Id:', file.data.id);
            return file.data.id;
        } catch (err) {
            console.log(err)
            // TODO(developer) - Handle error
            throw err;
        }
    }
    //delete file
    async deleteFile(fileId) {
        try {
            const response = await drive.files.delete({
                fileId: fileId
            })
            return response.status;
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = new GoogleHelper();
