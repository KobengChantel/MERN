const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 1000;

const graphQLSchema = require ('./graphql/schema');
const graphQlResolvers = require('./graphql/resolvers/index');
const { graphqlHTTP } = require('express-graphql');

require('crypto').randomBytes(64).toString('hex');


const MONGO_URL = 'mongodb+srv://personal:personal@clusterp.yx6tckq.mongodb.net/?retryWrites=true&w=majority&appName=Clusterp';

// const MONGO_URL =process.env.MONGO_URL;

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphQLSchema,
    rootValue: graphQlResolvers,
   graphiql: true
  })
);

mongoose.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true })

.then(() => {console.log('Successfully connecte');

  app.listen(1000, () => {
    console.log('Server is running on port 1000');
  });
})
.catch(err => { console.error('connection error');
});
app.get('/', (req, res, next) => {
  res.send('Learning how to combine mern with graphql on my mern project... send me any tutorial on 0609437409');
});
