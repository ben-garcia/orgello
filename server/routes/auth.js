const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('joi');

const router = express.Router();

const User = require('../db/models').user;
const Op = require('../db/models').Sequelize.Op;

// every new user MUST meet these requirements.
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

const loginSchema = Joi.object().keys({
  email: Joi.string()
    .trim()
    .email(),
  username: Joi.string()
    .trim()
    .alphanum()
    .min(6)
    .max(30),
  password: Joi.string()
    .trim()
    .regex(/^[a-zA-Z0-9]{6,30}$/)
    .required(),
});

// validate that the user sent by the request if it
// exists in the database
router.post('/signup', (req, res, next) => {
  const result = Joi.validate(req.body, schema);
  const { password } = req.body;

  // if req.body is not valid.
  if (result.error !== null) {
    res.status(422);
    next({ message: result.error.message });
  } else {
    // generate a hash for the password
    bcrypt
      .hash(password, 10)
      .then((hashedPassword) => {
        const newUser = {
          ...req.body,
          password: hashedPassword,
        };
        User.findOrCreate({
          where: {
            email: newUser.email,
            username: newUser.username,
            password: hashedPassword,
          },
          default: newUser,
        })
          .then(([user, created]) => {
            if (created) {
              // a new user was not found in the db
              // so it was create and added.
              console.log(user.get({ plain: true }));
              console.log(created);
              res.json(user);
            }
          })
          .catch((e) => {
            res.status(409); // Conflict unique contraint
            // add the reason for the error along with a custom header
            if (e.parent) {
              res.set('X-Status-Reason', e.parent.detail);
              next({ message: e.parent.detail });
            }
            next({ message: e });
          });
      })
      .catch((e) => {
        console.log('Failed to hash the password');
      });
  }
});

// create a new user in the database if
// after validation is successfull.
router.post('/login', (req, res, next) => {
  // if the user is trying to log in with email, give the username a default value
  // if the user is trying to log in with a username, give the email a defaut value
  const { email = 'no', username = 'no', password } = req.body;
  const result = Joi.validate(req.body, loginSchema);

  // if req.body is not valid.
  if (result.error !== null) {
    res.status(422);
    next({ message: result.error.message });
  } else {
    // query the database for the user.
    User.findOne({
      where: {
        // query the with the email or username
        [Op.or]: [{ email }, { username }],
      },
    })
      // user was found and sent as the response
      .then((user) => res.status(200).json(user))
      // user not found
      .catch((e) => res.status(404).json(e));
  }
});
module.exports = router;
