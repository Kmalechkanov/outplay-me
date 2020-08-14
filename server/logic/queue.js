const players = []

const addInQueue = (player) => {
    const playerAlreadyInQueue = players.includes(player)
    
    if (playerAlreadyInQueue) {
        return { error: `${player} already in queue.` }
    }
    
    players.push(player)
    
    console.log(players)
    return { message: 'Succesfully joined in queue.' }
}

const removeFromQueue = (player) => {
    const index = players.find(player)

    if (index !== -1) {
        return players.splice(index, 1)[0]
    }
}

const getTwoPlayers = () => {
    if (players.length < 2) {
        return { error: 'Not enough players!' }
    }

    const twoPlayers = players.splice(0, 2)
    return { players: twoPlayers }
}

module.exports = {
    addInQueue,
    removeFromQueue,
    getTwoPlayers,
}