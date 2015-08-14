This is a side project for implementing Last Summoner app. 
We use MEAN-framework for all the implementation

Using multer to upload file:
	https://codeforgeek.com/2014/11/file-uploads-using-node-js/
	//uploaded using multer:
	userPhoto uploaded to  uploads/moogle-mail1439243575077.jpg
		{ userPhoto: 
		   { fieldname: 'userPhoto',
		     originalname: 'moogle-mail.jpg',
		     name: 'moogle-mail1439243575077.jpg',
		     encoding: '7bit',
		     mimetype: 'image/jpeg',
		     path: 'uploads/moogle-mail1439243575077.jpg',
		     extension: 'jpg',
		     size: 73550,
		     truncated: false,
		     buffer: null } }
		POST /api/photo 200 8.681 ms - -

//class active

Finding element based on the element match in the array: db.jobs.find({ratings:{$elemMatch: {username: "admin"}}});

db.jobs.find({ratings:{$elemMatch: {username: "admin"}}});
db.jobs.update({"name":"knight"}, {
	$push: {
		comments: {
			"username": "lucareto",
			"info": "This is suitable for beginner"
		}
	}
})


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


Todo List: 
	> update the structure, all user will have daily, Hero, and Quest in one place. 
	> This is the most convinient

var request = require("request");

request("url", callback);
callback = function(error, response, body) {
	var obj = JSON.parse.body();
}

To save the query in the cursor first:
var cursor = db.collection("grade").find({});
cursor.skip(1);
cursor.limit(4);
cursor.sort("grade",1);
cursor.each(callback);
 > TO DO: check if we recall this again. wil it give me the same cursor???
 >how to create global variable in node... hmm... 

 Note about NODE.js driver for mongoDB: Skip, limit, and sort
 	> include skip, limit, and sort options in the options object for find and find one.
 	> pass a sort order as an argument to find and modify
 	> call thr skip, limit, and sort funstion on a cursor before retrieving any document. 


//Inserting:
This will insert all the document because the query in an array:
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function(err, db) {
    if(err) throw err;

    //notice rgar rge docs is an array. 
    var docs = [ { '_id' : 'George', 'age' : 6 },
                 { '_id' : 'george', 'age' : 7 } ];

    db.collection('students').insert(docs, function(err, inserted) {
        if(err) throw err;

        console.dir("Successfully inserted: " + JSON.stringify(inserted));

        return db.close();
    });
});

//UPDATE -- replacement update 
//UPDATE inplace -- update to modify the document 
//UPDATE multi/
//WE cannot mixed the $-sign operator with the field, because mongo db cannot understand!


IMPORTANT: if we actually put an id to our save, this will do something like this:
		>Upsert to insert or replace the document
		>lets check what's moongoose said about this.

Removing all the document: 
Which of the following remove calls would definitely remove all the documents in the collection 'foo', regardless of its contents? Check all that apply.
db.collection('foo').remove(callback);
db.collection('foo').remove({ 'x' : { '$nin' : [] } }, callback);
db.collection('foo').remove({}, callback);


TodO: prevent default after form submission
