const express = require('express');
const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const RegisterUser  = async(req,res)=>{
    const { fullname, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const existingUser = await User.findOne({ email });
        if(!existingUser){
            const newUser = new User({
                fullname : {
                    firstname : fullname.firstname,
                    lastname : fullname.lastname
                },
                email,
                password: hashedPassword
            })
            console.log(newUser);
            await newUser.save();
            const token = JWT.sign({ id: newUser._id }, process.env.JWT_SECRET);
            // Return token and user object for frontend convenience
            const userToReturn = { _id: newUser._id, email: newUser.email, fullname: newUser.fullname };
            res.status(201).json({ message: "User registered successfully", token, user: userToReturn });
        }
        else{
            res.status(400).json({message: "User already exists"});
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }

}

const LoginUser = async(req,res)=>{
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if(existingUser){
            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);        
            if(isPasswordCorrect){
                const token = JWT.sign({ id: existingUser._id }, process.env.JWT_SECRET);
                const userToReturn = { _id: existingUser._id, email: existingUser.email, fullname: existingUser.fullname, dailyLimit: existingUser.dailyLimit };
                res.status(200).json({ message: "Login successful", token, user: userToReturn });
            }
            else{
                res.status(400).json({ message: "Invalid credentials" });
            }
        }
        else{
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

// Return current user (for /auth/me)
const GetCurrentUser = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization token missing' });
        }
        const token = authHeader.split(' ')[1];
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ user });
    } catch (error) {
        console.error('GetCurrentUser error:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
}

// Logout (frontend expects this route) - just instruct client to delete token
const LogoutUser = async (req, res) => {
    // If using cookies, clear cookie here. For token-based auth, frontend will remove token.
    res.status(200).json({ message: 'Logged out' });
}
module.exports = { RegisterUser, LoginUser, GetCurrentUser, LogoutUser };