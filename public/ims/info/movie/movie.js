define(function(require,exports){
    var $ = require("easyui");

    exports.load = function(callback){
        var cb = callback || function(){};
        $(".info-detail").load("./info/movie/movie.html",function(){

            $(".movie-nav").tree({
                lines : true,
                data:[{
                    "id":1,
                    "text":"电影资讯",
                    "children":[{
                        "id":11,
                        "text":"电影列表",
                    },{
                         "id":12,
                         "text": "新增电影",
                    }]
                }],
                onClick: function(node) {
                    if(node.id==11){
                        require("router").go("#/info/movie/movieList");
                    }else{
                        require("router").go("#/info/movie/addMovie");
                    }
                }
            });
            cb();
        })
    }
});