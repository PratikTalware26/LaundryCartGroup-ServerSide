const jwt = require('jsonwebtoken');
module.exports = function(req,res,next){
    try{
        let usertoken = req.header('authtoken');
        if(!usertoken){
            res.status(400).send("token not found");
            res.end();
        }

        let userDecodedToken = jwt.verify(usertoken,'LaundryToken');
        req.user = userDecodedToken;
        next();
    } catch(error){
        console.log(error);
        res.status(500).send("internal server error");
        res.end();
    }
};