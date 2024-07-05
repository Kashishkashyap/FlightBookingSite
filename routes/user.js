const express = require('express');
const router = express.Router();
const { signup, signin } = require('../Controller/user');

/* 
####################################
#### User Authentication Routes ####
####################################
*/

/**
 * @route   POST /auth/signup
 * @desc    To Register a new user
 * @access  Public
 */
router.post('/signup', signup);
/**
 * @route   POST /auth/signin
 * @desc    Used to Login the user
 * @access  Public
 */
router.post('/signin', signin);

module.exports = router;
