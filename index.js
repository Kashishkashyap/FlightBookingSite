const express = require('express');
const app = express();
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const { initializeSocket } = require('./socketIo/socketio');
const server = require('http').createServer(app);
initializeSocket(server);


mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("DataBase Connected");
});

app.get('/', (req, res) => {
    res.send("Hi")
})

const user = require('./routes/user');
app.use('/auth', user);
const booking = require('./routes/booking');
app.use('/bookings', booking);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`hii, listening on port ${PORT}`);
})