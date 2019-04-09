const express = require('express');
const Joi = require('joi');

const router = express.Router();

const Board = require('../db/models').board;
const List = require('../db/models').list;

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

router.get('/', (req, res, next) => {
  List.findAll({
    include: [
      {
        model: Board,
        as: 'board', // board.lists
      },
    ],
  })
    .then((lists) => {
      res.json(lists);
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

module.exports = router;
