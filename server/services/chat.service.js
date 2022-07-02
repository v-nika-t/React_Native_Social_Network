const { v4: uuidv4 } = require('uuid');
const { Op } = require("sequelize");
const DB = require('../modules/index');


class ChatService {
    DB_CHAT = DB.Chat;
    getAllWhere = async (req, res) => {
        const { firstUserId, secondUserId } = req.body
        return await this.DB_CHAT.findAll({
            raw: true,
            where: {
                [Op.or]: [{
                    firstUserId,
                    secondUserId
                }, {
                    firstUserId: secondUserId,
                    secondUserId: firstUserId
                }]
            }
        });
    }
    add = async (req, res) => {
        const { firstUserId, secondUserId } = req.body
        return await this.DB_CHAT.create({
            idChat: uuidv4(),
            firstUserId,
            secondUserId,
        })
    }


}

module.exports = new ChatService();

