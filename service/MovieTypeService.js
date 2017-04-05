var MovieTypeDAO = require("../dao/MovieTypeDAO.js");
module.exports.addMovieType = function (type, callback) {
    MovieTypeDAO.addMovieType(type, function (data) {
        callback(data);
    });
};
module.exports.MovieTypeIsUpload = function (type, callback) {
    MovieTypeDAO.MovieTypeIsUpload(type, function (data) {
        callback({
            count:data
        });
    });
};
module.exports.getMovieType = function (page,callback) {
    MovieTypeDAO.getMovieType(page,function (data) {
        callback(data);
    });
};
module.exports.delete = function (_id,callback) {
    MovieTypeDAO.delete(_id,function (data) {
        callback(data);
    });
};
module.exports.update = function (movieType,callback) {
    MovieTypeDAO.update(movieType,function (data) {
        if(data.ok === 1){
            callback("true")
        }
    });
};
module.exports.getIdByMovieType = function (_id,callback) {
    MovieTypeDAO.getIdByMovieType(_id,function (data) {
        callback(data);
    });
};