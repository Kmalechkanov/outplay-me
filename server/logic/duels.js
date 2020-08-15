const players = []
const balls = []

const func = () => (setInterval(function () {
   console.log('Players', players)
   console.log('Balls', balls)
}, 1000))

func();

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
        y: 250,
        score: 0,
        side: 'up'
    }
    players.push(player)

    player = {
        id: secondPlayer,
        duelId: id,
        y: 250,
        score: 0,
        side: 'down'
    }

    players.push(player)

    const ball = {
        id: id,
        x: 500,
        y: 250,
        velocityX: 3,
        velocityY: 3,
    }
    balls.push(ball)

    console.log(players)

    return { player }
}

const duelExists = (id) => {
    return players.findIndex((player) => player.duelId == id) !== -1
}

const setScore = (id) => {
    const index = players.findIndex((player) => player.id === id)

    players[index].score++

    return players[index].score
}

const setScoreByOponent = (id) => {
    const duel = players.find((player) => player.id === id).duelId

    const index = players.findIndex((player) => player.id !== id && player.duelId === duel)
    players[index].score++

    return { player: players[index].id, score: players[index].score }
}

const getBall = (id) => {
    const index = balls.findIndex((ball) => ball.id === id)

    if (index === -1) {
        return { x: 500, y: 250 }
    }

    return { x: balls[index].x, y: balls[index].y }
}

const moveBall = (id) => {
    const index = balls.findIndex((ball) => ball.id === id)

    if (index === -1) {
        return { error: 'Invalid duel!' }
    }

    balls[index].x += balls[index].velocityX
    balls[index].y += balls[index].velocityY

    if (balls[index].y < 5 && balls[index].velocityY < 0
        || balls[index].y > 495 && balls[index].velocityY > 0) {
        balls[index].velocityY *= -1
    }

    if (balls[index].x < 65 && balls[index].x > 45) {
        const player = players.filter((pl) => pl.duelId === id)[0]
        if (player.y - 50 < balls[index].y - 5 && player.y + 50 > balls[index].y + 5) {
            balls[index].velocityX *= -1
        }
    }

    if (balls[index].x > 935 && balls[index].x < 955) {
        const player = players.filter((pl) => pl.duelId === id)[1]
        if (player.y - 50 < balls[index].y - 5 && player.y + 50 > balls[index].y + 5) {
            balls[index].velocityX *= -1
        }
    }

    if (balls[index].x < 5) {
        const player = players.filter((pl) => pl.duelId === id)[0]

        balls[index].y = player.y
        balls[index].x = 100

        const result = setScoreByOponent(player.id)

        return {
            scored: { player: result.player, score: result.score },
            ball: { x: balls[index].x, y: balls[index].y }
        }
    }

    if (balls[index].x > 995) {
        const player = players.filter((pl) => pl.duelId === id)[1]

        balls[index].y = player.y
        balls[index].x = 900

        const result = setScoreByOponent(player.id)

        return {
            scored: { player: result.player, score: result.score },
            ball: { x: balls[index].x, y: balls[index].y }
        }
    }

    return { ball: { x: balls[index].x, y: balls[index].y } }
}

const removePlayer = (id) => {
    const index = players.findIndex((player) => player.id === id)

    if (index !== -1) {
        players.splice(index, 1)[0]
    }
}

const removeBall = (id) => {
    const index = balls.findIndex((ball) => ball.id === id)
    if (index !== -1) {
        balls.splice(index, 1)[0]
    }
}

const removeDuel = (id) => {
    const twoPlayers = players.filter((player) => player.duelId === id)

    if (twoPlayers.length === 2) {
        removePlayer(twoPlayers[0].id)
        removePlayer(twoPlayers[1].id)
        removeBall(id)
    }
    
    return { players: twoPlayers }
}

const getUser = (id) => {
    const index = players.findIndex((player) => player.id === id)

    if (index === -1) {
        return null
    }

    return players[index]
}

const getDuels = () => {
    const duels = Array.from(
        new Set(
            players.map((player) => player.duelId)
        )
    )

    return duels
}

const getDuel = (id) => {
    const duel = players.filter((player) => player.duelId === id)
    return duel
}

const movePlayer = (id, keyState, speed) => {
    const playerIndex = players.findIndex((player) => player.id === id)

    if (playerIndex === -1) {
        return { success: false }
    }

    const move = keyState.a ? -1 * speed : +1 * speed

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
    duelExists,
    moveBall,
    removeDuel,
    getUser,
    getDuel,
    getBall,
    getDuels,
    movePlayer
}