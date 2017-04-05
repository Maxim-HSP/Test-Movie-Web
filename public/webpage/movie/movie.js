define(function(require, exports) {
    
	var $ = require("$")
    
    function init(){
        console.log("movie");
    }
    exports.load=function(){
        $("#AppContainer").load("./movie/movie.html",function(){
            init();
        })
    }
})