import { gql } from '@apollo/client';

export const CREATE_CREDIT_MUTATION = gql`
  mutation CreateCredit(
    $workGuid: ID!
    $personGuid: ID!
    $roleGuid: ID!
    $instrument: String
    $notes: String
  ) {
    createCredit(
      workGuid: $workGuid
      personGuid: $personGuid
      roleGuid: $roleGuid
      instrument: $instrument
      notes: $notes
    ) {
      guid
      instrument
      notes
      createdAt
      updatedAt
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
`;

export const DELETE_CREDIT_MUTATION = gql`
  mutation DeleteCredit($guid: ID!) {
    deleteCredit(guid: $guid) {
      guid
      deletedAt
    }
  }
`;
