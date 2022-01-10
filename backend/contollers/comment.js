const { Comment } = require("../database/sequelize");

exports.addComment = (req, res, next) => {
  Comment.create(req.body).then((comment) => {
    const message = "Votre commentaire a bien été ajouté.";
    return res.status(200).json({ message, data: comment });
  });
};
