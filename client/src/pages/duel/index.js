import React, { useState, useContext, useEffect, useRef } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import io from 'socket.io-client'

import { ServerUrl } from '../../Constants'
import UserContext from '../../Context'
import useInterval from '../../hooks/useInterval'
import PageLayout from '../../components/page-layout'
import styles from './index.module.css'

let socket

const Duel = () => {
    const canvasRef = useRef()
    const [firstPlayer, setFirstPlayer] = useState(null)
    const [secondPlayer, setSecondPlayer] = useState(null)

    const keyState = {}

    const params = useParams()
    const userContext = useContext(UserContext)
    const userId = userContext.user.id
    const duelId = params.id

    const ENDPOINT = ServerUrl

    useEffect(() => {
        socket = io(ENDPOINT)

        socket.on('move', (player) => {
            console.log(player)
        })
    }, [])

    useInterval(() => gameLoop(), 100)

    const keyDownEvent = (e) => {
        if (e.key == 'a' || e.key == 'd') {
            keyState[e.key] = true;
        }
    }

    const keyUpEvent = (e) => {
        if (e.key == 'a' || e.key == 'd') {
            keyState[e.key] = false;
        }
    }

    const gameLoop = () => {
        if (Object.values(keyState).includes(true)) {
            socket.emit('move', { duelId, player: userId, keyState }, (error) => {
                console.log('Error', error)
            })
        }
    }

    return (
        <PageLayout>
            <div onKeyDown={keyDownEvent} onKeyUp={keyUpEvent}>
                <canvas
                    style={{ border: "1px solid black" }}
                    ref={canvasRef}
                    width={`${500}px`}
                    height={`${1000}px`}
                />
            </div>
        </PageLayout>
    )
}

export default Duel