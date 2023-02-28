const express = require("express");


const router = express.Router();
const orderModel = require('../models/orderModel');

router.post('/postorder',async(req,res)=>{
    const {
        userId , totalQuantity ,totalPrice,   storeLocation ,city,address,phoneNo,shirts,tShirts,trousers, jeans,  boxers,joggers
    } = req.body;
    const createOrder = await orderModel.create({
        userId , totalQuantity ,totalPrice,   storeLocation ,city,address,phoneNo,shirts,tShirts,trousers, jeans,  boxers,joggers
    });
    if(createOrder){
        res.status(200).json({
            success: true,
            message : "Order created successfully"
        })
    }else{
        res.status(400).send("Feield to create order!")
    }
})
module.exports = router;