const duels = []

const addDuel = ({ id, firstPlayer, secondPlayer }) => {
    if (!firstPlayer || !secondPlayer || !id) {
        return { error: 'Players and room are required.' }
    }
    
    const userAlreadyInDuel = duels.find((duel) => duel.firstPlayer === firstPlayer ||   duel.secondPlayer === secondPlayer)
    
    if (userAlreadyInDuel) {
        return { error: 'One of the players is already in game!' }
    }
    
    const duel = {
        id,
        firstPlayer,
        secondPlayer
    }
    
    duels.push(duel)
    console.log(duels)

    return { duel }
}

const removeDuel = (id) => {
    const index = duels.find((duel) => duel.id === id)

    if (index !== -1) {
        return duels.splice(index, 1)[0]
    }
}

const getUser = (player) => {
    const user = duels.find((duel) => duel.firstPlayer === player)

    if (user === -1) {
        user = duels.find((duel) => duel.secondPlayer === player)
    }

    return user
}

const getDuel = (id) => duels.find((duel) => duel.id == id)

module.exports = {
    addDuel,
    removeDuel,
    getUser,
    getDuel
}