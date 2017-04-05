var express = require('express');
var TheaterService = require("../service/TheaterService.js");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.post('/addTheater', function(req, res, next) {
	console.log(req.body)
	TheaterService.addTheater(req.body, (data) => {
		res.send(data)
	})
});

router.post('/getTheatersByStudioID', function(req, res, next) {
	TheaterService.getTheatersByStudioID(req.body, (data) => {
		res.send(data)
	})
});

router.post('/updateByStudioID', function(req, res, next) {
	TheaterService.updateByStudioID(req.body, (data) => {
		res.send(data)
	})
});

router.post('/deleteByStudioID', function(req, res, next) {
	TheaterService.deleteByStudioID(req.body, (data) => {
		res.send(data)
	})
});

module.exports = router;