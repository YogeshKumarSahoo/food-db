const asyncHandler = require("express-async-handler");
const Order = require('../models/orderModels')

const createOrder = asyncHandler( async (req,res)=> {
    const {
        transaction_id,
        items,
        resto_id,
        total_amount,
        order_date,
        delivery_address,
        customer_id,
    } = req.body
    console.log(req.body);
    if (!transaction_id || !items || !resto_id || !total_amount || !order_date || !delivery_address || !customer_id) {
        res.status(400).send("Please enter a all Fields")
    }

    let order
    try{
            order = await Order.create({
                transaction_id,
                items,
                resto_id,
                total_amount,
                order_date,
                delivery_address,
                customer_id,
        })
    }
    catch(err) {
        res.status(500).json({
            msg:'Failed to create order',
            error: err
        })
    }
    if (order) {
        res.status(201).json(order)
    }
    else {
        res.status(404).send('Failed to create order')
    }
})
const allOrder = asyncHandler( async (req,res)=> {
    
    const order = await Order.find({})

    if (order) {
        res.status(201).json(order)
    }
    else {
        res.status(404).send('Failed to fetch orders')
    }
})
const userHistory = asyncHandler( async (req,res)=> {
    
    const order = await Order.find({})

    if (order) {
        res.status(201).json(order)
    }
    else {
        res.status(404).send('Failed to fetch orders')
    }
})


module.exports = { createOrder, allOrder, userHistory }