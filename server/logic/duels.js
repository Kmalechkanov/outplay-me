const { move } = require("../router")

const players = []

const addDuel = ({ id, firstPlayer, secondPlayer }) => {
    if (!firstPlayer || !secondPlayer || !id) {
        return { error: 'Players and duel are required.' }
    }

    const userAlreadyInDuel = players.find((player) => player.id === firstPlayer || player.id === secondPlayer)

    if (userAlreadyInDuel) {
        return { error: 'One of the players is already in game!' }
    }

    let player = {
        id: firstPlayer,
        duelId: id,
        y: 250
    }
    players.push(player)

    player = {
        id: secondPlayer,
        duelId: id,
        y: 250
    }
    players.push(player)

    console.log(players)

    return { player }
}

const removePlayer = (id) => {
    const index = players.infexOf((player) => player.id === id)

    if (index !== -1) {
        return duels.splice(index, 1)[0]
    }
}

const removeDuel = (id) => {
    const players = players.map((player) => player.duelId === id)

    if (player.lenght === 2) {
        removePlayer(players[0].id)
        removePlayer(players[1].id)
    }
}

const getUser = (id) => {
    const user = players.indexOf((player) => player.id === id)

    if (user === -1) {
        return null
    }

    return user
}

const getDuel = (id) => {
    const players = players.map((player) => player.duelId === id)

    return players
}

const movePlayer = (id, way) => {
    const playerIndex = players.infexOf((player) => player.id === id)

    if (player == null) {
        return { success: false }
    }

    move = way == 'left' ? -1 : +1
    const newY = players[playerIndex].y += move

    if (newY < 0 || newY > 500) {
        return { success: false }
    }

    players[playerIndex].y += move
    return {
        success: true,
        player: players[playerIndex]
    }
}

module.exports = {
    addDuel,
    removeDuel,
    getUser,
    getDuel,
    movePlayer
}