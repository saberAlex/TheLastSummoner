var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");


var JobRatingSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	rate: {
		type: Number,
		required: true
	}
});
JobRatingSchema.plugin(uniqueValidator);

var JobCommentSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	info: {
		type: String,
		required: true
	},
	userpic :{
		type: String,
		default: "uploads/noimage.jpg"
	},
	createddate: {
		type: Date,
		default: Date.now
	}
});
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
	},
	comments:[JobCommentSchema],
	rating: {
		type: Number,
		required: true,
		default: 0
	},
	ratings:[JobRatingSchema]
});


var Job = module.exports = mongoose.model('Job', JobSchema);

module.exports.getJobs = function(callback){
	Job.find(callback);
};

module.exports.getJobsName = function(callback){
	Job.find({},{name: 1, _id: 0},callback);
};

module.exports.getJobByName = function(name, callback){
	Job.findById(name, callback);
};

module.exports.addCommentByName = function(name, data, callback) {
	//username, info
	var username = data.username;
	var info = data.info;
	var createddate = data.createddate;
	var userpic = data.userpic;

	var newComment = {
		username : username,
		info: info,
		createddate: createddate,
		userpic: userpic
	}

	Job.findOneAndUpdate({"name": name}, {
		$push: {
			comments : newComment
		}
	},{new: true}, callback);
}