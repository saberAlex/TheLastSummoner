var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get("/getdaily/:username", function(req, res, next){
	User.getDailysByUsername(req.params.username, function(err, dailys){
		if(err) throw err;
		res.json(dailys);
	})
});

router.post("/createDaily", function(req, res, next){
	var username = req.body.username;
	var data = {
		name : req.body.name,
		info: req.body.info,
		rate: req.body.rate
	};

	User.createDaily(username, data, function(err, user){
		if(err) throw err;
		res.json(user);
	})
});



module.exports = router;
