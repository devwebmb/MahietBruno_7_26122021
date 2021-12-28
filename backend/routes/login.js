const bcrypt = require("bcrypt");
const { User } = require("../database/sequelize");
const jwt = require("jsonwebtoken");
const privateKey = require("../auth/private_keys");

module.exports = (app) => {
  app.post("/api/auth/login", (req, res) => {
    User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: "Utilisateur non trouvé." });
        }
        bcrypt.compare(req.body.password, user.password).then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect." });
          }
          const token = jwt.sign({ userId: user.id }, privateKey, {
            expiresIn: "24h",
          });
          const message = "L'utilisateur a été connecté avec succès";
          return res.status(200).json({ message, data: user, token });
        });
      })
      .catch((error) => {
        const message =
          "L'utilisateur n'a pas pu être connecté, réessayez dans un instant.";
        return res.json({ message, data: error });
      });
  });
};
