const asyncHandler = require('express-async-handler')
const User = require('../models/userModels')

const registerUser = asyncHandler(async (req,res) => {
    const {
        name,
        dob,
        address,
        veg,
        cuisine,
        google_pin,
        allergies,
        phone_number,
    } = req.body
    console.log(req.body);
    if (!name || !dob || !address || !cuisine || !google_pin || !allergies || !phone_number) {
        res.status(400)
        throw new Error("Please enter a all Fields")
    }

    const userExists = await User.findOne({ phone_number })

    if (userExists) {
        res.status(400)
        throw new Error("User alrady exists")
    }

    const user = await User.create({
        name,
        dob,
        address,
        veg,
        cuisine,
        google_pin,
        allergies,
        phone_number
    })

    if (user) {
        res.status(201).json(user)
    }
    else {
        res.status(404)
        throw new Error('Failed to create user')
    }
})
const allUser = asyncHandler(async (req,res) => {
    

    const user = await User.create({})

    if (user) {
        res.status(201).json(user)
    }
    else {
        res.status(404)
        throw new Error('Failed to create user')
    }
})


module.exports = { registerUser, allUser }