import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Credit = {
  __typename?: 'Credit';
  createdAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
  guid: Scalars['ID']['output'];
  instrument?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  person: Person;
  role: Role;
  updatedAt: Scalars['String']['output'];
  work: Work;
};

export type Link = {
  __typename?: 'Link';
  createdAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  guid: Scalars['ID']['output'];
  linkType: LinkType;
  updatedAt: Scalars['String']['output'];
  url: Scalars['String']['output'];
  work: Work;
};

export enum LinkType {
  Audio = 'audio',
  Document = 'document',
  Image = 'image',
  Other = 'other',
  Purchase = 'purchase',
  Streaming = 'streaming',
  Video = 'video'
}

export type Mutation = {
  __typename?: 'Mutation';
  createCredit: Credit;
  createLink: Link;
  createWork: Work;
  deleteCredit: Credit;
  deleteLink: Link;
  deleteWork: Work;
  updateWork: Work;
};


export type MutationCreateCreditArgs = {
  instrument?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  personGuid: Scalars['ID']['input'];
  roleGuid: Scalars['ID']['input'];
  workGuid: Scalars['ID']['input'];
};


export type MutationCreateLinkArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  linkType: LinkType;
  url: Scalars['String']['input'];
  workGuid: Scalars['ID']['input'];
};


export type MutationCreateWorkArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};


export type MutationDeleteCreditArgs = {
  guid: Scalars['ID']['input'];
};


export type MutationDeleteLinkArgs = {
  guid: Scalars['ID']['input'];
};


export type MutationDeleteWorkArgs = {
  guid: Scalars['ID']['input'];
};


