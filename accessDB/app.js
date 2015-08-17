var MongoClient = require('mongodb').MongoClient;
var async = require("async");
var moment = require('moment');
require('moment-range');
var User = require('./user');
var Daily = require('./daily');
var mongoose = require('mongoose');
var db = mongoose.connection;
mongoose.connect('mongodb://localhost/lastsummoner');
var ObjectID = require('mongodb').ObjectID;

var id = "55cf9d307c8e9a4b4f092e67";
var query = {username: "1", "daily._id": ObjectID(id)};
var projection = {"exp": 1, "daily": 1, _id: 0};
var newDailys = [];
var now = Date.now();
var exp = 0;
// User.findOne(query, projection, function(err, user){
// 	if(err) console.log(err);
// 	console.log(user);
// });

Daily.getDailyByUsername("1", function(err, users){
	if(err) throw err;
	//console.log(users);
});

//check daily one by one... 
//55d1b205a8b6e72a128526c9

// Daily.findOne({_id: ObjectID("55d1b205a8b6e72a128526c9")}, function(err, daily){
// 	console.log(daily);
// 	var now = Date.now();
// 	var dr = moment.range(daily.lastmodified, now);
// 	var dif = dr.diff("days") - daily.completed;
// 	newTotalMiss = dif;
// 	if(dif < 1) {
// 		newStreak = daily.newStreak;
// 	} else {
// 		newStreak = 0;
// 	}
// 	var newExp = dif*-1*daily.rate;
// 	var username = daily.username;
// 	Daily.findOneAndUpdate(
// 		{_id: ObjectID("55d1b205a8b6e72a128526c9")},
// 		{ $set: {
// 			lastmodified: now,
// 			totalmiss: newTotalMiss,
// 			streak: newStreak
// 		}}, {new: true, upsert: false}, function(err, daily){
// 			User.findOneAndUpdate({username: username},{
// 				$inc: {exp: newExp}
// 			},{new: true, upsert: false}, function(err, user){
// 				console.log(user.exp + " " + user.username);
// 			});
// 		});
// });


Daily.updateDailyById("55d1b205a8b6e72a128526c8", function(err, user){
	if(err) throw err;
	console.log(user);
	console.log(user.exp);
})

// MongoClient.connect('mongodb://localhost:27017/lastsummoner', function(err, db) {
// 	if(err) throw err;

// 	var miss = [];
// 	var exp = 0;

// 	 var dateA = moment().subtract(7, 'days').valueOf();
// 		db.collection('dailies').update(
// 			{"username": "1"},
// 			{"$set": {
// 	            "createddate": dateA,
// 	            "lastmodified": dateA
// 	        }},{new: true,upsert: false, multi: true}, function(err, docs){
// 			if(err) throw err;
// 			console.dir(docs);
// 			db.close();
// 		});

// });

