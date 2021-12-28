const { Post } = require("../database/sequelize");

module.exports = (app) => {
  app.delete("/api/posts/:id", (req, res) => {
    Post.findByPk(req.params.id)
      .then((post) => {
        if (userId === req.body.userId) {
          const postDeleted = post;
          Post.destroy({ where: { id: post.id } });
        }
      })
      .then(() => {
        const message = "Votre post a bien été supprimé.";
        return res.status(200).json({ message });
      });
  });
};
