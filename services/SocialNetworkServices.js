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
        isFile ? requestObject['headers'] = this.headersForFile : { "Content-Type": "application/json" };

        const data = await axios(requestObject)
            .then(function (response) {
                return response.data
            }).catch(error => {
                console.log(error);
            })
        return await data;
    }

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

    getAll = () => this.requestOnServer();
    getOne = (id) => this.requestOnServer('get', 'get', id);
    delete = (id) => this.requestOnServer('delete', 'delete', id);
    edit = (id, body = {}) => this.requestOnServer('put', 'edit', id, body);
    add = (data) => {
        let isFile = false;
        let body = data;
        if (data.uri) {
            body = this.formBodyWithFile(data);
            isFile = true;
        }
        return this.requestOnServer('post', 'add', '', body, isFile);
    }
}

export default SocialNetworkServices;

