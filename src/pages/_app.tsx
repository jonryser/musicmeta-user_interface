import React from 'react';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { SessionProvider } from 'next-auth/react';

import client from './../utils/apollo-client';

function NaeApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <SessionProvider session={session}>
            <ApolloProvider client={client}>
                <Component {...pageProps} />
            </ApolloProvider>
        </SessionProvider>
    );
}

export default NaeApp;
