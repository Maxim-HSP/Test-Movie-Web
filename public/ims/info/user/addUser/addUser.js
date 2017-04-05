define(function(require, exports) {

	var $ = require("easyui");
    
//新增用户
	function addUser() {
		$.ajax({
			url: "/users/reg",
			type: "post",
			data: getUserInfo(),
			success: function(data) {
				if(data){
                    $("#userIsUse").html("注册成功");
                }
			}
		})
	}
    
//获取用户名和密码
    function getUserInfo(){
        
        return {
            username:$("#userName").val(),
            password:$("#passWord").val(),
            status:1
        }
    }
    
//判断用户名是否使用
    function userIsUse(){
        $.ajax({
			url: "/users/isUse",
			type: "post",
			data: {
                username:$("#userName").val(),
                status:1
            },
			success: function(data) {
				if(data){
                    $("#userIsUse").html("你的用户名已注册, 请重新输入");
                }else{
                    addUser();
                }
			}
		})
    }

//初始化
	function init() {
        
        $("#userName").textbox({
			width: 300
		});
        
        $("#passWord").textbox({
			width: 300
		});
        
        $("#regBtn").linkbutton();
        
        $('#regBtn')
			.linkbutton()
			.on("click", function() {
				userIsUse();
			});
        
        $('#loginBtn')
			.linkbutton()
			.on("click", function() {
				require("router").go("#/info/user/userLogin")
			});
	}

	exports.load = function() {
        
		$(".user-detail").load("/ims/info/user/addUser/addUser.html", function() {
			init();
		})
	};
})