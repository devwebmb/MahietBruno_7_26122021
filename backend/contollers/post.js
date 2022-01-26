const { Post } = require("../database/sequelize");

// récupérer tous les posts
exports.getAllPosts = (req, res, next) => {
  Post.findAll().then((posts) => {
    const message = "Voici tous les posts.";
    return res.status(200).json({ message, data: posts });
  });
};

//Récupérer un post
exports.getOnePost = (req, res, next) => {
  Post.findByPk(req.params.id).then((post) => {
    const message = "Voici le post choisi.";
    return res.status(200).json({ message, data: post });
  });
};

// Ajouter un poste
exports.addPost = (req, res, next) => {
  Post.create(req.body).then((post) => {
    const message = "Votre mesage a été créé.";
    return res.status(201).json({ message, data: post });
  });
};

//Modifier un post
exports.updatePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  Post.update(req.body, {
    where: {
      id: id,
    },
  }).then(() => {
    Post.findByPk(id).then((post) => {
      const message = `Le post ${post.title} a bien été modifié.`;
      return res.status(200).json({ message, data: post });
    });
  });
};

//Supprimer un post
exports.deletePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  Post.findByPk(id).then((post) => {
    post.destroy().then(() => {
      const message = "Le post a bien été supprimé.";
      return res.status(200).json({ message });
    });
  });
};
