const express = require('express');
const Notes = require('../models/Notes');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');
//* Get all notes from /api/notes/fetchallnotes
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
});
//* Add notes : /api/notes/addnotes
router.post('/addnotes', fetchUser, [
    body('title').isLength({ min: 3 }),
    body('description').isLength({ min: 10 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, description, tag } = req.body;
        const note = new Notes({
            title, description, tag, user: req.user.id,
        });
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
});
//* Update Existing Note : /api/notes/updatenote
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };
        if (note.user.toString() !== req.user.id)
            return res.status(401).send("Not Allowed");
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json("Succesfully updated");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error});
    }
});
//* Delete a note /api/notes/deletenote 
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };
        if (note.user.toString() !== req.user.id)
            return res.status(401).send("Not Allowed");
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json("Succesfully deleted");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
});
module.exports = router;
