import { GetMessages, GetReactions } from "../db/messages.js";
import { parseTursoDate } from "../utils/dates.js";

/**
 * MessagesHandlers
 * Handles retrieving messages and reactions for channels.
 * 
 * Endpoints:
 * 
 * GET /api/messages
 *   - Description: Retrieves all messages for a given channel, formatted with readable timestamps.
 *   - Query Parameters:
 *       - ChannelID: string (required)  // UUID of the channel
 *   - Responses:
 *       200: Returns an array of messages
 *           [
 *             {
 *               "ID": "string",
 *               "FromID": "string"
 *               "Username": "string"
 *               "photoUrl": "string | null"
 *               "ChannelID": "string",
 *               "Content": "string",
 *               "timestamp": "number"  
 *             },
 *             ...
 *           ]
 *       400: Bad request (ChannelID missing)
 *       500: Internal server error
 * 
 * GET /api/reactions
 *   - Description: Retrieves all reactions for a given channel.
 *   - Query Parameters:
 *       - ChannelID: string (required)  // UUID of the channel
 *   - Responses:
 *       200: Returns an array of reactions
 *           [
 *             {
 *               "ID": "numeric",
 *               "ChannelID": "string",
 *               "MessageID": "string",
 *               "reaction": "string"
 *             },
 *             ...
 *           ]
 *       400: Bad request (ChannelID missing)
 *       500: Internal server error
 */
export const MessagesHandlers = (app) => {
    app.get('/api/messages', async (req, res) => {
        const {
            ChannelID,
        } = req.query;

        if (!ChannelID) {
            res.status(400);
            return;
        }

        try {
            const result = await GetMessages(ChannelID);
            const formatted = result.map(r => ({...r, timestamp: parseTursoDate(r.timestamp)}))
            
            res.send(formatted);
        } catch (error) {
            console.error(error);
            res.status(500);
        }
    });

    app.get('/api/reactions', async (req, res) => {
        const {
            ChannelID
        } = req.query;

        if (!ChannelID) {
            res.status(400).send('Bad request');
            return;
        }

        try {
            const reactions = await GetReactions(ChannelID)
            res.send(reactions);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    });
}