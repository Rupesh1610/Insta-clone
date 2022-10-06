const express = require('express')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../config/keys');
const router = express.Router();

router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !name || !password) {
        res.status(422).json({ error: "pleasse fill all the fields" });
        return;
    } else {
        User.findOne({ email })
            .then((savedUser) => {
                if (savedUser) {
                    res.status(422).json({ error: "User already exists" })
                    return;
                } else {
                    bcrypt.hash(password, 12)
                        .then(hashedPassword => {
                            if (hashedPassword) {
                                const user = new User({
                                    name,
                                    email,
                                    password: hashedPassword
                                })
                                user.save()
                                    .then(() => {
                                        res.json({ message: "Sign Up succesfull" })
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    })
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
})

router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(422).json({ error: "Please enter email and password" });
        return;
    } else {
        User.findOne({ email })
            .then((savedUser) => {
                if (!savedUser) {
                    res.status(422).json({ error: "Invalid email and password!" });
                    return;
                } else {
                    bcrypt.compare(password, savedUser.password)
                        .then((isMatched) => {
                            if (isMatched) {
                                const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
                                const { _id, email, name } = savedUser;
                                res.json({ token, user: { _id, name, email } })
                            } else {
                                res.status(422).json({ error: "Invalid email and password" })
                            }
                        })
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
})

module.exports = router
























