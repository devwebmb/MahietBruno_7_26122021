const express = require("express");
const router = express.Router();

const commentCtrl = require("../contollers/comment");

router.post("/comments", commentCtrl.addComment);

module.exports = router;
