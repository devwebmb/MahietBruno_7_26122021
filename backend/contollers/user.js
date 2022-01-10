const bcrypt = require("bcrypt");
const { User } = require("../database/sequelize");
const { ValidationError } = require("sequelize");
const jwt = require("jsonwebtoken");
const privateKey = require("../auth/private_keys");

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    User.create({
      email: req.body.email,
      pseudo: req.body.pseudo,
      password: hash,
      isAdmin: req.body.isAdmin,
    })
      .then((user) => {
        const message = `L'utilisateur ${req.body.pseudo} a bien été créé.`;
        res.json({ message, data: user });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message =
          "L'utilisateur n'a pas pu être créé, veuillez rééssayer dans un instant.";
        res.status(500).json({ message, data: error });
      });
  });
};

exports.login = (req, res, next) => {
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
};
