define(function(require, exports) {
	var $ = require("easyui");
	exports.load = function(callback) {
		var cb = callback || function() {}
		$(".info-detail").load("/ims/info/studio/studio.html", function() {
           $('.studio-nav').tree({
               lines:true,
	    data: [{
            "id":1,
		"text": '影院信息管理',
		"children": [{
            "id":11,
			"text": '影院列表'
		},{
            "id":12,
			text: '增加影院'
		}]
	}],
    onClick:function(node){
        if(node.id==11){
            require("router").go("#/info/studio/studioList")
        }
        else{
            require("router").go("#/info/studio/chooseStudio")
        }
    }
               
               
     });



			cb();
		})
	}
})