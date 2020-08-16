const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const socketio = require('socket.io')
const cors = require('cors')

const { v4: uuidv4 } = require('uuid')
const config = require('config')

const PORT = config.get('Port')

const { addDuel, duelExists, removeDuel, getDuel, getBall, getDuels, moveBall, getUser, movePlayer } = require('./logic/duels')
const { addInQueue, removeFromQueue, getTwoPlayers } = require('./logic/queue')

const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const winScore = 1

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(router)

const db = require('./models')
const Duel = db.duel
const connectionStirng = config.get('Mongoose.connectionString')

db.mongoose.connect(connectionStirng, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connect to MongoDB.")
}).catch(err => {
    console.error("Connection error", err)
    process.exit()
})

var globalInterval = setInterval(function () {
    const duels = getDuels()

    duels.forEach(duel => {
        const result = moveBall(duel)

        if (result.scored) {
            io.to(duel).emit('scored', {
                player: result.scored.player,
                score: result.scored.score
            })

            if (result.scored.score === winScore) {
                const { players } = removeDuel(duel)

                const winner = players[0].score === winScore ? players[0].id : players[1].id
                const loser = players[0].score !== winScore ? players[0].id : players[1].id
                const loserScore = players[0].score === winScore ? players[1].score : players[0].score

                io.to(duel).emit('endGame', {
                    winner,
                    loser
                })

                const duelModel = new Duel({ winner, loser, winnerScore: winScore, loserScore })
                duelModel.save()
            }
        }

        io.to(duel).emit('moveBall', { x: result.ball.x, y: result.ball.y })
    })
}, 16)

io.on('connection', (socket) => {
    console.log('Player connected')

    socket.on('getInTouch', ({ duel }, callback) => {
        socket.join(duel)
        const duelResponse = getDuel(duel)
        const ballReponse = getBall(duel)

        if (duelExists(duel)) {
            socket.emit('getInTouch', { duel: duelResponse, ball: ballReponse })
        }
    })

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
            socket.emit('joinDuelMe', { duelId: user.duelId, side: user.side })
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