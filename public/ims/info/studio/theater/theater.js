define(function(require,exports){
    var $ = require("easyui");
    
    var studioData = {};
    var theaterData = {};
    
    //自动刷新
	function studioListReload(){
		$("#studioList").datagrid("reload",{
			studioID:studioData.studioID,
			name:$("#name").val()
		});
	}
    
    
	
	
	function init(studioID){
		
		studioData.studioID=studioID;
        
//		console.log(studioID);
		
		$("#name").textbox({
			value:"3DMAX厅",
		})
		$("#row").textbox({
			value:"5",
		})
		$("#col").textbox({
			value:"5",
		})
		$("#saveBtn")
			.linkbutton()
			.on("click",function(e){
				e.preventDefault();
				$.ajax({
					url:"/theaters/addTheater",
					type:"post",
					data:{
						studioID:studioData.studioID,
						name:$("#name").val(),
						row:$("#row").val(),
						col:$("#col").val()
					},
					success:function(data){
//						console.log(data);
						studioListReload();
					}
				})
		})
        
        
		//放映厅列表
		$("#studioList").datagrid({
			url:"/theaters/getTheatersByStudioID",
			method:"post",
			pagination:true,
			rownumbers:true,
			singleSelect:true,
			queryParams:{
				studioID:studioData.studioID,
				name:$("#name").val()
			},
			columns:[
				[{
					field:"name",
					title:"放映厅名称",
                    
				},{
					field:"_id",
					title:"操作",
                    width:200,
					formatter: function(value,row,index){
//                        console.log(row.name)
						return `<a _id="${value}" _name="${row.name}" class="lookBtn" href="#">查看座位</a>
                        <a _id="${value}" class="removeBtn" href="#">删除</a>
                        <a _name="${row.name}" _id="${value}" a="${row}" class="updateBtn" href="#">修改</a>`
					}
				}]
			],
            //查看座位
			onLoadSuccess:function(data){
//				console.log(data)
				$(".lookBtn")
					.linkbutton()
					.on("click",function(e){
						e.preventDefault();
//                            console.log($(this).attr("_name"))
							seat($(this).attr("_id"),$(this).attr("_name"));
					});
                //删除放映厅
                $(".removeBtn")
                    .linkbutton()
                    .on("click",function(e){
                        e.preventDefault();
                        
                        removeTheater($(this).attr("_id"));
                });
                //修改放映厅按钮
                $(".updateBtn")
                    .linkbutton()
                    .on("click",function(e){
                        e.preventDefault();
                        theaterData.theaterID = $(this).attr("_id");
                        theaterData.theaterName = $(this).attr("_name");
                        
                        $(".theaterName").css("display","block");
                        //修改框
                        $("#theaterName").val(theaterData.theaterName);
                    });
                $("#saveBtn1")
                    .linkbutton()
                    .on("click",function(e){
                        e.preventDefault();
                        theaterData.theaterName = $("#theaterName").val();
                    
                        updateTheater();
                    
                        studioListReload();
                        
                        $(".theaterName").css("display","");
                    });
                $("#noBtn")
                    .linkbutton()
                    .on("click",function(e){
                        e.preventDefault();
                        $(".theaterName").css("display","");
                    });
			},
			
		}) 
		
        
        
	}
	
    
    //修改放映厅
    function updateTheater(){
        $.ajax({
            url:"/theaters/updateByStudioID",
            type:"post",
            data:{
                _id:theaterData.theaterID,
                name:theaterData.theaterName
            },success:function(data){
                
            }
        })
    }
    
    //删除放映厅
    function removeTheater(_id){
        $.ajax({
            url:"/theaters/deleteByStudioID",
            type:"post",
            data:{
                _id:_id
            },
            success:function(data){
                if(eval(data)==true){
                    studioListReload();
                    
                }
            }
        })
    }
    
	
	//座位列表
	function seat(theaterId,name){
        
        
		$('#seatList').datagrid({    
			url:'/seats/getSeatsByTheaterID',
			method:"post",
			pagination:true,
			rownumbers:true,
			singleSelect:true,
			queryParams:{
				theaterId:theaterId
			},
            
			columns:[
				[{
					field: "name",
					title:"放映厅",
                    formatter: function(value,row,index){
						return `<span>${name}</span>`
					}
				},{
					field:"displayName",
					title:"座位"
				},{
					field:"rowNo",
					title:"排"
				},{
					field:"colNo",
					title:"列"
				}]
			]
		});
        
	}
    
    
    
    
    
    
    
    
    exports.load = function(studioID){
        $(".studio-detail").load("/ims/info/studio/theater/theater.html",function(){
            init(studioID);
        })
    }
})