const { Comment } = require("../database/sequelize");

// Créer un commentaire sur un post
exports.addComment = (req, res, next) => {
  Comment.create(req.body).then((comment) => {
    const message = "Votre commentaire a bien été ajouté.";
    return res.status(200).json({ message, data: comment });
  });
};

// Lire les commentaires sur un post
exports.getAllComments = (req, res, next) => {
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
