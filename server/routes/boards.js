const express = require('express');
const Joi = require('joi');

const router = express.Router();

const User = require('../db/models').user;
const Board = require('../db/models').board;

// every new board MUST meet these requirements.
const schema = Joi.object().keys({
  title: Joi.string()
    .trim()
    .required(),
  background: Joi.string()
    .trim()
    .required(),
  ownerId: Joi.number()
    .integer()
    .required(),
});

router.get('/', (req, res, next) => {
  Board.findAll({
    include: [
      {
        model: User,
        as: 'owner', // board.owner
      },
    ],
  })
    .then((users) => {
      res.json(users);
    })
    .catch((e) => next({ message: e.message }));
});

router.post('/', (req, res, next) => {
  const result = Joi.validate(req.body, schema);

  // if req.body is not valid.
  if (result.error !== null) {
    res.status(422);
    next({ message: result.error.message });
  } else {
    // new board
    const newBoard = {
      ...req.body,
    };
    // insert board into the database.
    Board.create(newBoard)
      // send to newly created board to the client.
      .then((board) => {
        res.status(201); // created
        res.json(board);
      })
      // if the board failed to be created.
      .catch((e) => next({ message: e.message }));
  }
});

module.exports = router;
