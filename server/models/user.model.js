const mongoose = require('mongoose')

const User = mongoose.model(
    'User',
    new mongoose.Schema({
        username: {
            type: String,
            trim: [true, 'Username required'],
            required: true,
            minlength: 5,
            maxlength: 20,
            lowercase: true,
            unique: true
        },
        duels: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Duel'
            }
        ]
    })
)

module.exports = User