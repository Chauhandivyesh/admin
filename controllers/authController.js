// authController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateToken } = require('../utils/helperFunctions');

const authController = {
    register: async (req, res) => {
        try {
            const { username, email, password, role } = req.body;

            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user
            const newUser = new User({ username, email, password: hashedPassword, role });
            await newUser.save();
            console.log(newUser);
            res.render("login")
            // res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Find user by email
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Validate password
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ message: 'Invalid password' });
            }
            // Generate JWT token
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
           
            // Store token in session (Express session middleware handles this)
            req.session.token = token;
            user.token = token;
            console.log(user);
            // Optionally, store token in cookie
            res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // Max age: 1 hour
            await user.save();
          res.redirect("admindashboard")
            // Optionally, send token and other user details in response
            // res.json({ token, user: { id: user._id, email: user.email } });
        } catch (error) {
            console.error('Error logging in:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

 
    logout: async (req, res) => {
        try {
            // Clear the user's authentication token or session
            if (req.cookies && req.cookies.token) { // Assuming the token is stored in a cookie
                res.clearCookie('token',null);
                return res.status(200).json({ message: 'Logout successful' });
            } else {
                return res.status(401).json({ message: 'Not logged in' });
            }
        } catch (error) {
            console.error('Error logging out:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    
    updateProfile: async (req, res) => {
        try {
            const userId = req.user.userId;

            // Check if the user exists
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Update user profile information
            if (username) {
                user.username = username;
            }
            if (email) {
                user.email = email;
            }
            await user.save();
            console.log(user);
            res.status(200).json({ message: 'Profile updated successfully' });
        } catch (error) {
            console.error('Error updating profile:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = authController;