export type MutationUpdateWorkArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  guid: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Person = {
  __typename?: 'Person';
  createdAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  guid: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Place = {
  __typename?: 'Place';
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  guid: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  state?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  creditsByWork: Array<Credit>;
  linksByWork: Array<Link>;
  people: Array<Person>;
  person?: Maybe<Person>;
  place?: Maybe<Place>;
  places: Array<Place>;
  roles: Array<Role>;
  work?: Maybe<Work>;
  works: Array<Work>;
};


export type QueryCreditsByWorkArgs = {
  workGuid: Scalars['ID']['input'];
};


export type QueryLinksByWorkArgs = {
  workGuid: Scalars['ID']['input'];
};


export type QueryPersonArgs = {
  guid: Scalars['ID']['input'];
};


export type QueryPlaceArgs = {
  guid: Scalars['ID']['input'];
};


export type QueryWorkArgs = {
  guid: Scalars['ID']['input'];
};

export type Role = {
  __typename?: 'Role';
  description?: Maybe<Scalars['String']['output']>;
  guid: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Work = {
  __typename?: 'Work';
  createdAt: Scalars['String']['output'];
  credits: Array<Credit>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  guid: Scalars['ID']['output'];
  links: Array<Link>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  versions: Array<WorkVersion>;
};

export type WorkVersion = {
  __typename?: 'WorkVersion';
  createdAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  guid: Scalars['ID']['output'];
  parentVersion?: Maybe<WorkVersion>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  work: Work;
};

export type CreateCreditMutationVariables = Exact<{
  workGuid: Scalars['ID']['input'];
  personGuid: Scalars['ID']['input'];
  roleGuid: Scalars['ID']['input'];
  instrument?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateCreditMutation = { __typename?: 'Mutation', createCredit: { __typename?: 'Credit', guid: string, instrument?: string | null, notes?: string | null, createdAt: string, updatedAt: string, person: { __typename?: 'Person', guid: string, firstName: string, lastName: string }, role: { __typename?: 'Role', guid: string, name: string } } };

export type DeleteCreditMutationVariables = Exact<{
  guid: Scalars['ID']['input'];
}>;


export type DeleteCreditMutation = { __typename?: 'Mutation', deleteCredit: { __typename?: 'Credit', guid: string, deletedAt?: string | null } };

export type CreditsByWorkQueryVariables = Exact<{
  workGuid: Scalars['ID']['input'];
}>;


export type CreditsByWorkQuery = { __typename?: 'Query', creditsByWork: Array<{ __typename?: 'Credit', guid: string, instrument?: string | null, notes?: string | null, createdAt: string, updatedAt: string, person: { __typename?: 'Person', guid: string, firstName: string, lastName: string }, role: { __typename?: 'Role', guid: string, name: string } }> };

export type CreateLinkMutationVariables = Exact<{
  workGuid: Scalars['ID']['input'];
  url: Scalars['String']['input'];
  linkType: LinkType;
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateLinkMutation = { __typename?: 'Mutation', createLink: { __typename?: 'Link', guid: string, url: string, linkType: LinkType, description?: string | null, createdAt: string, updatedAt: string } };

export type DeleteLinkMutationVariables = Exact<{
  guid: Scalars['ID']['input'];
}>;


export type DeleteLinkMutation = { __typename?: 'Mutation', deleteLink: { __typename?: 'Link', guid: string, deletedAt?: string | null } };

export type LinksByWorkQueryVariables = Exact<{
  workGuid: Scalars['ID']['input'];
}>;


export type LinksByWorkQuery = { __typename?: 'Query', linksByWork: Array<{ __typename?: 'Link', guid: string, url: string, linkType: LinkType, description?: string | null, createdAt: string, updatedAt: string }> };

export type PeopleQueryVariables = Exact<{ [key: string]: never; }>;


export type PeopleQuery = { __typename?: 'Query', people: Array<{ __typename?: 'Person', guid: string, firstName: string, lastName: string, email?: string | null, createdAt: string, updatedAt: string }> };

export type PersonQueryVariables = Exact<{
  guid: Scalars['ID']['input'];
}>;


export type PersonQuery = { __typename?: 'Query', person?: { __typename?: 'Person', guid: string, firstName: string, lastName: string, email?: string | null, createdAt: string, updatedAt: string } | null };

export type PlacesQueryVariables = Exact<{ [key: string]: never; }>;


export type PlacesQuery = { __typename?: 'Query', places: Array<{ __typename?: 'Place', guid: string, name: string, description?: string | null, city?: string | null, state?: string | null, country?: string | null, createdAt: string, updatedAt: string }> };

export type PlaceQueryVariables = Exact<{
  guid: Scalars['ID']['input'];
}>;


export type PlaceQuery = { __typename?: 'Query', place?: { __typename?: 'Place', guid: string, name: string, description?: string | null, city?: string | null, state?: string | null, country?: string | null, createdAt: string, updatedAt: string } | null };

export type CreateWorkMutationVariables = Exact<{
  title: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateWorkMutation = { __typename?: 'Mutation', createWork: { __typename?: 'Work', guid: string, title: string, description?: string | null, createdAt: string, updatedAt: string } };

export type UpdateWorkMutationVariables = Exact<{
  guid: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateWorkMutation = { __typename?: 'Mutation', updateWork: { __typename?: 'Work', guid: string, title: string, description?: string | null, updatedAt: string } };

export type DeleteWorkMutationVariables = Exact<{
  guid: Scalars['ID']['input'];
}>;


export type DeleteWorkMutation = { __typename?: 'Mutation', deleteWork: { __typename?: 'Work', guid: string, deletedAt?: string | null } };

export type WorksQueryVariables = Exact<{ [key: string]: never; }>;


export type WorksQuery = { __typename?: 'Query', works: Array<{ __typename?: 'Work', guid: string, title: string, description?: string | null, createdAt: string, updatedAt: string }> };

export type WorkQueryVariables = Exact<{
  guid: Scalars['ID']['input'];
}>;


export type WorkQuery = { __typename?: 'Query', work?: { __typename?: 'Work', guid: string, title: string, description?: string | null, createdAt: string, updatedAt: string, versions: Array<{ __typename?: 'WorkVersion', guid: string, title: string, createdAt: string }>, credits: Array<{ __typename?: 'Credit', guid: string, instrument?: string | null, person: { __typename?: 'Person', guid: string, firstName: string, lastName: string }, role: { __typename?: 'Role', guid: string, name: string } }> } | null };


export const CreateCreditDocument = gql`
    mutation CreateCredit($workGuid: ID!, $personGuid: ID!, $roleGuid: ID!, $instrument: String, $notes: String) {
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
export type CreateCreditMutationFn = Apollo.MutationFunction<CreateCreditMutation, CreateCreditMutationVariables>;

/**
 * __useCreateCreditMutation__
 *
 * To run a mutation, you first call `useCreateCreditMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCreditMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCreditMutation, { data, loading, error }] = useCreateCreditMutation({
 *   variables: {
 *      workGuid: // value for 'workGuid'
 *      personGuid: // value for 'personGuid'
 *      roleGuid: // value for 'roleGuid'
 *      instrument: // value for 'instrument'
 *      notes: // value for 'notes'
 *   },
 * });
 */
export function useCreateCreditMutation(baseOptions?: Apollo.MutationHookOptions<CreateCreditMutation, CreateCreditMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCreditMutation, CreateCreditMutationVariables>(CreateCreditDocument, options);
      }
export type CreateCreditMutationHookResult = ReturnType<typeof useCreateCreditMutation>;
export type CreateCreditMutationResult = Apollo.MutationResult<CreateCreditMutation>;
export type CreateCreditMutationOptions = Apollo.BaseMutationOptions<CreateCreditMutation, CreateCreditMutationVariables>;
export const DeleteCreditDocument = gql`
    mutation DeleteCredit($guid: ID!) {
  deleteCredit(guid: $guid) {
    guid
    deletedAt
  }
}
    `;
export type DeleteCreditMutationFn = Apollo.MutationFunction<DeleteCreditMutation, DeleteCreditMutationVariables>;

/**
 * __useDeleteCreditMutation__
 *
 * To run a mutation, you first call `useDeleteCreditMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCreditMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCreditMutation, { data, loading, error }] = useDeleteCreditMutation({
 *   variables: {
 *      guid: // value for 'guid'
 *   },
 * });
 */
export function useDeleteCreditMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCreditMutation, DeleteCreditMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCreditMutation, DeleteCreditMutationVariables>(DeleteCreditDocument, options);
      }
export type DeleteCreditMutationHookResult = ReturnType<typeof useDeleteCreditMutation>;
export type DeleteCreditMutationResult = Apollo.MutationResult<DeleteCreditMutation>;
export type DeleteCreditMutationOptions = Apollo.BaseMutationOptions<DeleteCreditMutation, DeleteCreditMutationVariables>;
export const CreditsByWorkDocument = gql`
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

/**
 * __useCreditsByWorkQuery__
 *
 * To run a query within a React component, call `useCreditsByWorkQuery` and pass it any options that fit your needs.
 * When your component renders, `useCreditsByWorkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCreditsByWorkQuery({
 *   variables: {
 *      workGuid: // value for 'workGuid'
 *   },
 * });
 */
export function useCreditsByWorkQuery(baseOptions: Apollo.QueryHookOptions<CreditsByWorkQuery, CreditsByWorkQueryVariables> & ({ variables: CreditsByWorkQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CreditsByWorkQuery, CreditsByWorkQueryVariables>(CreditsByWorkDocument, options);
      }
export function useCreditsByWorkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CreditsByWorkQuery, CreditsByWorkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CreditsByWorkQuery, CreditsByWorkQueryVariables>(CreditsByWorkDocument, options);
        }
// @ts-ignore
export function useCreditsByWorkSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CreditsByWorkQuery, CreditsByWorkQueryVariables>): Apollo.UseSuspenseQueryResult<CreditsByWorkQuery, CreditsByWorkQueryVariables>;
export function useCreditsByWorkSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CreditsByWorkQuery, CreditsByWorkQueryVariables>): Apollo.UseSuspenseQueryResult<CreditsByWorkQuery | undefined, CreditsByWorkQueryVariables>;
export function useCreditsByWorkSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CreditsByWorkQuery, CreditsByWorkQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CreditsByWorkQuery, CreditsByWorkQueryVariables>(CreditsByWorkDocument, options);
        }
export type CreditsByWorkQueryHookResult = ReturnType<typeof useCreditsByWorkQuery>;
export type CreditsByWorkLazyQueryHookResult = ReturnType<typeof useCreditsByWorkLazyQuery>;
export type CreditsByWorkSuspenseQueryHookResult = ReturnType<typeof useCreditsByWorkSuspenseQuery>;
export type CreditsByWorkQueryResult = Apollo.QueryResult<CreditsByWorkQuery, CreditsByWorkQueryVariables>;
export const CreateLinkDocument = gql`
    mutation CreateLink($workGuid: ID!, $url: String!, $linkType: LinkType!, $description: String) {
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
export type CreateLinkMutationFn = Apollo.MutationFunction<CreateLinkMutation, CreateLinkMutationVariables>;

/**
 * __useCreateLinkMutation__
 *
 * To run a mutation, you first call `useCreateLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLinkMutation, { data, loading, error }] = useCreateLinkMutation({
 *   variables: {
 *      workGuid: // value for 'workGuid'
 *      url: // value for 'url'
 *      linkType: // value for 'linkType'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateLinkMutation(baseOptions?: Apollo.MutationHookOptions<CreateLinkMutation, CreateLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLinkMutation, CreateLinkMutationVariables>(CreateLinkDocument, options);
      }
export type CreateLinkMutationHookResult = ReturnType<typeof useCreateLinkMutation>;
export type CreateLinkMutationResult = Apollo.MutationResult<CreateLinkMutation>;
export type CreateLinkMutationOptions = Apollo.BaseMutationOptions<CreateLinkMutation, CreateLinkMutationVariables>;
export const DeleteLinkDocument = gql`
    mutation DeleteLink($guid: ID!) {
  deleteLink(guid: $guid) {
    guid
    deletedAt
  }
}
    `;
export type DeleteLinkMutationFn = Apollo.MutationFunction<DeleteLinkMutation, DeleteLinkMutationVariables>;

/**
 * __useDeleteLinkMutation__
 *
 * To run a mutation, you first call `useDeleteLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLinkMutation, { data, loading, error }] = useDeleteLinkMutation({
 *   variables: {
 *      guid: // value for 'guid'
 *   },
 * });
 */
export function useDeleteLinkMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLinkMutation, DeleteLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteLinkMutation, DeleteLinkMutationVariables>(DeleteLinkDocument, options);
      }
export type DeleteLinkMutationHookResult = ReturnType<typeof useDeleteLinkMutation>;
export type DeleteLinkMutationResult = Apollo.MutationResult<DeleteLinkMutation>;
export type DeleteLinkMutationOptions = Apollo.BaseMutationOptions<DeleteLinkMutation, DeleteLinkMutationVariables>;
export const LinksByWorkDocument = gql`
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

/**
 * __useLinksByWorkQuery__
 *
 * To run a query within a React component, call `useLinksByWorkQuery` and pass it any options that fit your needs.
 * When your component renders, `useLinksByWorkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLinksByWorkQuery({
 *   variables: {
 *      workGuid: // value for 'workGuid'
 *   },
 * });
 */
export function useLinksByWorkQuery(baseOptions: Apollo.QueryHookOptions<LinksByWorkQuery, LinksByWorkQueryVariables> & ({ variables: LinksByWorkQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LinksByWorkQuery, LinksByWorkQueryVariables>(LinksByWorkDocument, options);
      }
export function useLinksByWorkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LinksByWorkQuery, LinksByWorkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LinksByWorkQuery, LinksByWorkQueryVariables>(LinksByWorkDocument, options);
        }
// @ts-ignore
export function useLinksByWorkSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LinksByWorkQuery, LinksByWorkQueryVariables>): Apollo.UseSuspenseQueryResult<LinksByWorkQuery, LinksByWorkQueryVariables>;
export function useLinksByWorkSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LinksByWorkQuery, LinksByWorkQueryVariables>): Apollo.UseSuspenseQueryResult<LinksByWorkQuery | undefined, LinksByWorkQueryVariables>;
export function useLinksByWorkSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LinksByWorkQuery, LinksByWorkQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LinksByWorkQuery, LinksByWorkQueryVariables>(LinksByWorkDocument, options);
        }
