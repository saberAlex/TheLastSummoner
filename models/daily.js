var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var moment = require('moment');
require('moment-range');

var DailytaskSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	name: {
		type: String, 
		required: true,
		default: "untitled"
	},
	info: {
		type: String, 
		required: true
	},
	rate: {
		type: Number,
		required: true,
		default: 5
	},
	createddate: {
		type: Date,
		default: Date.now,
		required: true
	},
	updatedate: {
		type: Date, 
		default: Date.now,
		required: true
	}, 
	completetoday: {
		type: Boolean,
		required: true,
		default: false
	},
	streak: {
		type: Number,
		required: true,
		default: 0
	},
	totalcompleted: {
		type: Number,
		required: true,
		default: 0
	},
	totalmiss : {
		type: Number,
		required: true,
		default: 0
	},
	heroalias: {
		type: Number, 
		required: true,
		default: -1
	}

});


var Daily = module.exports = mongoose.model('Daily', DailytaskSchema);

module.exports.getDailys = function(callback){
	Daily.find(callback);
};

module.exports.getDailysByUsername = function(username, callback){
	var query = {username: username};
	Daily.find(query, callback);
};


module.exports.getDailysById = function(id, callback){
	Job.findById(id, callback);
};

/*
username, 
name,
info,
rate, 
createddate
updatedate
completetoday
streak,
totalcompleted
totalmiss
heroalias
*/

//Todo: decrease hero exp
module.exports.updateDateCompleteById = function(id, data, callback) {
	//username, info
	var incmiss = data.incmiss;
	var inccompleted = data.inccompleted;
	if(data.reset) {
		var incstreak = -1;
	} else {
		var incstreak =1;
	}
	var  updatedate = data.updatedate;


	Daily.findById(id, function(err, daily) {
		if(!daily){
			return next(new Error("Could not load daily task"));
		} else {
			var dr = moment.range(daily.updatedate, updatedate);
			var days = dr.diff("days");
			if(days > 0) {
				daily.totalcompleted = daily.totalcompleted + inccompleted;
				if(incstreak == -1) {
					daily.streak = 0;
				} else {
					daily.streak = daily.streak + incstreak;
				}
				daily.updatedate = updatedate;
				daily.completetoday = false;
				daily.save(callback);
			}
		}
	});
}

//Todo: increase hero exp
module.exports.updateCompleteById = function(id, callback){
	Daily.findById(id, function(err, daily) {
		if(!daily){
			return next(new Error("Could not load daily task"));
		} else {
			if(!daily.completetoday) {
				daily.totalcompleted = daily.totalcompleted + 1;
				daily.streak = daily.streak + 1;
				daily.completetoday = true;
				//TODO: Add exp
				daily.save(callback);
			}
			
		}
	});
}

