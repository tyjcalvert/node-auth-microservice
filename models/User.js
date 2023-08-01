const { Schema, model } = require('mongoose');
const bycrypt = require('bcrypt');

const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])^[\x21-\x7E]+$/;
const passwordErrMsg = 
  'Password must include: at least one lowercase letter, one uppercase letter, one numeric character, and one special character';

const emailRegex = /.+@.+\..+/;
const emailErrMsg = 'Please enter a valid e-mail address';

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minLength: 4,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [emailRegex, emailErrMsg],
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        match: [passwordRegex, passwordErrMsg],
    },
});

// set up pre-save middleware to create password
UserSchema.pre('save', async function (next) {
    if (this.$isNew || this.$isModified('password')) {
        const saltRounds = 10;
        this.password = await bycrypt.hash(this.password, saltRounds);
    }
    next();
});

// compare the incoming password with the hashed password
UserSchema.methods.isCorrectPassword = async function (password) {
    return bycrypt.compare(password, this.password);
};

const User = model('User', UserSchema);

module.exports = User;
