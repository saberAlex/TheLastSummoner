var express = require('express');
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require('../models/user');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//FOR CREATING HERO
router.post("/createhero/:username", function(req, res, next){
  var data = {
    name: req.body.name,
    job: req.body.job
  }
  User.createHeroForUsername(req.params.username, data, function(err,user){
    if(err) console.log(err);
    res.json(user);
  });
});

//DELETE HERO
router.delete("/deletehero/:username/:id", function(req, res, next){
	User.removeHeroForUsername(req.params.username, req.params.id, function(err, user){
		if (err) throw err;
		res.json(user);
	})
});


//END FOR CREATING THE HERO
// router.get("/register", function(req, res, next){
// });

router.get("/:username", function(req,res, next){
  User.getUserByUsername(req.params.username,function(err, user){
    if(err) {
      console.log(err);
    }
    console.log(user);
    res.json(user);
  });

});

router.post("/register", function(req, res, next){
  
  var profileImagePath = 'uploads/noimage.png';
  //getting the image.
  if(req.files.userpic) {
    var profileImageOriginalName = req.files.userpic.originalName;
    var profileImageName = req.files.userpic.name;
    var profileImageMime = req.files.userpic.mimetype;
    //var profileImagePath = req.files.userpic.path;
    var profileImagePath = "uploads/" + req.files.userpic.name;
    var profileImageExt = req.files.userpic.extension;
    var profileImageSize = req.files.userpic.size;
  }

  //Create User:
  var newUser = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      profileimage: profileImagePath
  });

  User.createUser(newUser, function(err, user){
    if (err)  throw err;
    console.log(user);
  });

});


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done){
    User.getUserByUsername(username, function(err, user){
      if(err) throw err;
      if(!user){
        console.log('Unknown User');
        return done(null, false,{message: 'Unknown User'});
      }

      User.comparePassword(password, user.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
          return done(null, user);
        } else {
          console.log('Invalid Password');
          return done(null, false, {message:'Invalid Password'});
        }
      });
    });
  }
));

router.post('/login', passport.authenticate('local'), function(req, res){
    User.getUserByUsername(req.body.username,function(err, user){
    if(err) {
      console.log(err);
    }
    console.log("I AM LOGIN");
    console.dir(user);
    res.json(user);
  });

});

router.get('/logout', function(req, res){
  req.logout();
}); 

module.exports = router;
