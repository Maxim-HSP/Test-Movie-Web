var express = require('express');
var ImgService = require("../service/ImgService.js");
var router = express.Router();

router.post("/movieImgIsUpload", function(req, res, next) {
	ImgService.movieImgIsUpload(req.body, (data) => {
		res.send(data);
	})
});

router.post("/getMovieImgByMovieId", function(req, res, next) {
	ImgService.getMovieImgByMovieId(req.body, (data) => {
		res.send(data);
	})
});

router.post("/delete", function(req, res, next) {
	ImgService.delete(req.body, (data) => {
		res.send(data);
	})
});

module.exports = router;