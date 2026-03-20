import { gql } from '@apollo/client';

export const WORKS_QUERY = gql`
  query Works {
    works {
      guid
      title
      description
      createdAt
      updatedAt
    }
  }
`;

export const WORK_QUERY = gql`
  query Work($guid: ID!) {
    work(guid: $guid) {
      guid
      title
      description
      createdAt
      updatedAt
      versions {
        guid
        title
        createdAt
      }
      credits {
        guid
        instrument
        person {
          guid
          firstName
          lastName
        }
        role {
          guid
          name
        }
      }
    }
  }
`;
