import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      user {
        id
        username
        email
      }
      token
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $description: String, $dueDate: String, $priority: String, $userId: ID!) {
    createTask(title: $title, description: $description, dueDate: $dueDate, priority: $priority, userId: $userId) {
      id
      title
      description
      dueDate
      priority
      completed
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $title: String, $description: String, $dueDate: String, $priority: String, $completed: Boolean) {
    updateTask(id: $id, title: $title, description: $description, dueDate: $dueDate, priority: $priority, completed: $completed) {
      id
      title
      description
      dueDate
      priority
      completed
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
      title
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        id
        username
        email
      }
      token
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;
