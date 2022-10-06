const express = require('express');
const requireLogin = require('../middleware/requireLogin');
const Post = require('../models/post');
const User = require('../models/user');
const router = express.Router();


router.get('/user/:id', requireLogin, (req, res) => {
    User.findOne({ _id: req.params.id })
        .select('-password')
        .then(user => {
            Post.find({ postedBy: req.params.id })
                .populate('postedBy', '_id name')
                .exec((err, posts) => {
                    if (err) {
                        return res.status(422).json({ error: err })
                    } else {
                        res.json({ user, posts })
                    }
                })
        })
})

module.exports = router