const express = require('express')
const dotenv = require('dotenv')
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
app.use('/api/user', userRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/resto', restoRoutes)

app.use(notFound)
app.use(errorHandler)
app.listen(PORT, console.log(`listening on port ${PORT}`))
