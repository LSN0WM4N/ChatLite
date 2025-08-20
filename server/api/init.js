import { AuthHandlers } from "./auth.js";
import { ChannelHandlers } from "./channel.js";
import { MessagesHandlers } from "./messages.js";
import { FilesHandlers } from "./files.js";

export const initApiHandlers = (app) => { 
    app.get('/api/', (req, res) => {
        res.json({ message: 'Welcome to the API' });
    });

    AuthHandlers(app);
    ChannelHandlers(app);
    MessagesHandlers(app);
    FilesHandlers(app);
}
