const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type User {
  id: ID!
  username: String!
  email: String!
  password: String!
  transactions: [Transaction!]!
  budgets: [Budget!]!
  categories: [Category!]!
  }

  type Transaction {
  id:ID!
  userId: ID!
  amount: Float!
  date: String!
  description: String
  category: Category
  type: TransactionType!
  }

enumeration TransactionType {
Income,
Expenses
}

enumeration BudgetPeriod {
DAILY
WEEKLY
MONTHLY
YEARLY
}


type Category {
id: ID!
name: String!
color: String!
}

input UserInput {
email: String!
password: String!
}

  type Query {
user(id: ID!): user
transactions(userId: ID!); [Transaction!]!
budgets(userId: ID!): [Budget!]!
categories(userId: ID!): [Category!]!
  }


  type Mutation{
  createUser( userInput: UserInput): User
  login(email: String!, password: String!):
  AuthData
  }

  type AuthPayLoad {
token: String!
 user: User!
  }

schema {
query: RootQuery
mutation: RootMutation
}
  `);

