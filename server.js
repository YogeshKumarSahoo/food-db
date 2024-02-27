const express = require('express')
const dotenv = require('dotenv')
const PDFDocument = require('pdfkit')
const infoRoutes = require('./routes/infoRouters')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')
const restoRoutes = require('./routes/restoRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

const connectDB = require('./config/db')

dotenv.config()
connectDB()

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/', infoRoutes)
app.get('/generate', (req, res) => {
    const data = {
        "transaction_id": "1708382362745167",
        "resto_id": {
            "$oid": "65d24e6983d3d26fcfcacd01"
        },
        "customer_id": "1234567890",
        "delivery_address": "456 Pine Street, Townsville",
        "total_amount": 43.96,
        "items": [
            {
                "name": "Pasta",
                "Qty": 4,
                "_id": {
                    "$oid": "65d3d89d087a9d6c3f12a533"
                }
            }
        ],
        "__v": 0
    };

    // Create a new PDF document
    const pdfDoc = new PDFDocument();

    // Set response headers for PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=invoice.pdf');

    // Pipe the PDF to the response stream
    pdfDoc.pipe(res);

    // Add content to the PDF based on the provided data
    pdfDoc.text('Invoice', 80, 10);
    pdfDoc.text(`Transaction ID: ${data.transaction_id}`, 10, 20);
    pdfDoc.text(`Customer ID: ${data.customer_id}`, 10, 30);
    pdfDoc.text(`Delivery Address: ${data.delivery_address}`, 10, 40);

    // Add item details
    let startY = 60;
    data.items.forEach((item, index) => {
        pdfDoc.text(`Item ${index + 1}: ${item.name}, Qty: ${item.Qty}`, 10, startY);
        startY += 10;
    });

    pdfDoc.text(`Total Amount: Rs.${data.total_amount.toFixed(2)}`, 10, startY + 10);

    // End the PDF stream
    pdfDoc.end();
});
app.use('/api/user', userRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/resto', restoRoutes)

app.use(notFound)
app.use(errorHandler)
app.listen(PORT, console.log(`listening on port ${PORT}`)) 
