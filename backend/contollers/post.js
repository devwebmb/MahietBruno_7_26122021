const { Post } = require("../database/sequelize");

exports.addPost = (req, res, next) => {
  Post.create(req.body).then((post) => {
    const message = "Votre mesage a été créé.";
    return res.status(200).json({ message, data: post });
  });
};

exports.getOnePost = (req, res, next) => {
  Post.findByPk(req.params.id).then((post) => {
    const message = "Voici le post choisi.";
    return res.status(200).json({ message, data: post });
  });
};

exports.getAllPosts = (req, res, next) => {
  Post.findAll().then((posts) => {
    const message = "Voici tous les posts.";
    return res.status(200).json({ message, data: posts });
  });
};

exports.deletePost = (req, res, next) => {
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
};

exports.updatePost = (req, res, next) => {
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
};
