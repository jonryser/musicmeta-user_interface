import React from 'react';
import { ApolloClient } from 'apollo-client';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';

import withData from './../utils/apollo-client';

interface NaeAppProps extends AppProps {
    apollo: ApolloClient<any>;
}

function NaeApp({ Component, pageProps, apollo }: NaeAppProps) {
    return (
        <ApolloProvider client={apollo}>
            <Component {...pageProps} />
        </ApolloProvider>
    );
}

// Wraps all components in the tree with the data provider
export default withData(NaeApp);