const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const authMiddleware = require('./utils/authMiddleware');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
dotenv.config();

connectDB();

const app = express(); // Initialize the app before using it

app.use(cors()); // Apply CORS middleware
app.use(express.json()); // Apply JSON middleware

app.use(authMiddleware); // Apply authentication middleware

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true, // Set to false in production
  })
);


// Setup multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Filename with timestamp
  }
});

const upload = multer({ storage });

app.post('/upload', upload.single('profilePicture'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }
  res.json({ filePath: `/uploads/${file.filename}` }); // Respond with file path
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
