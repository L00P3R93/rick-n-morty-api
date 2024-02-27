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
        <NotesWrapper>
            <SubTitle align="left" mb={16} mt={26}>Notes</SubTitle>
            {existingNotes.length > 0 ? (
                <NotesList>
                    {existingNotes.map(note => (
                        <NoteItem key={note.id}>{note.content}</NoteItem>
                    ))}
                </NotesList>
            ) : (
                <NoNotesMessage>No Notes Available!</NoNotesMessage>
            )}
           
            <SubTitle align="left" mb={16} mt={20}>Add Note</SubTitle>
            <form onSubmit={handleSubmit}>
                <NotesText
                    cols={40}
                    rows={5}
                    value={newNote}
                    onChange={handleNoteChange}
                    placeholder="Add New Note"
                />
                <br />
                <NotesButton type="submit">Save</NotesButton>
            </form>
        </NotesWrapper>
    );
};


const NotesWrapper = styled.div`
    font-size: 14px;
`;

const NotesList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const NoteItem = styled.li`
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 10px;
    background-color: transparent;
`;

const NoNotesMessage = styled.p`
    color: #888;
`

const NotesText = styled.textarea`
    color: #22222e;
    padding: 10px auto;
`;

const NotesButton = styled.button`
    background-color: transparent;
    margin-top: 10px;
    margin-right: 10px;
    margin-bottom: 6px;
    border: 1px solid white;
    border-radius: 4px;
    padding: 6px;
    display: inline-block;
    font-size: 14px;
    transition: all 0.3s;

    &:hover {
        background-color: black;
        cursor: 'pointer';
    }
`

export default CharacterNotes;