const { Post } = require("../database/sequelize");

module.exports = (app) => {
  app.post("/api/posts", (req, res) => {
    Post.create(req.body).then((post) => {
      const message = "Votre mesage a été créé.";
      return res.status(200).json({ message, data: post });
    });
  });
};
