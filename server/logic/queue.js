const players = []

const addInQueue = (player) => {
    const isPlayerAlreadyIn = players.includes(player)

    if (isPlayerAlreadyIn) {
        return { error: `${player} already in queue.` }
    }
    
    players.push(player)
    
    console.log(players)
    return { message: 'Succesfully joined in queue.' }
}

const removeFromQueue = (player) => {
    const index = players.find((pl) => pl === player)

    if (index !== -1) {
        players.splice(index, 1)[0]
        return { message: `Succesfully removed ${player} from queue.` }
    }

    return { error: `Player ${player} was not in queue.` }
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