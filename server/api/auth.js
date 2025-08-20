import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';

import { CreateUser, GetUser } from "../db/users.js";


/**
 * AuthHandlers
 * Defines authentication endpoints: registration and login.
 * 
 * Endpoints:
 * 
 * POST /api/login
 *   - Description: Logs in a user with username and password.
 *   - Request Body (JSON):
 *       {
 *         "username": "string",  // registered username
 *         "password": "string"   // user password
 *       }
 *   - Responses:
 *       200: Successful login, returns the user:
 *          {
 *            "ID": "uuid",
 *            "Username": "string",
 *            "hashedPassword": "string",
 *            "photoURL": "string | null"
 *          }
 *       401: Invalid credentials ("Invalid credentials" or "Password doesn't match")
 *       500: Server error ("Server error")
 * 
 * POST /api/register
 *   - Description: Registers a new user.
 *   - Request Body (JSON):
 *       {
 *         "username": "string",       // unique username
 *         "password": "string",       // user password
 *         "photoURL": "string | null" // optional, profile picture URL
 *       }
 *   - Responses:
 *       200: User successfully registered ("OK")
 *       500: Error creating user (error message)
 */

export const AuthHandlers = (app) => {
    app.post("/api/login", async (req, res) => {
        try {
            const { username, password } = req.body;
            console.log(`Body: [${username}][${password}]`)
            const StoredUser = await GetUser(username);

            console.log("Llega ", username, StoredUser);

            if (!StoredUser)
                return res.status(401).send({message: "User doesn't exists"});

            const match = await bcrypt.compare(password, StoredUser.hashedPassword);

            if (!match) 
                return res.status(401).send({message: "Password doesn't match"});

            res.send(JSON.stringify(StoredUser));
        } catch (error) {
            console.error(error);
            res.status(500).send({message: 'Server error'});
        }
    });

    app.post("/api/register", async (req, res) => {
        try {

            const { username, password, photoURL = null } = req.body;
            const UUID = uuidv4();

            const hashedPassword = await bcrypt.hash(password, 10);

            try {
                await CreateUser(UUID, username, hashedPassword, photoURL)
                res.send("OK")
            } catch (error) {
                console.error(error);
                res.status(500).send({message: error})
            }


        } catch (error) {
            console.error(error);
            res.send(JSON.stringify(error));
        }
    });
}