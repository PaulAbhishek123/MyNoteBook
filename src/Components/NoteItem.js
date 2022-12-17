import React, { useContext } from 'react'
import noteContext from '../contextAPI/NotesContext';
const NoteItem = (props) => {
    const {note, updateNotes} = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const handleDelete = () => {
        deleteNote(note._id);
    }
    return (
        <>
            <div className='col-md-2 my-10 d-flex justify-evenly'>
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex">
                            <h5 className="card-title font-bold text-gray-700">{note.title}</h5>
                            <i className="fa-solid fa-trash cursor-pointer mx-2 hover:text-[#f60a0a]" onClick={handleDelete}></i>
                            <i className="fa-solid fa-pen-to-square cursor-pointer hover:text-[#1c43dc]" onClick={() => {updateNotes(note)}}></i>
                        </div>
                        <p className="card-text font-thin text-gray-500">{note.description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteItem;