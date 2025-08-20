import { db } from "./database.js";

/**
 * CreateUser
 * Inserts a new user into the User table with default status "Offline".
 * 
 * @param {string} UUID - Unique identifier for the user
 * @param {string} username - Username of the new user
 * @param {string} hashedPassword - Securely hashed password for authentication
 * @param {string|null} photoURL - Optional profile photo URL
 * @returns {Promise<boolean>} Resolves true if the user is created successfully
 * @throws {Error} Rejects with an error if the database operation fails
 */
export const CreateUser = (UUID, username, hashedPassword, photoURL) => {
    return new Promise((resolve, reject) => {
        db.execute({
            sql: "INSERT INTO User (ID, Username, photoUrl, hashedPassword, Status) VALUES (?, ?, ?, ?, ?)",
            args: [UUID, username, photoURL, hashedPassword, "Offline"]
        }).then(() => { 
            resolve(true);
        }).catch(error => {
            console.error(error);

            if (error.code == "SQLITE_CONSTRAINT")
                return reject('User already exists');

            reject(error)
        });
    });
}

/**
 * GetUser
 * Retrieves user details by username.
 * 
 * @param {string} username - The username of the user to search for
 * @returns {Promise<Object|null>} Resolves with the user object if found, or null if not
 * @throws {Error} Rejects with an error if the database operation fails
 */
export const GetUser = async (username) => {
    return new Promise((resolve, reject) => {
        db.execute({
            sql: "SELECT * FROM User WHERE Username = ?",
            args: [username]
        }).then(res => {
            resolve(res.rows[0]);
        }).catch(error => {
            console.error(error);
            reject(error);
        });    
    });
}


/**
 * GetUserChannels
 * Retrieves all channels that a given user is a member of.
 * Joins the UserChannels and Channels tables to return channel details.
 * 
 * @param {string} UserID - Unique identifier of the user
 * @returns {Promise<Array>} Resolves with an array of channel objects the user belongs to
 * @throws {Error} Rejects with an error if the database operation fails
 */
export const GetUserChannels = async (UserID) => {
    return new Promise((resolve, reject) => {
        db.execute({
            sql: `
                SELECT C.ID, C.Title, C.Description, C.PhotoURL, C.CreatorID
                FROM UserChannels UC
                JOIN Channels C ON UC.ChannelID = C.ID 
                WHERE UC.UserID = ?
            `,
            args: [UserID]
        }).then(res => {
            resolve(res.rows);
        }).catch(error => {
            console.error(error);
            reject(error);
        })
    });
}