const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const postsRoutes = require("./routes/post");
const commentsRoutes = require("./routes/comment.js");
const app = express();
const sequelize = require("./database/sequelize");

app.use(helmet());

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

sequelize.initDb();

app.use("/api/user", userRoutes);
app.use("/api", postsRoutes);
app.use("/api", commentsRoutes);

module.exports = app;
