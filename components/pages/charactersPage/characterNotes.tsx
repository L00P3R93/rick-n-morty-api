import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import axios from 'axios';
import SubTitle from "@/components/shared/titles/subTitle";

interface CharacterNotesProps {
    characterId: string;
}

interface Note {
    id: string;
    content: string;
}

const CharacterNotes: React.FC<CharacterNotesProps> = ({ characterId }) => {
    const [existingNotes, setExistingNotes] = useState<Note[]>([]);
    const [newNote, setNewNote] = useState<string>('');

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get(`/api/notes?characterId=${characterId}`);
                setExistingNotes(response.data.notes);
            } catch (error) {
                console.error('Error fetching notes: ', error);
            }
        };

        fetchNotes();
    }, [characterId]);

    const handleNoteChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setNewNote(event.target.value);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await axios.post('/api/notes', {
                characterId,
                content: newNote,
            });
            const response = await axios.get(`/api/notes?characterId=${characterId}`);
            setExistingNotes(response.data.notes);
            setNewNote('');
        } catch (error) {
            console.error('Error adding note: ', error);
        }
    };

    return (
        <div>
            <SubTitle align="center" mb={16} mt={26}>Character Notes</SubTitle>
            <ul>
                {existingNotes.map(note => (
                    <li key={note.id}>{note.content}</li>
                ))}
            </ul>
            <SubTitle align="center" mb={16} mt={20}>New Note</SubTitle>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={newNote}
                    onChange={handleNoteChange}
                    placeholder="Add New Note"
                />
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default CharacterNotes;