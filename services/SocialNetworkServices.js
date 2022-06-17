const axios = require('axios').default;

class SocialNetworkServices {
    _IP = '192.168.1.225';
    _PORT = `8000`;
    URL_WITH_PORT = `http://${this._IP}:${this._PORT}`;
    URL = `http://${this._IP}:${this._PORT}`;

    headersForFile = {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
    }

    constructor(nameDB) {
        this.URL += `/${nameDB}`;
    }

    requestOnServer = async (method = 'get', action = "all", id = '', body = "", isFile = false, queryParams = '') => {
        const requestObject = {
            method: method,
            url: this.URL + `/${action}`,
        }

        body ? requestObject.data = body : null;
        isFile ? requestObject['headers'] = this.headersForFile : { "Content-Type": "application/json" };
        id ? requestObject.url += `/${id}` : null;
        queryParams ? requestObject['params'] = queryParams : null

        const data = await axios(requestObject)
            .then(function (response) {
                return response.data
            }).catch(error => {
                console.log(error);
            })
        return await data;
    };


    formBodyWithFile = (data) => {
        const body = new FormData();
        for (let key in data) {
            if (key == 'uri') {
                body.append('img', {
                    uri: data[key],
                    type: 'image/jpg',
                    name: 'img'
                });
            } else {
                body.append(key, data[key]);
            }
        }
        return body;
    }

    getAll = (queryParams = "") => this.requestOnServer('get', 'all', '', '', false, queryParams);
    getOne = (id) => this.requestOnServer('get', 'get', id);
    delete = (id) => this.requestOnServer('delete', 'delete', id);
    edit = (id, data = {}) => {
        let isFile = false;
        let body = data;
        if (data.uri) {
            body = this.formBodyWithFile(data);
            isFile = true;
        }
        return this.requestOnServer('put', 'edit', id, body, isFile);
    }
    add = (data) => {
        let isFile = false;
        let body = data;
        if (data.uri) {
            body = this.formBodyWithFile(data);
            isFile = true;
        }
        return this.requestOnServer('post', 'add', '', body, isFile);
    }

    deleteLike = (body) => this.requestOnServer('delete', 'likes/delete', '', body);
    addLike = (body) => this.requestOnServer('post', 'likes/add', '', body);

    addFriend = (body) => this.requestOnServer('post', 'add/friend', '', body);
    deleteFriend = (id_User, body) => this.requestOnServer('delete', 'delete/friend', id_User, body);
    addRequestInFriend = (body) => this.requestOnServer('post', 'add/requestInFriend', '', body);
    deleteRequestInFriend = (id_User, body) => this.requestOnServer('delete', 'delete/requestInFriend', id_User, body);

    signIn = (body) => this.requestOnServer('post', 'auth/signIn', '', body);
    signUp = (body) => this.requestOnServer('post', 'auth/signUp', '', body);

}

/* export { User } from new SocialNetworkServices('user'); */
export default SocialNetworkServices;

