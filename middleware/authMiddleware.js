// authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    try {
        // // Get the token from the request headers
        // const token = req.header('Authorization');
        // if (!token) {
        //     return res.status(401).json({ message: 'Authentication token is missing' });
        // }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Attach the authenticated user to the request object
        req.user = user;
        next();
    } catch (error) {
        console.error('Error authenticating user:', error);
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Invalid token format' });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = authMiddleware;
