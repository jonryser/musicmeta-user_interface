import React from 'react'
import { NextPage } from 'next'
import { useQuery } from '@apollo/react-hooks';
import MainCanvasProps from './MainCanvasProps'
// Content.
import ROLES_QUERY from './../../../graphql/roles.query'

const MainCanvas: NextPage<MainCanvasProps> = ({ some }) => {
    // Create a query hook
    const { data, loading, error } = useQuery(ROLES_QUERY);

    if (loading) return <p>Loading...</p>

    if (error) return <p>Error: {JSON.stringify(error)}</p>

    const roles = data.roles.map(role => {
        return role.name ? <li key={`job__${role.guid}`}><h2>{role.name}</h2>{role.description}</li> : null
    })

    return (
        <main>
            <h1>Roles</h1>
            <ul>{roles}</ul>
        </main>
    )
}

export default MainCanvas
