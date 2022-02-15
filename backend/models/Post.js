module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Veuillez entrer un titre au post." },
        is: {
          args: /^[^<>{}()=+&$#\_\[\]§\/]+$/g,
          msg: "Votre champs titre  ne doit pas contenir certains caractères spéciaux (<>{}[]=+$&#_) .",
        },
      },
    },
    post: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: "Veuillez entrer du contenu au post." },
        is: {
          args: /^[^<>{}=+&$#\_\-\[\]§\/]+$/g,
          msg: "Vos champs message ne doit pas contenir certains caractères spéciaux (<>{}[]=+$&#_).",
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
    imgUrl: {
      type: DataTypes.STRING,
    },
    commentsCount: {
      type: DataTypes.STRING,
      defaultValue: 0,
    },
  });
};
