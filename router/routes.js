const express = require("express");


const router = express.Router();
const orderModel = require('../models/orderModel');

//for create the order
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

//to get the existing orders
router.get('/getOrder', async (req,res)=>{
    try{
        let userExist = await UserModel.findById(req.user.userId)
        if(!userExist){
            res.status(400).send("User not exist");
            res.end();
        }
        const result = await orderModel.findById({userId:req.user.userId});
        res.status(200).json(result);

    }catch(err){
        res.status(400).send("server error");
    }
})

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
module.exports = router;