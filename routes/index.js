var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function( request, response, next) {
		response.render('index.html');
	});

router.post('/api/photo',function(req,res){
  if(done==true){
    console.log(req.files);
    res.end("File uploaded.");
  }
});

module.exports = router;
