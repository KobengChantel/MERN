
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema} = require('graphql');

const app = express();

//parse incoming json bodies
app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: buildSchema(`
        type Event {
          _id: ID!
          title: String!
          description: String!
          price: Float!
          date: String!
        }

         input EventInput {
          title: String!
          description: String!
          price: Float!
          date: String!
        }

        type RootQuery {
            events: [String!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      events: () => {
        return ['Romantic Cooking', 'Sailing', 'All-Night Coding'];
      },
      createEvent: (args) => {
        const event = {
          _id: Math.random().toString(),
          title: args.title,
          description: args.description,
          price: +args.price,
          date: args.date
        }
        console.log(event);
        events.push(event);
        return event;
      }
    },
    graphiql: true
  })
);

app.get('/', (req, res, next) =>{
  res.send('Hello world');
})


app.listen(3000);



















// # Welcome to GraphiQL
// #
// # GraphiQL is an in-browser tool for writing, validating, and
// # testing GraphQL queries.
// #
// # Type queries into this side of the screen, and you will see intelligent
// # typeaheads aware of the current GraphQL type schema and live syntax and
// # validation errors highlighted within the text.
// #
// # GraphQL queries typically start with a "{" character. Lines that start
// # with a # are ignored.
// #
// # An example GraphQL query might look like:

// #     {
// #       field(arg: "value") {
// #         subField
// #       }
// #     }
// #
// # Keyboard shortcuts:
// #
// #  Prettify Query:  Shift-Ctrl-P (or press the prettify button above)
// #
// #     Merge Query:  Shift-Ctrl-M (or press the merge button above)
// #
// #       Run Query:  Ctrl-Enter (or press the play button above)
// #
// #   Auto Complete:  Ctrl-Space (or just start typing)
// #
