const axios = require('axios').default;
import * as SecureStore from 'expo-secure-store';

class SocialNetworkServices {
    _IP = '192.168.1.225';
    _PORT = `8000`;
    URL_WITH_PORT = `http://${this._IP}:${this._PORT}`;
    URL = `http://${this._IP}:${this._PORT}`;

    constructor(nameDB) {
        this.URL += `/${nameDB}`;
    }

    getKeyAuthorization = async () => {
        return await SecureStore.getItemAsync('authorization').then(data => data);
    }

    requestOnServer = async (method = 'get', action = "all", id = '', body = "", isFile = false, queryParams = '') => {
        const requestObject = {
            method: method,
            url: this.URL + `/${action}`,
            headers: {
                'authorization': await this.getKeyAuthorization(),
                "Content-Type": "application/json",
            }
        }

        console.log(this.getKeyAuthorization());

        requestObject.headers = isFile ? {
            ...requestObject.headers,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        } : requestObject.headers;

        console.log(this.getKeyAuthorization());

        body ? requestObject.data = body : null;
        id ? requestObject.url += `/${id}` : null;
        queryParams ? requestObject['params'] = queryParams : null

        const data = await axios(requestObject)
            .then(function (response) {
                return response.data;
            }).catch(function (error) {
                throw error.response.data;
                console.log('catch', error.response.data)
            });
        return await data;
    };

    formBodyWithFile = (data) => {
        const body = new FormData();
        for (let key in data) {
            if (key == 'uri') {
                body.append('img', {
                    uri: data[key],
                    type: 'image/' + data[key].slice(-3),
                    name: data[key].slice(data[key].lastIndexOf('/') + 1)
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

    createChat = (body) => this.requestOnServer('post', 'creat', '', body);

}

const User = new SocialNetworkServices('user');
const Post = new SocialNetworkServices('post');
const Comment = new SocialNetworkServices('comment');
const Chat = new SocialNetworkServices('chat');

export { User, Post, Comment, Chat };
export default SocialNetworkServices;



