const { Post } = require("../database/sequelize");

module.exports = (app) => {
  app.get("/api/posts", (req, res) => {
    Post.findAll().then((posts) => {
      const message = "Voici tous les posts.";
      return res.status(200).json({ message, data: posts });
    });
  });
};
