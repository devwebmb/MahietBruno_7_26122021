module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Comment", {
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // récupérer author avec le commenterId
    // author: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    commenterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
