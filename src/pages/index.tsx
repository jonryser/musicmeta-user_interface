import React from 'react'
import { NextPage } from 'next'
import getConfig from 'next/config';
import Head from './../components/Head';
import MainCanvas from './../components/MainCanvas';
// Content.
import { pageTags } from './../constants/PageTags'

// Only holds publicRuntimeConfig from next.config.js nothing else.
const { publicRuntimeConfig } = getConfig();

interface IndexProps {
    root: string;
}

const MetaMusicIndex: NextPage<IndexProps> = ({ root }) => {
    return (
        <>
            <Head data={{ title: 'Meta Music' }} default={pageTags} root={root} />
            <MainCanvas />
        </>
    )
}

MetaMusicIndex.getInitialProps = async (ctx) => {
    if (ctx.req) {
        // tslint:disable-next-line: no-console
        console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SERVER SIDE`)
    } else {
        // tslint:disable-next-line: no-console
        console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CLIENT SIDE`)
    }
    return { root: publicRuntimeConfig.root }
}

export default MetaMusicIndex