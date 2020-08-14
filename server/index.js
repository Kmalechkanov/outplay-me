const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const cors = require('cors')

const { v4: uuidv4 } = require('uuid')
const config = require('config')

const PORT = config.get('Port')

const { addDuel, removeDuel, getDuel, getUser, movePlayer } = require('./logic/duels')
const { addInQueue, removeFromQueue, getTwoPlayers } = require('./logic/queue')

const router = require('./router')
const { move } = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(cors())
app.use(router)

io.on('connect', (socket) => {
    console.log('Player connected')

    setInterval(function () {
        socket.emit('queue', 'qksam');
    }, 1000);

    socket.on('move', (duelId, playerId, way, callback) => {
        socket.join(duelId)
        const { success, player } = movePlayer(playerId, way)

        if (success) {
            socket.to('queue').emit('move', player)
        }
    })

    socket.on('joinQueue', (player, callback) => {
        const addInQueueResponse = addInQueue(player)

        if (addInQueueResponse.error) {
            return callback(addInQueueResponse.error)
        }

        socket.join('queue')
        socket.emit('joinQueue', { success: true })

        const getPlayersResponse = getTwoPlayers()
        
        if (getPlayersResponse.error) {
            return callback(getPlayersResponse.error)
        }

        const firstPlayer = getPlayersResponse.players[0]
        const secondPlayer = getPlayersResponse.players[1]
        
        const response = addDuel({
            id: uuidv4(),
            firstPlayer: firstPlayer.id == player ? firstPlayer : secondPlayer,
            secondPlayer: firstPlayer.id == player ? secondPlayer : firstPlayer
        })

        if (response.error) {
            return callback(response.error)
        }

        socket.emit('joinDuelMe', { duelId: response.player.duelId })
        socket.to('queue').emit('joinDuel', {
            duelId: response.player.duelId,
            player: response.player.id
        })
    })

    socket.on('disconnect', () => {
        console.log('Player disconnected')
    })

    socket.on('leaveQueue', (player, callback) => {
        const removeResponse = removeFromQueue(player)

        if (removeResponse.error) {
            return callback(removeResponse.error)
        }

        socket.emit('leaveQueue', { success: true })
    })
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})