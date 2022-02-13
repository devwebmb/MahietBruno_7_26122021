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
        notNull: { msg: "Veuillez entrer une adresse mail." },
        is: {
          args: /^[^<>{}()=+,:&$#"'\(\)\_\-\[\]!?§\/]+$/g,
          msg: "Votre champs adresse email ne doit pas contenir de caractères spéciaux .",
        },
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
        notNull: {
          msg: "Avoir un pseudo est obligatoire, veuillez entrer un pseudo.",
        },
        is: {
          args: /^[^<>{}()=+,.:&$#"'\(\)\_\-\[\]!?§\/]+$/g,
          msg: "Votre champs pseudo ne doit pas contenir de caractères spéciaux .",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Veuillez entrer un mot de passe." },
      },
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};
