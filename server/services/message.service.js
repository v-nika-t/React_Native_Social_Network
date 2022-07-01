const { v4: uuidv4 } = require('uuid');
const DB = require('../modules/index');

class MessageService {
    DB_MESSAGE = DB.Message
    DB_USER = DB.User;

    getAllWhere = async (where) => {
        return await this.DB_MESSAGE.findAll({
            raw: true,
            where,
            include: { model: this.DB_USER, as: 'Owner_Messages', attributes: ['user_name', 'id'] },
            order: [['date', 'DESC']]
        })
    };

    add = async (body) => {
        const id = uuidv4();
        const date = new Date();
        return await this.DB_MESSAGE.create({ ...body, id, date }).then(data => {
            return {
                ...data['dataValues'],
                date: date.toLocaleString('ru', { day: 'numeric', month: 'long', year: "2-digit" })
            }
        });
    }


}

module.exports = new MessageService();

