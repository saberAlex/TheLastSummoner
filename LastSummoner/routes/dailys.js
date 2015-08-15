var express = require('express');
var router = express.Router();
var User = require('../models/user');


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post("/create/:username", function(req, res, next){
	var data = {
		name: req.body.name,
		info: req.body.info,
		rate: req.body.rate
	};
	User.createDailyForUsername(req.params.username, data, function(err, user){
		if(err) throw err;
		res.json(user);
	})
});


module.exports = router;
