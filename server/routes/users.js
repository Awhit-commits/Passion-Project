var express = require("express");
var router = express.Router();
const UserCollection = require("../models/UserSchema");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = require("../config/keys").secretKey;

// router.use(express.json());
/* GET users listing. */
router.get("/", function (req, res, next) {
  // res.send("respond with a resource");
  UserCollection.find({},(errors,results)=>{
    errors?res.send(errors):res.send(results)
  }).populate('fortniteFriends')
    
  
});

// Registering user for the app
router.post("/register", (req, res) => {
  // res.send('User has been created')
  UserCollection.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      res.json({
        error: `User with email ${req.body.email} has already registered`,
      });
    } else {
      const newUser = new UserCollection({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        username:req.body.username
      });
      // encrypt password
      bcryptjs.genSalt(10, (error, salt) => {
        bcryptjs.hash(newUser.password, salt, (error, hash) => {
          if (error) {
            res
              .status(500)
              .json({ error: "an error has occured while hashing" });
          } else {
            newUser.password = hash;
            newUser.save().then((user) => res.json(user));
          }
        });
      });
    }
  });
  console.log("User has been created");
});

//Login for the user
router.post("/login", (req, res) => {
  // res.send("User has logged in");
  UserCollection.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      res.status(404).json({ error: "Email/Password is incorrect" });
    } else {
      bcryptjs.compare(req.body.password, user.password).then((isMatched) => {
        if (isMatched) {
          const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
            
          };
          jwt.sign(payload, secretKey, { expiresIn: 3600 }, (error, token) => {
            error
              ? res.status(404).json({ error: error })
              : res.json({ token: `bearer ${token}` });
          });
        } else {
          res.status(500).json({ error: "Email/Password is incorrect" });
        }
      });
    }
  });
  console.log("User has logged in");
});

//Deleting User by Id

router.delete("/profile/:_id",(req,res)=>{
  UserCollection.findOneAndDelete({_id:req.params._id},(error,results)=>{
    error? res.send(error):res.send(results);
  })
})

//Retrieving specific user by mongo Id
router.get("/profile/:_id", (req, res) => {
  // res.send('my profile page is here')
  UserCollection.findOne({ _id: req.params._id }, (error, results) => {
    error ? res.send(error) : res.send(results);
  }).populate("fortniteFriends");
});
//Showing all users in database
router.get("/fortnite/:_id", (req, res) => {
  UserCollection.find({},(error,results)=>{
    error?res.send(error):res.send(results)
  })
});


//Updating users in database

router.put ("/profile/:_id",(req,res)=>{
  UserCollection.findOneAndUpdate({_id:req.params._id},req.body,{new:true},(error,results)=>{
    error?res.send(error):res.send(results)

  })
})


// POST: verify user
router.post("/verify", verifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (error, results) => {
    error
      ? res.status(500).json({ error: "verificaiton error!!!" })
      : res.json({ message: results });
  });
});

// verify user token
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(403).json({ error: "Fobbiden" });
  }
}

module.exports = router;
