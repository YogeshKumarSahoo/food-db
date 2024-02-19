const asyncHandler = require("express-async-handler");
const Resto = require('../models/restoModels')

const createResto = asyncHandler( async (req,res)=> {
    const {
        resto_name,
        resto_menu,
        resto_address,
        resto_google_pin
    } = req.body
    console.log(req.body);
    if (!resto_name || !resto_menu || !resto_address || !resto_google_pin ) {
        res.status(400).send("Please enter a all Fields")
    }

    const resto = await Resto.create({
        resto_name,
        resto_menu,
        resto_address,
        resto_google_pin
    })

    if (resto) {
        res.status(201).json(resto)
    }
    else {
        res.status(404).send('Failed to create resto')
    }
})
const allResto = asyncHandler( async (req,res)=> {
    
    const resto = await Resto.find({})

    if (resto) {
        res.status(201).json(resto)
    }
    else {
        res.status(404).send('Failed to fetch restos')
    }
})
const allRestoFood = asyncHandler( async (req,res)=> {
    const foods = req.params.food
    
    const resto = await Resto.find({'resto_menu.dish':foods})

    if (resto) {
        res.status(201).json(resto)
    }
    else {
        res.status(404).send('Failed to fetch restos')
    }
})

module.exports = { createResto, allResto, allRestoFood }