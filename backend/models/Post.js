module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
