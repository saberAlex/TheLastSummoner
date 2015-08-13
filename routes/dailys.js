var express = require('express');
var router = express.Router();
var Daily = require('../models/daily');


/* GET DAILY Listed. */
router.get('/', function(req, res, next) {
  Daily.getDailys(function(err, dailys){
    if(err) console.log(err);
    res.json(dailys);
  }); 
});

//Get daily based on ID:
router.get('/id/:id', function(req, res, next) {
  Daily.getDailysById(req.params.id, function(err, daily){
    if(err) console.log(err);
    res.json(daily);
  }); 
});

router.get("/:username", function(req, res, next){
	Daily.getDailysByUsername(req.params.username, function(err, dailys){
		if(err) console.log(err);
    	res.json(dailys);
	})
})

router.post("/create", function(req, res, next){
	var data = {
		name : req.body.name,
		username: req.body.username,
		info: req.body.info,
		rate: req.body.rate,
		heroalias: req.body.heroalias
	}

	Daily.createDaily(data, function(err, daily){
		if(err) throw err;
		res.json(daily);
	})
});



module.exports = router;
