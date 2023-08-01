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
    }
};