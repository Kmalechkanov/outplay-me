import React, { useContext } from 'react'
import UserContext from '../../Context'
import PageLayout from '../../components/page-layout'
import Queue from '../../components/queue'
import Title from '../../components/title'
import Split from '../../components/split'
import styles from './index.module.css'

const Home = () => {
    const { user } = useContext(UserContext)

    return (
        <PageLayout>
            <div className={styles.wrapper}>
                <div className={styles.center}>
                    <Title title={'OutPlayMe!'} />
                    <h2>This is simple mupltiplayer game build with React with express servers for backend.</h2>
                    <h3>- for 2 players -</h3>
                    <div>
                        <h2>In-Game</h2>
                        <Split first={'- press/hold \'a\' for left'} second={'- press/hold \'d\' for right'} />
                    </div>

                    {user.loggedIn
                        ? <Queue />
                        : <p>You need to be logged in to start a game!</p>
                    }
                </div>
            </div>
        </PageLayout>
    )
}

export default Home