const CRUDController = require('./crud.controller');

class FriendController extends CRUDController {

    addFriend = (req, res) => {
        this.db.addFriend(req, res).then((data) => res.status(200).json(data));
    };

    deleteFriend = (req, res) => {
        this.db.deleteFriend(req, res).then((data) => res.status(200).json(data));
    };

}

module.exports = new FriendController('user');
