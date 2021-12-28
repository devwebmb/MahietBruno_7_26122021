const { Post } = require("../database/sequelize");

module.exports = (app) => {
  app.get("/api/posts/:id", (req, res) => {
    Post.findByPk(req.params.id).then((post) => {
      const message = "Voici le post choisi.";
      return res.status(200).json({ message, data: post });
    });
  });
};
