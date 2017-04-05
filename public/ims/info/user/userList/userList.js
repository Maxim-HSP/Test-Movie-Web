define(function(require, exports) {

	var $ = require("easyui");
    
	function init() {

		$('#userList').datagrid({
            
			url: "/users/getUsers",        
			method: "post",
            queryParams: {
				status:1,
                flag:0
			},
            width:900,
			pagination: true,
			singleSelect: true,
			rownumbers: true,
			columns: [
				[{
					field: 'username',
					title: '用户名称',
				}, {
					field: 'password',
					title: '用户密码'
				},{
					field: '_id',
					title: '操作',
                    width:200, 
                    //formatter是easyui里面的一种方法 可以理解为向表格内添加元素
					formatter: function(value, row, index) {
						return `<a _id="${value}" class="removeBtn" href="#">删除</a>
                                <a _id="${value}" class="updateBtn" href="#">更新</a>`
					}
				}]
			],
            
//            按钮载入成功后执行下面的函数
            onLoadSuccess: function(data) {
                
//                删除按钮绑定事件
				$(".removeBtn")
					.linkbutton()
					.on("click", function(e) {
						e.preventDefault();
                        userDelete($(this).attr("_id"))
					});
                
//                修改按钮绑定事件
                $(".updateBtn")
					.linkbutton()
					.on("click", function(e) {
						e.preventDefault();
                        updateUser($(this).attr("_id"))
					}); 
			}
        })
    }
    
//删除用户
    function userDelete(_id){
        $.ajax({
            url:"/users/del", 
            type:"post",
            data:{  
                _id:_id
            },
            
            success:function(data){ //删除成功后返回的是一个布尔类型的data值
            
                if(eval(data)){  
                    userListReload();//删除成功后重新加载
                }
            }
        })
    }
    
// 更新用户
    function updateUser(_id){
        
        if (_id) {
            require("router").go(`#/info/user/updateUser/${_id}`);//传递哈希值和影院id过去
        }
    }
  
// 用户删除成功后重新加载
    function userListReload(){
        $('#userList')
        .datagrid('reload')
    }

	exports.load = function() {
        //注意 load方法是异步请求
		$(".user-detail").load("/ims/info/user/userList/userList.html", function() {
            init();
		})
	};

})