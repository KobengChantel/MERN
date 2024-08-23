const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type User {
    id: ID!
    username: String!
    email: String!
    tasks: [Task]
  }

  type Task {
    id: ID!
    title: String!
    description: String
    dueDate: String
    priority: String
    completed: Boolean
    user: User!
  }

  type AuthPayload {
    user: User
    token: String
  }

  type Query {
    getUser(id: ID!): User
    getTasks(userId: ID!): [Task]
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): AuthPayload
    createTask(title: String!, description: String, dueDate: String, priority: String, userId: ID!): Task
    updateTask(id: ID!, title: String, description: String, dueDate: String, priority: String, completed: Boolean): Task
    deleteTask(id: ID!): Task
    login(username: String!, password: String!): AuthPayload
    logout: Boolean
  }

 

  schema {
    query: Query
    mutation: Mutation
   
  }
`);
