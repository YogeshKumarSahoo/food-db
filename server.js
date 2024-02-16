const express = require('express')
const dotenv = require('dotenv')
const User = require('./models/userModels')

const connectDB = require('./config/db')


dotenv.config()
connectDB()

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    try {
        res.status(200).json({
            "name": "Yogo Doe",
            "dob": "1990-05-15",
            "address": "456 Pine Street, Townsville",
            "veg": true,
            "cuisine": "Italian",
            "google_pin": {
                "lat": "78.123456",
                "long": "-23.456789"
            },
            "allergies": [
                "Peanuts",
                "Shellfish"
            ],
            "phone_number": "+1234567890"
    })
    } catch (error) {
        res.status(400).json({"error":error.message});
    }

})

app.get('/success', function (req, res) {
    res.status(200).json({
        "success": true
    })
})

app.post('/createuser', async (req, res) => {
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
    if (!name || !dob || !address || !veg || !cuisine || !google_pin || !allergies || !phone_number) {
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

app.listen(PORT, console.log(`listening on port ${PORT}`))
