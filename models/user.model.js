const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema(
    {
        username: {
        type: String,
        required: [true, "Username is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"], 
        unique: true
    },
    age: {
        type: Number,
        min: [0, "Age must be a non-negative number"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String }
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
    },
    {
        timestamps: true // Adds createdAt and updatedAt fields
    }
);

UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        throw error;
    }
    });

    UserSchema.methods.comparePassword = async function (candidatePassword) {
        return await bcrypt.compare(candidatePassword, this.password);
    };


const User = mongoose.model("User", UserSchema);

module.exports = User;