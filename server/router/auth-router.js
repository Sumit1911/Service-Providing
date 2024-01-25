const express = require("express");
// import express from "express";
const router = express.Router();
// const {home, register} = require("../controllers/auth-controller");
// instead of home,register,... will use "authControllers" 
const authControllers = require("../controllers/auth-controller");
const {signupSchema} = require("../validators/auth-validator");
const {loginSchema} = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth-middleware");

// router.get("/", (req, res) => {
//     res.status(200).send("Lets start building "MERN" App");
// });

router.route("/").get(authControllers.home);

router.route("/register").post(validate(signupSchema), authControllers.register);

router.route("/login").post(validate(loginSchema), authControllers.login);

router.route("/user").get(authMiddleware, authControllers.user);


module.exports = router;