define(function(require, exports) {
    
	var $ = require("easyui");
    
	exports.load = function(callback) {
        
		var cb = callback || function() {};
        
		$(".info-detail").load("./info/user/user.html", function() {
            
			$('.user-nav').tree({
                
				lines: true,
                
				data: [{
                    
					"id": 1,
                    
					"text": "用户信息管理",
                    
					"children": [{
                        
						"id": 11,
                        
						"text": "用户列表"
                        
					}, {
						"id": 12,
						"text": "新增用户"
					}]
				}],
                
				onClick: function(node) {
                    
					if (node.id == 11) {
						require("router").go("#/info/user/userList")
                        
					} else {
						require("router").go("#/info/user/addUser")
					}
				}
			});
            
			cb();
		})
	}
})