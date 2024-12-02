import express from'express';
import cors from 'cors'
import connectToMongoDB from './db/db.js'
import noteRouter from './routes/note.js'
import authRouter from './routes/auth.js'

const app = express();
app.use(cors())
app.use(express.json())
app.use('/api/note', noteRouter)
app.use('/api/auth', authRouter)

app.listen(5000, () => {
  connectToMongoDB()
  console.log("Server is running on port 5000")
});
