const Friend = require('../services/friend.service');

class FriendController {
    Service_Friend = Friend;
    addFriend = (req, res) => {
        this.Service_Friend.add({ userId: req.body.friendId, friendId: req.body.userId, status: true })
            .then((data) => {
                this.Service_Friend.edit({ status: true }, { ...req.body })
                return 'done';
            }).then(res.status(200).json('done'));
    }

    addRequestInFriend = async (req, res) => {
        this.Service_Friend.add(req.body).then(res.status(200).json('done'));
    }

    deleteRequestInFriend = async (req, res) => {
        this.Service_Friend.delete({ userId: req.params.id, friendId: req.body.userId }).then(res.status(200).json('done'));
    }

    deleteFriend = async (req, res) => {
        const deleted = await this.Service_Friend.delete({ userId: req.params.id, friendId: req.body.userId });
        const updated = await this.Service_Friend.edit({ status: false }, { userId: req.body.userId, friendId: req.params.id });
        await deleted == 'done' && updated == 'done' ? res.status(200).json('done') : res.status(500).json('error')
    }
}

module.exports = new FriendController();
