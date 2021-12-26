const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const app = express();
const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();
const UserModel = require("./models/User");

app.use(helmet());

//connexion bdd

const sequelize = new Sequelize(
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

sequelize
  .authenticate()
  .then(() => console.log("Connexion à la base de données réussie"))
  .catch((error) =>
    console.log("Impossible de se connecter à la base de données")
  );

const User = UserModel(sequelize, DataTypes);

sequelize
  .sync({ force: true })
  .then(() => console.log("Bdd gropomania bien synchronisée."));
//gestion du cors

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("test");
});

module.exports = app;
