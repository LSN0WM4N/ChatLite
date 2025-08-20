import { db } from "./database.js";


/**
 * CreateChannel
 * Creates a new channel in the database and adds the creator as a member.
 * 
 * @param {string} UUID - Unique identifier for the channel
 * @param {string} CreatorID - UUID of the user creating the channel
 * @param {string} Title - Name of the channel
 * @param {string} Description - Description of the channel
 * @param {string|null} PhotoURL - Optional URL for the channel photo
 * @returns {Promise<void>} Resolves when channel is created successfully
 * @throws {Error} Rejects with error if database operation fails
 */
export const CreateChannel = (UUID, CreatorID, Title, Description, PhotoURL) => {
    return new Promise(async (resolve, reject) => { 
        try {
            await db.execute({
                sql: "INSERT INTO Channels (ID, CreatorID, Title, Description, PhotoURL) VALUES (?, ?, ?, ?, ?)",
                args: [UUID, CreatorID, Title, Description, PhotoURL]
            });

            await db.execute({
                sql: "INSERT INTO UserChannels (UserID, ChannelID) VALUES (?, ?)",
                args: [CreatorID, UUID]
            });
        
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

/**
 * JoinChannel
 * Adds a user to an existing channel.
 * 
 * @param {string} UserID - UUID of the user joining the channel
 * @param {string} ChannelID - UUID of the channel to join
 * @returns {Promise<void>} Resolves when user is added successfully
 * @throws {Error} Rejects with error if database operation fails
 */
export const JoinChannel = (UserID, ChannelID) => {
    return new Promise((resolve, reject) => {
        db.execute({
            sql: "INSERT INTO UserChannels (UserID, ChannelID) VALUES (?, ?)",
            args: [UserID, ChannelID]
        }).then(() => {
            resolve();
        }).catch(error => {
            console.error(error);
            reject(error);
        })
    })
}

/**
 * UpdateChannel
 * Updates the name and description of a channel.
 * 
 * @param {string} ID - UUID of the channel to update
 * @param {string} Name - New title for the channel
 * @param {string} Description - New description for the channel
 * @returns {Promise<void>} Resolves when channel is updated successfully
 * @throws {Error} Rejects with error if database operation fails
 */
export const UpdateChannel = (ID, Name, Description) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await db.execute({
                sql: "UPDATE Channels SET Title = ?, Description = ? WHERE ID = ?",
                args: [Name, Description, ID]
            })
            
            const check = await db.execute({
                sql: "SELECT ID, Title, Description FROM Channels WHERE ID = ?",
                args: [ID],
            });
            
            resolve();
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
}

/**
 * GetJoinDate
 * Retrieves the date a user joined a specific channel.
 * 
 * @param {string} UserID - UUID of the user
 * @param {string} ChannelID - UUID of the channel
 * @returns {Promise<{JoinedAt: string}>} Resolves with the join date of the user
 * @throws {Error} Rejects with error if database operation fails
 */
export const GetJoinDate = (UserID, ChannelID) => {
    return new Promise(async (resolve, reject) => {
        db.execute({
            sql: "SELECT JoinedAt FROM UserChannels WHERE UserID = ? AND ChannelID = ?",
            args: [UserID, ChannelID]
        }).then(res => {
            resolve(res.rows[0]);
        }).catch(error => {
            console.error(error);
            reject(error);
        })
    })
}

/**
 * UpdateChannelPhoto
 * Updates the photo URL of a channel.
 * 
 * @param {string} ID - UUID of the channel
 * @param {string} profilePhoto - New photo URL
 * @returns {Promise<void>} Resolves when photo is updated successfully
 * @throws {Error} Rejects with error if database operation fails
 */
export const UpdateChannelPhoto = (ID, profilePhoto) => {
    return new Promise((resolve, reject) => {
        db.execute({
            sql: "UPDATE Channels SET photoUrl = ? WHERE ID = ?",
            args: [profilePhoto, ID]
        }).then(() => {
            resolve();
        }).catch(error => {
            reject(error);
        });
    })
}

/**
 * GetChannelInfo
 * Gets the general information of a ChannelID
 * 
 * @param {string} ChannelID - UUID of the channel
 * @returns {Promise<{
 *    ID:           string,
 *    CreatorID:    string,
 *    Title:        string,
 *    Description:  string | null,
 *    PhotoURL:        string null,
 * }>} Resolves when photo is updated successfully
 * @throws {Error} Rejects with error if database operation fails
 */
export const GetChannelInfo = (ChannelID) => {
    return new Promise((resolve, reject) => {
        db.execute({
            sql: "SELECT * FROM Channels WHERE ID = ?",
            args: [ChannelID]
        }).then(res => {
            resolve(res.rows[0]);
        }).catch(error => {
            console.error(error);
            reject(error);
        })
    });
}