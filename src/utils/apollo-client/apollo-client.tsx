import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const client = new ApolloClient({
    link: createHttpLink({
        uri: process.env.GRAPHQL_URL,
    }),
    cache: new InMemoryCache(),
});

export default client;
