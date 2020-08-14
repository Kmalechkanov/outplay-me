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
    const index = players.findIndex((player) => player.id === id)

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
    const index = players.findIndex((player) => player.id === id)

    if (index === -1) {
        return null
    }

    return players[index]
}

const getDuel = (id) => {
    const players = players.map((player) => player.duelId === id)

    return players
}

const movePlayer = (id, keyState, speed) => {
    const playerIndex = players.findIndex((player) => player.id === id)

    if (playerIndex === -1) {
        return { success: false }
    }

    const move = keyState.a ? -1*speed : +1*speed

    const newY = players[playerIndex].y += move

    if (newY < 50 || newY > 450) {
        return { success: false }
    }

    players[playerIndex].y = newY
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