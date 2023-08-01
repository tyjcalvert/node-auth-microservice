const e = require('express');
const { User } = require('../models');

module.exports = {
    async createUser(req, res) {
        try {
          const user = await User.create(req.body);
          res.status(200).json(user);
        } catch (err) {
          console.error(err);
          res.status(500).json(err);
        }
    },
    async getUsers(req, res) {
        try {
          const users = await User.find();
          res.status(200).json(users);
        } catch (err) {
          console.error(err);
          res.status(500).json(err);
        }
    },
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });

            if (!user) {
              throw 'Authentication failed!'
            };
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw 'Authentication failed!';
            };
      
            const token = "token";
      
            res.status(200).json({ token, user });
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    }
};