const express = require('express');
const router = express.Router();
const Booking = require('../model/Booking');
const auth = require('../Middleware/auth');
const User = require('../model/User');

const ejs = require('ejs');
const path = require('path');

const { getIo } = require('../socketIo/socketio');


const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });

const convertHTMLToPDF = require('pdf-puppeteer');

router.get('/new', auth, (req, res) => {
    res.render('Booking/new');
});

router.post('/', auth, async (req, res) => {
    const { flightNumber, passengerName, departureDate, seatNumber } = req.body;
    const newBooking = new Booking({ flightNumber, passengerName, departureDate, seatNumber, user: req.user._id });
    await newBooking.save();
    console.log(newBooking);
    const io = getIo();
    io.emit('message', `New booking created for ${newBooking.passengerName} on flight ${newBooking.flightNumber}`);

    try {
        const userdata = await User.findById(newBooking.user);
        if (!userdata) {
            console.error('User not found');
            return res.status(404).send('User not found');
        }
        const html = await ejs.renderFile(path.join(__dirname, '../views/Booking/booking_pdf.ejs'), {
            flightNumber: newBooking.flightNumber,
            passengerName: newBooking.passengerName,
            departureDate: newBooking.departureDate,
            seatNumber: newBooking.seatNumber
        });

        console.log("HTML content generated for PDF:", html);

        const options = { format: 'A4' };
        const puppeteerArgs = [];

        convertHTMLToPDF(html, async (pdf) => {
            const data = {
                from: `Mailgun Sandbox <mailgun@${process.env.MAILGUN_DOMAIN}>`,
                to: userdata.email,
                subject: 'Flight Booking Confirmation',
                text: `Dear ${newBooking.passengerName},\n\nYour booking for flight ${newBooking.flightNumber} has been confirmed.\nDeparture Date: ${newBooking.departureDate.toDateString()}\nSeat Number: ${newBooking.seatNumber}\n\nThank you for booking with us!\n\nBest Regards,\nFlight Booking Team`,
                html: `<p>Dear ${newBooking.passengerName},</p>
                       <p>Your booking for flight <strong>${newBooking.flightNumber}</strong> has been confirmed.</p>
                       <p><strong>Departure Date:</strong> ${newBooking.departureDate.toDateString()}</p>
                       <p><strong>Seat Number:</strong> ${newBooking.seatNumber}</p>
                       <p>Thank you for booking with us!</p>
                       <p>Best Regards,<br>Flight Booking Team</p>`,
                attachment: {
                    filename: 'booking_confirmation.pdf',
                    data: pdf
                }
            };

            try {
                await mg.messages.create(process.env.MAILGUN_DOMAIN, data);
                console.log('Email sent successfully');
                res.redirect('/booking');
            } catch (error) {
                console.error('Error sending email:', error);
                res.status(500).send('Server error');
            }
        }, options, puppeteerArgs);
    } catch (error) {
        console.error('Error during PDF generation or email sending:', error);
        res.status(500).send('Server error');
    }
});

router.get('/', async (req, res) => {
    const bookings = await Booking.find();
    res.render('Booking/bookings', { bookings });
});

router.get('/:id/edit', auth, async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    res.render('Booking/edit', { booking });
});

router.put('/:id', auth, async (req, res) => {
    const { flightNumber, passengerName, departureDate, seatNumber } = req.body;
    const updatedBooking = await Booking.findByIdAndUpdate({ _id: req.params.id, user: req.user._id }, { flightNumber, passengerName, departureDate, seatNumber });
    const io = getIo();
    io.emit('message', `Booking updated for ${updatedBooking.passengerName} on flight ${updatedBooking.flightNumber}`);
    res.redirect('/booking');
});

router.delete('/:id', auth, async (req, res) => {
    const booking = await Booking.findByIdAndDelete({ _id: req.params.id, user: req.user._id });
    res.redirect('/booking');
});

module.exports = router;
