
const Message = require('../services/message.service');
const Chat = require('../services/chat.service');

class ChatController {
    Service_Chat = Chat;
    Service_Message = Message;

    creatChat = async (req, res) => {
        console.log('ChatController')
        const resultOfFind = await this.Service_Chat.getAllWhere(req, res)

        if (resultOfFind.length == 0) {
            const resultOfFCreate = await this.Service_Chat.add(req, res)
            await res.status(200).json({ idChat: resultOfFCreate.idChat, messages: [] })
        } else {
            const messages = await this.Service_Message.getAllWhere({ chatId: resultOfFind[0].idChat })
            await res.status(200).json({
                idChat: resultOfFind[0].idChat, messages: messages.map(item => {
                    return ({
                        ...item,
                        date: (new Date(item.date).toLocaleString('ru', { day: 'numeric', month: 'long', year: "2-digit" }))
                    })
                })
            });
        }

    }
}

module.exports = new ChatController;