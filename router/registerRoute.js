const express = require("express");
const registerModel = require("../models/registerModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const router = express.Router();
router.use(express.json());

const saltRounds = 10;
const secret = "LaundryToken";

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

//LOGIN
router.get("/login", async (req, res) => {
  try {
    const userExist = await registerModel.findOne({ Email: req.body.Email });
    if (!userExist) {
      return res.status(500).send("Please input valid email or register");
    }

    bcrypt.compare(
      req.body.Password,
      userExist.Password,
      function (err, result) {
        // result == true
        try {
          if (err) {
            return res.status(400).send("Error:", err.message);
          }
          if (result) {
            const token = jwt.sign(
              {
                exp: Math.floor(Date.now() / 1000) + 60 * 60,
                data: "foobar",
              },
              secret
            );

            return res.status(200).send({
                status: "Success",
                token: token,
              });
          }
          
        } catch (error) {
          return res.status(400).send("Error:", error.message);
        }
      }
    );
  } catch (error) {
    return res.status(400).send("Error:", error.message);
  }
});

module.exports = router;
