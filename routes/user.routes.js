const express=require('express');
const UserModel=require("../models/user.model")
const bcrypt=require('bcrypt');
const jwt = require("jsonwebtoken");
require("dotenv").config()
const app=express.Router();

app.post("/register", async (req, res) => {
    const { email, pass, username, } = req.body;
  
    try {
      bcrypt.hash(pass, 5, async (err, secure_password) => {
        if (err) {
          console.log(err);
        } else {
          const user = new UserModel({ email, pass: secure_password, username,  });
          await user.save();
          res.send("Register");
        }
      });
    } catch (err) {
      res.send("eror");
      console.log(err);
    }
  });

  app.post("/login", async (req, res) => {
    const { email, pass } = req.body;
    try {
      const user = await UserModel.find({ email: email });
      console.log(user);
      const hashed_pass=user[0].pass
      if (user.length > 0) {
        bcrypt.compare(pass, hashed_pass, (err, result) => {
          // result == true
          if (result) {
            const token = jwt.sign({ userID: user[0]._id }, process.env.secretkey);
            res.send({ msg: "login sucessfull", token: token, name:user[0].username});
          } else {
            res.send(" wrong Crendnitial");
          }
        });
      } else {
        res.send(" wrong Crendnitial");
      }
    } catch (err) {
      console.log(err);
      res.send("something went wrong");
    }
  });

  module.exports = app;







  // "username":"deepkamal yadav",
  //  "email":"deep1995@gmail.com",
  //  "pass":"dk12345"

  