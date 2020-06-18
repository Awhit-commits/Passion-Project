const mongoose = require("mongoose");

let Schema = mongoose.Schema;
let FriendsSchema = new Schema({
  timePlayed: String,
  gamerTag:String,
  kdRatio:String,
  wins:String,
  matchesPlayed:String,
  
});
module.exports = mongoose.model('passionFriends',FriendsSchema)