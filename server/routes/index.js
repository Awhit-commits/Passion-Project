var express = require("express");
var router = express.Router();
const UserCollection = require("../models/UserSchema");
const FriendCollection = require("../models/FriendsSchema");
// const FriendsSchema = require('../models/FriendsSchema');

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//Creating a saved friend from fortnite page and relating it to the logged in user
router.post("/fortnite/:_id", async (req, res) => {
  let fortniteFriend, user;
  FriendCollection.create(req.body, (errors, results) => {
    errors ? res.send(errors) : (fortniteFriend = results);
    UserCollection.findOne({ _id: req.params._id }, (errors, results) => {
      errors ? res.send(errors) : (user = results);
      user.fortniteFriends.push(fortniteFriend._id);
      user.save();
      res.send(user)
    });
  });
});

router.get("/profile/:_id", (req, res) => {
  // res.send('my profile page is here')
  UserCollection.findOne({ _id: req.params._id }, (error, results) => {
    error ? res.send(error) : res.send(results);
  }).populate("fortniteFriends");
});

router.get("/fortnite/:_id", (req, res) => {
  res.send(`Fortnite page`);
});

module.exports = router;
