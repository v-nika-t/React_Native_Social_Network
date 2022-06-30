const fs = require('fs');
const jwt = require('jsonwebtoken');
const privateKey = fs.readFileSync('./private.key', "utf-8");

const auth = (req, res, next) => {

  jwt.verify(req.headers.authorization, privateKey, (err, payload) => {
    if (!err) next()
    else {
      res.status(401).json('jwt is not correct')
    }
  })
};

module.exports = auth;
