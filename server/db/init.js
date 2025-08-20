import { db } from "./database.js";

export const initDatabase = () => {
    db.execute(`
        CREATE TABLE IF NOT EXISTS User (
            ID TEXT PRIMARY KEY,            
            Username TEXT NOT NULL UNIQUE,
            photoUrl TEXT,
            hashedPassword TEXT NOT NULL,   
            Status TEXT                     
        )`
    );

    db.execute(`
        CREATE TABLE IF NOT EXISTS Channels (
            ID TEXT PRIMARY KEY,           
            CreatorID TEXT NOT NULL,
            Title TEXT NOT NULL,
            Description TEXT,
            PhotoURL TEXT,

            FOREIGN KEY (CreatorID) REFERENCES User(ID) ON DELETE CASCADE
        );
    `);

    db.execute(`
        CREATE TABLE IF NOT EXISTS UserChannels (
            UserID     TEXT NOT NULL,
            ChannelID  TEXT NOT NULL,
            JoinedAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

            PRIMARY KEY (UserID, ChannelID), 
            FOREIGN KEY (UserID) REFERENCES User(ID) ON DELETE CASCADE,
            FOREIGN KEY (ChannelID) REFERENCES Channels(ID) ON DELETE CASCADE
        );      
    `)
        
    db.execute(`
        CREATE TABLE IF NOT EXISTS Messages (
            ID TEXT PRIMARY KEY,
            FromID TEXT NOT NULL,
            ChannelID TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            Content TEXT NOT NULL,

            FOREIGN KEY (FromID) REFERENCES User(ID) ON DELETE CASCADE,
            FOREIGN KEY (ChannelID) REFERENCES Channels(ID) ON DELETE CASCADE
        );
    `);
        

    db.execute(`
        CREATE TABLE IF NOT EXISTS Reactions (
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
            ChannelID TEXT NOT NULL,
            MessageID TEXT NOT NULL,
            reaction TEXT NOT NULL,

            FOREIGN KEY (MessageID) REFERENCES Messages(ID) ON DELETE CASCADE
        );
    `);
} 