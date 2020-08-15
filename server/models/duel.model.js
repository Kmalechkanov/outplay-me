const mongoose = require('mongoose')

const Duel = mongoose.model(
    'Duel',
    new mongoose.Schema({
        winner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        loser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        winnerScore: {
            type: Number
        },
        loserScore: {
            type: Number
        }
    })
)

module.exports = Duel