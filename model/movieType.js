require("../dao/database.js");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/*
    movieType  -- 电影类型
    {
        type:"string"     //类型
    }
*/
var movieTypeSchema = new mongoose.Schema({
    type:{
        type:String
    }
});
mongoose.model("movieType", movieTypeSchema, "movieType");