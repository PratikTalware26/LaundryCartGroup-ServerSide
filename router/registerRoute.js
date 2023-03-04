const express = require("express");
const registerModel = require("../models/registerModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();
router.use(express.json());

const saltRounds = 10;
const secret= process.env.SECRET

//REGISTER
router.post("/register", async (req, res) => {
  try {
    // console.log(req.body)
    const user = await registerModel.findOne({ Email: req.body.Email });

    if (user) {
      return res
        .status(500)
        .send(
          "Email already exists. Please input other email or try to signIn !"
        );
    }
    bcrypt.hash(req.body.Password, saltRounds, async function (err, hash) {
      // Store hash in your password DB.
      try {
        if (err) {
          return res.status(400).send("Error:", err.message);
        }
        // console.log(req.body, hash)
        await registerModel.create({
          Name: req.body.Name,
          Email: req.body.Email,
          Phone: req.body.Phone,
          District: req.body.District,
          State: req.body.State,
          Address: req.body.Address,
          Pincode: req.body.Pincode,
          Password: hash,
        });
        return res.status(200).send("Success");
      } catch (err) {
        return res.status(500).send(err.message);
      }
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});


//login
router.post("/login", async (req, res) => {
  try {
    let userExist;
    if(parseInt(req.body.Email)){
      let phoneNo= parseInt(req.body.Email)
      // console.log(phoneNo)
       userExist = await registerModel.findOne({ Phone: phoneNo });
    }else{
      userExist = await registerModel.findOne({ Email: req.body.Email });
    }
    

    if (!userExist) {
      return res.status(500).send("Please input valid email/Phone or register");
    }

    bcrypt.compare(
      req.body.Password,
      userExist.Password,
      function (err, result) {
        // result == true
        if (err) {
          return res.status(500).send("Invalid Password");
        }
        if (result) {
          let userPayload = { userId: userExist.id };
          jwt.sign(userPayload, secret, { expiresIn: "1h" }, (error, Token) => {
            if (error) {
              console.log(error);
              return res.status(400).send("Error in the token generation");
            } else {
              return res
                .status(200)
                .send({ status: "Sucess", token: Token, userData: userExist });
            }
          });
        }
      }
    );
  } catch (err) {
    //console.log(err)
    return res.status(500).send("Server error");
  }
});

module.exports = router;