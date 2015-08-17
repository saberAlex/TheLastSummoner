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
	lastmodified: {
		type: Date, 
		required: true, 
		default: Date.now 
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
	streak: {
		type: Number,
		required: true,
		default: 0
	},
	totalmiss: {
		type: Number,
		required: true,
		default: 0
	},
	rate: {
		type: Number,
		required: true,
		default: 10
	}, 
	isDaily: {
		type: Boolean,
		required: true,
		default: true
	}
});

var Daily = module.exports = mongoose.model('Daily', DailySchema);

module.exports.createDaily = function(newDaily, callback){
	newDaily.save(callback);
}

module.exports.getDailyByUsername = function(username, callback){
	var query = {username: username};
	Daily.find(query).exec(callback);
}

module.exports.updateDailyById = function(dailyId, callback){

	Daily.findOne({_id: ObjectID(dailyId)}, function(err, daily){
		console.log(daily);
		var now = Date.now();
		var dr = moment.range(daily.lastmodified, now);
		var dif = dr.diff("days") - daily.completed;
		newTotalMiss = dif;
		if(dif < 1) {
			newStreak = daily.newStreak;
		} else {
			newStreak = 0;
		}
		var newExp = dif*-1*daily.rate;
		var username = daily.username;
		if(dr.diff("days") == 0) {
			callback(null, daily);
		} else {
			Daily.findOneAndUpdate(
				{_id: ObjectID(dailyId)},
				{ $set: {
					lastmodified: now,
					totalmiss: newTotalMiss,
					streak: newStreak,
					completed: false
				}}, {new: true, upsert: false}, function(err, daily){
					User.findOneAndUpdate({username: username},{
						$inc: {exp: newExp}
					},{new: true, upsert: false}, function(err, user){
						daily.exp = user.exp;
						callback(null, daily);
					});
				});
		}
	});
}
//Todolist: changing daily into using save. 



module.exports.removeDaily = function(dailyId, callback) {
	Daily.find({_id:  ObjectID(dailyId)}).remove(callback);
}


module.exports.updateDailyInfoById = function(dailyId, newDaily, callback){
	var data = {
	name: newDaily.name,
	info: newDaily.info, 
	rate: newDaily.rate
}
Daily.findOneAndUpdate(
	{_id:ObjectID(dailyId)},
	{ $set: {
		name: data.name,
		info: data.info,
		rate: data.rate,
		lastmodified: Date.now
	}}, {new: true, upsert:false}, callback);
}

module.exports.updateCompleteById = function(dailyId, username, callback){
  Daily.findOneAndUpdate(
	{_id:ObjectID(dailyId)},
	{ $set: {
		completed: true;
	}}, {new: true, upsert:false}, function(err, daily){
		User.findOneAndUpdate(
			{username: username},
			{$inc: {exp: daily.rate}},
			{new: true, upsert: false}, callback);
	});
}