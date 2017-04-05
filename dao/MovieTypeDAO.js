var mongoose = require("mongoose");
module.exports.addMovieType = function(type,callback){
    var MovieTypeModel = mongoose.model("movieType");
    MovieTypeModel.create(type,function(err,data){
        callback(data);
    })
};
module.exports.MovieTypeIsUpload = function(type,callback){
    var MovieTypeModel = mongoose.model("movieType");
    MovieTypeModel.count({
        type:type,
    },function(err,data){
       callback(data);
    })
};
module.exports.getMovieType = function(page,callback){
    var MovieTypeModel = mongoose.model("movieType");
    MovieTypeModel.count(function(err,data){
        page.total = data;
        page.maxPage = Math.ceil(data/page.rows);
        MovieTypeModel
            .find()
            .skip((page.page-1)*page.rows)
            .limit(eval(page.rows))
            .exec(function(err,data){
                page.rows = data;
                callback(page);
            })
    });
};
module.exports.getIdByMovieType = function(_id,callback){
    var MovieTypeModel = mongoose.model("movieType");
    MovieTypeModel.find({
        _id:_id
    },function(err,data){
        callback(data);
    })
};
module.exports.delete = function(_id,callback){
    var MovieTypeModel = mongoose.model("movieType");
    MovieTypeModel.remove({
        _id:_id,
    },function(err,data){
        callback("true")
    })
};
module.exports.update = function(movieType,callback){
    var MovieTypeModel = mongoose.model("movieType");
    MovieTypeModel.update({
        _id:movieType._id,
    },{
        type:movieType.type,
    },function(err,data){
        callback(data)
    })
};