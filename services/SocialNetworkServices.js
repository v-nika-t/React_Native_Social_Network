const axios = require('axios').default;

class SocialNetworkServices {
    _IP = '192.168.1.225';
    _PORT = `8000`;
    URL = `http://${this._IP}:${this._PORT}`;

    constructor(nameDB) {
        this.URL += `/${nameDB}`;
    }

    requestOnServer = async (method = 'get', action = "all", id = '', body = "", headers = "") => {
        const requestObject = {
            method: method,
            url: this.URL + `/${action}`
        }

        body ? requestObject.data = body : null;
        id ? requestObject.url += `/${id}` : null;
        headers ? requestObject['headers'] = headers : null;

        const data = await axios(requestObject)
            .then(function (response) {
                return response.data
            }).catch(function (error) {
                console.log("Ошибка: ", error)
            });
        return await data;
    }

    formBodyWithFile = (data) => {
        const body = new FormData();
        const headers = '';
        for (let key in data) {
            if (key == 'uri') {
                body.append('img', {
                    uri: data[key],
                    type: 'image/jpg',
                    name: 'img'
                });
                headers = {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                }
            } else {
                body.append(key, data[key]);
            }
        }
        return body;
    }

    getAll = () => this.requestOnServer(); //+
    getOne = (id) => this.requestOnServer('get', 'get', id); //+
    delete = (id) => this.requestOnServer('delete', 'delete', id); //+
    edit = (id, body = {}) => this.requestOnServer('put', 'edit', id, body);
    add = async (data) => {
        let body = formBodyWithFile(data);
        this.requestOnServer('post', 'add', '', body, headers);
    }
}

export default SocialNetworkServices;

