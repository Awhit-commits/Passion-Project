var express = require("express");
var router = express.Router();
const UserCollection = require("../models/UserSchema");
const FriendCollection = require("../models/FriendsSchema");
// const FriendsSchema = require('../models/FriendsSchema');

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });

//Creating a saved friend from fortnite page and relating it to the logged in user
router.put("/fortnite/:_id", (req, res) => {
  UserCollection.findOne({ _id: req.params._id }, req.body)
    .populate("fortniteFriends")
    .exec((error, results) => {
      error ? res.send(error) : console.log(results);
      let friendMap = results.fortniteFriends.find((friend) => {
        if (req.body.gamerTag.toUpperCase() == friend.gamerTag.toUpperCase()) {
          // console.log(`User exist`);
        //  return  res.json({message:"User exist"})
        return true
        } else {
          // console.log("User does not Exist");
          return false
          // res.send('User does not exist')
          // FriendCollection.create(req.body, (errors, results) => {
          //   errors ? res.send(errors) : (fortniteFriend = results);
          //   UserCollection.findOne(
          //     { _id: req.params._id },
          //     (errors, results) => {
          //       errors ? res.send(error) : (user = results);
          //       user.fortniteFriends.push(fortniteFriend._id);
          //       user.save();
          //       res.send(user);
          //     }
          //   ).populate("fortniteFriends");
          // });
        }
      });
      
      // console.log(friendMap);
      if(friendMap){
        res.json({message:`User is already a friend`})
      }
      else{

      let fortniteFriend,user;

        console.log(`Person does not exist`)
        // res.send('People does not exist')
        FriendCollection.create(req.body, (errors, results) => {
            errors ? res.send(errors) : (fortniteFriend = results);
            UserCollection.findOne(
              { _id: req.params._id },
              (errors, results) => {
                errors ? res.send(error) : (user = results);
                user.fortniteFriends.push(fortniteFriend._id);
                user.save();
                res.send(user);
              }
            );
          });
      }
    });
});
//     ? res.send(error)
//     : // : results.fortniteFriends.find((friend) => {
//       //     // console.log(friend)
//       //     if (req.body.gamerTag === friend.gamerTag) {
//       //       console.log(`User exist`);
//       //       return res.send({ message: "User already exist" });
//       //     } else {
//       //       console.log(`Else is going`);
//       //       FriendCollection.create(req.body, (errors, results) => {
//       //         errors ? res.send(errors) : (fortniteFriend = results);
//       //         UserCollection.findOne(
//       //           { _id: req.params._id },
//       //           (errors, results) => {
//       //             errors ? res.send(error) : (user = results);
//       //             user.fortniteFriends.push(fortniteFriend._id);
//       //             user.save();
//       //             res.send(user);
//       //           }
//       //         ).populate('fortniteFriends');
//       //       });
//       //     }
//       //   });
//       // });
//       console.log(results);

//       results.fortniteFriends.map.((friends) => {
//         console.log(friends.gamerTag);
//         if (req.body.gamerTag === friends.gamerTag) {
//           res.json({ error: "User is already a friend" });
//           console.log(`User is already a friend`);
//         } else {
//           console.log(`Friend being created`);
//           let fortniteFriend, user;

//           FriendCollection.create(req.body, (errors, results) => {
//             errors ? res.send(errors) : (fortniteFriend = results);
//             UserCollection.findOne(
//               { _id: req.params._id },
//               (errors, results) => {
//                 errors ? res.send(error) : (user = results);
//                 user.fortniteFriends.push(fortniteFriend._id);
//                 user.save();
//                 res.send(user);
//               }
//             );
//           });
//         }
//       });
// })

// // let fortniteFriend, user;

// // FriendCollection.create(req.body, (errors, results) => {
// //   errors ? res.send(errors) : (fortniteFriend = results);
// //   UserCollection.findOne({ _id: req.params._id }, (errors, results) => {
// //     errors ? res.send(error) : (user = results);
// //     user.fortniteFriends.push(fortniteFriend._id);
// //     user.save();
// //     res.send(user);
// // }).populate("fortniteFriends");
// // });

//Get Complete list of friends in databse (even duplicates)
router.get("/fortnite/friends", (req, res) => {
  FriendCollection.find({}, (errors, results) => {
    errors ? res.send(errors) : res.send(results);
  });
});

//
router.put("/fortnite/friends/:gamerTag", (req, res) => {
  FriendCollection.findOneAndUpdate(
    { gamerTag: req.body.gamerTag },
    req.body,
    { new: true },
    (error, results) => {
      error ? res.send(errors) : res.send(results);
    }
  );
});
//Delete friend from database ()
router.delete("fortnite/friends/:_id", (req, res) => {
  FriendCollection.findOneAndDelete(
    { _id: req.params._id },
    (error, results) => {
      error ? res.send(error) : res.send(results);
    }
  );
});

module.exports = router;