export type LinksByWorkQueryHookResult = ReturnType<typeof useLinksByWorkQuery>;
export type LinksByWorkLazyQueryHookResult = ReturnType<typeof useLinksByWorkLazyQuery>;
export type LinksByWorkSuspenseQueryHookResult = ReturnType<typeof useLinksByWorkSuspenseQuery>;
export type LinksByWorkQueryResult = Apollo.QueryResult<LinksByWorkQuery, LinksByWorkQueryVariables>;
export const PeopleDocument = gql`
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

/**
 * __usePeopleQuery__
 *
 * To run a query within a React component, call `usePeopleQuery` and pass it any options that fit your needs.
 * When your component renders, `usePeopleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePeopleQuery({
 *   variables: {
 *   },
 * });
 */
export function usePeopleQuery(baseOptions?: Apollo.QueryHookOptions<PeopleQuery, PeopleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PeopleQuery, PeopleQueryVariables>(PeopleDocument, options);
      }
export function usePeopleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PeopleQuery, PeopleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PeopleQuery, PeopleQueryVariables>(PeopleDocument, options);
        }
// @ts-ignore
export function usePeopleSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PeopleQuery, PeopleQueryVariables>): Apollo.UseSuspenseQueryResult<PeopleQuery, PeopleQueryVariables>;
export function usePeopleSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PeopleQuery, PeopleQueryVariables>): Apollo.UseSuspenseQueryResult<PeopleQuery | undefined, PeopleQueryVariables>;
export function usePeopleSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PeopleQuery, PeopleQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PeopleQuery, PeopleQueryVariables>(PeopleDocument, options);
        }
