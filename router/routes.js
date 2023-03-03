const express = require("express");
const router = express.Router();
const orderModel = require('../models/orderModel');
const UserModel = require('../models/registerModel');
const ProductModel = require('../models/productTypeModel');

const jwt = require('jsonwebtoken');

const authtoken = require("../tokenMiddleware/tokenMiddleware");


//for create the order

router.post('/postorder',async(req,res)=>{
   orderModel.create(req.body, (err, docs)=>{
    if(err){
        res.send(err);
    }
    else{
        res.json({
            success: true,
            message: "Order added"
        })
    }
   })
})

//to get the existing orders

router.get('/getOrder',authtoken, async (req,res)=>{
    try{
        let userExist = await UserModel.findById(req.user._id)
        if(!userExist){
            res.status(400).send("User not exist");
            res.end();
        }
        const result = await orderModel.findById({userId:req.user._id});
        res.status(200).json(result);

    }catch(err){
        res.status(400).send("order is not found");
    }
})

//to get order by order id for pastorder list
router.get("/order/:orderId", async(req,res)=>{
    orderModel.findById(req.params.orderId, (err, docs)=>{
        if(err){
            res.send(err);
        }
        else{
            res.json(docs);
        }
    })
});

//to get user details
router.get("/UserDetails",authtoken, async(req,res)=>{
    // console.log(req.headers.authorization)
    try{
        let user = await UserModel.findById(req.user.userId)
        res.status(200).send(user)
        res.end()
    }catch(e){
        console.log(e);
        res.status(500).send("server Error");
        res.end();
    }
})

//to delete the order
router.delete("deleteOrder/:orderId", (req,res)=>{
    orderModel.findByIdAndDelete(req.params.orderId, (err,docs)=>{
        if(err){
            res.send(err);
        }
        else{
            res.json({
                success:true,
                message:"Order deleted"
            })
        }
    })
})

//get api for order list

router.get("/", (req,res)=>{
	ProductModel.find({}, (err, docs)=>{
	
	res.json(docs);
})
})


module.exports = router;