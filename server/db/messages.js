import { encodeEmoji } from "../utils/encoders.js";
import { db } from "./database.js";

/**
 * GetMessages
 * Retrieves the last 1000 messages from a specific channel, ordered by timestamp ascending.
 * Joins the Messages table with the User table to include the sender's username and photo.
 * 
 * @param {string} ChannelID - UUID of the channel to fetch messages from
 * @returns {Promise<Array>} Resolves with an array of messages
 * @throws {Error} Rejects with an error if the database operation fails
 */
export const GetMessages = (ChannelID) => {
    return new Promise(async (resolve, reject) => {
        db.execute({
            sql: "SELECT M.ID, M.FromID, U.Username, U.photoUrl, M.ChannelID, M.timestamp, M.Content FROM Messages M JOIN User U ON M.FromID = U.ID WHERE M.ChannelID = ? ORDER BY M.timestamp ASC LIMIT 1000",
            args: [ChannelID]
        }).then(res => {
            resolve(res.rows);
        }).catch(error => {
            console.error(error);
            reject(error);
        })
    })
}

/**
 * WriteMessage
 * Inserts a new message into the Messages table.
 * 
 * @param {string} MessageID - UUID of the message
 * @param {string} UserID - UUID of the user sending the message
 * @param {string} ChannelID - UUID of the channel where the message is sent
 * @param {string} Content - Message content
 * @returns {Promise<void>} Resolves when the message is successfully inserted
 * @throws {Error} Rejects with an error if the database operation fails
 */
export const WriteMessage = (MessageID, UserID, ChannelID, Content) => {
    return new Promise(async (resolve, reject) => {
        db.execute({
            sql: "INSERT INTO Messages (ID, FromID, ChannelID, Content) VALUES (?, ?, ?, ?)",
            args: [MessageID, UserID, ChannelID, Content],
        }).then(() => {
            resolve();
        }).catch(error => {
            console.error(error);
            reject(error);
        })
    });
}

/**
 * GetReactions
 * Retrieves all reactions associated with a specific channel.
 * 
 * @param {string} ChannelID - UUID of the channel
 * @returns {Promise<Array>} Resolves with an array of reaction objects
 * @throws {Error} Rejects with an error if the database operation fails
 */
export const GetReactions = (ChannelID) => {
    return new Promise(async (resolve, reject) => {
        db.execute({
            sql: "SELECT * FROM Reactions WHERE ChannelID = ?",
            args: [ChannelID]
        }).then(res => {
            resolve(res.rows);
        }).catch(error => {
            console.error(error);
            reject(error);
        })
    });
}

/**
 * WriteReaction
 * Inserts a new reaction for a message into the Reactions table.
 * The reaction is first encoded using encodeEmoji utility.
 * 
 * @param {string} MessageID - UUID of the message being reacted to
 * @param {string} ChannelID - UUID of the channel containing the message
 * @param {string} Reaction - The reaction (emoji or text) to be added
 * @returns {Promise<void>} Resolves when the reaction is successfully inserted
 * @throws {Error} Rejects with an error if the database operation fails
 */
export const WriteReaction = (MessageID, ChannelID, Reaction) => {
    return new Promise(async (resolve, reject) => {
        try {
            const encoded = encodeEmoji(Reaction);

            await db.execute({
                sql: "INSERT INTO Reactions (MessageID, ChannelID, reaction) VALUES (?, ?, ?)",
                args: [MessageID, ChannelID, encoded],
            })
            resolve();
        } catch (error) {
            console.error(error)
            reject(error);
        }
    });
}

