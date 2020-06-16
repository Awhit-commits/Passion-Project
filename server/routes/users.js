var express = require("express");
var router = express.Router();
const UserCollection = require("../models/UserSchema");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = require("../config/keys").secretKey;

router.use(express.json());
/* GET users listing. */
router.get("/", function (req, res, next) {
  // res.send("respond with a resource");
  UserCollection.find({},(errors,results)=>{
    errors?res.send(errors):res.send(results)
  })
    
  
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
            role: user.role,
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

module.exports = router;