export type PeopleQueryHookResult = ReturnType<typeof usePeopleQuery>;
export type PeopleLazyQueryHookResult = ReturnType<typeof usePeopleLazyQuery>;
export type PeopleSuspenseQueryHookResult = ReturnType<typeof usePeopleSuspenseQuery>;
export type PeopleQueryResult = Apollo.QueryResult<PeopleQuery, PeopleQueryVariables>;
export const PersonDocument = gql`
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

/**
 * __usePersonQuery__
 *
 * To run a query within a React component, call `usePersonQuery` and pass it any options that fit your needs.
 * When your component renders, `usePersonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePersonQuery({
 *   variables: {
 *      guid: // value for 'guid'
 *   },
 * });
 */
export function usePersonQuery(baseOptions: Apollo.QueryHookOptions<PersonQuery, PersonQueryVariables> & ({ variables: PersonQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PersonQuery, PersonQueryVariables>(PersonDocument, options);
      }
export function usePersonLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PersonQuery, PersonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PersonQuery, PersonQueryVariables>(PersonDocument, options);
        }
// @ts-ignore
export function usePersonSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PersonQuery, PersonQueryVariables>): Apollo.UseSuspenseQueryResult<PersonQuery, PersonQueryVariables>;
export function usePersonSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PersonQuery, PersonQueryVariables>): Apollo.UseSuspenseQueryResult<PersonQuery | undefined, PersonQueryVariables>;
export function usePersonSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PersonQuery, PersonQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PersonQuery, PersonQueryVariables>(PersonDocument, options);
        }
