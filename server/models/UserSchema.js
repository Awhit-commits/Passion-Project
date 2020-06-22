const mongoose = require("mongoose");

let Schema = mongoose.Schema;
let UserSchema = new Schema({
  name: { required: true, type: String },
  username:{required:true,type:String,unique:true},
  password: { required: true, type: String },
  email: { required: true, type: String },
  date: { type: Date, default: Date.now },
  fortniteFriends:[{type:mongoose.Schema.Types.ObjectId,ref:"passionFriends"}],
  apexFriends:[{type:mongoose.Schema.Types.ObjectId,ref:"passionFriends"}]
});

module.exports = mongoose.model("passionUser", UserSchema);
