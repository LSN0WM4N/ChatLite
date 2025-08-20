import path from "path";
import express from "express";
import { existsSync } from "fs";
import { AuthHandlers } from "./auth.js";
import { ChannelHandlers } from "./channel.js";
import { MessagesHandlers } from "./messages.js";
import { FilesHandlers } from "./files.js";

export const initApiHandlers = (app) => { 
    app.get('/api/', (req, res) => {
        res.json({ message: 'Welcome to the API' });
    });

    const distPath = path.join(process.cwd(), "frontend");

    AuthHandlers(app);
    ChannelHandlers(app);
    MessagesHandlers(app);
    FilesHandlers(app);

    if (existsSync(distPath)) {
        console.log("Hosting front build...");

        app.use(express.static(distPath));
        app.get(/.*/, (req, res) => {
            res.sendFile(path.join(distPath, "index.html"));
        });
    }
}

