var express = require('express');
var StudioService = require("../service/StudioService.js");
var router = express.Router();

//查询影院
router.post("/getStudios", function(req, res, next) {
	StudioService.getStudios((data) => {
		res.send(data);
	});
});

//根据_id查询影院信息
router.post("/getStudioByID", function(req, res, next) {
	StudioService.getStudioByID(req.body, (data) => {
		res.send(data);
	});
});

//增加影院
router.post("/addStudio", function(req, res, next) {
	StudioService.addStudio(req.body, (data) => {
		res.send(data);
	});
});

//修改影院
router.post("/updateByID", function(req, res, next) {
	StudioService.updateByID(req.body, (data) => {
		res.send(data);
	});
});

//删除影院
router.post("/deleteByID", function(req, res, next) {
	StudioService.deleteByID(req.body, (data) => {
		res.send(data);
	});
});


module.exports = router;