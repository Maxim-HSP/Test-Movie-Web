define(function(require, exports) {

	var $ = require("easyui");
    
//初始化
	function init() {
        
        $("#userName").textbox({
			width: 300
		});
        
        $("#passWord").textbox({
			width: 300
		});  
        
        $('#loginBtn')
			.linkbutton()
			.on("click", function() {
				loginUser();
			});
	}
    
//新增用户
	function loginUser() {
		$.ajax({
			url: "/users/login",
			type: "post",
			data: getUserInfo(),
			success: function(data) {
				if(eval(data)){
                    $("#userLogin").html("登录成功");
                }else{
                    $("#userLogin").html("登录失败");
                }
			}
		})
	}
    
//获取用户名和密码
    function getUserInfo(){
        return {
            username:$("#userName").val(),
            password:$("#passWord").val(),
        }
    }

	exports.load = function() {
        
		$(".user-detail").load("/ims/info/user/userLogin/userLogin.html", function() {
			init();
		})
	};
})