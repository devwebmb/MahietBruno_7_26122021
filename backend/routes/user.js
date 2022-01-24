const express = require("express");
const router = express.Router();

const userCtrl = require("../contollers/user.js");

// auth

//inscription
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

//user db

//récupérer tous les users
router.get("/", userCtrl.getAllUsers);
router.get("/:id", userCtrl.getOneUser);
router.put("/:id", userCtrl.updateUser);
router.delete("/:id", userCtrl.deleteUser);

module.exports = router;
