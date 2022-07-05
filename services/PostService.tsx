import CommonService from "./CommonService";

class PostService  extends CommonService{
    constructor(nameDB: string) {
        super(nameDB)
    }

    formBodyWithFile = (data: any):any => {
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

    edit = (id: string,  data: any ) => {
        let isFile: boolean = false;
        let body:any = data;
        if (data.uri) {
            body = this.formBodyWithFile(data);
            console.log(body)
            isFile = true;
        }
        return this.requestOnServer('put', 'edit', id, body, isFile);
    }

    add = (data: any ) => {
        const body = this.formBodyWithFile(data);
        return this.requestOnServer('post', 'add', '', body, true);
    }

    deleteLike = (body: {postId:string, userId: string }) => this.requestOnServer('delete', 'likes/delete', '', body);
    addLike = (body: {postId:string, userId: string }) => this.requestOnServer('post', 'likes/add', '', body);

}

type post =  {description: string,title: string, uri?: string | undefined | null, userId?: string| undefined |null } 
export default new PostService('post');


