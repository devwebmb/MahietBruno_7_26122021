const bcrypt = require("bcrypt");
const { User } = require("../database/sequelize");

//signup

module.exports = (app) => {
  app.post("/api/auth/signup", (req, res) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
      User.create({
        email: req.body.email,
        pseudo: req.body.pseudo,
        password: hash,
        isAdmin: req.body.isAdmin,
      }).then((user) => {
        const message = `L'utilisateur ${req.body.pseudo} a bien été créé.`;
        res.json({ message, data: user });
      });
    });
  });
};
