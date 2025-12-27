const express = require('express');
const User = require('../models/user.model.js'); // Import the new User model
const router = express.Router();


// Destructure the functions from the new user controller
const { 
    getUsers, 
    getUser, 
    createUser, 
    updateUser, 
    deleteUser 
} = require('../controllers/user.controller.js'); 

// Define User routes
router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;