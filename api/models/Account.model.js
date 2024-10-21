const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    userName: {

    },
})

const Account = mongoose.model("Account", AccountSchema);
module.exports = Account;