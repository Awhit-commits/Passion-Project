const mongoose = require("mongoose");

let Schema = mongoose.Schema;
let FriendsSchema = new Schema({
  timePlayed: String,
  gamerTag:{type:String,unique:true},
  kdRatioSolo:String,
  kdRatioDuo:String,
  kdRatioSquad:String,
  firstPlaceSolo:String,
  firstPlaceDuo:String,
  firstPlaceSquads:String,
  killSolo:String,
  killDuo:String,
  killSquad:String,

  matchesPlayed:String,
  level:String
  
});
module.exports = mongoose.model('passionFriends',FriendsSchema)