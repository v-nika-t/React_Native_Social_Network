const Service_Message = require('../services/message.service');

chat = (io) => {

    io.on('connection', (socket) => {
        socket.on('CHAT', (data) => {
            const { idChat, id } = data;
            socket.join(idChat);
            socket.to(idChat).emit('ONLINE', id)
        });

        socket.on('SENT_MESSAGE', async (data) => {
            socket.join(data.chatId);
            const newMessage = await Service_Message.add({ message: data.message, userId: data.userId, chatId: data.chatId })
            await io.in(data.chatId).emit('GET_MESSAGE', newMessage)
        })
    })
}

module.exports = chat;