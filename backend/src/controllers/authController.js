const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

/**
 * Processes a user login request after the input has been validated.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const payload = { user: { id: user.id } };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1d', // Token expires in one day
        });

        res.status(200).json({
            token,
            user: { id: user.id, name: user.name, email: user.email },
        });

    } catch (error) {
        console.error('Login Controller Error:', error.message);
        res.status(500).json({ message: 'Server error during authentication.' });
    }
};

/**
 * Retrieves the profile data for the currently authenticated user.
 * @param {object} req - Express request object with user data from 'protect' middleware.
 * @param {object} res - Express response object.
 */
const getAuthenticatedUserProfile = async (req, res) => {
    try {
        // req.user is attached by the 'protect' middleware.
        res.status(200).json(req.user);
    } catch (error) {
        console.error('Get User Profile Error:', error.message);
        res.status(500).json({ message: 'Server error.' });
    }
};

module.exports = {
    loginUser,
    getAuthenticatedUserProfile,
};