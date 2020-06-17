var express = require('express');
var router = express.Router();
const UserCollection = require("../models/UserSchema");
const FriendCollection = require("../models/FriendsSchema");
// const FriendsSchema = require('../models/FriendsSchema');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//Creating a saved friend from fortnite page and relating it to the logged in user
router.put("/fortnite/:_id",async (req,res)=>{
  let fortniteFriend;
  UserCollection.findOneAndUpdate({_id:req.params._id},req.body,{new:true},(errors,results)=>{
    errors? res.send(errors): FriendCollection.create(req.body,(errors,results)=>{
      errors? res.send(errors) : (fortniteFriend = results);
      fortniteFriend.fortniteFriend.push()
      
    })
  })
})

router.get('/profile/:_id',(req,res)=>{
  // res.send('my profile page is here')
  UserCollection.findOne({_id:req.params._id},(error,results)=>{
    error?res.send(error):res.send(results)
  })
})

router.get('/fortnite/:_id',(req,res)=>{
  res.send(`Fortnite page`)
})

module.exports = router;
