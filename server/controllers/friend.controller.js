const DB_Friend = require('../services/friend.service');
DB_Friend.getAll().then(data => console.log(data));
//DB_Friend.delete({  userId: 1, friendId: 7 }).then(data => console.log(data)); 
//DB_Friend.add({ userId: 1, friendId: 3 })

class FriendController {

    db = DB_Friend

    addFriend = (req, res) => { // ++
        console.log('addFriend', { userId: req.body.friendId, friendId: req.body.userId, status: true });
        this.db.add({ userId: req.body.friendId, friendId: req.body.userId, status: true })
            .then((data) => {
                this.db.edit({ status: true }, { ...req.body })
                return 'done';
            }).then(res.status(200).json('done'));
    };

    addRequestInFriend = async (req, res) => { //+
        console.log('addRequestInFriend');
        this.db.add(req.body).then(res.status(200).json('done'));
    }

    deleteRequestInFriend = async (req, res) => { //++
        console.log('deleteRequestInFriend');
        this.db.delete({ userId: req.params.id, friendId: req.body.userId }).then(res.status(200).json('done'));
    }

    deleteFriend = async (req, res) => { //+
        console.log('deleteFriend');
        const deleted = await this.db.delete({ userId: req.params.id, friendId: req.body.userId });
        const updated = await this.db.edit({ status: false }, { userId: req.body.userId, friendId: req.params.id });
        await deleted == 'done' && updated == 'done' ? res.status(200).json('done') : res.status(500).json('error')
    };

}

module.exports = new FriendController();
