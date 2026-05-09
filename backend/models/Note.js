import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            minlength: [3, 'Title must be at least 3 characters'],
        },

        content: {
            type: String,
            required: [true, 'Content is required'],
            trim: true,
            minlength: [5, 'Content must be at least 5 characters'],
        },
    },
    {
        timestamps: true,
    }
)

const Note = mongoose.model('Node', noteSchema)

export default Note