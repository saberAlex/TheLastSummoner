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
	
	var profileImageName = 'noimage.png';
	//getting the image.
	if(req.files.file) {
		var profileImageOriginalName = req.files.file.originalName;
		var profileImageName = req.files.file.name;
		var profileImageMime = req.files.file.mimetype;
		var profileImagePath = req.files.file.path;
		var profileImageExt = req.files.file.extension;
		var profileImageSize = req.files.file.size;
	}

	//Create User:
	var newUser = new User({
			name: req.body.name,
			email: req.body.email,
			username: req.body.username,
			password: req.body.password,
			profileimage: profileImageName
	});

	User.createUser(newUser, function(err, user){
		if (err)  {
			console.log(err);
			throw err;
		}
		console.log(user);
	});

	req.flash('success','You are now registered and may log in');
	res.location('/');
	res.redirect('/');

});

module.exports = router;
