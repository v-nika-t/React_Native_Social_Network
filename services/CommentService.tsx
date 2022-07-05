import CommonService from "./CommonService";

class CommentService extends CommonService {
    constructor(nameDB: string) {
        super(nameDB)
    }

    deleteLike = (body: object) => this.requestOnServer('delete', 'likes/delete', '', body);
    addLike = (body: object) => this.requestOnServer('post', 'likes/add', '', body);
}

export default new CommentService('comment');
