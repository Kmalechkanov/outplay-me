import React, { useState, useRef, useEffect, useCallback, useContext } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import UserContext from '../../Context'
import Button from '../../components/button'

let socket

const Queue = () => {
    const [timer, setTimer] = useState(0)
    const [trigger, setTrigger] = useState(false)

    const userContext = useContext(UserContext)
    const user = userContext.user

    const ENDPOINT = 'localhost:5000'

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

        setTrigger(!trigger)

        socket = io(ENDPOINT)
        socket.emit('joinQueue', { player: user.id }, (error) => {
            if (error) {
                alert(error)
            }
        })

        socket.on('joinQueue', ({ success }) => {
            console.log(success)
        })

        socket.on('foundGame', ({ success }) => {
            console.log(success)
        })
    }

    return (
        <div>
            <div>{timer}</div>
            <Button text='Join Queue' onClick={joinQueue} />
        </div>
    )
}

export default Queue