// 	 var dateA = moment().subtract(7, 'days').valueOf();
// 	db.collection('users').findOneAndUpdate(
// 		{"username": "luca", "daily.name" :"123" },
// 		{"$set": {
//             "daily.$.rate": 15,
//             "daily.$.createddate": dateA,
//             "daily.$.lastmodified": dateA
//         }},{new: true,upsert: false, multi: true}, function(err, docs){
// 		if(err) throw err;
// 		var daily = docs.daily;
// 		console.dir(daily);
// 		db.close();
// 	});
	// // async.waterfall([
	// 	function(callback) {
	// 		db.collection('data').distinct("State", function(err, docs) {
	//         if(err) throw err;
	//         console.dir(docs);
	//         var states = docs;
	//         callback(null, states);
	//         });
	// 	},
	// 	function(states, callback){
	// 		console.log(states);
	// 		async.forEach(Object.keys(states), function (item, callback2){ 
	// 	    	db.collection("data").findAndModify(
	// 	    		{State : states[item]},			 //query
	// 	    		[["Temperature","descending" ]], //sorting
	// 	    		{ $set:{"month_high": true}},	 //update
	// 	    		{upsert: true}					 //option
	// 	    	, function(err, data){
	// 	    		if(err) console.log(err);
	// 	    		console.dir(data);
	// 	    		callback2();
	// 	    	});
	// }, callback);  
	// 	}
	// ], function(err, results){
	// 	if(err) throw err;
	// });



	// var query = {username: "luca"};
	// var newDailys = [];
	// var now = Date.now();
	// var exp = 0;
	// async.waterfall([
	// 				function(callback) {
	// 					User.findOne(query, function(err, user){
	// 						newDailys.lastExp = user.gameplay.exp;
	// 						var dailys = user.daily;
	// 							dailys.forEach(function(item){
	// 								var newDaily = {};
	// 								newDaily.lastmodified = now;
	// 								var magicNumber = (1000 * 60 * 60 * 24);
	// 								var dayDiff = Math.ceil((newDaily.lastmodified - item.lastmodified ) / magicNumber) - item.completed;
	// 								newDaily._id = item._id; //id.push(item._id);
	// 								newDaily.totalmiss = dayDiff;
	// 								newDaily.completed = false;
	// 								if(dayDiff < 0) newDaily.completed = true;
	// 								if(dayDiff < 1) {
	// 									newDaily.streak  = item.streak;
	// 								} else {
	// 									newDaily.streak = 0
	// 								};
	// 								exp += -1* item.rate*dayDiff;
	// 								newDailys.push(newDaily);
	// 								//console.log(newDailys);
	// 						});
	// 					callback(null, newDailys);
	// 			   });
	// 				},
	// 				function(newDailys, callback){
	// 					//console.log(newDailys);
	// 					async.forEachOf(newDailys, function (value, key, callback){ 
	// 						console.log(value);
	// 						User.findOneAndUpdate(
	// 								{"username": "luca", "daily._id" :ObjectID(value._id+"")},
	// 								{"$set": {
	// 						            "daily.$.totalmiss": value.totalmiss,
	// 						            "daily.$.lastmodified": value.lastmodified,
	// 						            "daily.$.completed": value.completed,
	// 						            "daily.$.streak": value.streak
	// 						        }},{new: true,upsert: false}, function(err, docs){
	// 								if(err) throw err;
	// 								console.dir(docs.daily);
	// 								callback();
	// 							});
	// 				  });
	// 			}], function(err){
	// 				if(err) throw err;
	// 				var newExp = newDailys + exp;
	// 				if(newExp < 0) newExp = 0;
	// 				User.findOneAndUpdate(query,
	// 					{$set: {"gameplay.exp": newExp}},
	// 					{new: true, upsert: false}, function(err, user){
	// 						console.log(user);
	// 					});
	// 			});

// User.checkDailyByUsername("1", function(err, user){
// 	if(err) console.log(err);
// 	console.log(user);
// });

			// ToDo: using find one and update, 
			// Update EXP: increase or decrease
			// using waterfall and for each

// MongoClient.connect('mongodb://localhost:27017/lastsummoner', function(err, db) {
// 	if(err) throw err;

// 	var miss = [];
// 	var exp = 0;

// 	db.collection('users').findOne({"username": "luca"}, function(err, docs){
// 		if(err) throw err;
// 		console.log(docs);
// 		// var daily = docs.daily;
// 		// var currentExp = docs.gameplay.exp;
// 		// var now = moment();
// 		// //for(var i = 0; i < daily.length; i++) {
// 		// 	console.log(daily[1].lastmodified +" "+ daily[0].lastmodified)
// 		// var dr = moment.range(daily[0].createddate, now);
// 		// var dif = dr.diff("days") - true;
// 		// console.log(dif);
// 		// //}
// 		// exp = -1*dif*daily[0].rate;
// 		// console.log(currentExp + exp);
// 		// console.log("dateA: " + dateA);
// 		// var days = dr.diff("days");
// 		// console.log("days " + days)
// 		//console.dir(daily);
// 		db.close();
// 	});
// });

// 	 var dateA = moment().subtract(7, 'days').valueOf();
// 	db.collection('users').findOneAndUpdate(
// 		{"username": "luca", "daily.name" :"123" },
// 		{"$set": {
//             "daily.$.rate": 15,
//             "daily.$.createddate": dateA,
//             "daily.$.lastmodified": dateA
//         }},{new: true,upsert: false, multi: true}, function(err, docs){
// 		if(err) throw err;
// 		var daily = docs.daily;
// 		console.dir(daily);
// 		db.close();
// 	});
	// // async.waterfall([
	// 	function(callback) {
	// 		db.collection('data').distinct("State", function(err, docs) {
	//         if(err) throw err;
	//         console.dir(docs);
	//         var states = docs;
	//         callback(null, states);
	//         });
	// 	},
	// 	function(states, callback){
	// 		console.log(states);
	// 		async.forEach(Object.keys(states), function (item, callback2){ 
	// 	    	db.collection("data").findAndModify(
	// 	    		{State : states[item]},			 //query
	// 	    		[["Temperature","descending" ]], //sorting
	// 	    		{ $set:{"month_high": true}},	 //update
	// 	    		{upsert: true}					 //option
	// 	    	, function(err, data){
	// 	    		if(err) console.log(err);
	// 	    		console.dir(data);
	// 	    		callback2();
	// 	    	});
	// }, callback);  
	// 	}
	// ], function(err, results){
	// 	if(err) throw err;
	// });

//check daily by username