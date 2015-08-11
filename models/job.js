var mongoose = require('mongoose');

// User Schema
var JobSchema = mongoose.Schema({
	name: {
		type: String,
		index: true,
		required: true
	},
	info:{
		type: String,
		required: true
	},
	path: {
		type:String,
		required: true
	}
});

var Job = module.exports = mongoose.model('Job', JobSchema);

module.exports.getJobs = function(callback){
	Job.find(callback);
};

module.exports.getJobByName = function(name, callback){
	User.findById(name, callback);
};