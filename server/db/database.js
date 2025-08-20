import { createClient } from "@libsql/client";
import dotenv from "dotenv";

import { encodeEmoji } from '../utils/encoders.js'
dotenv.config();

export const db = createClient({
    url: process.env.DB_URL,
    authToken: process.env.DB_TOKEN
});


