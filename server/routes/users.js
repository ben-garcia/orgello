const express = require('express');

const router = express.Router();

const User = require('../db/models').user;
const Board = require('../db/models').board;

const {
  validateParam,
  isTokenPresent,
  verifyToken,
} = require('../middlewares/users');

// return all users and their boards
router.get('/', (req, res, next) => {
  User.findAll({
    include: [
      {
        model: Board,
        as: 'boards', // user.boards
      },
    ],
  })
    .then((users) => {
      res.json(users);
    })
    .catch((e) => next({ message: e.message }));
});

// delete a user from the db
router.delete(
  '/:userId',
  validateParam,
  isTokenPresent,
  verifyToken,
  (req, res, next) => {
    User.destroy({
      where: {
        id: req.user.id,
      },
    })
      .then((user) => {
        res.json({ message: 'User has been deleted', user });
      })
      .catch((e) => next({ message: e.message }));
  },
);

module.exports = router;
