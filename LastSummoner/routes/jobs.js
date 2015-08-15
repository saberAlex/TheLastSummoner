var express = require('express');
var router = express.Router();
var Job = require('../models/job');


/* GET JOB Listed. */
router.get('/', function(req, res, next) {
  Job.getJobs(function(err, jobs){
    if(err) console.log(err);
    res.json(jobs);
  }); 
});

router.get('/getname', function(req,res,next){
	Job.getJobsName(function(err, jobs){
		if(err) throw err;
		res.json(jobs);
	})
});

//Get job based on name:
router.get('/:name', function(req, res, next) {
  Job.getJobByName(req.params.name, function(err, job){
    if(err) console.log(err);
    res.json(job);
  }); 
});

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
