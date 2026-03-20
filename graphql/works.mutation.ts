import { gql } from '@apollo/client';

export const CREATE_WORK_MUTATION = gql`
  mutation CreateWork($title: String!, $description: String) {
    createWork(title: $title, description: $description) {
      guid
      title
      description
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_WORK_MUTATION = gql`
  mutation UpdateWork($guid: ID!, $title: String, $description: String) {
    updateWork(guid: $guid, title: $title, description: $description) {
      guid
      title
      description
      updatedAt
    }
  }
`;

export const DELETE_WORK_MUTATION = gql`
  mutation DeleteWork($guid: ID!) {
    deleteWork(guid: $guid) {
      guid
      deletedAt
    }
  }
`;
