import { gql } from '@apollo/client';

export const PLACES_QUERY = gql`
  query Places {
    places {
      guid
      name
      description
      city
      state
      country
      createdAt
      updatedAt
    }
  }
`;

export const PLACE_QUERY = gql`
  query Place($guid: ID!) {
    place(guid: $guid) {
      guid
      name
      description
      city
      state
      country
      createdAt
      updatedAt
    }
  }
`;
