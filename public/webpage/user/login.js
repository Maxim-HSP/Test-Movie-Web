define(function(require, exports) {
    var $=require("$");
    
    function init(){
        console.log("login");
    }
    
    exports.load= function(scheduleId){
        $("html").load("./user/login.html",function(){
            init();
        })
    }
})