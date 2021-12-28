module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Comment", {
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
