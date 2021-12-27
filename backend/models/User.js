module.exports = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Cet adresse mail est déjà utilisée.",
      },
    },
    pseudo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Ce pseudo est déjà utilisé.",
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
    },
  });
};
