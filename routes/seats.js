var express = require('express');
var SeatService = require("../service/SeatService.js");
var router = express.Router();

//获取座位列表
router.post("/getSeatsByTheaterID", function (req, res, next) {
	SeatService.getSeatsByTheaterID(req.body, (data) => {
		res.send(data);
	})
});

module.exports = router;