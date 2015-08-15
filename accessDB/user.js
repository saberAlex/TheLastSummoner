var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var ObjectID = require('mongodb').ObjectID;
var moment = require('moment');
require('moment-range');


var HeroSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	job: {
		type: String,
		required: true
	}
});

var DailySchema = mongoose.Schema({
	name: {
		type: String, 
		required: true
	},
	info: {
		type: String
	},
	lastmodified: {
		type: String,
		required: true,
		default: Date.now
	},
	createddate: {
		type: String,
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

var TaskSchema = mongoose.Schema({
	name: {
		type: String, 
		required: true
	},
	info: {
		type: String
	},
	deadline: {
		type: String,
		required: true,
		default: Date.now
	},
	createddate: {
		type: String,
		required: true,
		default: Date.now
	},
	completed: {
		type: Boolean,
		required: true, 
		default: false
	},
	rate: {
		type: Number,
		required: true,
		default: 10
	},
	isDaily: {
		type: Boolean,
		required: true,
		default: false
	}
});

// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index: true,
		unique: true
	},
	password:{
		type: String, required: true, bcrypt:true
	},
	email: {
		type:String
	},
	name:{
		type: String
	},
	profileimage:{
		type: String
	},
	heros:[HeroSchema],
	totalHero: {
		type: Number,
		required: true,
		default: 0,
		min: 0
	},
	gameplay: {
		level: {
			type: Number,
			required: true,
			default: 1
		},
		exp: {
			type: Number, 
			required: true,
			default: 0
		},
		totalexp: {
			type: Number,
			required: true,
			default: 0
		}
	},
	daily: [DailySchema],
	task: [TaskSchema]
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch){
		if(err) return callback(err);
		callback(null, isMatch);
	});
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.createUser = function(newUser, callback) {
	bcrypt.hash(newUser.password, 10, function(err, hash){
		if(err) throw err;
		// Set hashed pw
		newUser.password = hash;
		// Create User
		newUser.save(callback)
	});
}

//HERO RELATED:
module.exports.createHeroForUsername = function(username, newHero, callback){
	User.findOneAndUpdate({"username": username, totalHero:{$lt:3} }, {
		$push: {
			heros: newHero
		},
		$inc: {
			totalHero:1
		}
	},{new: true, upsert: false}, callback);
}

module.exports.removeHeroForUsername = function(username, heroId, callback){
	User.findOneAndUpdate({"username": username, totalHero:{$gt:0}}, {
		$pull: {
			heros: {_id: ObjectID(heroId)}
		},
		$inc: {
			totalHero: -1
		}
	},{new: true}, callback);
}

//QUEST RELATED
//DAILY RELATED:
module.exports.createDailyForUsername = function(username, newDaily, callback){
	User.findOneAndUpdate({"username": username}, {
		$push: {
			daily: newDaily
		}
	},{new: true, upsert: false}, callback);
}

module.exports.checkDailyByUsername = function(username){
	User.findOne({username: username}, {"daily._id": 1, _id : 0}, function(err, user){

	});
}
