import { gql } from '@apollo/client';

export const PEOPLE_QUERY = gql`
  query People {
    people {
      guid
      firstName
      lastName
      email
      createdAt
      updatedAt
    }
  }
`;

export const PERSON_QUERY = gql`
  query Person($guid: ID!) {
    person(guid: $guid) {
      guid
      firstName
      lastName
      email
      createdAt
      updatedAt
    }
  }
`;
