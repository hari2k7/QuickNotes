import express from 'express'
//import Note from '../models/Note.js'

import{
    getNotes,
    createNote,
    updateNote,
    deleteNote,
    getSingleNote,
}from'../controllers/noteController.js'

const router = express.Router()

// to get all notes
router.get('/', getNotes)

// get single note
router.get('/:id',getSingleNote)

// to create note
router.post('/', createNote)

// update notes
router.put('/:id' ,updateNote)

// delete note
router.delete('/:id', deleteNote)

export default router