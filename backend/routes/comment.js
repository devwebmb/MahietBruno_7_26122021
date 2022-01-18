const express = require("express");
const router = express.Router();

const commentCtrl = require("../contollers/comment");

router.post("/", commentCtrl.addComment);
router.get("/:id", commentCtrl.getAllComments);
router.delete("/:id", commentCtrl.deleteComment);

module.exports = router;
