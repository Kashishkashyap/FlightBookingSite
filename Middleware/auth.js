const jwt = require('jsonwebtoken');
const User = require('../model/User');

const auth = async (req, res, next) => {
    const token = req.header('token');
    console.log(token);
    if (!token) {
        return res.status(401).send('No token');
    }

    try {
        console.log('Token received:', token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'SecurePassword');
        console.log('Token decoded:', decoded);

        const user = await User.findById(decoded.user.id);
        if (!user) {
            return res.status(401).send('User not found');
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).send('Invalid token');
    }
};

module.exports = auth;

