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

router.get("/username/:username", function(req, res, next){
	Daily.getDailysByUsername(req.params.username, function(err, dailys){
		if(err) console.log(err);
    	res.json(dailys);
	})
})

router.post("/:name", function(req, res, next) {
	var data = {
		username: req.body.username,
		info: req.body.info,
		createddate: req.body.createddate,
		userpic : req.body.userpic
	}
	Job.addCommentByName(req.params.name, data, function(err, job){
		if(err) console.log(err);
    	res.json(job);
	})
})


module.exports = router;
