const mongoose = require("mongoose");

let Schema = mongoose.Schema;
let FriendsSchema = new Schema({
  timePlayed: String,
  gamerTag:String,
  kdRatioSolo:String,
  kdRatioDuo:String,
  kdRatioSquad:String,
  firstPlaceSolo:Number,
  firstPlaceDuo:Number,
  firstPlaceSquads:Number,
  killSolo:Number,
  killDuo:Number,
  killSquad:Number,

  matchesPlayed:String,
  level:String
  
});
module.exports = mongoose.model('passionFriends',FriendsSchema)