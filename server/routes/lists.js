const express = require('express');
const Joi = require('joi');

const router = express.Router();

const Board = require('../db/models').board;
const List = require('../db/models').list;
const Card = require('../db/models').card;

const {
  validateParam,
  isTokenPresent,
  verifyToken,
} = require('../middlewares/users');
const {
  validateListHasCorrectBodyContents,
  checkListOwnerIdMatchesUserId,
} = require('../middlewares/lists');

// every new list MUST meet these requirements.
const schema = Joi.object().keys({
  title: Joi.string()
    .trim()
    .required(),
  order: Joi.number()
    .integer()
    .required(),
  archived: Joi.boolean(),
  boardId: Joi.number()
    .integer()
    .required(),
});

// get all lists along with its board and cards
router.get('/', (req, res, next) => {
  List.findAll({
    include: [
      {
        model: Board,
        as: 'board', // list.board
      },
      {
        model: Card,
        as: 'cards', // list.cards
      },
    ],
  })
    .then((lists) => {
      res.json(lists);
    })
    .catch((e) => next({ message: e.message }));
});

// create a list and add it to the db
router.post('/', (req, res, next) => {
  const result = Joi.validate(req.body, schema);

  // if req.body is not valid.
  if (result.error !== null) {
    res.status(422);
    next({ message: result.error.message });
  } else {
    // new List
    const newList = {
      ...req.body,
    };
    // insert list into the database.
    List.create(newList)
      // send to newly created list to the client.
      .then((list) => {
        res.status(201); // created
        res.json(list);
      })
      // if the list failed to be created.
      .catch((e) => next({ message: e.message }));
  }
});

// update the list with the given id using property/properties
// in req.body
router.put(
  '/:listId',
  validateParam,
  isTokenPresent,
  verifyToken,
  validateListHasCorrectBodyContents,
  checkListOwnerIdMatchesUserId,
  (req, res, next) => {
    List.update(req.body, {
      where: {
        id: req.params.listId,
      },
    })
      .then((updatedList) => {
        res.json({ message: 'list updated', updatedList });
      })
      .catch((e) => next({ message: e.message }));
  },
);

module.exports = router;
