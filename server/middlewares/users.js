const jwt = require('jsonwebtoken');

// check and make sure that the :id param is a number
// if not return an error
function validateParam(req, res, next) {
  if (isNaN(req.params.id)) {
    next({ message: 'id must be a number' });
  } else {
    next();
  }
}

// check the header of the request for the 'Authorization' header
// that contains the users token.
function isTokenPresent(req, res, next) {
  const authorizationToken = req.get('Authorization');

  if (authorizationToken) {
    // if the request contains the proper credentials
    // add the token to the request object and pass it
    // to the next middleware in the stack.
    const token = authorizationToken.split(' ')[1];
    req.token = token;
    next();
  } else {
    // if no token is found
    next({ message: 'No Authorization header' });
  }
}

// compare the token in the request object with the
// jsonwebtoken used to sign it.
function validateUser(req, res, next) {
  jwt.verify(req.token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      res.status(403);
      next({ message: err });
    } else {
      req.user = user;
      // check that the :id param matches the user id
      // if not then user is 'unauthorized'
      if (req.user.id !== Number(req.params.id)) {
        res.status(403);
        next({ message: 'Unauthorized' });
      }
      next();
    }
  });
}

module.exports = {
  validateParam,
  isTokenPresent,
  validateUser,
};
