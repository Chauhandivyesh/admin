const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Route for user registration
router.post('/register', authController.register);
router.get("/register",(req,res)=>{
    res.render("register");
})
// Route for user login
router.post('/login', authController.login);
router.get("/login",(req,res)=>{
    res.render("login");
})
router.get("/admindashboard",(req,res)=>{
    res.render("admindashboard");
})
// Route for user logout
router.post('/logout', authController.logout);

// Route for updating user profile
router.put('/updateProfile', authMiddleware, authController.updateProfile);

module.exports = router;





