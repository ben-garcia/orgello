const express = require('express');
const Unsplash = require('unsplash-js').default;
const { toJson } = require('unsplash-js');

global.fetch = require('node-fetch');

const router = express.Router();

const unsplash = new Unsplash({
  applicationId: process.env.UNSPLASH_APPLICATION_ID,
  secret: process.env.UNSPLASH_SECRET,
});

// get 6 newly added photos
router.get('/', (req, res) => {
  unsplash.photos
    .listPhotos(1, 6, 'latest')
    .then(toJson)
    .then((photos) => res.status(200).json(photos))
    .catch((e) => console.log('/photos error: ', e.message));
});

// endpoint that searches the unsplash api for photos matching
// the query parameter
router.get('/search', (req, res, next) => {
  // by default query params are strings
  // but the unsplash api accepts numbers for
  // page and per_page arguements.

  // convert arguements to numbers
  const page = Number(req.query.page);
  const perPage = Number(req.query.per_page);

  // make sure that page and perPage are actually numbers;
  if (isNaN(page) || isNaN(perPage)) {
    res.status(422);
    next(new Error(`Both 'page' and 'per_page' query params must be numbers`));
  }

  unsplash.search
    .photos(req.query.query, page, perPage)
    .then(toJson)
    .then((photos) => res.status(200).json(photos))
    .catch((e) => console.log('/search error: ', e.message));
});

module.exports = router;
