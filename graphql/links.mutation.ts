import { gql } from '@apollo/client';

export const CREATE_LINK_MUTATION = gql`
  mutation CreateLink(
    $workGuid: ID!
    $url: String!
    $linkType: LinkType!
    $description: String
  ) {
    createLink(
      workGuid: $workGuid
      url: $url
      linkType: $linkType
      description: $description
    ) {
      guid
      url
      linkType
      description
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_LINK_MUTATION = gql`
  mutation DeleteLink($guid: ID!) {
    deleteLink(guid: $guid) {
      guid
      deletedAt
    }
  }
`;
