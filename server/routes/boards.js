const express = require('express');
const Joi = require('joi');

const router = express.Router();

const User = require('../db/models').user;
const Board = require('../db/models').board;
const List = require('../db/models').list;

const {
  validateParam,
  isTokenPresent,
  validateUser,
} = require('../middlewares/users');
const {
  validateBoardHasCorrectBodyContents,
  checkBoardOwnerIdMatchesUserId,
} = require('../middlewares/boards');

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

// get all the boards including models associated with each
// the user(owner) and lists
router.get('/', (req, res, next) => {
  Board.findAll({
    include: [
      {
        model: User,
        as: 'owner', // board.owner
      },
      {
        model: List,
        as: 'lists',
      },
    ],
  })
    .then((users) => {
      res.json(users);
    })
    .catch((e) => next({ message: e.message }));
});

// create a new board and validate before adding it to the db.
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

// update the board with the given id using property/properties
// in req.body
router.put(
  '/:boardId',
  validateParam,
  isTokenPresent,
  validateUser,
  validateBoardHasCorrectBodyContents,
  checkBoardOwnerIdMatchesUserId,
  (req, res, next) => {
    Board.update(req.body, {
      where: {
        id: req.user.id,
      },
    })
      .then((updatedBoard) => {
        res.json({ message: 'board updated', updatedBoard });
      })
      .catch((e) => next({ message: e.message }));
  },
);

module.exports = router;
