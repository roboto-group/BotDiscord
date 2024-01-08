const { Schema, model } = require('mongoose')

const autoRoleSchema = new Schema({
  guildId: {
    type: String,
    required: true,
    unique: true, //um servidor só pode configurar o autoRoles uma vez
  },
  roleId: {
    type: String,
    required: true,
  }
})

module.exports = model('AutoRole', autoRoleSchema);