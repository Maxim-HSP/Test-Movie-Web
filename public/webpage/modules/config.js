seajs.config({
	//模块基础路径
	base: './',
	//指定加载模块
	alias: {
        //基础依赖模块
		"$": "modules/bin/jquery",
		"easyui": "modules/bin/jquery.easyui.min",
		"router": "router/router",
        //功能模块
        "index": "index",//index作为基础模块在seajs.use中加载
        "home": "home/home",
        "movie": "movie/movie",
        "ranking" : "ranking/ranking",
        "details": "details/details",
        "studio": "studio/studio",
        "seats" : "seats/seats",
        "login" : "user/login"
	},
});

seajs.use(["router","index"], function(router,index) {
	router.go(location.hash || "#/home" );
    index.start();
})