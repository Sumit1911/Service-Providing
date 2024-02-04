const express = require("express");
// const getAllUsers = require("../controllers/admin-controller");
// const getAllContacts = require("../controllers/contact-controller");
const adminMiddleware = require("../middlewares/admin-middleware");
const adminController = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware");

const router = express.Router();

router.route("/users").get(authMiddleware, adminController.getAllUsers);

router.route("/users/delete/:id").delete(authMiddleware, adminController.deleteUserById);

router.route("/contacts").get(authMiddleware, adminMiddleware, adminController.getAllContacts);

module.exports = router;