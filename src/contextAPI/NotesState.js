import React, { useState } from 'react';
import noteContext from './NotesContext';
const NotesState = (props) => {
    //* Fetch all Notes from backend
    const host = "http://localhost:5000";
    const initNotes = [];
    const [notes, setNotes] = useState(initNotes);
    //*Fetch All Notes
    const getAllNotes = async () => {
        const url = `${host}/api/notes/fetchallnotes`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token'),
            },
        });
        const json = await response.json();
        setNotes(json);
    }
    //* Add a note
    const addNote = async (user, title, description, tag) => {
        const url = `${host}/api/notes/addnotes`;
        //eslint-disable-next-line
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token'),
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    }


    //* Edit note 
    const editNote = async (id, title, description, tag) => {
        //* API Call
        const url = `${host}/api/notes/updatenote/${id}`;
        //eslint-disable-next-line
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token'),
            },
            body: JSON.stringify({ title, description, tag }),
        });
        let newNotes = JSON.parse(JSON.stringify(notes));
        //* Edit on browser
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }
    //* Delete note
    const deleteNote = async (id) => {
        //* API Call For delete
        const url = `${host}/api/notes/deletenote/${id}`;
        //eslint-disable-next-line
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token'),
            },
            body: JSON.stringify(),
        }); 
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    } 
    return (
        <noteContext.Provider value={{ notes, addNote, editNote, deleteNote, getAllNotes }}>
            {props.children}
        </noteContext.Provider>
    );
}

export default NotesState;