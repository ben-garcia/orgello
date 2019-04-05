const express = require('express');
const cors = require('cors');
const volleyball = require('volleyball');

const db = require('../db/models/');
const usersRouter = require('../routes/users');

const app = express();

app.use(volleyball);
app.use(cors());
app.use(express.json()); // parses 'application/json'

app.use('/users', usersRouter);

// 404 Not Found
app.use((req, res) => {
  res.status(404);
  res.json({ message: '404 Not Found' });
});

// error handler
app.use((err, req, res) => {
  res.json({ error: err.message });
});

db.sequelize
  .authenticate()
  .then(() => console.log('Connection has been established'))
  .catch((e) => console.error('Unable to connect to the database', e));

module.exports = app;
