const                    
   User = require('../models/user.model'); // Import the new User model
   const { z } = require('zod');

   const userSchema = z.object({
       username: z.string().min(1, "Username is required"),
       email: z.string().email("Invalid email address"),
         age: z.number().min(0, "Age must be a non-negative number").optional(),
       password: z.string().min(6, "Password must be at least 6 characters long"),
       address: z.string().optional().default(""),
         role: z.enum(['user', 'admin']).optional().default('user')
   });

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single user by ID
const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new user
const createUser = async (req, res) => {
    try {
        // You should add password hashing (e.g., using bcrypt) here for security!
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found!" });
        }
        const updatedUserData = await User.findById(id);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        res.status(200).json({ message: "User Deleted Successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};