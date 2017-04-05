define(function(require, exports) {
	var $ = require("$");
	exports.load = function(callback) {
		var cb = callback || function() {}
		$("#app").load("./info/info.html", function() {
			$(".userNav").on("click", function() {
				require("router").go("#/info/user")
			});
			$(".movieNav").on("click", function() {
				require("router").go("#/info/movie")
			});
			$(".studioNav").on("click", function() {
				require("router").go("#/info/studio")
			});
			$(".scheduleNav").on("click", function() {
				require("router").go("#/info/Schedule")
			});
			cb();
		})
	}
})