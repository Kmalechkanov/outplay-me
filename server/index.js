const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const cors = require('cors')

const { v4: uuidv4 } = require('uuid')
const config = require('config')

const PORT = config.get('Port')

const { addDuel, removeDuel, getDuel, getDuels, moveBall, getUser, movePlayer } = require('./logic/duels')
const { addInQueue, removeFromQueue, getTwoPlayers } = require('./logic/queue')

const router = require('./router')
const { move } = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(cors())
app.use(router)

var globalInterval = setInterval(function () {
    const duels = getDuels()

    duels.forEach(duel => {
        const result = moveBall(duel)

        if (result.scored) {
            io.to(duel).emit('scored', {
                player: result.scored.player,
                score: result.scored.score
            });
        }

        io.to(duel).emit('moveBall', { x: result.ball.x, y: result.ball.y });
    })
}, 16);

io.on('connection', (socket) => {
    console.log('Player connected')

    socket.on('move', ({ duelId, player, keyState }, callback) => {
        socket.join(duelId)
        const response = movePlayer(player, keyState, 10)

        if (!response.success) {
            return
        }

        socket.emit('moveMe', { y: response.player.y })
        socket.to(duelId).emit('move', {
            y: response.player.y
        })
    })

    socket.on('joinQueue', ({ player }, callback) => {
        socket.join('queue')

        const user = getUser(player)

        if (user !== null) {
            socket.emit('joinDuelMe', { duelId: user.duelId })
            return
        }

        const addInQueueResponse = addInQueue(player)

        if (addInQueueResponse.error) {
            return callback(addInQueueResponse.error)
        }

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
        // clearInterval(interval)
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