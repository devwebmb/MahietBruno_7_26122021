module.exports = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Cet adresse mail est déjà utilisée.",
      },
      validate: {
        isEmail: { msg: "Veuillez entrer une adresse mail au bon format." },
      },
    },
    pseudo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Ce pseudo est déjà utilisé.",
      },
      validate: {
        len: {
          args: [4, 16],
          msg: "Votre pseudo doit comporter entre 4 et 16 caractères.",
        },
        is: {
          args: /^[\wéè^éàôïù]+$/g,
          msg: "Les caractères spéciaux et les espaces ne sont pas autorisés dans le pseudo.",
        },
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
