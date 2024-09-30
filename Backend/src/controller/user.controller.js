const { userModel } = require("../model/users.model");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// jwt.sign("payload", "secret key", "expire")

// secret key
const secretKey = process.env.SECRET_KEY;

// backlist
const backlist = [];

// used hash in our signup router
async function userSignupController(username, email, password) {
  // hash
  const hash = await argon2.hash(password);
  // console.log(username, password, email);

  try {
    const user = await userModel.create({ username, email, password: hash });

    // res.status(201).send({ msg: "User Signup Successfuly" })
    return {
      status: 201,
      payload: { msg: "User Signup Successfuly" },
    };
  } catch (error) {
    // res.status(403).send({ msg: error.message })
    return {
      status: 403,
      payload: { msg: error.message },
    };
  }
}

async function userLoginController(email, password) {
  try {
    const user = await userModel.findOne({ email });
    const hashPassword = user.password;
    // console.log(hashPassword)
    const check = await argon2.verify(hashPassword, password);
    // console.log(check)
    if (check) {
      const token = jwt.sign({ id: user._id, email: user.email }, secretKey, { expiresIn: "7d" });
      // res.status(201).send({ msg: "Login Successfully", token })
      return {
        status: 201,
        payload: { msg: "Login Successfully", token },
      };
    } else {
      // res.status(401).send({ msg: "Password Wrong" })
      return {
        status: 401,
        payload: { msg: "Password Wrong" },
      };
    }
  } catch (error) {
    // res.status(404).send({ msg: error.message })
    return {
      status: 401,
      payload: { msg: error.message },
    };
  }
}

function userLogoutController(token) {
  if (!token) {
    return {
      status: 404,
      payload: { msg: "Token Not Found" },
    };
  }
  backlist.push(token);
  // res.send({ msg: "Logout Successfull" })
  return {
    status: 201,
    payload: { msg: "Logout Successfull" },
  };
}

async function userGetUserController(token) {
  // check Logout
  let checkLogout = backlist.includes(token);
  // console.log(checkLogout)
  if (checkLogout) {
    // return res.send({ msg: "Token Alreday Expired" })
    return {
      status: 401,
      payload: { msg: "Token Alreday Expired" },
    };
  }

  if (!token) {
    // return res.status(404).send({ msg: "Token No Found" })
    return {
      status: 404,
      payload: { msg: "Token No Found" },
    };
  }

  try {
    const verify = jwt.verify(token, secretKey);
    // res.send(verify)
    const user = await userModel.findById(verify.id);
    // res.send({ username: user.username, role: user.role, email: user.email });
    return {
      status: 201,
      payload: { username: user.username, role: user.role, email: user.email },
    };
  } catch (error) {
    if (error.message === "jwt expired") {
      backlist.push(token);
    }
    // res.status(401).send({ msg: error.message })
    return {
      status: 401,
      payload: { msg: error.message },
    };
  }
}

module.exports = { userSignupController, userLoginController, userLogoutController, userGetUserController };
