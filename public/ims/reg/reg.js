define(function(require, exports) {

	var $ = require("$");

	exports.load = function() {
		$("#app").load("./reg/reg.html", function() {
			$("input[type=button]").on("click", function() {
				$.ajax({
					url: "/users/reg",
					type: "post",
					data: {
						username: $("input[name=username]").val(),
						password: $("input[name=password]").val()
					},
					success: function(data) {

					}
				})
			})


			$("input[name=username]").on("blur", function() {
				$.ajax({
					url: "/users/isUse",
					type: "post",
					data: {
						username: $(this).val()
					},
					success: function(data) {
						if (eval(data)) {
							$("span").html("你的用户名无效, 请重新输入");
							$("input[type=button]").attr("disabled", "disabled")
						} else {
							$("span").html("OK");
							$("input[type=button]").removeAttr('disabled')
						}
					}
				})
			})
		})
	}
})