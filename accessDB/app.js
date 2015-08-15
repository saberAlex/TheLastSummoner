var MongoClient = require('mongodb').MongoClient;
var async = require("async");
var moment = require('moment');
require('moment-range');
var User = require('./user');
var mongoose = require('mongoose');
var db = mongoose.connection;
mongoose.connect('mongodb://localhost/lastsummoner');
var ObjectID = require('mongodb').ObjectID;

	var query = {username: "luca"};
	var id = [];
	var miss = [];
	var streak = [];
	var exp = 0;

	User.findOne(query, function(err, user){
		var dailys = user.daily;
		console.log(dailys);
			dailys.forEach(function(item){
				var now = Date.now();
				var magicNumber = (1000 * 60 * 60 * 24);
				var dayDiff = Math.ceil((now - item.lastmodified ) / magicNumber) - item.completed;
				id.push(item._id);
				miss.push(dayDiff);
				if(dayDiff < 1) {
					streak.push(item.streak);
				} else {
					streak.push(0);
				}
				exp += -1* item.rate*dayDiff;
				console.log(miss[miss.length-1] + " " + exp + " " + id[id.length-1] + " " + streak[streak.length-1]);
	});
			// ToDo: using find one and update, 
			// Update EXP: increase or decrease
			// using waterfall and for each
			


});


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