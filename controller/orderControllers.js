const asyncHandler = require("express-async-handler");
const Order = require('../models/orderModels')
const PDFDocument = require('pdfkit');

const createOrder = asyncHandler(async (req, res) => {
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
    try {
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
    catch (err) {
        res.status(500).json({
            msg: 'Failed to create order',
            error: err
        })
    }
    if (order) {
        res.status(201).json({
            msg: 'Order created successfully',
            data: order
        })
    }
    else {
        res.status(404).send('Failed to create order')
    }
})
const allOrder = asyncHandler(async (req, res) => {

    const userId = req.query.userId
    const restoId = req.query.restoId

    let order
    if (userId) {
        try {
            order = await Order.find({ 'customer_id': userId })
        }
        catch (err) {
            res.status(404).send('invelid user')
        }
    }
    else if (restoId) {
        try {
            order = await Order.find({ 'resto_id': restoId })
        }
        catch (err) {
            res.status(404).send('invelid resto')
        }
    }
    else {
        order = await Order.find({})
    }

    if (order) {
        res.status(201).json(order)
    }
    else {
        res.status(404).send('Failed to fetch orders')
    }
})

const createInvoice = asyncHandler(async (req, res) => {
    const id = req.query.oid;

    if (!id) {
        res.status(400).send('oid not found');
        return;
    }

    let respo;

    try {
        // Execute the query to get the result
        respo = await Order.findById(id).exec();

        if (!respo) {
            res.status(404).send('Order not found');
            return;
        }

        // Create a new PDF document
        const pdfDoc = new PDFDocument();

        // Set response headers for PDF
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename=invoice.pdf');

        // Pipe the PDF to the response stream
        pdfDoc.pipe(res);

        // Add content to the PDF based on the retrieved data
        pdfDoc.text('Invoice', 80, 10);
        pdfDoc.text(`Transaction ID: ${respo.transaction_id}`, 10, 20);
        pdfDoc.text(`Customer ID: ${respo.customer_id}`, 10, 30);
        pdfDoc.text(`Delivery Address: ${respo.delivery_address}`, 10, 40);

        // Add item details
        let startY = 60;
        respo.items.forEach((item, index) => {
            pdfDoc.text(`Item ${index + 1}: ${item.name}, Qty: ${item.Qty}`, 10, startY);
            startY += 10;
        });

        pdfDoc.text(`Total Amount: Rs.${respo.total_amount.toFixed(2)}`, 10, startY + 10);

        // End the PDF stream
        pdfDoc.end();
    } catch (err) {
        console.log('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = { createOrder, allOrder, createInvoice }