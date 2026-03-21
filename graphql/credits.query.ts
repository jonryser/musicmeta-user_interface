import { gql } from '@apollo/client';

export const CREDITS_BY_WORK_QUERY = gql`
  query CreditsByWork($workGuid: ID!) {
    creditsByWork(workGuid: $workGuid) {
      guid
      instrument
      notes
      person {
        guid
        firstName
        lastName
      }
      role {
        guid
        name
      }
      createdAt
      updatedAt
    }
  }
`;
