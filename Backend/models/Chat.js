const mongoose = require("mongoose");
const { Schema } = mongoose;

const ChatSchema = new Schema({
  query: {
    type: String,
  },
  response : {
    type : String,
  },
  userId: {
    type : String,
  }, 
  time: {
    type: Date,
    default: Date.now
  }
  
});

const Chat = mongoose.model('chat', ChatSchema);
Chat.createIndexes();
module.exports = Chat