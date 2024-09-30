const express = require("express");
const router = express.Router();
const {
  userSignupController,
  userLoginController,
  userLogoutController,
  userGetUserController,
} = require("../controller/user.controller");

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  // console.log(username, email, password);

  let data = await userSignupController(username, email, password);

  res.status(data.status).send(data.payload);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let data = await userLoginController(email, password);
  res.status(data.status).send(data.payload);
});

router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  const { token } = req.headers;

  let data = await userGetUserController(token);
  res.status(data.status).send(data.payload);
});

router.post("/logout", (req, res) => {
  const { token } = req.headers;
  let data = userLogoutController(token);
  res.status(data.status).send(data.payload);
});

module.exports = { router };
