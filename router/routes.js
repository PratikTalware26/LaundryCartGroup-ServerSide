const express = require("express");



const router = express.Router();
const orderModel = require('../models/orderModel');
const UserModel = require('../models/registerModel');
const ProductModel = require('../models/productTypeModel');

// Post API for postorder
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

//get api for order list

router.get("/", (req,res)=>{
	ProductModel.find({}, (err, docs)=>{
	
	res.json(docs);
})
})

module.exports = router;