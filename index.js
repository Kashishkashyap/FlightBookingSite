// Load environment variables
require('dotenv').config({ path: '.env' });

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const http = require('http');
const { initializeSocket } = require('./socketIo/socketio');

// Initialize Express app
const app = express();

/* 
#######################################
# Set up view engine and static files #
#######################################
*/
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

/* 
######################################
############# Middleware #############
######################################
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

/* 
######################################
######### Connect to MongoDB #########
######################################
*/
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

/* 
######################################
#### Timestamp middleware ####
######################################
*/
const timestamp = (req, res, next) => {
    req.timestamp = Date.now();
    next();
};
app.use(timestamp);

/* 
######################################
############### Routes ###############
######################################
*/
app.use('/auth', require('./routes/user'));
app.use('/bookings', require('./routes/booking'));

// Home route
app.get('/', (req, res) => {
    res.send('Hi');
});

/* 
######################################
#### Start server with Socket.io #####
######################################
*/
const server = http.createServer(app);
initializeSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
