const asyncHandler = require("express-async-handler");
const Order = require('../models/orderModels')

const createOrder = asyncHandler( async (req,res)=> {
    const {
        transaction_id,
        items,
        resto_id,
        total_amount,
        order_dateTime,
        delivery_address,
        customer_id,
    } = req.body
    console.log(req.body);

    if (!transaction_id || !items || !resto_id || !total_amount || !order_dateTime || !delivery_address || !customer_id) {
        res.status(400).send("Please enter a all Fields")
    }

    let order
    try{
            order = await Order.create({
                transaction_id,
                items,
                resto_id,
                total_amount,
                order_dateTime,
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

const createInvoice = asyncHandler( async (req,res)=> {
    // Create a new PDF document
    const pdfDoc = new PDFDocument();

    // Add content to the PDF
    pdfDoc.text('Invoice', 80, 10);
    pdfDoc.text('Date: ' + new Date().toLocaleDateString(), 10, 20);
    pdfDoc.text('Invoice #: 12345', 10, 30);
    pdfDoc.text('Amount: $100.00', 10, 40);

    // Set response headers for PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=invoice.pdf');

    // Pipe the PDF to the response stream
    pdfDoc.pipe(res);

    // End the PDF stream
    pdfDoc.end();
})

module.exports = { createOrder, allOrder, createInvoice }