const { Post } = require("../database/sequelize");

module.exports = (app) => {
  app.put("/api/posts", (req, res) => {
    const id = req.params.id;
    Post.update(req.body, {
      where: {
        id: id,
      },
    }).then(() => {
      Post.findByPk(id).then((post) => {
        const message = `Le post ${post.title} a bie été modifié.`;
        return res.status(200).json({ message, data: post });
      });
    });
  });
};
