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

// var id = "55d1c8d71e0927d2184fabc8";
// Daily.find({_id:  ObjectID(id)}).remove(function(err, daily){
// 	if(err) throw err;
// 	console.log(daily.data);
// });

var id2 = "55d1c418f9bb981d17c1d507";
var name = "I am updating";
var info = "Hey there, do you feel me?";
var rate = 15;
var data = {
	name: name,
	info: info, 
	rate: rate
}
Daily.findOneAndUpdate(
	{_id:ObjectID(id2)},
	{ $set: {
		name: data.name,
		info: data.info,
		rate: data.rate,
		lastmodified: Date.now
	}}, {new: true, upsert:false}, function(err, daily){
		if(err) throw err;
		console.log(daily);
	});

