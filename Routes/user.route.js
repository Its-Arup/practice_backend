const express = require("express");
const { UserModel } = require("../Models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

// this is new user register Route

userRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(200).send({ msg: "user is already registered please login" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.status(400).send({ msg: "error durirng hashing password" });
        } else {
          const newUser = await new UserModel(req.body);
          newUser.username = username;
          newUser.email = email;
          newUser.password = hash;
          await newUser.save();
          res
            .status(200)
            .send({ msg: "new user is now registered", user: req.body });
        }
      });
    }
  } catch (error) {
    res.status(400).send({ msg: "registration failed !! please try again" });
  }
});

// this is login Route

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(200).send({ "msg": "invalid login ID or password" });
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          jwt.sign(
            { username: user.username, userID: user._id },
            "arup",
            (err, token) => {
              if (token) {
                res
                  .status(200)
                  .send({ "msg": "user login successful", "token": token });
              }
            }
          );
        } else {
          res.status(200).send({ "msg": "invalid login ID or password" });
        }
      });
    }
  } catch (error) {
    res.status(400).semd({ "msg": "errror during login" });
  }
});

module.exports = {
  userRouter,
};
