const dotenv= require("dotenv")
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET
module.exports = function(req,res,next){
    try{
        let usertoken = req.header('authtoken');
        if(!usertoken){
            return res.status(400).send("token not found");
        }

        let userDecodedToken = jwt.verify(usertoken, secret);
        req.user = userDecodedToken;
        // console.log(req.user);
        next();
    } catch(error){
        console.log(error);
        return res.status(500).send("internal server error");
    }
};