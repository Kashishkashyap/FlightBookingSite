const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "SecurePassword";
const tokenExpiration = '1h';

/**
 * @desc    To Register a new user
 * @access  Public
 */
const signup = async (req, res) => {
    try {
        let success = false;
        const { username, password, email, name } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success, error: "User with provided email address already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        user = await User.create({ username, password: encryptedPassword, email, name });
        const data = { user: { id: user.id } };
        const authToken = jwt.sign(data, JWT_SECRET, { expiresIn: tokenExpiration });
        success = true;
        res.json({ success, authToken, userId: user.id });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

/**
 * @desc    To Register a new user
 * @access  Public
 */
const signin = async (req, res) => {
    try {
        let success = false;
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success, error: "Invalid Credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Invalid Credentials" });
        }
        const data = { user: { id: user.id } };
        const authToken = jwt.sign(data, JWT_SECRET, { expiresIn: tokenExpiration });
        success = true;
        res.json({ success, authToken, userId: user.id });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = { signup, signin };
