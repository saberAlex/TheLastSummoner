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