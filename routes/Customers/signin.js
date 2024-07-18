const express = require("express");
const { Customer } = require("../../db/db");
const signinRoute = express.Router();
const { responseCode } = require("../../config");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config");

// Route for Signin is
/* ************** "http://localhost:3000/admin/signin" ***************/
signinRoute.post("/", async (req, res) => {
  // Getting data from the user
  const body = req.body;

  // Inserting data into the database
  const user = await Customer.findOne({
    username: body.username,
    password: body.password,
  });

  // give response to the user
  if (user) {
    const token = jwt.sign(
      {
        email: user.username,
        userId: user._id,
      },
      jwtSecret
    );
    res.status(responseCode.Success).json({
      message: "Sign in successfully!",
      token: "Bearer " + token,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server, please try again after sometime!");
  }
});

module.exports = { signinRoute };