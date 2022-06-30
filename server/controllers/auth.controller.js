const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const fs = require('fs');
const privateKey = fs.readFileSync('./private.key', "utf-8");

const DB_Users = require('../services/user.service');

class AuthController {
    db = DB_Users;

    signUp = async (req, res) => {
        const { email, user_name } = req.body;

        const result = await this.db.getAllWhere({ email });
        const result_2 = await this.db.getAllWhere({ user_name });

        if (result.length == 0 && result_2.length == 0) {
            this.db.add(req).then(data => {
                res.status(200).json({ ...data, authorization: jwt.sign({ id: data.id }, privateKey) })
            });

        } else {
            res.status(200).json('There is user');
        }
    };

    signIn = async (req, res) => {
        const { email, password } = req.body;
        const user = await this.db.getAllWhere({ email });
        if (user.length !== 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    res.status(200).json({ ...user[0], authorization: jwt.sign({ id: result.id }, privateKey) })
                } else {
                    res.status(200).json('Invalid password');
                }
            })
        } else {
            res.status(200).json('There is not user');
        }
    }

}

module.exports = new AuthController;