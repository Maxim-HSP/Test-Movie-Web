define(function(require,exports){
    var $=require("easyui");
    
    var scheduleData={};
    
    function init(){
        
        $("#movieName").combogrid({
            url: "/movies/getMoviesByPage",
            method: "post",
            width:300,
            panelWidth:420,
            rownumbers: true,
            idField:'_id',    
            textField:'cName',   
            columns:[[      
                {field:'cName',title:'影片中文名',width:180},    
                {field:'eName',title:'影片英文名',width:190},  
            ]],
            prompt:"请选择影片",
            onSelect:function (index,selected){
                //缓存影片id
                scheduleData.movieID=selected._id;
            }
        });
        
        $("#studioName").combogrid({
            url:"/studios/getStudios",
            method: "post",
            width:300,
            panelWidth:420,
            rownumbers: true,
            idField:'_id',    
            textField:'name',   
            columns:[[    
                {field:'name',title:'影院名称',width:110},    
                {field:'address',title:'影院地址',width:260},  
            ]],
            prompt:"请选择影院",
            onSelect:function (index,selected){
                //缓存影院id
                scheduleData.studioID=selected._id;
                setTheaterSelect();
            }
        });
        
        $("#theaterName").combogrid({
            width:300,
            panelWidth:200,
            rownumbers: true,
            disabled: true,
            prompt:"请先选择相应影院",
        })
        $("#price").textbox({
            required:true,
            missingMessage:"（请输入纯数字）",
            prompt:"请输入票价",
            onChange:function(newValue, oldValue){
                scheduleData.price=newValue;
            }
        })
        
        $("#showTime").datetimebox({   
            required: true,
            value:getNowTime(),
            prompt:"请选择时间", 
            showSeconds:false
        });
        
        $("#saveBtn").linkbutton().on("click",function(e){
            e.preventDefault();
            scheduleData.showTime=$('#showTime').datetimebox('getValue');
            console.log(scheduleData);
            addSchedule();
        })
        $("#resetBtn").linkbutton().on("click",function(e){
            e.preventDefault();
            scheduleData={};
            init();
        })
    }
    
    function setTheaterSelect(){
        $("#theaterName").combogrid({
            disabled: false,
            prompt:"请选择放映厅",
            url:"/theaters/getTheatersByStudioID",
            queryParams:{
                studioID: scheduleData.studioID
            },
            idField:'_id',    
            textField:'name',
            columns:[[
                {field:'name',title:'放映厅名称',width:150},  
            ]],
            onSelect:function (index,selected){
                //缓存放映厅id
                scheduleData.theaterID=selected._id;
            }
        })
    }
    function addSchedule(){
        $.ajax({
            url: "/schedules/addSchedule",
            type:"post",
            data: scheduleData,
            success: function(data){
                if(eval(data)){
                    $("#b_text").html("存储成功");
                }
            }
        })
    }
    function getNowTime(){
        var date=new Date();
        var y = date.getFullYear();
        var m = date.getMonth()+1;
        var d = date.getDate();
        var h = date.getHours();
        var min = date.getMinutes();
        return `${m}/${d}/${y} ${h}:${min}`
    }
    
    exports.load=function(){
        $(".schedule-detail").load("/ims/info/Schedule/addSchedule/addSchedule.html",function(){
            init();
        })
    }
})