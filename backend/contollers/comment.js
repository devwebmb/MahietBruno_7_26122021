const { Comment } = require("../database/sequelize");

// Créer un commentaire sur un post
exports.addComment = (req, res, next) => {
  Comment.create(req.body).then((comment) => {
    const message = "Votre commentaire a bien été ajouté.";
    return res.status(200).json({ message, data: comment });
  });
};

// récupérer tous les commentaires
exports.getAllComments = (req, res, next) => {
  Comment.findAll().then((comments) => {
    const message = "Voici tous les commentaires.";
    return res.status(200).json({ message, data: comments });
  });
};

// Lire les commentaires sur un post
exports.getPostComments = (req, res, next) => {
  const id = req.params.id;
  Comment.findAll({
    where: {
      postId: id,
    },
  }).then((comments) => {
    res.status(200).json({ comments });
  });
};

// Supprimer un commentaire
exports.deleteComment = (req, res, next) => {
  const id = parseInt(req.params.id);
  Comment.findByPk(id).then((comment) => {
    comment.destroy().then(() => {
      const message = "Le commentaire a bien été supprimé";
      return res.status(200).json({ message });
    });
  });
};

// Supprimer tous les commentaires d'un post
exports.deletePostComments = (req, res, next) => {
  const id = parseInt(req.params.id);
  Comment.destroy({ where: { postId: id } }).then(() => {
    const message = "les commentaires ont été supprimés.";
    return res.status(200).json({ message });
  });
};
