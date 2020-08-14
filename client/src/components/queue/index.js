import React, { useState, useRef, useEffect, useCallback, useContext } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import { ServerUrl } from '../../Constants'
import UserContext from '../../Context'
import Button from '../../components/button'

let socket

const Queue = () => {
    const [timer, setTimer] = useState(0)
    const [trigger, setTrigger] = useState(false)

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
            console.log('been here')
            if (success) {
                setTrigger(false)
                setTimer(0)
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

    const joinQueue = (event) => {
        event.preventDefault()

        
        socket.emit('joinQueue', { player: user.id }, (error) => {
            if (error) {
                console.log(error)
            }
        })
    }

    const leaveQueue = (event) => {
        event.preventDefault()

        socket.emit('leaveQueue', { player: user.id }, (error) => {
            if (error) {
                console.log(error)
            }
        })
    }

    return (
        <div>
            <div>{timer}</div>
            {trigger
                ? <Button text='Stop Queue' onClick={leaveQueue} />
                : <Button text='Join Queue' onClick={joinQueue} />
            }
        </div>
    )
}

export default Queue