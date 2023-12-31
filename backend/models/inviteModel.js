const mongoose = require('mongoose');

const inviteSchema = mongoose.Schema({
    email: { type: String, unique: true },
    token: String,
    expiresAt: Date,
});

const Invite = mongoose.model('Invite', inviteSchema);

module.exports = Invite;
