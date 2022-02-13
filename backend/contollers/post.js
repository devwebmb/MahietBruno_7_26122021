const { Post } = require("../database/sequelize");
const { ValidationError } = require("sequelize");
const fs = require("fs");

// récupérer tous les posts
exports.getAllPosts = (req, res, next) => {
  Post.findAll({
    order: [["createdAt", "DESC"]],
  })
    .then((posts) => {
      const message = "Voici tous les posts.";
      return res.status(200).json({ message, data: posts });
    })
    .catch((error) => {
      const message =
        "La récupération de tous les posts a échoué, veuillez réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
};

//Récupérer un post
exports.getOnePost = (req, res, next) => {
  Post.findByPk(req.params.id)
    .then((post) => {
      if (post === null) {
        const message =
          "le post demandé n'existe pas. Réessayer avec un autre identifiant de post.";
        res.status(404).json({ message });
      }
      const message = "Voici le post choisi.";
      return res.status(200).json({ message, data: post });
    })
    .catch((error) => {
      const message =
        "La récupération du post a échoué, veuillez réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
};

// Ajouter un post
exports.addPost = (req, res, next) => {
  const message = req.body.post;
  const author = req.body.author;
  const title = req.body.title;
  const posterId = req.body.posterId;
  if (req.file) {
    const file = `${req.file.filename}`;
    Post.create({
      title: title,
      author: author,
      post: message,
      posterId: posterId,
      imgUrl: `${req.protocol}://${req.get("host")}/images/${file}`,
    })
      .then((post) => {
        const message = "Votre mesage a été créé.";
        return res.status(201).json({ message, data: post });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          res.status(400).json({ message: error.message, data: error });
        }
        const message =
          "L'ajout du post a échoué, veuillez réessayer dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  } else {
    Post.create({
      title: title,
      author: author,
      post: message,
      posterId: posterId,
    })
      .then((post) => {
        const message = "Votre mesage a été créé.";
        return res.status(201).json({ message, data: post });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          res.status(400).json({ message: error.message, data: error });
        }
        const message =
          "L'ajout du post a échoué, veuillez réessayer dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  }
};

//Modifier un post
exports.updatePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = req.body.post;
  Post.findByPk(id)
    .then((post) => {
      if (post === null) {
        const message =
          "le post demandé n'existe pas, veuilez réessayer avec un autre identifiant.";
        res.status(404).json({ message });
      }
      if (post.imgUrl) {
        const filename = post.imgUrl.split("/images")[1];
        fs.unlink(`images/${filename}`, () => {});
      }
    })
    .catch((error) => {
      const message =
        "La modification du post a échoué, veuillez réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
  if (req.file) {
    const file = `${req.file.filename}`;
    Post.update(
      {
        post: post,
        imgUrl: `${req.protocol}://${req.get("host")}/images/${file}`,
      },
      {
        where: {
          id: id,
        },
      }
    )
      .then(() => {
        Post.findByPk(id)
          .then((post) => {
            const message = `Le post a bien été modifié.`;
            return res.status(200).json({ message, data: post });
          })
          .catch((error) => {
            const message =
              "La modification du post a échoué, veuillez réessayer dans quelques instants.";
            res.status(500).json({ message, data: error });
          });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          res.status(400).json({ message: error.message, data: error });
        }
        const message =
          "La modification du post a échoué, veuillez réessayer dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  } else {
    Post.update(
      {
        post: post,
        imgUrl: "",
      },
      {
        where: {
          id: id,
        },
      }
    )
      .then(() => {
        Post.findByPk(id).then((post) => {
          const message = `Le post a bien été modifié.`;
          return res.status(200).json({ message, data: post });
        });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          res.status(400).json({ message: error.message, data: error });
        }
        const message =
          "La modification du post a échoué, veuillez réessayer dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  }
};

//Supprimer un post
exports.deletePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  Post.findByPk(id)
    .then((post) => {
      if (post.imgUrl) {
        const filename = post.imgUrl.split("/images")[1];
        fs.unlink(`images/${filename}`, () => {
          post
            .destroy()
            .then(() => {
              const message = "Le post a bien été supprimé.";
              return res.status(200).json({ message });
            })
            .catch((error) => {
              const message =
                "La suppression du post a échoué, veuillez réessayer dans quelques instants.";
              res.status(500).json({ message, data: error });
            });
        });
      } else {
        post
          .destroy()
          .then(() => {
            const message = "Le post a bien été supprimé.";
            return res.status(200).json({ message });
          })
          .catch((error) => {
            const message =
              "La suppression du post a échoué, veuillez réessayer dans quelques instants.";
            res.status(500).json({ message, data: error });
          });
      }
    })
    .catch((error) => {
      const message =
        "La suppression du post a échoué, veuillez réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
};

//Supprimer tous les posts d'un utilisateur
exports.deleteUserPosts = (req, res, next) => {
  const id = parseInt(req.params.id);
  Post.destroy({ where: { posterId: id } })
    .then(() => {
      const message = "Tous les posts ont été supprimés";
      return res.status(200).json({ message });
    })
    .catch((error) => {
      const message =
        "La suppression des posts de l'utilisateur a échoué, veuillez réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
};
