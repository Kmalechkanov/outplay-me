const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const cors = require('cors')

const { v4: uuidv4 } = require('uuid')
const config = require('config')

const PORT = config.get('Port')

const { addDuel, removeDuel, getDuel, getUser } = require('./logic/duels')
const { addInQueue, removeFromQueue, getTwoPlayers } = require('./logic/queue')

const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(cors())
app.use(router)

io.on('connect', (socket) => {
    setInterval(function () {
        socket.emit('queue', 'qksam');
    }, 1000);

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

        const response = addDuel({
            id: uuidv4(),
            firstPlayer: getPlayersResponse.players[0],
            secondPlayer: getPlayersResponse.players[1]
        })

        if (response.error) {
            return callback(response.error)
        }

        //socket.disconnect('queue')
        //socket.join(response.duel)
    })
})



server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})