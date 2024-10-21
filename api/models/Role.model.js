const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({

})

const Role = mongoose.model("Role", RoleSchema);
module.exports = Role;