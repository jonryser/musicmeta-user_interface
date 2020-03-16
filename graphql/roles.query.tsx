import gql from 'graphql-tag';

const ROLES_QUERY = gql`
  query Roles {
    roles {
      description
      name
      guid
    }
  }
`;

export default ROLES_QUERY;