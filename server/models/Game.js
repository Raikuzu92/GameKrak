const mongoose = require('mongoose');
const { Schema } = mongoose;

const gameSchema = new Schema({
    img: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    console: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    developer: {
        type: String,
        required: true
    },
    critic_score: {
        type: String, 
        required: true
    },
    total_sales: {
        type: String, 
        required: true
    },
    na_sales: {
        type: String, 
        required: true
    },
    jp_sales: {
        type: String, 
        required: true
    },
    pal_sales: {
        type: String, 
        required: true
    },
    other_sales: {
        type: String, 
        required: true
    },
    release_date: {
        type: String, // Consider using Date if you'll perform date operations
        required: true
    },
    last_update: {
        type: String // Consider using Date if you'll perform date operations
    }
}, {
    timestamps: true // Optional: Adds createdAt and updatedAt fields
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;