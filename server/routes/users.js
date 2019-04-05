const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Lets get coding' });
});

module.exports = router;
