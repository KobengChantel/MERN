
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');


const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);


app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

  

// mongoose.connect(
//   `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ryimgla.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=Cluster0`
// ).then(() => {
//    app.listen(3000);
//  })
//  .catch(err => {
//    console.log(err);
//  });


 mongoose.connect('mongodb+srv://graphql:12345@cluster0.ryimgla.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0')

.then(() => {
  console.log('Successfully connected to MongoDB');
  app.listen(8000, () => {
    console.log('Server is running on port 8000');
  });
})
.catch(err => {
  console.error('Connection error:', err);
});

app.get('/', (req, res, next) =>{
  res.send('Hello world. Welcome to learning GraphQl. Wishing youu all the best.!');
});



















