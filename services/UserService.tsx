import CommonService from "./CommonService";

class UserService extends CommonService {
    constructor(nameDB: string) {
        super(nameDB)
    }

    addFriend = (body: {}) => this.requestOnServer('post', 'add/friend', '', body);
    deleteFriend = (id_User:string, body: {}) => this.requestOnServer('delete', 'delete/friend', id_User, body);
    addRequestInFriend = (body: {}) => this.requestOnServer('post', 'add/requestInFriend', '', body);
    deleteRequestInFriend = (id_User: string, body: {}) => this.requestOnServer('delete', 'delete/requestInFriend', id_User, body);

    signIn = (body: {}) => this.requestOnServer('post', 'auth/signIn', '', body);
    signUp = (body: {}) => this.requestOnServer('post', 'auth/signUp', '', body);

}

export default new UserService('user');

