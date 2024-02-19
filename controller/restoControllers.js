const asyncHandler = require("express-async-handler");
const Resto = require('../models/restoModels')

const createResto = asyncHandler(async (req, res) => {
    const {
        resto_name,
        resto_menu,
        resto_address,
        resto_google_pin
    } = req.body
    console.log(req.body);
    if (!resto_name || !resto_menu || !resto_address || !resto_google_pin) {
        res.status(400).send("Please enter a all Fields")
    }

    let resto

    try {
        resto = await Resto.create({
            resto_name,
            resto_menu,
            resto_address,
            resto_google_pin
        })
    }
    catch (err) {
        res.status(500).json({
            msg: 'Failed to create resto',
            error: err
        })
    }
    if (resto) {
        res.status(201).json(resto)
    }
    else {
        res.status(404).send('Failed to create resto')
    }
})



const allResto = asyncHandler(async (req, res) => {

    const resto = await Resto.find({})

    if (resto) {
        res.status(201).json(resto)
    }
    else {
        res.status(404).send('Failed to fetch restos')
    }
})




const allRestoFood = asyncHandler(async (req, res) => {
    const food = req.params.food;

    const foodRegex = new RegExp(food, 'i');

    const resto = await Resto.find({ 'resto_menu.dish': { $regex: foodRegex } });

    if (resto) {
        res.status(200).json(resto);
    } else {
        res.status(404).send('Failed to fetch restos');
    }
});


module.exports = { createResto, allResto, allRestoFood }