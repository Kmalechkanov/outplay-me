import React from 'react'
import PageLayout from '../../components/page-layout'

import Queue from '../../components/queue'

const Home = () => {
    return (
        <PageLayout>
            <h1>Some text from Home</h1>
            <Queue/>
        </PageLayout>
    )
}

export default Home