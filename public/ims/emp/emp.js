define(function(require, exports) {

	var $ = require("$");

	var page = {
		data: [],
		curPage: 1,
		eachPage: 10,
		maxPage: 0,
		count: 0
	}

	window.del = function(_id) {
		console.log(_id)
			// $.ajax({
			// 	url: "/emp/delById",
			// 	type: "post",
			// 	data: {
			// 		_id: _id
			// 	},
			// 	success: function(data) {
			// 		if (eval(data)) {
			// 			getAllEmp()
			// 		}
			// 	}
			// })
	}

	function render() {
		$("tbody").html(page.data.map(function(item, index) {
			return `
			<tr>
				<td>${item._id}</td>
				<td>${item.empName}</td>
				<td>${item.sal}</td>
				<td>${item.job}</td>
				<td><input onclick="del('${item._id}')" class="delBtn" type="button" value="删除" /></td>
			</tr>
		`
		}).join(""));
		var str = "";
		for (var i = 1; i <= page.maxPage; i++) {
			str += `<option value="${i}">${i}</option>`
		}
		$("#curPage").html(str).val(page.curPage);
		$("#eachPage").val(page.eachPage)
		$("#maxPage").html(page.maxPage)
		$("#count").html(page.count)
	}

	function getAllEmp() {
		$.ajax({
			url: "/emp/getAllEmp",
			type: "post",
			success: function(data) {
				page.data = data;
				render();
			}
		})
	}

	function getEmpByPage() {
		$.ajax({
			url: "/emp/getEmpByPage",
			type: "post",
			data: {
				curPage: page.curPage,
				eachPage: page.eachPage
			},
			success: function(data) {
				page = data;
				render()
			}
		})
	}


	exports.load = function() {
		$("#app").load("./emp/emp.html", function() {
			getEmpByPage();
			$("#firstPageBtn").on("click", function() {
				page.curPage = 1;
				getEmpByPage()
			})
			$("#lastPageBtn").on("click", function() {
				page.curPage = page.maxPage;
				getEmpByPage()
			})
			$("#prePageBtn").on("click", function() {
				if (page.curPage > 1) {
					page.curPage--;
					getEmpByPage();
				}
			})
			$("#nextPageBtn").on("click", function() {
				if (page.curPage < page.maxPage) {
					page.curPage++;
					getEmpByPage();
				}
			})
			$("#curPage").on("change", function() {
				page.curPage = $(this).val();
				getEmpByPage()
			})
			$("#eachPage").on("input", function() {
				page.eachPage = $(this).val();
				getEmpByPage()
			})
		})
	}

})