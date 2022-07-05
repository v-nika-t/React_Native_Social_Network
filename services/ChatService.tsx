import CommonService from "./CommonService";

class ChatService extends CommonService {
    constructor(nameDB: string) {
        super(nameDB)
    }

    createChat = (body: {firstUserId: string, secondUserId: string }) => this.requestOnServer('post', 'creat', '', body);

}

export default new ChatService('chat');
