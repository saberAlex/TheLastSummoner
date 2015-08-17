var express = require('express');
var router = express.Router();
var Daily = require('../models/daily');


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post("/create/:username", function(req, res, next){
	var newDaily = new Daily({
		name: req.body.name,
		username: req.params.username,
		info: req.body.info,
		rate: req.body.rate
	});

	Daily.createDaily(newDaily, function(err, daily){
		if(err) throw err;
		console.log(daily);
		res.json(daily);
	});
});

router.get("/getdaily/:username", function(req, res, next){
	Daily.getDailyByUsername(req.params.username, function(err, dailies){
		if(err) throw err;
		res.json(dailies);
	});
});

router.put("/update/:id", function(req, res, next){
	Daily.updateDailyById(req.params.id, function(err, daily){
		if(err) throw err;
		res.json(daily);
	})
});






module.exports = router;
