var express = require('express');
var router = express.Router();
var Task = require('../models/task');


router.post("/create/:username", function(req, res, next){
	var newTask = new Task({
		name: req.body.name,
		username: req.params.username,
		info: req.body.info,
		deadline: req.body.deadline,
		rate: req.body.rate
	});
	console.log(newTask)
	Task.createTask(newTask, function(err, task){
		if(err) throw err;
		console.log(task);
		res.json(task);
	});
});

router.get("/gettasks/:username", function(req, res, next){
	Task.getTaskByUsername(req.params.username, function(err, tasks){
		if(err) throw err;
		res.json(tasks);
	});
});

router.put("/update/:id", function(req, res, next){
	Task.updateTaskById(req.params.id, function(err, task){
		if(err) throw err;
		res.json(task);
	})
});


router.put("/complete/:id", function(req, res, next){
	Task.updateTaskCompleteById(req.params.id, function(err, task){
		if(err) throw err;
		console.dir(task);
		res.json(task);
	})
});





module.exports = router;
