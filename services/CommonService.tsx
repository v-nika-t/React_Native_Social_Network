const axios = require('axios').default;
import * as SecureStore from 'expo-secure-store';
import {IRequestObject} from '../types/services/stack.services.types'

class CommonService{

    _IP = '192.168.1.225';
    _PORT = `8000`;
    URL_WITH_PORT = `http://${this._IP}:${this._PORT}`;
    URL = `http://${this._IP}:${this._PORT}`;

    constructor(nameDB: string) {
        this.URL += `/${nameDB}`;
    }

    getKeyAuthorization = async (): Promise<string | undefined | null> => {
        return await SecureStore.getItemAsync('authorization').then(data => data);
    }

    requestOnServer = async (method: string = 'get', action: string = "all", id: string = '', body:  any = "", isFile: boolean = false, queryParams: string | null | undefined = '') => {
        const requestObject: IRequestObject = {
            method: method,
            url: this.URL + `/${action}`,
            headers: {
                'authorization': await this.getKeyAuthorization(),
                "Content-Type": "application/json",
            }
        }
     
        requestObject.headers = isFile ? {
            ...requestObject.headers,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        } : requestObject.headers;

        body ? requestObject.data = body : null;
        id ? requestObject.url += `/${id}` : null;
        queryParams ? requestObject['params'] = queryParams : null
        const data= await axios(requestObject)
            .then(function (response:any): object | []{
                return response.data;
            }).catch(function (error: any){
                throw error.response.data;
            });
        return await data;
    };

    getAll = (queryParams: string) => this.requestOnServer('get', 'all', '', '', false, queryParams);
    getOne = (id: string) => this.requestOnServer('get', 'get', id);
    delete = (id: string) => this.requestOnServer('delete', 'delete', id);
    edit = (id:string, body:  object) => this.requestOnServer('put', 'edit', id, body);
    add = (body: object ) => this.requestOnServer('post', 'add', '', body);

}

export default CommonService;
