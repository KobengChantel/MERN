//MAIN ENTRY POINT FOR THE APPLICATION SETS UP TEH EXPRESS XONNECT TO MONGODB AND CONFIGURE GRAPHQL


const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const dotenv = require('dotenv');
const schema = require('./schema');
const resolvers = require('./resolvers')
const { connectDB } = require('./config/database');

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use('/graphql', graphqlHTTP({
schema,
rootValue: resolvers,
graphiql: true,
}));

connectDB();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/graphql`);
})
    
  


