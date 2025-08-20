import path from "path";
import multer from "multer";
import { existsSync } from "fs";

import { UpdateChannelPhoto } from "../db/channel.js";
import { GetPhoto, UpdateProfilePhoto } from "../db/files.js";

/**
 * FilesHandlers
 * Handles uploading and retrieving photos for users and channels.
 * 
 * Endpoints:
 * 
 * POST /api/upload
 *   - Description: Uploads a photo for a user profile or a channel.
 *   - Form Data:
 *       - photo: file (required)   // the photo file to upload
 *       - data: JSON string (required) 
 *           {
 *             "userID": "string" | undefined,     // UUID of the user (if uploading user profile photo)
 *             "channelID": "string" | undefined   // UUID of the channel (if uploading channel photo)
 *           }
 *   - Responses:
 *       200: Returns uploaded file info
 *           {
 *             "filename": "string",
 *             "path": "string" // full URL to the uploaded photo
 *           }
 *       400: No file uploaded or invalid operation
 *       500: Internal server error
 * 
 * GET /api/photo
 *   - Description: Retrieves the photo URL of a user or channel. If the photo doesn't exist, returns a default image.
 *   - Query Parameters:
 *       - UUID: string (required)       // UUID of the user or channel
 *       - type: string (optional)       // type of default image to return if photo missing ('group' by default)
 *   - Responses:
 *       200: Returns photo URL
 *           {
 *             "photoUrl": "string"
 *           }
 *       400: Bad request (UUID missing)
 *       500: Internal server error
 */
export const FilesHandlers = (app) => {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "uploads/"); 
      },
      filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = Date.now() + ext;
        cb(null, filename);
      },
    });
    
    const upload = multer({ storage });

    app.post("/api/upload", upload.single("photo"), (req, res) => {
        if (!req.file) 
            return res.status(400).send("No file uploaded.");
        const BASE_URL = `${process.env.HOST}:${process.env.PORT}`;

        const data = JSON.parse(req.body.data);

        if (data.userID) {
            UpdateProfilePhoto(data.userID, `${BASE_URL}/uploads/${req.file.filename}`);
        } else if (data.channelID) {
            UpdateChannelPhoto(data.channelID, `${BASE_URL}/uploads/${req.file.filename}`);
        } else {
            res.json({"error": "No correct operation"});
            return;
        }

        res.json({ 
            filename: req.file.filename, 
            path: `${BASE_URL}/uploads/${req.file.filename}` 
        });
    });

    app.get('/api/photo', async (req, res) => {
        const { UUID, type = 'group' } = req.query;

        if (!UUID) {
            res.status(400).send('Bad request');
            return;
        }

        try {
            const image = await GetPhoto(UUID);
            const filename = image?.photoUrl?.split('/').at(-1)
            const isLocalHost = process.env.HOST[0] === '1';
            const base_url = `${isLocalHost ? 'http://' : ''}${process.env.HOST}${isLocalHost ? ":3000" : ""}/uploads`
            console.log(`URL:[${base_url}] [${filename}]`,);
            const exists = existsSync(`${process.cwd()}/uploads/${filename}`);
            res.send({photoUrl: `${base_url}/${exists ? filename : (type + '-symbol.svg')}`});
        } catch (error) {
            res.status(500).send('Internal server error');
            console.error(error);
        }
    });
}