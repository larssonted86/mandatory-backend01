const mongoose = require('mongoose')

const RoomSchema = new mongoose.Schema({
  name: {type: String, required: true},
  messages: []
});

module.exports = mongoose.model('Room', RoomSchema);
