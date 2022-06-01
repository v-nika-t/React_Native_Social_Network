const axios = require('axios').default;

class SocialNetworkServices {
    _IP = '192.168.1.225';
    _PORT = `8000`;
    URL = `http://${this._IP}:${this._PORT}`;

    headersForFile = {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
    }

    constructor(nameDB) {
        this.URL += `/${nameDB}`;
    }

    requestOnServer = async (method = 'get', action = "all", id = '', body = "", isFile = false) => {
        const requestObject = {
            method: method,
            url: this.URL + `/${action}`,
        }

        body ? requestObject.data = body : null;
        id ? requestObject.url += `/${id}` : null;
        isFile ? requestObject['headers'] = this.headersForFile : null;

        const data = await axios(requestObject)
            .then(function (response) {
                return response.data
            }).catch(function (error) {
                console.log("Ошибка: ", error)
            });
        return await data;
    }

    formBody = (data) => {
        const body = new FormData();
        let isFile = false;
        for (let key in data) {
            if (key == 'uri') {
                body.append('img', {
                    uri: data[key],
                    type: 'image/jpg',
                    name: 'img'
                });
                isFile = true;
            } else {
                body.append(key, data[key]);
            }
        }
        return [body, isFile];
    }

    getAll = () => this.requestOnServer();
    getOne = (id) => this.requestOnServer('get', 'get', id);
    delete = (id) => this.requestOnServer('delete', 'delete', id);
    edit = (id, body = {}) => this.requestOnServer('put', 'edit', id, body);
    add = (data) => {
        const [body, isFile] = this.formBody(data);
        return this.requestOnServer('post', 'add', '', body, isFile);
    }
}

export default SocialNetworkServices;

