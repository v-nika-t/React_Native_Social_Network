const bcrypt = require('bcrypt');
const DB_Users = require('../services/user.service');


/* const jwt = require('jsonwebtoken');
const privateKey = fs.readFileSync('./private.key', "utf-8"); 
const fs = require('fs');
*/
/* 
const DB = require('../modules/index');
DB.User.findAll().then(data => console.log(data))  */
const DB = require('../modules/index');
/* DB.Role.create({id:1, name: 'user'}).then(data => console.log(data))  ;
DB.Role.create({id:0, name: 'admin'}).then(data => console.log(data))  ; */
DB.Role.findAll().then(data => console.log(data))

class AuthController {
    db = DB_Users;
    signUp = async (req, res) => {

        const { email, user_name } = req.body;

        const result = await this.db.getAllWhere({ email });
        const result_2 = await this.db.getAllWhere({ user_name });

        if (result.length == 0 && result_2.length == 0) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                this.db.add({ ...req.body, password: hash }).then(data => res.status(200).json(data));
            })
        } else {
            res.status(200).json('There is user');
        }


        /* bcrypt.hash(req.body.password, 10, (err, hash) => {
            req.body.password = hash;
            this.db.addUser(req, res).then((data) => {
                //res.header('authorization', jwt.sign({ id: data.id }, privateKey));
                res.status(200).json(data)
            });
        }); */

    };



    signIn = async (req, res) => {
        const { email, password } = req.body;
        const user = await this.db.getAllWhere({ email });

        if (user.length !== 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                result ? res.status(200).json(user) : res.status(200).json('Invalid password');
            })
        } else {
            res.status(200).json('There is not user');
        }



    }

    //console.log(await result);

    /* if (result.length !== 0) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            this.db.add({ ...req.body, password: hash }).then(data => res.status(200).json(data));
        })
    } else {
        res.status(200).json('There is not user');
    } */


    /*    this.db.getUserByEmail(req, res)
           .then((data) => {
               bcrypt.compare(req.body.password, data[0]['password'], (err, result) => {
                   if (result) {
                        res.header('authorization', jwt.sign({ id: data.id }, privateKey)); 
                       res.status(200).json({
                           data
                       })
                   } else {
                       res.status(401).json("not correct date");
                   }
               })
           })
           .catch((err) => res.status(500).json(err)); */


}

module.exports = new AuthController;