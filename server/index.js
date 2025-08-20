import cors from 'cors';
import dotenv from 'dotenv';
import path from 'node:path';
import express from 'express';
import { createServer } from 'node:http';

import { initApiHandlers } from './api/init.js';
import { initSocketServer } from './socket/handlers.js';
import { initDatabase } from './db/init.js';

dotenv.config();

const PORT = process.env.PORT;
const app = express();

// Express Middlewares
app.use(express.json());
app.use(cors({
    origin: "*", 
    methods: ["GET", "POST"]
}));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

const server = createServer(app);

initApiHandlers(app);
initDatabase();
initSocketServer(server, {
    cors: {
        origin: '*', 
        allowedHeaders: ["Content-Type"],
        methods: ["GET", "POST"],
        credentials: true
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});