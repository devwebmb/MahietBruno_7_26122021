const { Post } = require("../database/sequelize");
// const fs = require("fs");

// récupérer tous les posts
exports.getAllPosts = (req, res, next) => {
  Post.findAll({
    order: [["createdAt", "DESC"]],
  }).then((posts) => {
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

// Ajouter un post
exports.addPost = (req, res, next) => {
  const message = req.body.post;
  const author = req.body.author;
  const title = req.body.title;
  const posterId = req.body.posterId;
  const file = `${req.file.filename}`;
  Post.create({
    title: title,
    author: author,
    post: message,
    posterId: posterId,
    imgUrl: `${req.protocol}://${req.get("host")}/images/${file}`,
  }).then((post) => {
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
      const message = `Le post a bien été modifié.`;
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

//Supprimer tous les posts d'un utilisateur
exports.deleteUserPosts = (req, res, next) => {
  const id = parseInt(req.params.id);
  Post.destroy({ where: { posterId: id } }).then(() => {
    const message = "Tous les posts ont été supprimés";
    return res.status(200).json({ message });
  });
};
