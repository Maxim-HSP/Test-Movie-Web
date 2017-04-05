define(function(require, exports) {

	var $ = require("$")

	$(window).on("popstate", function(event) {
		var state = event.originalEvent.state;
		state = state || location.hash;
		load(state);
	})

	function load(path) {
        //用户模块--取出用户ID
        if (path.indexOf("#/info/user/updateUser/") != -1) {
            
			var userID = path.slice(path.lastIndexOf("/") + 1)
            
			var path = "#/info/user/updateUser";
		}
        //用户模块结束
        
        //电影模块
        if(path.indexOf("#/info/movie/modifyMovie") != -1){
            var modifyId = path.slice(path.lastIndexOf("/")+1);
            var path = "#/info/movie/modifyMovie";
        }
        //电影模块结束
        //电影图片模块
        if(path.indexOf("#/info/movie/img") != -1){
			//lastIndexOf从最后一个 "/" 开始拆分
			var movieId=path.slice(path.lastIndexOf("/")+1);
			var path="#/info/movie/img";
		}
        //图片模块结束
        //影院模块
        if(path.indexOf("#/info/studio/updateStudio/")!==-1){
             var studioID=path.slice(path.lastIndexOf("/")+1)
             var path="#/info/studio/updateStudio"
             //3如果有路径，那么这里把路径分解车来，j即studioID
        }
        //影院模块结束
        //放映厅模块
        if(path.indexOf("#/info/studio/theater/") != -1){
            
            //从最后一个/ + 1 的地方拷贝
            var studioId = path.slice(path.lastIndexOf("/")+1)
            path = "#/info/studio/theater";
        }
        //放映厅模块结束
		switch (path) {
			case "#/login":
				return require("login").load();
			case "#/reg":
				return require("reg").load();
			case "#/emp":
				return require("emp").load();
			case "#/info":
				return require("info").load();
			//用户模块开始
            case "#/info/user":
                
				return require("info").load(function() {
                    
					require("user").load();// 传一个函数过去 callback接收，当页面载入完成后再调用传过去的函数执行下一级的function(){require("user").load()}= cb()(info.js 内接收的函数)
                    
				});
            
//            进入用户列表
			case "#/info/user/userList":
                
				return require("info").load(function() {
                    
					require("user").load(function() {
                        
						require("userList").load();
                        
					});
				});
            
            case "#/info/user/addUser":
                
				return require("info").load(function() {
                    
					require("user").load(function() {
                        
						require("addUser").load();
                        
					});
				});
                
            case "#/info/user/userLogin":
                
				return require("info").load(function() {
                    
					require("user").load(function() {
                        
						require("userLogin").load();
                        
					});
				});
                
            case "#/info/user/updateUser":
                
				return require("info").load(function() {
                    
					require("user").load(function(){
                        
                        require("updateUser").load(userID)
                    });
                    
				});
                //用户模块结束
                
                //电影模块
			case "#/info/movie":
				return require("info").load(function() {
					require("movie").load();
				});
			case "#/info/movie/addMovie":
				return require("info").load(function() {
					require("movie").load(function() {
						require("addMovie").load();
					});
				});
			case "#/info/movie/movieList":
				return require("info").load(function() {
					require("movie").load(function() {
						require("movieList").load();
					});
				});
            case "#/info/movie/modifyMovie":
                require("info").load(function(){
                    require("movie").load(function(){
                        require("modifyMovie").load(modifyId);
                    })
                });
                break;
            //电影模块结束
            //图片模块
			case "#/info/movie/img":
				return require("info").load(function() {
					require("movie").load(function() {
						require("img").load(movieId);
					});
				});
            //图片模块
                //影院模块
             case "#/info/studio":
				return require("info").load(function() {
					require("studio").load();
				});
                
                  case "#/info/studio/chooseStudio":
				return require("info").load(function() {
					require("studio").load(function() {
						require("chooseStudio").load();
					});
				});
                
                
                
                 case "#/info/studio/studioList":
				return require("info").load(function() {
					require("studio").load(function() {
						require("studioList").load();
					});
				});
                
                
                 case "#/info/studio/updateStudio":
				return require("info").load(function() {
					require("studio").load(function() {
						require("updateStudio").load(studioID);
                        //4, 如果path那么把上面分解的studioID从这里传到updateStudio中，以load方法
					});
				});
                //影院模块结束
                //放映厅模块
             case "#/info/studio/theater":
                return require("info").load(function(){
                    require("studio").load(function(){
                        require("theater").load(studioId);
                    })
                });
                
            //排片管理 
            case "#/info/Schedule":
                return require("info").load(function(){
                    require("Schedule").load();
                })
            case "#/info/Schedule/addSchedule":
                return require("info").load(function(){
                    require("Schedule").load(function(){
                        require("addSchedule").load();
                    })
                })
            case "#/info/Schedule/scheduleList":
                return require("info").load(function(){
                    require("Schedule").load(function(){
                        require("scheduleList").load();
                    })
                })
                
			default:
				return require("login").load();
		}
	}

	exports.go = function(path) {
		history.pushState(path, null, path)
		load(path);
	}

})