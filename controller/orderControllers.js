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
        res.status(201).json({
            msg:'Order created successfully',
            data : order
        })
    }
    else {
        res.status(404).send('Failed to create order')
    }
})
const allOrder = asyncHandler( async (req,res)=> {

    const userId = req.query.userId
    const restoId = req.query.restoId

    let order
    if(userId){
        try{
            order = await Order.find({'customer_id': userId})
        }
        catch(err){
            res.status(404).send('invelid user')
        }
    }
    else if(restoId){
        try{
            order = await Order.find({'resto_id': restoId})
        }
        catch(err){
            res.status(404).send('invelid resto')
        }
    }
    else{
        order = await Order.find({})
    }

    if (order) {
        res.status(201).json(order)
    }
    else {
        res.status(404).send('Failed to fetch orders')
    }
})

module.exports = { createOrder, allOrder }