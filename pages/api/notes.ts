import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

interface NoteDocument extends mongoose.Document {
    characterId: string
    content: string
    date_added: string
};

const NoteSchema = new mongoose.Schema({
    characterId: String,
    content: String,
    date_added: { type: Date, default: Date.now }
});

const NoteModel = mongoose.model<NoteDocument>("Note", NoteSchema);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, query } = req;

    await mongoose.connect(process.env.MONGODB_URI);

    switch(method){
        case "GET":
            try {
                const { characterId } = query;
                if(!characterId) {
                    return res.status(400).json({ success: false, error: "Missing characterId parameter" });
                }
                const notes = await NoteModel.find({ characterId });
                res.status(200).json({ success: true, notes })
            } catch (error) {
                res.status(500).json({ success:false, error: error });
            }
            break;
        case "POST":
            try {
                const { characterId, content } = req.body;
                if(!characterId || !content){
                    return res.status(400).json({ success: false, error: "Character Id and Content are required to create a note" });
                }
                const newNote = await NoteModel.create({ characterId, content });
                res.status(201).json({ success: true, note: newNote });
            } catch (error) {
                res.status(500).json({ success: false, error: error.message });
            }
            break;
        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
