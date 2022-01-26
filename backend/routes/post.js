const express = require("express");
const auth = require("../auth/auth");
const router = express.Router();

const postCtrl = require("../contollers/post");

router.get("/", auth, postCtrl.getAllPosts);
router.get("/:id", auth, postCtrl.getOnePost);
router.post("/", auth, postCtrl.addPost);
router.put("/:id", postCtrl.updatePost);
router.delete("/:id", auth, postCtrl.deletePost);

module.exports = router;
