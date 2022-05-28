const axios = require('axios').default;

class SocialNetworkServices {
    _IP = '192.168.1.225';
    _PORT = `8000`;
    URL = `http://${this._IP}:${this._PORT}`;

    constructor(nameDB) {
        this.URL += `/${nameDB}`;
    }

    requestOnServer = async (method = 'get', action = "all", id = '', body = "") => {
        const requestObject = {
            method: method,
            url: this.URL + `/${action}`
        }

        body ? requestObject.data = body : null;
        id ? requestObject.url += `/${id}` : null;

        const data = await axios(requestObject)
            .then(function (response) {
                return response.data
            }).catch(function (error) {
                console.log("Ошибка: ", error)
            });
        return await data;
    }
    getAll = () => this.requestOnServer(); //+
    getOne = (id) => this.requestOnServer('get', 'get', id); //+
    delete = (id) => this.requestOnServer('delete', 'delete', id); //+
    add = (body) => this.requestOnServer('post', 'add', '', body);
    edit = (id, body = {}) => this.requestOnServer('put', 'edit', id, body);
}

/* let y = new SocialNetworkServices('post');
let a = y.edit('2c84575e-bfe1-416d-a07f-9773d301970a', {
    "date": "24",
    "description": "Test",
    "img": "rfedgdf",
    "likes": 66,
});

console.log(a.then(b => console.log(b))); */

export default SocialNetworkServices;

