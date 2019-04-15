const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const router = express.Router();

const User = require('../db/models').user;
const Board = require('../db/models').board;

const {
  validateParam,
  isTokenPresent,
  verifyToken,
} = require('../middlewares/users');

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

// get a single user with the id that matches req.params.id
router.get(
  '/:userId',
  validateParam,
  isTokenPresent,
  verifyToken,
  (req, res, next) => {
    // user req.user.id to query the db
    User.findOne({
      attributes: { exclude: ['password'] },
      where: {
        id: req.user.id,
      },
    })
      .then((user) => {
        if (user) {
          res.json(user);
        } else {
          next({ message: 'No user with that id found' });
        }
      })
      .catch((e) => next({ message: e.message }));
  },
);

// create a user and save it to the database
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
        .then((user) => {
          // user with ONLY the neccessary properties
          const userInDB = {
            id: user.id,
            email: user.email,
            username: user.username,
          };
          // create jsonwebtoken and add it to the user object
          // to send as the response.
          jwt.sign(userInDB, process.env.JWT_SECRET, (err, token) => {
            if (err) {
              next({ message: err });
            } else {
              res.status(201); // created
              // send the token along with the newly inserted user
              res.json({
                ...userInDB,
                token,
              });
            }
          });
        })
        // if the user failed to be created.
        // .catch((e) => next({ message: e.message }));
        .catch((e) => {
          res.status(409); // Conflict unique contraint
          // add the reason for the error along with a custom header
          if (e.parent) {
            res.set('X-Status-Reason', e.parent.detail);
            next({ message: e.parent.detail });
          }
          next({ message: e });
        });
    });
  }
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
