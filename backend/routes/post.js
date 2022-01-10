const express = require("express");
const router = express.Router();

const postCtrl = require("../contollers/post");

router.post("/posts", postCtrl.addPost);
router.get("/posts", postCtrl.getAllPosts);
router.get("/posts/:id", postCtrl.getOnePost);
router.delete("/posts/:id", postCtrl.deletePost);
router.put("/posts", postCtrl.updatePost);

module.exports = router;
