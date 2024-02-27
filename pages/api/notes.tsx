import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Interface defined with properties corresponding to columns in the `notes` table.
interface Note {
    id: number
    characterId: string
    content: string
    date_added: string
};

// Open an instance of the SQLite DB connection.
async function dbInstance() {
    return open({
        filename: './notes.db',
        driver: sqlite3.Database
    });
};

// Checks if notes table exists and creates it if not.
async function initDB() {
    const db = await dbInstance();
    await db.run(`CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        character_id TEXT,
        content TEXT,
        date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
    await db.close();
};

// Initializes DB on server startup
initDB();

/**
 * Handle HTTP requests for fetching character notes and adding new notes.
 * @param {NextApiRequest} req - The incoming request object.
 * @param {NextApiResponse} res - The outgoing response object.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse){
    
    if(req.method == 'GET'){
        /**
         * GET request handler fetches the notes for a character
         * The `notes` array is explicitly types as `Note[]` ensuring all fetched data from DB is properly types as `Note` objects.
         */
        const { characterId } = req.query;
        try {
            const db = await dbInstance();
            const notes: Note[] = await db.all('SELECT * FROM notes WHERE character_id = ?', characterId);
            await db.close();
            res.status(200).json({ notes })
        } catch (error) {
            console.error('Error fetching notes: ', error);
            res.status(500).json({ message: 'Error fetching notes' });
        }
    }else if (req.method === 'POST'){
        // Handle POST request to add a new note for a character
        const { characterId, content } = req.body;
        try {
            const db = await dbInstance();
            await db.run('INSERT INTO notes (character_id, content) VALUES (?, ?)', characterId, content);
            await db.close();
            res.status(201).json({ message: 'Note added successfully' });
        } catch (error) {
            console.error('Error adding note: ', error);
            res.status(500).json({ message: 'Error adding note' });
        }
    }else{
        // Handle other HTTP methods
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
