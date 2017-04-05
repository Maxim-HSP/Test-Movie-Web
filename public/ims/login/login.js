define(function(require, exports) {

	var $ = require("$");

	exports.load = function() {
		$("#app").load("./login/login.html", function() {
			$("#loginBtn").on("click", function() {
				require("router").go("#/info");

			});
			$("#regBtn").on("click", function() {
				require("router").go("#/reg");
			});
		})
	}

});