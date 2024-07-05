const express = require('express');
const router = express.Router();
const auth = require('../Middleware/auth');
const {
    createBookingForm,
    createBooking,
    getAllBookings,
    editBookingForm,
    updateBooking,
    deleteBooking
} = require('../Controller/bookings');

/* 
#####################################
######### Booking Routes ############
#####################################
*/

/**
 * @route   GET /bookings/new
 * @desc    Render form to create new booking
 * @access  Private
 */
router.get('/new', auth, createBookingForm);

/**
 * @route   POST /bookings
 * @desc    Create a new booking
 * @access  Private
 */
router.post('/', auth, createBooking);

/**
 * @route   GET /bookings
 * @desc    Get all bookings
 * @access  Public
 */
router.get('/', getAllBookings);

/**
 * @route   GET /bookings/:id/edit
 * @desc    Render form to edit a booking
 * @access  Private
 */
router.get('/:id/edit', auth, editBookingForm);

/**
 * @route   PUT /bookings/:id
 * @desc    Update booking
 * @access  Private
 */
router.put('/:id', auth, updateBooking);

/**
 * @route   DELETE /bookings/:id
 * @desc    Delete booking
 * @access  Private
 */
router.delete('/:id', auth, deleteBooking);

module.exports = router;
