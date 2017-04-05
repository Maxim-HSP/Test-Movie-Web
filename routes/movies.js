var express = require('express');
var MovieService = require("../service/MovieService.js");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

//增加电影
router.post("/addMovie", function(req, res, next) {
	MovieService.addMovie(req.body, (data) => {
		res.send(data);
	})
});

//根据电影_id, 修改电影基本信息
router.post("/update", function(req, res, next) {
	MovieService.update(JSON.parse(req.body.movie), (data) => {
		res.send(data);
	})
});

//获取电影列表, 分页
router.post("/getMoviesByPage", function(req, res, next) {
	MovieService.getMoviesByPage(req.body, (data) => {
		res.send(data);
	})
});

//根据电影_id, 获取电影详情
router.post("/getMovieByMovieID", function(req, res, next) {
	MovieService.getMovieByMovieID(req.body, (data) => {
		res.send(data);
	})
});

//根据电影_id, 删除电影(修改电影状态)
router.post("/delete", function(req, res, next) {
	MovieService.delete(req.body, (data) => {
		res.send(data);
	})
});

//根据电影_id, 删除电影(修改电影状态)
router.post("/getMovieDetailsByMovieID", function(req, res, next) {
	MovieService.getMovieDetailsByMovieID(req.body, (data) => {
		res.send(data);
	})
});

module.exports = router;