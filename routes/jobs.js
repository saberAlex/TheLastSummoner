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

//Get job based on name:
router.get('/:name', function(req, res, next) {
  Job.getJobByName(req.params.name, function(err, job){
    if(err) console.log(err);
    res.json(job);
  }); 
});

module.exports = router;
