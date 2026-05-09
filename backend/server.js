import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import noteRoutes from './routes/noteRoutes.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config()

const app = express()

app.use(cors({
  origin: 'https://quick-notes-nine-jet.vercel.app',
  credentials: true,
}));

app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB conection error '+err))

// Routes
app.use('/notes',noteRoutes);
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
    console.log('Server running on port 5000')
})