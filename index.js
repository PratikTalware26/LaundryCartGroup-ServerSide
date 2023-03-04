const express = require("express");
const app = express();
const dotenv = require("dotenv");
const port = 8081;
const { default: mongoose } = require('mongoose');
const registerRoute= require("./router/registerRoute")

// const bodyparser = require("body-parser");

var jwt = require('jsonwebtoken');
const cors= require("cors")
app.use(cors())
app.use(cors({ origin: "*" }));

const connection = require("./connection/connection");
const Order = require("./models/orderModel");
const User = require("./models/registerModel");
const ProductType = require("./models/productTypeModel");
dotenv.config();
connection();

mongoose.connection.on("connected",()=>console.log("connected to mongoDB"))
mongoose.connection.on("error",()=>console.log("failed to connect mongoDB"))


app.use(express.json());
app.use(require('./router/routes'))

app.use(registerRoute)

app.listen(port, ()=>{
    console.log(`server is up at port ${port}`);
});