export type PersonQueryHookResult = ReturnType<typeof usePersonQuery>;
export type PersonLazyQueryHookResult = ReturnType<typeof usePersonLazyQuery>;
export type PersonSuspenseQueryHookResult = ReturnType<typeof usePersonSuspenseQuery>;
export type PersonQueryResult = Apollo.QueryResult<PersonQuery, PersonQueryVariables>;
export const PlacesDocument = gql`
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

/**
 * __usePlacesQuery__
 *
 * To run a query within a React component, call `usePlacesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlacesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlacesQuery({
 *   variables: {
 *   },
 * });
 */
export function usePlacesQuery(baseOptions?: Apollo.QueryHookOptions<PlacesQuery, PlacesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlacesQuery, PlacesQueryVariables>(PlacesDocument, options);
      }
export function usePlacesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlacesQuery, PlacesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlacesQuery, PlacesQueryVariables>(PlacesDocument, options);
        }
// @ts-ignore
export function usePlacesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PlacesQuery, PlacesQueryVariables>): Apollo.UseSuspenseQueryResult<PlacesQuery, PlacesQueryVariables>;
export function usePlacesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PlacesQuery, PlacesQueryVariables>): Apollo.UseSuspenseQueryResult<PlacesQuery | undefined, PlacesQueryVariables>;
export function usePlacesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PlacesQuery, PlacesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PlacesQuery, PlacesQueryVariables>(PlacesDocument, options);
        }
