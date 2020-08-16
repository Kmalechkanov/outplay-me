import React, { useState, useContext, useEffect } from 'react'
import UserContext from '../../Context'
import PageLayout from '../../components/page-layout'
import Split from '../../components/split'

import { ServerUrl } from '../../Constants'
import styles from './index.module.css'

const Profile = () => {
    const [stats, setStats] = useState({ wins: 0, loses: 0 })
    const [duels, setDuels] = useState([])

    const { user } = useContext(UserContext)

    const FetchData = async () => {
        const statsResponse = await fetch(ServerUrl + 'stats/user/' + user.id)
            .then(r => r.json())

        setStats(statsResponse)

        const duelsResponse = await fetch(ServerUrl + 'duels/user/' + user.id)
            .then(r => r.json())

        setDuels(duelsResponse.duel)
    }

    useEffect(() => {
        FetchData()
    }, [])

    return (
        <PageLayout>
            <div className={styles.wrapper}>
                <div className={styles.mainWrapper}>
                    <h1>UserInfo</h1>
                    <div>
                        <Split first={'Username:'} second={user.username} />
                        <Split first={'Email:'} second={user.email} />
                        <Split first={'Id:'} second={user.id} />
                    </div>
                </div>
                <div className={styles.mainWrapper}>
                    <h1>Statistics</h1>
                    <div>
                        <Split first={'Wins:'} second={stats.wins} />
                        <Split first={'Loses:'} second={stats.loses} />
                    </div>
                </div>
                <div className={styles.mainWrapper}>
                    <h1>Match history</h1>
                    <div>
                        {
                            duels.map(duel => {
                                return (
                                    <h2 key={duel._id}>{duel.winnerScore} - {duel.winner.username} vs {duel.loser.username} - {duel.loserScore}</h2>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}

export default Profile