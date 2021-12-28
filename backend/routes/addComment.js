const { Comment } = require("../database/sequelize");

module.exports = (app) => {
  app.post("/api/comments", (req, res) => {
    Comment.create(req.body).then((comment) => {
      const message = "Votre commentaire a bien été ajouté.";
      return res.status(200).json({ message, data: comment });
    });
  });
};
