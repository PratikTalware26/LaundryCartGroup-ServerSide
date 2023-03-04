const mongoose = require("mongoose");

const ordersModel = new mongoose.Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        // orderId:{
        //     type: String,
        //     default: "OR"+parseInt(Math.random()*1000),
        // },

        totalQuantity: Number,
        totalPrice:Number,
        storeLocation:String,
        city: String,
        address: String,
        phoneNo: Number,

        shirts:{
            name:String,
            washType:String,
            quantity:Number,
            totalPrice:Number,
        },
        tShirts:{
            name:String,
            washType:String,
            quantity:Number,
            totalPrice:Number,
        },
        trousers:{
            name:String,
            washType:String,
            quantity:Number,
            totalPrice:Number,
        },
        jeans:{
            name:String,
            washType:String,
            quantity:Number,
            totalPrice:Number,
        },
        boxers:{
            name:String,
            washType:String,
            quantity:Number,
            totalPrice:Number,
        },
        joggers:{
            name:String,
            washType:String,
            quantity:Number,
            totalPrice:Number,
        },
    },
    {timestamps: true}
);

const Order= mongoose.model("Order", ordersModel);

module.exports = Order;