const bcrypt = require("bcrypt");
const { User } = require("../database/sequelize");
const { Post } = require("../database/sequelize");
const { Comment } = require("../database/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");
const jwt = require("jsonwebtoken");
const privateKey = require("../middlewares/private_keys");

// inscription
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    User.create({
      email: req.body.email,
      pseudo: req.body.pseudo,
      password: hash,
    })
      .then((user) => {
        const message = `L'utilisateur ${req.body.pseudo} a bien été créé.`;
        res.status(201).json({ message, data: user });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message =
          "L'utilisateur n'a pas pu être créé, veuillez rééssayer dans un instant.";
        res.status(500).json({ message, data: error });
      });
  });
};

// connexion
exports.login = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        const message = "L'utilisateur n'éxiste pas.";
        return res.status(404).json({ message });
      }
      bcrypt.compare(req.body.password, user.password).then((valid) => {
        if (!valid) {
          const message = "Le mot de passe est incorrect";
          return res.status(401).json({ message });
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
      return res.status(500).json({ message, data: error });
    });
};

// CRUD USER
//Récupérer tous les users
exports.getAllUsers = (req, res, next) => {
  User.findAll({ attributes: { exclude: ["password"] } })
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      const message =
        "La récupération de tous les utilisateurs a échoué, veuillez réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
};

//Récupérer un seul utilisateur
exports.getOneUser = (req, res, next) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
    attributes: { exclude: ["password"] },
  })
    .then((user) => {
      if (!user) {
        const message =
          "L'utilisateur demandé n'existe pas, veuillez réessayer avec un autre identifiant.";
        return res.status(404).json({ message });
      }
      res.status(200).json(user);
    })
    .catch((error) => {
      const message =
        "La récupération de l'utilisateur a échoué, veuillez réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
};

// update user
exports.updateUser = (req, res, next) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ err: "id inconnu" });
      }
      bcrypt.hash(req.body.password, 10).then((hash) => {
        user
          .update({
            pseudo: req.body.pseudo,
            email: req.body.email,
            password: hash,
          })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            const message =
              "La modification d'un utilisateur a échoué, veuillez réessayer dans quelques instants.";
            res.status(500).json({ message, data: error });
          });
      });
    })
    .catch((error) => {
      const message =
        "La modification d'un utilisateur a échoué, veuillez réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
};

//Delete user

exports.deleteUser = (req, res, next) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ err: "id inconnu" });
      }
      user.destroy().then(() => {
        Post.destroy({ where: { posterId: req.params.id } })
          .then(() => {
            Comment.destroy({ where: { commenterId: req.params.id } })
              .then(() => {
                const message =
                  "L'utilisateur, ses posts et ses commentaires ont été supprimés";
                return res.status(200).json({ message });
              })
              .catch((error) => {
                const message =
                  "La modification d'un utilisateur a échoué, veuillez réessayer dans quelques instants.";
                res.status(500).json({ message, data: error });
              });
          })
          .catch((error) => {
            const message =
              "La modification d'un utilisateur a échoué, veuillez réessayer dans quelques instants.";
            res.status(500).json({ message, data: error });
          });
      });
    })
    .catch((error) => {
      const message =
        "La modification d'un utilisateur a échoué, veuillez réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
};
