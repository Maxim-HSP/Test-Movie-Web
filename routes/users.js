var express = require('express');
var UserService = require("../service/UserService.js");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

//登录服务
router.post('/login', function(req, res, next) {
	UserService.login(req.body.username, req.body.password, (data) => {
		res.send(data);
	})
});

//注册服务
router.post("/reg", function(req, res, next) {
	UserService.reg({
		username: req.body.username,
		password: req.body.password,
		status: req.body.status
	}, (data) => {
		res.send(data);
	})
});

//判断用户名是否存在
router.post("/isUse", function(req, res, next) {
	UserService.isUse({
		username: req.body.username,
		status: req.body.status
	}, (data) => {
		res.send(data);
	})
});


//获取用户列表
router.post("/getUsers", function(req, res, next) {
	UserService.getUsers({
		status: req.body.status,
		flag: req.body.flag
	}, (data) => {
		res.send(data);
	})
});

//删除用户
router.post("/del", function(req, res, next) {
	UserService.del({
		_id: req.body._id
	}, (data) => {
		res.send(data);
	})
});

//更新用户
router.post("/update", function(req, res, next) {
	UserService.update(req.body, (data) => {
		res.send(data);
	})
});

module.exports = router;