seajs.config({
	//模块基础路径
	base: './',
	//指定加载模块
	alias: {
		"login": "login/login",
		"reg": "reg/reg",
		"$": "modules/bin/jquery",
		"easyui": "modules/bin/jquery.easyui.min",
		"emp": "emp/emp",
		"router": "router/router",
		"info": "info/info",
		//用户模块开始
        "user": "info/user/user",
        "addUser": "info/user/addUser/addUser",
        "userLogin": "info/user/userLogin/userLogin",
        "userList": "info/user/userList/userList",
        "updateUser":"info/user/updateUser/updateUser",
        //用户模块结束
        //电影模块
		"movie": "info/movie/movie",
		"addMovie": "info/movie/addMovie/addMovie",
		"movieList": "info/movie/movieList/movieList",
        "modifyMovie":"info/movie/modifyMovie/modifyMovie",
        //电影模块结束
        //图片模块
		"img": "info/movie/img/img",
        //图片模块结束
		//影院模块
       "studio":"info/studio/studio",
        "studioList":"info/studio/studioList/studioList",
        "updateStudio":"info/studio/updateStudio/updateStudio",
        "chooseStudio":"info/studio/chooseStudio/chooseStudio",
        //影院模块结束
        //放映厅模块
        "theater":"info/studio/theater/theater",
        //放映厅模块结束
        //排片管理
        "Schedule": "info/Schedule/Schedule",
        "addSchedule": "info/Schedule/addSchedule/addSchedule",
        "scheduleList": "info/Schedule/scheduleList/scheduleList",
	},
});

seajs.use("router", function(router) {
	router.go(location.hash || "#/login");
})