export type PlacesQueryHookResult = ReturnType<typeof usePlacesQuery>;
export type PlacesLazyQueryHookResult = ReturnType<typeof usePlacesLazyQuery>;
export type PlacesSuspenseQueryHookResult = ReturnType<typeof usePlacesSuspenseQuery>;
export type PlacesQueryResult = Apollo.QueryResult<PlacesQuery, PlacesQueryVariables>;
export const PlaceDocument = gql`
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

/**
 * __usePlaceQuery__
 *
 * To run a query within a React component, call `usePlaceQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlaceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlaceQuery({
 *   variables: {
 *      guid: // value for 'guid'
 *   },
 * });
 */
export function usePlaceQuery(baseOptions: Apollo.QueryHookOptions<PlaceQuery, PlaceQueryVariables> & ({ variables: PlaceQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlaceQuery, PlaceQueryVariables>(PlaceDocument, options);
      }
export function usePlaceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlaceQuery, PlaceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlaceQuery, PlaceQueryVariables>(PlaceDocument, options);
        }
// @ts-ignore
export function usePlaceSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PlaceQuery, PlaceQueryVariables>): Apollo.UseSuspenseQueryResult<PlaceQuery, PlaceQueryVariables>;
export function usePlaceSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PlaceQuery, PlaceQueryVariables>): Apollo.UseSuspenseQueryResult<PlaceQuery | undefined, PlaceQueryVariables>;
export function usePlaceSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PlaceQuery, PlaceQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PlaceQuery, PlaceQueryVariables>(PlaceDocument, options);
        }
export type PlaceQueryHookResult = ReturnType<typeof usePlaceQuery>;
export type PlaceLazyQueryHookResult = ReturnType<typeof usePlaceLazyQuery>;
export type PlaceSuspenseQueryHookResult = ReturnType<typeof usePlaceSuspenseQuery>;
export type PlaceQueryResult = Apollo.QueryResult<PlaceQuery, PlaceQueryVariables>;
export const CreateWorkDocument = gql`
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
export type CreateWorkMutationFn = Apollo.MutationFunction<CreateWorkMutation, CreateWorkMutationVariables>;

/**
 * __useCreateWorkMutation__
 *
 * To run a mutation, you first call `useCreateWorkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWorkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWorkMutation, { data, loading, error }] = useCreateWorkMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateWorkMutation(baseOptions?: Apollo.MutationHookOptions<CreateWorkMutation, CreateWorkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateWorkMutation, CreateWorkMutationVariables>(CreateWorkDocument, options);
      }
export type CreateWorkMutationHookResult = ReturnType<typeof useCreateWorkMutation>;
export type CreateWorkMutationResult = Apollo.MutationResult<CreateWorkMutation>;
export type CreateWorkMutationOptions = Apollo.BaseMutationOptions<CreateWorkMutation, CreateWorkMutationVariables>;
export const UpdateWorkDocument = gql`
    mutation UpdateWork($guid: ID!, $title: String, $description: String) {
  updateWork(guid: $guid, title: $title, description: $description) {
    guid
    title
    description
    updatedAt
  }
}
    `;
export type UpdateWorkMutationFn = Apollo.MutationFunction<UpdateWorkMutation, UpdateWorkMutationVariables>;

