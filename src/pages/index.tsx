import React from 'react'
import { NextPage } from 'next'
import Head from './../components/Head'
import MainCanvas from './../components/MainCanvas'
// Content.
import { pageTags } from './../constants/PageTags'
import { INDEX } from './../constants/labels'

interface IndexProps {
    root: string
}

const MetaMusicIndex: NextPage<IndexProps> = ({ root }): React.ReactElement => {
    return (
        <>
            <Head data={{ title: INDEX.PAGE_TITLE }} default={pageTags} root={root} />
            <MainCanvas />
        </>
    )
}

MetaMusicIndex.getInitialProps = async (ctx) => {
    if (ctx.req) {

        console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SERVER SIDE`)
    } else {

        console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CLIENT SIDE`)
    }
    return { root: `` }
}

export default MetaMusicIndex
