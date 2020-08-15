const express = require('express')
const db = require("./models");
const { duel } = require('./models');
const duels = require('./logic/duels');
const User = db.user
const Duel = db.duel

const router = express.Router();

router.get('/', (req, res) => {
    res.send({ response: 'Server is up and running.' }).status(200)
})

router.get('/duel/:id', (req, res) => {
    Duel.findOne({ _id: req.params.id })
        .populate('winner', 'username')
        .populate('loser', 'username')
        .exec((err, duel) => {
            if (err) {
                res.status(500).send({ message: err })
                return
            }

            console.log(duel)

            if (!duel) {
                return res.status(404).send({ message: 'Duel Not found.' })
            }

            res.status(200).send({
                id: duel._id,
                winner: duel.winner.username,
                loser: duel.loser.username,
                winnerScore: duel.winnerScore,
                loserScore: duel.loserScore
            })
        })
})

router.post('/duel', (req, res) => {
    const { winner, loser, winnerScore, loserScore } = req.body
    const duel = new Duel({ winner, loser, winnerScore, loserScore })
    duel.save()

    res.send().status(200)
})

router.get('/duels/user/:id', (req, res) => {
    Duel.find({ $or: [{ 'winner': req.params.id }, { 'loser': req.params.id }] })
        .populate('winner', 'username')
        .populate('loser', 'username')
        .exec((err, duel) => {
            if (err) {
                res.status(500).send({ message: err })
                return
            }

            console.log(duel)

            res.status(200).send({
                duel
            })
        })
})

router.get('/stats/user/:id', (req, res) => {
    Duel.find({ 'winner': req.params.id })
        .exec((err, duels) => {
            if (err) {
                res.status(500).send({ message: err })
                return
            }

            const wins = duels.length

            Duel.find({ 'loser': req.params.id })
                .exec((err2, duels2) => {
                    if (err2) {
                        res.status(500).send({ message: err2 })
                        return
                    }
                    const loses = duels2.length

                    res.status(200).send({ wins, loses })
                    return
                })
        })
})

router.post('/register', (req, res) => {
    const { id, username } = req.body
    const user = new User({ _id: id, username })
    user.save()

    res.send().status(200)
})

module.exports = router