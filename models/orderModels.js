const mongoose = require('mongoose')

const orderModel = mongoose.Schema(
    {
        transaction_id: { type: String },
        resto_id: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "Resto",
        },
        customer_id: { type: String, },
        delivery_address: { type: String, },
        total_amount: { type: Number, },
        items: [
            { 
                name: {type: String},
                Qty: {type: Number},
            },
        ],
        order_dateTime: { type: String}
    }
)

const Order = mongoose.model("orders", orderModel)
module.exports = Order