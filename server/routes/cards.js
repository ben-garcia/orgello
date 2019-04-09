const express = require('express');
const Joi = require('joi');

const router = express.Router();

const List = require('../db/models').list;
const Card = require('../db/models').card;

// every new card MUST meet these requirements.
const schema = Joi.object().keys({
  title: Joi.string()
    .trim()
    .required(),
  archived: Joi.boolean(),
  listId: Joi.number()
    .integer()
    .required(),
});

router.get('/', (req, res, next) => {
  Card.findAll({
    include: [
      {
        model: List,
        as: 'list', // card.lists
      },
    ],
  })
    .then((cards) => {
      res.json(cards);
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
    // new Card
    const newCard = {
      ...req.body,
    };
    // insert list into the database.
    Card.create(newCard)
      // send to newly created list to the client.
      .then((card) => {
        res.status(201); // created
        res.json(card);
      })
      // if the list failed to be created.
      .catch((e) => next({ message: e.message }));
  }
});

module.exports = router;
