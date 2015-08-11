var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', securePages, function( request, response, next) {
		response.render('index.html');
	});

router.get('/login', function( request, response, next) {
		response.render('index.html');
	});

function securePages(request, response, next) {
	if(request.isAuthenticated()) {
		next();
	} else {
		response.location('/#/login');
		response.redirect('/#/login');
	}
}

router.post('/api/photo',function(req,res){
  if(done==true){
    console.log(req.files);
    res.end("File uploaded.");
  }
});

module.exports = router;
