import express from 'express'
//import Note from '../models/Note.js'
import authMiddleware from '../middleware/authMiddleware.js'

import{
    getNotes,
    createNote,
    updateNote,
    deleteNote,
    getSingleNote,
}from'../controllers/noteController.js'

const router = express.Router()

// to get all notes
router.get('/', authMiddleware, getNotes)

// get single note
router.get('/:id', authMiddleware, getSingleNote)

// to create note
router.post('/', authMiddleware, createNote)

// update notes
router.put('/:id', authMiddleware, updateNote)

// delete note
router.delete('/:id', authMiddleware, deleteNote)

export default router