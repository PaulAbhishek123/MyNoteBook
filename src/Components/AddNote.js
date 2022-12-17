import React, { useContext, useRef, useState } from 'react'
import noteContext from '../contextAPI/NotesContext';
const AddNote = () => {
    const context = useContext(noteContext);
    //eslint-disable-next-line
    const {notes, addNote } = context;
    const [note, setNote] = useState({ addtitle: "", adddescription: "", addtag: "" });
    const addNoteRef = useRef(null);
    const addNoteCloseRef = useRef(null);
    const addNoteModal = () => {
        addNoteRef.current.click();
    }
    const handleAddNote = async() => {
        const response = await fetch("http://localhost:5000/api/auth/getuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token' : localStorage.getItem('token')
            },
        });
        const json = await response.json();
        addNote( json.user._id, note.addtitle, note.adddescription, note.addtag);
        addNoteCloseRef.current.click();
    }
    const handleChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value });
    }
    return (
        <>
            <i className="fa-solid fa-circle-plus d-flex justify-end cursor-pointer hover:text-[#f2921b]" onClick={addNoteModal}></i>
            <button type="button" ref={addNoteRef} className="d-none" data-bs-toggle="modal" data-bs-target="#exampleModalAdd" />
            <div className="modal fade" id="exampleModalAdd" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered ">
                    <div className="modal-content modal-dark">
                        <div className="modal-header ">
                            <h1 className="modal-title fs-5 font-extrabold " id="exampleModalLabel">Add Note</h1>
                            <button type="button" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">❌</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="addtitle" className="form-label text-gray-600">Title</label>
                                <input type="text" className="form-control w-1/2" id="addtitle" name="addtitle" onChange={handleChange} minLength={5} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="adddescription" className="form-label text-gray-600">Description</label>
                                <textarea className="form-control w-1/2 h-1/2" id="adddescription" name="adddescription" rows="3" cols="3" onChange={handleChange} minLength={10} required></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="addtag" className="form-label text-gray-600">Choose your Tag</label>
                                <select defaultValue="" className="form-select text-gray-600" aria-label="Tag" id="addtag" name="addtag" onChange={handleChange}>
                                    <option value="" disabled>Choose your tag</option>
                                    <option value="General" id="addtag">General</option>
                                    <option value="Personal" id="addtag">Personal</option>
                                    <option value="Private" id="addtag">Private</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={addNoteCloseRef} className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-outline-primary" onClick={handleAddNote}>Add Note</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddNote;





