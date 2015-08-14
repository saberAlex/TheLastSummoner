var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var moment = require('moment');
require('moment-range');
var ObjectID = require('mongodb').ObjectID;

var HeroSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	job: {
		type: String,
		required: true
	}
});


var TaskSchema = mongoose.Schema({
	name: {
		type : String,
		required: true,
		default: "untitled"
	},
	info: {
		type: String, 
		required: true
	},
	deadline: {
		type: Date,
		required: true
	},
	rate: {
		type: Number,
		required: true,
		default: 10
	},
	failed: {
		type: Boolean,
		required: true,
		default: false
	},
	completed: {
		type: Boolean,
		required: true,
		default: false
	}
});

var DailySchema = mongoose.Schema({
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
	streak: {
		type: Number, 
		required: true, 
		default: 0
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
	}
})

// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index: true
	},
	password:{
		type: String, 
		required: true,
		bcrypt:true
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
		min: 0,
		default: 0
	},
	gameplay : {
		level: {
			type: Number, 
			required: true,
			default: 0
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
	quest : {
		task : [TaskSchema],
		daily: [DailySchema]
	}
});

var User = module.exports = mongoose.model('User', UserSchema);
var Daily = module.exports = mongoose.model('Daily', DailySchema);


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



//HERO RELATED PROCEDURE [HRP]
module.exports.createHeroForUsername = function(username, newHero, callback){
	User.findOneAndUpdate({"username": username, totalHero:{$lt:3} }, {
		$push: {
			heros: newHero
		},
		$inc: {
			totalHero:1
		}
	},{new:true}, callback);
};

module.exports.deleteHeroByUsername = function(username, heroid, callback){
	var objectid = ObjectID(heroid);
	console.log( "The object id: "+ objectid);
	User.findOneAndUpdate({"username": username}, {
		$pull: {
			heros : { _id:objectid }
		},
		$inc: {
			totalHero: -1
		}
	}, {new:true}, callback);
};

//QUEST RELATED PROCEDURE [QRP]
module.exports.getDailysByUsername = function(username, callback){
	var query = {username: username};
	User.find(query, {"quest.daily" : 1, "_id": 0}, callback);
};


module.exports.createDaily = function(username, newDaily, callback){
	User.findOneAndUpdate( {"username": username}, {
		$push: {
			"quest.daily" : newDaily
		}
	}, {new: true}, callback);
}

