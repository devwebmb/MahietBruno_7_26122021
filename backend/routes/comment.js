const express = require("express");
const auth = require("../auth/auth");
const router = express.Router();

const commentCtrl = require("../contollers/comment");

router.post("/", auth, commentCtrl.addComment);
router.get("/", auth, commentCtrl.getAllComments);
router.get("/:id", auth, commentCtrl.getPostComments);
router.delete("/:id", auth, commentCtrl.deleteComment);
router.delete("/post/:id", auth, commentCtrl.deletePostComments);

module.exports = router;
