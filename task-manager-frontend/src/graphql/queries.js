
import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
      city
      gender
      age
      tasks {
        id
        title
        description
        dueDate
        priority
        completed
      }
    }
  }
`;

export const GET_TASKS = gql`
  query GetTasks($userId: ID!) {
    getTasks(userId: $userId) {
      id
      title
      description
      dueDate
      priority
      completed
    }
  }
`;
