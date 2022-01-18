module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 30],
          msg: "Le titre de votre post doit contenir entre 3 et 30 caractères",
        },
      },
    },
    post: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [3, 3000],
          msg: "Le contenu de votre post doit contenir entre 3 et 3000 caractères",
        },
      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    posterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
