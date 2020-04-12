import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

/**
 *  _document is only rendered on the server side and not on the client side
 * Event handlers like onClick can't be added to this file.
 */

export default class MyDocument extends Document {

    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <html lang={`en`}>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
