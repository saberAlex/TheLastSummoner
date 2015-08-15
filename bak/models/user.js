var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var HeroSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	job: {
		type: String,
		required: true
	},
	level: {
		type: Number,
		required: true,
		default: 1
	},
	exp: {
		type: Number,
		required: true,
		default: 0
	}
});


// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index: true
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
		default: 0
	}

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

module.exports.createHeroForUsername = function(username, newHero, callback){
	User.findOneAndUpdate({"username": username, totalHero:{$lt:3} }, {
		$push: {
			heros: newHero
		},
		$inc: {
			totalHero:1
		}
	}, callback);
}