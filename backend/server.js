import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import noteRoutes from './routes/noteRoutes.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB conection error '+err))

// Routes
app.use('/notes',noteRoutes);

const PORT = 5000

app.listen(PORT, ()=> {
    console.log('Server running on port 5000')
})