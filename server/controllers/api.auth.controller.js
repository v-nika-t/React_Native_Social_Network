const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const privateKey = fs.readFileSync('./private.key', "utf-8");

const service = require('../services/user.service');

class AuthController {
    db = service;
    signUp = (req, res) => {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            req.body.password = hash;
            this.db.addUser(req, res).then((data) => {
                //res.header('authorization', jwt.sign({ id: data.id }, privateKey));
                res.status(200).json(data)
            });
        });

    };

    signIn = (req, res) => {
        this.db.getUserByEmail(req, res)
            .then((data) => {
                bcrypt.compare(req.body.password, data[0]['password'], (err, result) => {
                    if (result) {
                        /* res.header('authorization', jwt.sign({ id: data.id }, privateKey)); */
                        res.status(200).json({
                            data
                        })
                    } else {
                        res.status(401).json("not correct date");
                    }
                })
            })
            .catch((err) => res.status(500).json(err));
    };

}

module.exports = new AuthController;