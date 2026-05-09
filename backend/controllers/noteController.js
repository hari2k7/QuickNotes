import Note from '../models/Note.js'
import mongoose from 'mongoose' //this is for getSingleNote valid mongoose id entering

// Get all notes
export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({
            user: req.user.id,
        });

        res.json(notes)

    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

export const createNote = async (req, res) => {
    try {
        const note = await Note.create({
            title: req.body.title,
            content: req.body.content,

            user: req.user.id,
        })

        res.status(201).json(note)

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

export const updateNote = async (req, res) => {
    try {

        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({
                message: 'Note not found',
            });
        }


        // Check ownership
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({
                message: 'Not authorized',
            });
        }

        const updateNote = await Note.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                content: req.body.content,
            },
            {
                new: true,
            }
        )

        res.json(updateNote)

    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
    }
}

export const deleteNote = async (req, res) => {
    try {

        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({
                message: 'Note not found',
            });
        }

        // Check ownership
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({
                message: 'Not authorized',
            });
        }

        await Note.findByIdAndDelete(req.params.id)

        res.json({
            message: 'Note deleted successfully',

        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

export const getSingleNote = async (req, res) => {
    try {

        // Check valid MongoDB ObjectId (optional but if not given it will reach catch block instead of if(!note) block)
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({
                message: 'Note not found',
            });
        }

        const note = await Note.findById(req.params.id)

        if (!note) {
            return res.status(404).json({
                message: 'Note not found',
            })
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({
                message: 'Not authorized',
            });
        }

        res.json(note)
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}