const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  guildId: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  userName: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
  },
  curso: {
    type: String,
    required: true,
  },
  horario: {
    type: String,
    required: true,
  },
  lastDaily: {
    type: Date,
    required: true,
  },
})

module.exports = model('User', userSchema);