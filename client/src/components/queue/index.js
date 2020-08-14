import React, { useState, useRef, useEffect, useCallback, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import io from 'socket.io-client'

import { ServerUrl } from '../../Constants'
import UserContext from '../../Context'
import Button from '../../components/button'

let socket

const Queue = () => {
    const [timer, setTimer] = useState(0)
    const [trigger, setTrigger] = useState(false)

    let history = useHistory()
    const userContext = useContext(UserContext)
    const user = userContext.user

    const ENDPOINT = ServerUrl

    useEffect(() => {
        socket = io(ENDPOINT)

        socket.on('joinQueue', ({ success }) => {
            if (success) {
                setTrigger(true)
            }
        })

        socket.on('leaveQueue', ({ success }) => {
            if (success) {
                setTrigger(false)
                setTimer(0)
            }
        })

        socket.on('joinDuelMe', ({ duelId }) => {
            console.log('Duel:', duelId)

            socket.disconnect()
            history.push(`/duel/${duelId}`)
        })

        socket.on('joinDuel', ({ duelId, player }) => {
            console.log('Player:', player)
            console.log('Duel:', duelId)

            if (player == user.id) {
                socket.disconnect()
                history.push(`/duel/${duelId}`)
            }
        })
    }, [])

    useEffect(() => {
        if (!trigger) {
            return
        }

        const timeout = setTimeout(() => {
            setTimer(timer + 1)
        }, 1000)

        return () => {
            clearTimeout(timeout)
        }
    }, [timer, trigger])

    const joinQueueEvent = (event) => {
        event.preventDefault()
        socket.emit('joinQueue', { player: user.id }, (error) => {
            if (error) {
                console.log(error)
            }
        })
    }

    const leaveQueue = () => {
        socket.emit('leaveQueue', { player: user.id }, (error) => {
            if (error) {
                console.log(error)
            }
        })
    }

    const leaveQueueEvent = (event) => {
        event.preventDefault()
    }

    return (
        <div>
            <div>{timer}</div>
            {trigger
                ? <Button text='Stop Queue' onClick={leaveQueueEvent} />
                : <Button text='Join Queue' onClick={joinQueueEvent} />
            }
        </div>
    )
}

export default Queue