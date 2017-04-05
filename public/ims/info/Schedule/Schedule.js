define(function(require,exports){
    var $=require("easyui");
    
    exports.load=function(CB_RT){
        var cb= CB_RT || function(){};
        $('.info-detail').load("./info/Schedule/Schedule.html",function(){
            $(".schedule-nav").tree({
                lines: true,
                data:[{
                    "id" : 1,
                    text: "排片信息管理",
                    children:[{
                        id:11,
                        text:"新增排片信息"
                    },{
                        id:12,
                        text:"排片信息查询"
                    }]
                }],
                onClick: function(node){
                    if(node.id == 11) {
                        require("router").go("#/info/Schedule/addSchedule")
                    }else{
                        require("router").go("#/info/Schedule/scheduleList")
                    }
                }
            })
            cb();
        })
    }
    
})