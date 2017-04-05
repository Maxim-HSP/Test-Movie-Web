define(function(require, exports) {

	var $ = require("easyui");
    
    var studioId="";
    

	function getStudioById(studioID) {
        studioId=studioID;
		$.ajax({
			url: "/studios/getStudioByID",
			type: "post",
            data:{
                _id:studioID 
            },
			success: function(data) {
				init(data);
			}
		})
	}

    function init(studioData) {
        

		$("#studioName").textbox({
			value: studioData.name,
			width: 500
		});
        
      
		$("#studioAddress").textbox({
			value: studioData.address,
			width: 500
		});
        

        $('#saveStudioBtn')
			.linkbutton()
			.on("click", function(e) {
				e.preventDefault();
                saveStudio();
			});
	}


	function getStudio() {
		return {
			name: $("#studioName").val(),
			address: $("#studioAddress").val(),
            _id:studioId
		}
	}
    

	function saveStudio() {
		$.ajax({
			url: "/studios/updateByID",
			type: "post",
			data: getStudio()
		})
	}

	exports.load = function(studioID) {
    //这里就是从load传过来的studioID也是studioList中的_id
		$(".studio-detail").load("/ims/info/studio/updateStudio/updateStudio.html", function() {  
			getStudioById(studioID);
		})
	};

})