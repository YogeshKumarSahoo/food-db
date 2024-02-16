const mongoose = require('mongoose')
// const bcrypt = require('bcryptjs')

const userModel = mongoose.Schema(
    {
        name: { type: String, required: true },
        dob: { type: String, },
        address: { type: String, },
        veg: { type: Boolean, },
        cuisine: { type: String, },
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

// userModel.methods.matchPassword = async function (enteredPassword) {
//     return bcrypt.compare(enteredPassword, this.password)
// }

// userModel.pre('save', async function (next) {
//     if (!this.isModified) {
//         next()
//     }
//     const salt = await bcrypt.genSalt(10)
//     this.password = await bcrypt.hash(this.password, salt)
// })

const User = mongoose.model("UserProfile", userModel)
module.exports = User