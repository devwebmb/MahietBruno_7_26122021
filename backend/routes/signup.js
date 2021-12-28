const bcrypt = require("bcrypt");
const { User } = require("../database/sequelize");
const { ValidationError } = require("sequelize");

//signup

module.exports = (app) => {
  app.post("/api/auth/signup", (req, res) => {
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
            return res
              .status(400)
              .json({ message: error.message, data: error });
          }
          const message =
            "L'utilisateur n'a pas pu être créé, veuillez rééssayer dans un instant.";
          res.status(500).json({ message, data: error });
        });
    });
  });
};
