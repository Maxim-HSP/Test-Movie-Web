var express = require('express');
var MovieTypeService = require("../service/MovieTypeService.js");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

//增加类型
router.post("/addMovieType",function(req,res,next){
    MovieTypeService.addMovieType(req.body,function(data){
        res.send(data);
    })
});

//判断类型是否重复
router.post("/MovieTypeIsUpload",function(req,res,next){
    MovieTypeService.MovieTypeIsUpload(req.body.type,function(data){
        res.send(data);
    })
});

//获取电影类型
router.post("/getMovieType",function(req,res,next){
    MovieTypeService.getMovieType(req.body,function(data){
        res.send(data);
    })
});
//根据id获取电影类型
router.post("/getIdByMovieType",function(req,res,next){
    MovieTypeService.getIdByMovieType(req.body._id,function(data){
        res.send(data);
    })
});
//删除电影类型
router.post("/delete",function(req,res,next){
    MovieTypeService.delete(req.body._id,function(data){
        res.send(data);
    })
});
//修改电影类型
router.post("/update",function(req,res,next){
    MovieTypeService.update(req.body,function(data){
        res.send(data);
    })
});
module.exports = router;