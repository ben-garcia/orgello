const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('joi');

const router = express.Router();

const User = require('../db/models').user;

// every new use MUST meet these requirements.
const schema = Joi.object().keys({
  email: Joi.string()
    .trim()
    .email()
    .required(),
  username: Joi.string()
    .trim()
    .alphanum()
    .min(6)
    .max(30)
    .required(),
  password: Joi.string()
    .trim()
    .regex(/^[a-zA-Z0-9]{6,30}$/)
    .required(),
});

router.get('/', (req, res, next) => {
  User.findAll()
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
    // hash the password with a salt of 12.
    bcrypt.hash(req.body.password, 12).then((hashedPassword) => {
      // new user with the hashed password.
      const newUser = {
        ...req.body,
        password: hashedPassword,
      };
      // insert user into the database.
      User.create(newUser)
        // send to newly created user to the client.
        .then((user) => res.json(user))
        // if the user failed to be created.
        .catch((e) => next({ message: e.message }));
    });
  }
});

module.exports = router;
