define(function(require, exports) {

	var $ = require("easyui");
    
    function init(userID) {
        
//        获取影院名称 textbox为easyui的方法
		$("#userName").textbox({
			width: 500
		});
        
//        获取影院地址 textbox为easyui的方法
		$("#userPassword").textbox({
			width: 500
		});
        
//        给保存按钮初始化和绑定事件
        $('#saveUserBtn')
			.linkbutton()
			.on("click", function(e) {
				e.preventDefault();
                updateUser(userID);
			});
	}
    
//修改用户信息
	function updateUser(userID) {
        userId=userID;
		$.ajax({
			url: "/users/update",
			type: "post",
            data:{
                _id:userID,
                username:$("#userName").val(),
                password:$("#userPassword").val()
            },
			success: function(data) {
				//返回的是布尔值
                console.log(data);
                goUserList();
			}
		})
	}
  
//保存成功后跳转到用户列表
    function goUserList(){
        require("router").go("#/info/user/userList")
    }

	exports.load = function(userID) {
		$(".user-detail").load("/ims/info/user/updateUser/updateUser.html", function() {  
			init(userID);
		})
	};

})