import { v4 as uuidv4 } from 'uuid';

import { CreateChannel, GetChannelInfo, JoinChannel, UpdateChannel } from '../db/channel.js';
import { GetUserChannels } from '../db/users.js';

/**
 * ChannelHandlers
 * Defines endpoints for creating, updating, and joining channels.
 * 
 * Endpoints:
 * 
 * POST /api/create-channel
 *   - Description: Creates a new channel.
 *   - Request Body (JSON):
 *       {
 *         "CreatorUUID": "string",                 // UUID of the user creating the channel
 *         "channelName": "string",                 // Name of the channel
 *         "channelDescription": "string | null",   // Optional description of the channel
 *         "channelPhoto": "string | null"          // Optional channel photo URL
 *       }
 *   - Responses:
 *       200: Returns the UUID of the newly created channel
 *       500: Server error (logged in console)
 * 
 * GET /api/get-channel
 *   - Description: Retrieves all channels of a given user.
 *   - Query Parameters:
 *       UUID: string // UUID of the user
 *   - Responses:
 *       200: Returns an array of user's channels
 *       400: Bad request (UUID missing)
 *       500: Server error (logged in console)
 * 
 * POST /api/join-channel
 *   - Description: Adds a user to a channel.
 *   - Request Body (JSON):
 *       {
 *         "UserID": "string",     // UUID of the user
 *         "ChannelID": "string"   // UUID of the channel
 *       }
 *   - Responses:
 *       200: User successfully joined ("Successful")
 *       400: Bad request (UserID or ChannelID missing)
 *       500: Server error (returns error)
 * 
 * POST /api/update-channel
 *   - Description: Updates a channel's name and description.
 *   - Request Body (JSON):
 *       {
 *         "channelID": "string",   // UUID of the channel
 *         "name": "string",         // New name for the channel
 *         "description": "string"   // New description
 *       }
 *   - Responses:
 *       200: Channel successfully updated ("Done!")
 *       400: Bad request (name or description missing)
 *       500: Server error (returns error)
 */

export const ChannelHandlers = (app) => {
    app.post("/api/create-channel", (req, res) => {
        const {
            ChannelID,
            CreatorUUID, 
            channelPhoto = null, 
            channelName, 
            channelDescription
        } = req.body;

        const UUID = ChannelID ? ChannelID : uuidv4();
        CreateChannel(UUID, CreatorUUID, channelName, channelDescription, channelPhoto)
            .catch(error => {
                console.error(error);
            });

        res.send(UUID);
    });

    app.get("/api/get-channel", (req, res) => {
        const { UUID } = req.query;
        if (!UUID) {
            res.status(400);
            return;
        }

        GetUserChannels(UUID)
            .then(result => {
                res.send(result);
            }).catch(error => {
                console.error(error);
                res.status(500);
            })
    });

    app.post('/api/join-channel', async(req, res) => {
        const {
            UserID, 
            ChannelID
        } = req.body;

        if (!UserID || !ChannelID) {
            res.stats(400);
            return;
        }

        JoinChannel(UserID, ChannelID)
            .then(() => {res.status(200).send({ message: "Succesfull" })})
            .catch(error => {
                console.error(error);
                res.status(500).send(error);
            });
    });

    app.post("/api/update-channel", async(req, res) => {
        const {
            channelID,
            name,
            description
        } = req.body;

        if (!name || !description) {
            res.status(400).send('Bad request');
            return;
        }

        UpdateChannel(channelID, name, description)
            .then(() => {
                res.send('Done!')
            }).catch(error => {
                console.error(error);
                res.stats(500).send(error);
            })
    });

    app.get("/api/channel-info", async(req, res) => {
        const {
            ChannelID
        } = req.query;

        if (!ChannelID) {
            res.status(400).send("Bad request");
            return;
        }

        GetChannelInfo(ChannelID)
            .then(result => {
                res.send(result);
            }).catch(error => {
                console.error(error);
                res.status(500).send({message: error});
            })
    })
}