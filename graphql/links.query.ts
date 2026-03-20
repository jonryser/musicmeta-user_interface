import { gql } from '@apollo/client';

export const LINKS_BY_WORK_QUERY = gql`
  query LinksByWork($workGuid: ID!) {
    linksByWork(workGuid: $workGuid) {
      guid
      url
      linkType
      description
      createdAt
      updatedAt
    }
  }
`;
