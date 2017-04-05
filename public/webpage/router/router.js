define(function(require, exports) {
	var $ = require("$")
    
	$(window).on("popstate", function(event) {
		var state = event.originalEvent.state;
		state = state || location.hash;
		load(state);
	})

	function load(path) {
        //电影详情与购票-判断movieId
        if (path.indexOf("#/details/") != -1) {
			var movieId = path.slice(path.lastIndexOf("/") + 1)
			path = "#/details";
		}
        if (path.indexOf("#/studio/") != -1) {
            var movieId = path.slice(path.lastIndexOf("/") + 1)
			path = "#/studio";
        }
        if (path.indexOf("#/seats/") != -1) {
            var scheduleId = path.slice(path.lastIndexOf("/") + 1)
			path = "#/seats";
        }
        
        //匹配路径
		switch (path) {
			case "#/movie":
				return require("movie").load();
            case "#/ranking":
                return require("ranking").load();
            case "#/details":
                return require("details").load(movieId);
            case "#/studio":
                return require("studio").load(movieId);
            case "#/seats":
                return require("seats").load(scheduleId);
            case "#/login":
                return require("login").load();
			default:
				return require("home").load();
		}
	}
	exports.go = function(path) {
		history.pushState(path, null, path)
		load(path);
	}
})