const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname :{
        firstname :{
            type: String,
            required: true,
            minlength: [3,"First name must be at least 3 characters long"]
        },
        lastname: {
            type: String,
            default: '',
            // Only validate minlength if lastname is provided (not empty)
            validate: {
                validator: function(v) {
                    return !v || v.length >= 3;
                },
                message: 'Last name must be at least 3 characters long when provided'
            }
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        minlength: [5,"Email must be at least 5 characters long"]
    },
    password:{
        type: String,
        required: true,
        minlength: [6,"Password must be at least 6 characters long"]
    },
      dailyLimit: {
      type: Number,
      default: process.env.DAILY_LIMIT || 10,
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)