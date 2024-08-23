const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const authMiddleware = require('./utils/authMiddleware');
const cors = require('cors');

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
