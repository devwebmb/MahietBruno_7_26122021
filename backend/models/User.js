module.exports = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false /*information obligatoire*/,
    },
  });
};
