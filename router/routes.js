const express = require("express");
const router = express.Router();
const orderModel = require('../models/orderModel');
const UserModel = require('../models/registerModel');
const ProductModel = require('../models/productTypeModel');

const jwt = require('jsonwebtoken');

const authtoken = require("../tokenMiddleware/tokenMiddleware");


//for create the order

router.post('/postorder',authtoken,async(req,res)=>{
  await orderModel.create(req.body, (err, docs)=>{
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
        let userExist = await UserModel.findById(req.user.userId)
        // console.log(userExist);

        if(!userExist){
            res.status(400).send("User not exist");
            res.end();
        }
        const result = await orderModel.find({userId: req.user.userId});
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
router.delete("/deleteOrder/:orderId",authtoken, async (req,res)=>{
    // console.log(req.params.orderId);
    // console.log("hello")
    try {
        const data= await orderModel.findOneAndDelete({_id: req.params.orderId});
        if(!data){
            return res.send("err")
        }
        else{
            return res.send("suc");
        }
    } catch (error) {
        console.log(error);
        res.end();
    }
  
})

//get api for order list

router.get("/", (req,res)=>{
	ProductModel.find({}, (err, docs)=>{
	
    return res.json(docs);
})
})


module.exports = router;