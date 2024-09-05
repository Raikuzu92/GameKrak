const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for a listing
const listingSchema = new Schema({
    game: {
        type: Schema.Types.ObjectId,
        ref: 'Game',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true
    },
    listing_type: {
        type: String,
        enum: ['buy', 'sell', 'trade'],
        required: true
    },
    price: {
        type: Number, // Assuming price is in some currency, use Number
        required: false // Only required if listing_type is 'buy' or 'sell'
    },
    condition: {
        type: String,
        enum: ['new', 'like new', 'very good', 'good', 'acceptable'],
        required: true
    },
    description: {
        type: String,
        required: false
    },
    trade_for: {
        type: Schema.Types.ObjectId,
        ref: 'Game', // Reference to the game the user wants in exchange, only relevant for 'trade' type
        required: function() { return this.listing_type === 'trade'; }
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

// Create the model from the schema
const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
