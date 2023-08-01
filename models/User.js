const { Schema, model } = require('mongoose');
const bycrypt = require('bcrypt');

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
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        match: [/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])^[\x21-\x7E]+$/, 'Password must include: at least one lowercase letter, one uppercase letter, one numeric character, and one special character'],
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
