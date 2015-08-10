var express = require('express');
var router = express.Router();
var User = require('../models/user');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get("/register", function(req, res, next){
	//redirect to home.
	res.location('/');
	res.redirect('/');
});

router.post("/register", function(req, res, next){
	
	var profileImagePath = 'uploads/noimage.png';
	//getting the image.
	if(req.files.userpic) {
		var profileImageOriginalName = req.files.userpic.originalName;
		var profileImageName = req.files.userpic.name;
		var profileImageMime = req.files.userpic.mimetype;
		var profileImagePath = req.files.userpic.path;
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
		if (err)  {
			console.log(err);
			throw err;
		}
		console.log(user);
	});

	res.location('/');
	res.redirect('/');

});

module.exports = router;
