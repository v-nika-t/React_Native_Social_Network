const fs = require('fs');
const jwt = require('jsonwebtoken');
const privateKey = fs.readFileSync('./private.key',"utf-8");
const db = require('../modules/users');

const auth =  (req, res, next) =>{
 jwt.verify(req.headers.authorization, privateKey,  (err, payload) => {
    if (err) next()
    else {
      db
      .findAll({where:{id: payload['id']}, raw: true})
      .then((data) => res.status(200).json(data) )
      .catch((e) => {res.status(401).json(e)}); 
     next();
    }
  })
};

module.exports =  auth;
