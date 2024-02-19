const mongoose = require('mongoose')

const restoModel = mongoose.Schema(
    {
        resto_name: { type: String},
        resto_menu: [{
            dish: { type: String, },
            portion_size: { type: String, },
            price:{ type: Number, },
            pic: { type: String, }
            },
        ],
        resto_address: { type: String, },
        resto_google_pin:{
            lat: { type: String, },
            long: { type: String,},
        },
    }
)

const Resto = mongoose.model("restoprofiles", restoModel)
module.exports = Resto