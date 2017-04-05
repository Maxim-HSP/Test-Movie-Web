var express = require('express');
var ScheduleService = require("../service/ScheduleService.js");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

//新增排片信息
router.post('/addSchedule', function(req, res, next) {
	ScheduleService.addSchedule(req.body, (data) => {
		res.send(data);
	});
});

//获取排片列表
router.post('/getSchedulesByMST', function(req, res, next) {
	ScheduleService.getSchedulesByMST(req.body, (data) => {
		res.send(data);
	});
});

//新增排片信息
router.post('/getSchedulesByMST', function(req, res, next) {
	ScheduleService.getSchedulesByMST(req.body, (data) => {
		res.send(data);
	});
});

//删除排片信息
router.post('/deleteByScheduleID', function(req, res, next) {
	ScheduleService.deleteByScheduleID(req.body, (data) => {
		res.send(data);
	});
});


//获取所排片座位信息
router.post('/getSeatingsByScheduleID', function(req, res, next) {
	ScheduleService.getSeatingsByScheduleID(req.body, (data) => {
		res.send(data);
	});
});
//更新座位状态信息
router.post('/updateSeatings', function(req , res, next) {
    ScheduleService.updateSeatings(req.body, (data) => {
		res.send(data);
	});
})

//根据电影ID获取影院信息
router.post('/getStudiosByMovieID', function(req, res, next) {
	ScheduleService.getStudiosByMovieID(req.body, (data) => {
		res.send(data);
	});
});

//根据电影ID, 影院ID和时间获取场次信息
router.post('/getScheduleListByMoiveIDAndStudioIDAndTime', function(req, res, next) {
	ScheduleService.getScheduleListByMoiveIDAndStudioIDAndTime(req.body, (data) => {
		res.send(data);
	});
});

module.exports = router;