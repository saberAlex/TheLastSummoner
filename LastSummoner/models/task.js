var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var ObjectID = require('mongodb').ObjectID;
var async = require("async");
var User = require("./user");
var moment = require('moment');
require('moment-range');

var DailySchema = mongoose.Schema({
	username: {
		type: String, 
		required: true
	},
	name: {
		type: String, 
		required: true
	},
	info: {
		type: String, 
		required: true, 
		default: "no explaination"
	},
	deadline: {
		type: Date, 
		required: true
	},
	createddate: {
		type: Date,
		required: true,
		default: Date.now
	},
	completed: {
		type: Boolean,
		required: true, 
		default: false
	},
	failed: {
		type: Boolean,
		required: true, 
		default: false
	},
	rate: {
		type: Number,
		required: true,
		default: 10
	}
});

var Task = module.exports = mongoose.model('Task', DailySchema);

module.exports.createTask = function(newTask, callback){
	newTask.save(callback);
}

module.exports.getTaskByUsername = function(username, callback){
	var query = {username: username};
	Task.find(query).exec(callback);
}

mo


module.exports.updateTaskById = function(taskId, callback){

	Task.findOne({_id: ObjectID(taskId)}, function(err, task){
		var now = Date.now();
		var dr = moment.range(task.deadline, now);
		var dif = dr.diff("days");
		newTotalMiss = dif;
		if(dif > 0 && !task.completed && !task.failed) {
			task.failed = true;
			task.save();
		} 
		var newExp = (task.failed -1)*task.rate;
		var username = task.username;
		User.findOneAndUpdate({username: username},{
						$inc: {exp: newExp}
					},{new: true, upsert: false}, function(err, user){
						callback(null, task);
					});
				});
}


module.exports.updateTaskCompleteById = function(taskId, callback){

	Task.findOne({_id: ObjectID(taskId)}, function(err, task){
		task.completed = true;
		task.save();
		var newExp = task.rate;
		var username = task.username;
		User.findOneAndUpdate({username: username},{
						$inc: {exp: newExp}
					},{new: true, upsert: false}, function(err, user){
						callback(null, task);
					});
				});
}

module.exports.deleteTaskById = function(taskId, callback){
	
}