import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const client = new ApolloClient({
    link: createHttpLink({
        uri: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api',
    }),
    cache: new InMemoryCache(),
});

export default client;
