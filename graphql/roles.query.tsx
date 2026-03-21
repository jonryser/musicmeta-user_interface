import { gql } from '@apollo/client';

export const ROLES_QUERY = gql`
  query Roles {
    roles {
      description
      name
      guid
    }
  }
`;

export default ROLES_QUERY;
