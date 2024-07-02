const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    flightNumber: {
        type: String,
        required: true
    },
    passengerName: {
        type: String,
        required: true
    },
    departureDate: {
        type: Date,
        required: true
    },
    seatNumber: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Booking', BookingSchema);
