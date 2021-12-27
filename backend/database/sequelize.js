const { Sequelize, DataTypes } = require("sequelize");
const UserModel = require("../models/User");
const PostModel = require("../models/Post");
require("dotenv").config();

const dataBase = new Sequelize(
  `${process.env.DB_NAME}`,
  `${process.env.DB_USER}`,
  `${process.env.DB_PASSWORD}`,
  {
    host: `${process.env.DB_HOST}`,
    dialect: "mariadb",
    dialectOptions: {
      timezone: "Etc/GMT-2",
    },
    login: false,
  }
);

dataBase
  .authenticate()
  .then(() => console.log("Connexion à la base de données réussie"))
  .catch((error) =>
    console.log("Impossible de se connecter à la base de données")
  );

const Post = PostModel(dataBase, DataTypes);
const User = UserModel(dataBase, DataTypes);

const initDb = () => {
  return dataBase.sync({ force: true }).then(() => {
    User.create({
      email: "gege@gmail.com",
      pseudo: "gege",
      password: "gege",
      isAdmin: true,
    }).then((user) => console.log(user.toJSON()));
    console.log("la base de données est initialisée.");
  });
};

module.exports = { initDb, User, Post };