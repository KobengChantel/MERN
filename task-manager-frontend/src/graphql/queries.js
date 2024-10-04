
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




export const SEARCH_TASKS = gql`
  query SearchTasks($title: String, $dueDate: String, $description: String, $priority: String) {
    searchTasks(title: $title, dueDate: $dueDate, description: $description, priority: $priority) {
      id
      title
      description
      dueDate
      priority
      completed
      archived
    }
  }
`;

export const GET_ARCHIVED_TASKS = gql`
  query GetArchivedTasks($userId: ID!) {
    getArchivedTasks(userId: $userId) {
      id
      title
      description
      dueDate
      priority
      completed
      archived
    }
  }
`;

export const GET_TASK_STATISTICS = gql`
  query GetTaskStatistics($userId: ID!) {
    getTaskStatistics(userId: $userId) {
      totalTasks
      completedTasks
      inProgressTasks
    }
  }
`;
