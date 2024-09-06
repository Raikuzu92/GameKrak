const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for a transaction
const transactionSchema = new Schema({
    listing: {
        type: Schema.Types.ObjectId,
        ref: 'Listing',
        required: true
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: function() { return this.listing.listing_type === 'buy'; }
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: function() { return this.listing.listing_type === 'sell'; }
    },
    trader: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: function() { return this.listing.listing_type === 'trade'; }
    },
    trade_with: {
        type: Schema.Types.ObjectId,
        ref: 'Game',
        required: function() { return this.listing.listing_type === 'trade'; }
    },
    transaction_type: {
        type: String,
        enum: ['buy', 'sell', 'trade'],
        required: true
    },
    transaction_date: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp)
    },
    amount: {
        type: Number, // Amount for buying/selling transactions
        required: function() { return this.transaction_type === 'buy' || this.transaction_type === 'sell'; }
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending'
    },
    notes: {
        type: String,
        required: false
    }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

// Create the model from the schema
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
