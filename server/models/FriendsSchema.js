const mongoose = require("mongoose");

let Schema = mongoose.Schema;
let FriendsSchema = new Schema({
  timePlayed: String,
  gamerTag:{type:String,unique:true},
  kdRatio:String,
  wins:String,
  matchesPlayed:String,
  level:String
  
});
module.exports = mongoose.model('passionFriends',FriendsSchema)