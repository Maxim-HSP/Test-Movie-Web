define(function(require,exports){
    var $=require("$");
    
    function init(){
        console.log("ranking");
    }
    
    exports.load=function(){
        $("#AppContainer").load("./ranking/ranking.html",function(){
            init();
        })
    }
})