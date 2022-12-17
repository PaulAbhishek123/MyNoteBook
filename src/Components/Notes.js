import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../contextAPI/NotesContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem'
const Notes = () => {
    let navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, getAllNotes, editNote } = context;
    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        if(localStorage.getItem('token'))
            getAllNotes();
        else
            navigate('/login');
    }, []);
    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ id: '', title: '', description: '', tag: '' });
    const updateNotes = (curNote) => {
        ref.current.click(); 
        setNote({ id: curNote._id, title: curNote.title, description: curNote.description, tag: curNote.tag });
    }
    const handleEditNote = () => {
        refClose.current.click();
        editNote(note.id, note.title, note.description, note.tag);
    }

    const handleEditChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value });
    }
    return (
        <>
            <AddNote />
            <button type="button" ref={ref} className="d-none" data-bs-toggle="modal" data-bs-target="#exampleModalEdit" />
            <div className="modal fade" id="exampleModalEdit" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered ">
                    <div className="modal-content modal-dark">
                        <div className="modal-header ">
                            <h1 className="modal-title fs-5 font-extrabold " id="exampleModalLabel">Edit Note</h1>
                            <button type="button" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">❌</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label text-gray-600">Title</label>
                                <input type="text" className="form-control w-1/2" id="title" name="title" value={note.title} onChange={handleEditChange} minLength={5} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label text-gray-600">Description</label>
                                <textarea className="form-control w-1/2 h-1/2" id="description" name="description" rows="3" cols="3" value={note.description} onChange={handleEditChange} minLength={10} required></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label text-gray-600">Choose your Tag</label>
                                <select defaultValue="" className="form-select text-gray-600" aria-label="Tag" id="tag" name="tag" onChange={handleEditChange}>
                                    <option value="" disabled>Choose your tag</option>
                                    <option value="General" id="tag">General</option>
                                    <option value="Personal" id="tag">Personal</option>
                                    <option value="Private" id="tag">Private</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-outline-primary" onClick={handleEditNote}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <h1 className='text-xl font-extrabold text-center text-gray-800'>Your Notes</h1>
                {notes.length === 0 && <h1 className='m-5 text-xl font-medium'>No Notes</h1>}
                {notes.map((note, index) => {
                    return <NoteItem key={index} note={note} updateNotes={updateNotes} />
                })}
            </div>
        </>
    );
}

export default Notes;