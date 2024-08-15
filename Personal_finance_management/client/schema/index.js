const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type User {
    id: ID!
    username: String!
    email: String!
    transactions: [Transaction!]!
    budgets: [Budget!]!
    categories: [Category!]!
  }

  type Transaction {
    id: ID!
    userId: ID!
    amount: Float!
    date: String!
    description: String
    category: Category
    type: TransactionType!
  }

  enum TransactionType {
    INCOME
    EXPENSE
  }

  type Budget {
    id: ID!
    userId: ID!
    category: Category!
    limit: Float!
    spent: Float!
    period: BudgetPeriod!
  }

  enum BudgetPeriod {
    DAILY
    WEEKLY
    MONTHLY
    YEARLY
  }

  type Category {
    id: ID!
    userId: ID!
    name: String!
    color: String
  }

  type Query {
    user(id: ID!): User
    transactions(userId: ID!): [Transaction!]!
    budgets(userId: ID!): [Budget!]!
    categories(userId: ID!): [Category!]!
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): AuthPayload!
    createTransaction(userId: ID!, amount: Float!, date: String!, description: String, categoryId: ID, type: TransactionType!): Transaction!
    createBudget(userId: ID!, categoryId: ID!, limit: Float!, period: BudgetPeriod!): Budget!
    createCategory(userId: ID!, name: String!, color: String): Category!
    updateTransaction(id: ID!, amount: Float, date: String, description: String, categoryId: ID, type: TransactionType): Transaction
    updateBudget(id: ID!, limit: Float, period: BudgetPeriod): Budget
    updateCategory(id: ID!, name: String, color: String): Category
    deleteTransaction(id: ID!): Transaction
    deleteBudget(id: ID!): Budget
    deleteCategory(id: ID!): Category
    login(email: String!, password: String!): AuthPayload!
  }

  type AuthPayload {
    token: String!
    user: User!
  }
`);
