import { db } from "./database.js";


/**
 * UpdateProfilePhoto
 * Updates the profile photo URL of a specific user in the database.
 * 
 * @param {string} userID - UUID of the user whose photo is being updated
 * @param {string} profilePhoto - New photo URL
 * @returns {Promise<void>} Resolves when the photo is updated successfully
 * @throws {Error} Rejects with an error if the database operation fails
 */
export const UpdateProfilePhoto = (userID, profilePhoto) => {
    return new Promise((resolve, reject) => {
        db.execute({
            sql: "UPDATE User SET photoUrl = ? WHERE ID = ?",
            args: [profilePhoto, userID]
        }).then(() => {
            resolve();
        }).catch(error => {
            reject(error);
        });
    })
}

/**
 * GetPhoto
 * Retrieves the photo URL of a user or a channel by UUID.
 * Searches both the User and Channels tables and returns the first match.
 * 
 * @param {string} UUID - UUID of the user or channel
 * @returns {Promise<{PhotoURL: string}>} Resolves with an object containing the photo URL
 * @throws {Error} Rejects with an error if the database operation fails
 */
export const GetPhoto = (UUID) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await db.execute({
                sql: "SELECT PhotoURL FROM User WHERE ID = ? UNION SELECT PhotoURL FROM Channels WHERE ID = ? LIMIT 1",
                args: [UUID, UUID]
            });

            resolve(result.rows[0]);
        } catch (error) {
            reject(error);
        }
    });
}


