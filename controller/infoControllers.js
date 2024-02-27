const asyncHandler = require("express-async-handler");

const justinfo = asyncHandler(async (req, res) => {
    res.json({
        NumberOfRoutes: 12,
        User: [
            {
                route: "/api/users",
                type: "GET",
                input: {
                    needed: false,
                    sample: {},
                    msg: ""
                },
                output: "will give you all users"
            },
            {
                route: "/api/users/:userId",
                type: "GET",
                input: {
                    needed: true,
                    sample: { url: "/api/users/7845123265" },
                    msg: "as params '/<userID>' where userID is phoneNumber"
                },
                output: "will give you a user"
            },
            {
                route: "/api/users/recommendation/:userID",
                type: "GET",
                input: {
                    needed: true,
                    sample: { url: "/api/recommendation/7845123265" },
                    msg: "as params '/<userID>' where userID is phoneNumber"
                },
                output: "will give you all restos recommendations in a order"
            },
            {
                route: "/api/users/create",
                type: "POST",
                input: {
                    needed: true,
                    sample: {
                        "name": "Yogo Doe",
                        "dob": "1990-05-15",
                        "address": "456 Pine Street, Townsville",
                        "veg": true,
                        "cuisine": "Italian",
                        "google_pin": {
                            "lat": "78.123456",
                            "long": "-23.456789"
                        },
                        "allergies": [
                            "Peanuts"
                        ],
                        "phone_number": "9772543210"
                    },
                    msg: "input as body and remember phoneNumber as key"
                },
                output: "Create a user account"
            },
        ],
        Order: [
            {
                route: "/api/order",
                type: "GET",
                input: {
                    needed: false,
                    sample: {},
                    msg: ""
                },
                output: "will give you all orders"
            },
            {
                route: "/api/order?userId=",
                type: "GET",
                input: {
                    needed: true,
                    sample: {},
                    msg: "just give user ph no."
                },
                output: "will give you all orders"
            },
            {
                route: "/api/order?restoId=",
                type: "GET",
                input: {
                    needed: true,
                    sample: {},
                    msg: "just give resto object ID"
                },
                output: "will give you all orders"
            },
            {
                route: "/api/order/generate-invoice?restoId=",
                type: "GET",
                input: {
                    needed: true,
                    sample: {},
                    msg: "just give resto object ID"
                },
                output: "will give you a pdf invoice"
            },
            {
                route: "/api/order/create",
                type: "POST",
                input: {
                    needed: true,
                    sample: {
                        "transaction_id": "10020",
                        "items": [{
                            "name": "Sushi",
                            "Qyt": 1
                        }, {
                            "name": "Miso Soup",
                            "Qyt": 2
                        }, {
                            "name": "Green Tea",
                            "Qyt": 3
                        }
                        ],
                        "resto_id": "65d24e6983d3d26fcfcacd03",
                        "total_amount": 900,
                        "order_dateTime": "2024-02-20 04:03:04",
                        "delivery_address": "789 Oak Avenue, Cityville",
                        "customer_id": "9876543210"
                    },
                    msg: "input as body and remember tranaction_id as key"
                },
                output: "Create an Order"
            },
        ],
        Restro: [
            {
                route: "/api/resto",
                type: "GET",
                input: {
                    needed: false,
                    sample: {},
                    msg: ""
                },
                output: "will give you all restro"
            },
            {
                route: "/api/resto/:food",
                type: "GET",
                input: {
                    needed: true,
                    sample: { url: "/api/resto/pasta" },
                    msg: "as params '/<food>'"
                },
                output: "will give you all restos which have that food"
            },
            {
                route: "/api/resto/create",
                type: "POST",
                input: {
                    needed: true,
                    sample: {
                        "resto_name": "Just Eate",
                        "resto_menu": [
                            {
                                "dish": "Pasta",
                                "portion_size": "Regular",
                                "price": 10.99,
                                "pic": "https://www.deputy.com/uploads/2018/10/The-Most-Popular-Menu-Items-That-You-should-Consider-Adding-to-Your-Restaurant_Content-image1-min-1024x569.png"
                            },
                            {
                                "dish": "Pizza",
                                "portion_size": "Large",
                                "price": 15.99,
                                "pic": "https://redcliffelabs.com/myhealth/wp-content/uploads/2022/03/90-1200x900.jpg"
                            },
                            {
                                "dish": "Salad",
                                "portion_size": "Small",
                                "price": 8.99,
                                "pic": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT86X_FCr5NI8bsDoyoJ-JWvfgyo-5zdhnZFg&usqp=CAU"
                            }
                        ],
                        "resto_address": "123 Main Street, Cityville",
                        "resto_google_pin": {
                            "lat": "123.456789",
                            "long": "-87.654321"
                        }
                    },
                    msg: "input as body"
                },
                output: "Create a restro account"
            },
        ],
    })
})
const initial = asyncHandler(async (req, res) => {
    res.send("I'm Running...")
})


module.exports = { initial, justinfo }