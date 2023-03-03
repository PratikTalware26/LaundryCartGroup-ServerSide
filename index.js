const express = require("express");
const app = express();
const dotenv = require("dotenv");
const port = 8081;
const { default: mongoose } = require('mongoose');
const registerRoute= require("./router/registerRoute")

var jwt = require('jsonwebtoken');
const cors= require("cors")
app.use(cors())

const connection = require("./connection/connection");
const Order = require("./models/orderModel");
const User = require("./models/registerModel");
const ProductType = require("./models/productTypeModel");
dotenv.config();
connection();

mongoose.connection.on("connected",()=>console.log("connected to mongoDB"))
mongoose.connection.on("error",()=>console.log("failed to connect mongoDB"))

const secret = "LaundryToken";

app.use("/postorder", (req, res, next)=>{
    try {
        const token= req.headers.authorization

        if(token){
            jwt.verify(token, secret, function(err, decoded) {
                // console.log(decoded.data) // bar
                if(err){
                    return res.status(500).json({Error:err.message})
                }
                req.user= decoded.data
                next()
              });

        }else{
            return res.status(500).json({
                message:"Invalid Token"
            })
        }

    } catch (error) {
        return res.status(400).json({Error: error.message})
    }
})


app.use(express.json());
app.use(require('./router/routes'))

app.use(registerRoute)

app.listen(port, ()=>{
    console.log(`server is up at port ${port}`);
});