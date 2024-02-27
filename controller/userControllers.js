const asyncHandler = require('express-async-handler')
const User = require('../models/userModels')
const Resto = require('../models/restoModels')

const axios = require('axios')


const registerUser = asyncHandler(async (req, res) => {
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

    let user

    try {
        user = await User.create({
            name,
            dob,
            address,
            veg,
            cuisine,
            google_pin,
            allergies,
            phone_number
        })
    }
    catch (err) {
        res.status(500).json({
            msg: 'Failed to create user',
            error: err
        })
    }

    if (user) {
        res.status(201).json(user)
    }
    else {
        res.status(404)
        throw new Error('Failed to create user')
    }
})
const allUser = asyncHandler(async (req, res) => {


    const user = await User.find({})

    if (user) {
        res.status(201).json(user)
    }
    else {
        res.status(404)
        throw new Error('Failed to create user')
    }
})

const userDetails = asyncHandler(async (req, res) => {

    const person = req.params.userID
    const user = await User.find({
        phone_number: person
    })

    if (user) {
        res.status(201).json(user)
    }
    else {
        res.status(404)
        throw new Error('Failed to create user')
    }
})

const recommendations = asyncHandler(async (req, res) => {
    // const apiKey = process.env.DISTANCE_API_KEY;
    // const person = req.params.userID;

    // async function getDistance(origin, destination) {
    //     try {
    //         const response = await axios.get(
    //             `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&travelMode=driving&key=${apiKey}`
    //         );

    //         if (response.data.status === 'OK' && response.data.rows && response.data.rows[0] && response.data.rows[0].elements && response.data.rows[0].elements[0] && response.data.rows[0].elements[0].distance) {
    //             return response.data.rows[0].elements[0].distance.text;
    //         } else {
    //             console.error("Error: Invalid response structure or missing data");
    //             console.error(response.data); // Log the entire response for debugging
    //             return null; // Or throw an error if appropriate
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         throw error; // Re-throw the error for further handling
    //     }
    // }

    // console.log(await getDistance("98.765432,-12.345678","20.230278,85.862178"));
    // const user = await User.find({ phone_number: person });

    // if (!user) {
    //     return res.status(404).json({ message: "User not found" }); // Handle user not found case
    // }

    // const origin = user[0].google_pin.lat + ',' + user[0].google_pin.long;

    const resto = await Resto.find({});

    // // Use Promise.all to wait for all promises to resolve
    // const restoWithDistances = await Promise.all(
    //     resto.map(async (obj) => {
    //         const restoPin = obj.resto_google_pin;
    //         if (restoPin && restoPin.lat !== undefined && restoPin.long !== undefined) {
    //             try {
    //                 console.log(origin,restoPin.lat + "," + restoPin.long);
    //                 const distance = await getDistance(origin, restoPin.lat + "," + restoPin.long);
    //                 return { ...obj, distance };
    //             } catch (error) {
    //                 console.error(`Error calculating distance for resto ${obj.resto_name}:`, error);
    //                 // Handle individual resto distance calculation errors (e.g., log, skip resto)
    //                 return obj; // Return the original object without distance
    //             }
    //         } else {
    //             console.error("Resto pin is undefined or missing lat/long properties:", obj.resto_name);
    //             // Handle missing resto pin case (e.g., log, skip resto)
    //             return obj; // Return the original object without distance
    //         }
    //     })
    // );

    // // Sort the array based on the "distance" property
    // restoWithDistances.sort((a, b) => (a.distance ? a.distance : Infinity) - (b.distance ? b.distance : Infinity));

    // console.log('sorted', restoWithDistances);

    // res.status(200).json(restoWithDistances); // Send the sorted restaurants with distances


    function getRandomElements(list, numElements) {
        // Shuffle the list using the Fisher-Yates shuffle algorithm
        for (let i = list.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [list[i], list[j]] = [list[j], list[i]];
        }

        // Slice the shuffled list to get the desired number of elements
        return list.slice(0, numElements);
    }

    final = getRandomElements(resto, 4)
    res.status(200).json(final)
});






module.exports = { registerUser, allUser, userDetails, recommendations }