const mongoose = require('mongoose')
// const bcrypt = require('bcryptjs')

const userModel = mongoose.Schema(
    {
        name: { type: String, required: true },
        dob: { type: String, },
        address: { type: String, },
        veg: { type: Boolean, },
        cuisine: [
            { type: String, },
        ],
        google_pin:{
            lat: { type: String, },
            long: { type: String,},
        },
        allergies: [
            { type: String, },
        ],
        phone_number: { type: String, unique: true }
    }
)



const User = mongoose.model("UserProfile", userModel)
module.exports = User