/**
 * __useUpdateWorkMutation__
 *
 * To run a mutation, you first call `useUpdateWorkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWorkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWorkMutation, { data, loading, error }] = useUpdateWorkMutation({
 *   variables: {
 *      guid: // value for 'guid'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useUpdateWorkMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWorkMutation, UpdateWorkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateWorkMutation, UpdateWorkMutationVariables>(UpdateWorkDocument, options);
      }
export type UpdateWorkMutationHookResult = ReturnType<typeof useUpdateWorkMutation>;
export type UpdateWorkMutationResult = Apollo.MutationResult<UpdateWorkMutation>;
export type UpdateWorkMutationOptions = Apollo.BaseMutationOptions<UpdateWorkMutation, UpdateWorkMutationVariables>;
export const DeleteWorkDocument = gql`
    mutation DeleteWork($guid: ID!) {
  deleteWork(guid: $guid) {
    guid
    deletedAt
  }
}
    `;
export type DeleteWorkMutationFn = Apollo.MutationFunction<DeleteWorkMutation, DeleteWorkMutationVariables>;

/**
 * __useDeleteWorkMutation__
 *
 * To run a mutation, you first call `useDeleteWorkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWorkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWorkMutation, { data, loading, error }] = useDeleteWorkMutation({
 *   variables: {
 *      guid: // value for 'guid'
 *   },
 * });
 */
export function useDeleteWorkMutation(baseOptions?: Apollo.MutationHookOptions<DeleteWorkMutation, DeleteWorkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteWorkMutation, DeleteWorkMutationVariables>(DeleteWorkDocument, options);
      }
export type DeleteWorkMutationHookResult = ReturnType<typeof useDeleteWorkMutation>;
export type DeleteWorkMutationResult = Apollo.MutationResult<DeleteWorkMutation>;
export type DeleteWorkMutationOptions = Apollo.BaseMutationOptions<DeleteWorkMutation, DeleteWorkMutationVariables>;
export const WorksDocument = gql`
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

/**
 * __useWorksQuery__
 *
 * To run a query within a React component, call `useWorksQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorksQuery({
 *   variables: {
 *   },
 * });
 */
export function useWorksQuery(baseOptions?: Apollo.QueryHookOptions<WorksQuery, WorksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WorksQuery, WorksQueryVariables>(WorksDocument, options);
      }
export function useWorksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WorksQuery, WorksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WorksQuery, WorksQueryVariables>(WorksDocument, options);
        }
// @ts-ignore
export function useWorksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<WorksQuery, WorksQueryVariables>): Apollo.UseSuspenseQueryResult<WorksQuery, WorksQueryVariables>;
export function useWorksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<WorksQuery, WorksQueryVariables>): Apollo.UseSuspenseQueryResult<WorksQuery | undefined, WorksQueryVariables>;
export function useWorksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<WorksQuery, WorksQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<WorksQuery, WorksQueryVariables>(WorksDocument, options);
        }
export type WorksQueryHookResult = ReturnType<typeof useWorksQuery>;
export type WorksLazyQueryHookResult = ReturnType<typeof useWorksLazyQuery>;
export type WorksSuspenseQueryHookResult = ReturnType<typeof useWorksSuspenseQuery>;
export type WorksQueryResult = Apollo.QueryResult<WorksQuery, WorksQueryVariables>;
export const WorkDocument = gql`
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

/**
 * __useWorkQuery__
 *
 * To run a query within a React component, call `useWorkQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkQuery({
 *   variables: {
 *      guid: // value for 'guid'
 *   },
 * });
 */
export function useWorkQuery(baseOptions: Apollo.QueryHookOptions<WorkQuery, WorkQueryVariables> & ({ variables: WorkQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WorkQuery, WorkQueryVariables>(WorkDocument, options);
      }
export function useWorkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WorkQuery, WorkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WorkQuery, WorkQueryVariables>(WorkDocument, options);
        }
// @ts-ignore
export function useWorkSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<WorkQuery, WorkQueryVariables>): Apollo.UseSuspenseQueryResult<WorkQuery, WorkQueryVariables>;
export function useWorkSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<WorkQuery, WorkQueryVariables>): Apollo.UseSuspenseQueryResult<WorkQuery | undefined, WorkQueryVariables>;
export function useWorkSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<WorkQuery, WorkQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<WorkQuery, WorkQueryVariables>(WorkDocument, options);
        }
export type WorkQueryHookResult = ReturnType<typeof useWorkQuery>;
export type WorkLazyQueryHookResult = ReturnType<typeof useWorkLazyQuery>;
export type WorkSuspenseQueryHookResult = ReturnType<typeof useWorkSuspenseQuery>;
export type WorkQueryResult = Apollo.QueryResult<WorkQuery, WorkQueryVariables>;