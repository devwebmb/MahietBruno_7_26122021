module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post: {
      type: DataTypes.TEXT,
      allowNull: false,
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
