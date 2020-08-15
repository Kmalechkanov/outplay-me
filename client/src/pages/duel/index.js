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
    const [firstPlayer, setFirstPlayer] = useState(250)
    const [secondPlayer, setSecondPlayer] = useState(250)
    const [firstPlayerScore, setFirstplayerScore] = useState(0)
    const [secondPlayerScore, setSecondPlayerScore] = useState(0)

    const [ball, setBall] = useState({ x: 500, y: 250 })

    const keyState = {}

    const params = useParams()
    const userContext = useContext(UserContext)
    const userId = userContext.user.id
    const duelId = params.id
    const side = params.side

    const ENDPOINT = ServerUrl

    useEffect(() => {
        socket = io(ENDPOINT)

        socket.on('moveMe', ({ y }) => {
            setFirstPlayer(y)
        })

        socket.on('move', ({ y }) => {
            setSecondPlayer(y)
        })

        socket.on('scored', ({ player, score }) => {
            if (player === userId) {
                setFirstplayerScore(score)
            }
            else {
                setSecondPlayerScore(score)
            }
        })

        socket.on('moveBall', ({ x, y }) => {
            console.log({ x, y })
            if (side == 'up') {
                setBall({ x: 1000 - x, y })
            }
            else {
                setBall({ x, y })
            }
        })
    }, [])

    useInterval(() => gameLoop(), 16)

    const keyDownEvent = (e) => {
        if (e.key == 'a' || e.key == 'd') {
            keyState[e.key] = true
        }
    }

    const keyUpEvent = (e) => {
        if (e.key == 'a' || e.key == 'd') {
            keyState[e.key] = false
        }
    }

    const gameLoop = () => {
        if (Object.values(keyState).includes(true)) {
            socket.emit('move', { duelId, player: userId, keyState }, (error) => {
                console.log('Error', error)
            })
        }
    }

    useEffect(() => {
        const context = canvasRef.current.getContext('2d')
        context.clearRect(0, 0, window.innerWidth, window.innerHeight)
        context.fillStyle = '#0B2545'
        context.fillRect(firstPlayer - 50, 940, 100, 20)
        context.fillRect(secondPlayer - 50, 40, 100, 20)
        context.fillStyle = '#134074';
        context.fillRect(ball.y - 5, ball.x - 5, 10, 10)

    }, [firstPlayer, secondPlayer, ball]);

    return (
        <PageLayout>
            <div onKeyDown={keyDownEvent} onKeyUp={keyUpEvent} tabIndex="0">
                <div>
                    <h2>Scores</h2>
                    <h3>You: {firstPlayerScore} - Enemy: {secondPlayerScore}</h3>
                </div>
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