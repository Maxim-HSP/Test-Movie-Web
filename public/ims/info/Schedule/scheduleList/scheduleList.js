define(function(require,exports){
    var $=require("easyui");
    
    var scheduleData={};
    
    function init(){
        //初始化影片数据下拉框
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
            value:"获取中。。。",
            onLoadSuccess:function(data){
                $(this).combogrid('setValue', data.rows[0].cName);
                reload_Studio(data.rows[0]._id)
            },
            onSelect:function (index,selected){
                reload_Studio(selected._id)
                reload_Theater();
                reload_Seats()
            }
        });
        //初始化影院列表
        $("#studioList").datagrid({
            url:"/schedules/getStudiosByMovieID",
            method: "post",
            width:600,
            pagination: true,
            singleSelect: true,
            rownumbers: true,
            columns:[[      
                {field:'name',title:'影院名称'},    
                {field:'address',title:'影院地址'},  
                {field:'_id',title:'操作',
                    formatter:function(value, row, index){
                        return `<a studioId="${value}" class="theaterBtn" href="#">获取放映厅</a>`
                    }
                }
            ]],
            onLoadSuccess:function(data){
                $(".theaterBtn").linkbutton().on("click",function(e){
                    e.preventDefault();
                    reload_Theater($(this).attr("studioId"));
                    reload_Seats()
                })
            }
        });
        
        //初始化放映厅(排片)列表
        $("#theaterList").datagrid({
            url:"/schedules/getScheduleListByMoiveIDAndStudioIDAndTime",
            method: "post",
            queryParams:{
                movieID: scheduleData.movieID,
                studioID: scheduleData.stuidoID,
                time: getNowTime()
            },
            width: 600,
            pagination: true,
            singleSelect: true,
            rownumbers: true,
            columns:[[      
                {field:'theaterID',title:'放映厅名称',
                    formatter:function(value, row, index){
                        return `<span>${value.name}</span>`
                    }
                },    
                {field:'price',title:'票价'},  
                {field:'showTime',title:'开映时间'}, 
                {field:'_id',title:'操作',
                    formatter:function(value, row, index){
                        return `<a scheduleID="${value}" class="seatsBtn" href="#">获取座位</a>
                        <a scheduleID="${value}" class="delScheduleBtn" href="#">删除排片</a>
                        `
                    }
                }
            ]],
            onLoadSuccess:function(data){
                $(".seatsBtn").linkbutton().on("click",function(e){
                    e.preventDefault();
                    reload_Seats($(this).attr("scheduleID"));
                });
                //删除按钮
                $(".delScheduleBtn").linkbutton().on("click",function(e){
                    e.preventDefault();
                    delSchedule($(this).attr("scheduleID"));
                });
            }
        });
        
        //初始化座位列表
        $("#seatsList").datagrid({
            url:"/schedules/getSeatingsByScheduleID",
            method: "post",
            queryParams:{
                scheduleID:scheduleData.scheduleID
            },
            width:300,
            pagination: true,
            singleSelect: true,
            rownumbers: true,
            columns:[[        
                {field:'seatID',title:'座位',
                    formatter:function(value, row, index){
                        return `<span>${value.displayName}</span>`
                    }
                },
                {field:'state',title:'状态',
                    formatter:function(value, row, index){
                        return `<span>${value}</span>`
                    }
                },
            ]],
        })
    };
    //获取当前时间
    //注意：后台判断代码bug，设发送时间为T，则只能匹配到T到T开始的第二天的8个小时之间的时间，即如果发送现在时间，则只会返回现在开始到明天早上8点之前的排片信息
    function getNowTime(){
        var date=new Date();
        var y = date.getFullYear();
        var m = date.getMonth()+1;
        var d = date.getDate();
        var h = date.getHours();
        var min = date.getMinutes();
        return `${m}/${d}/${y} ${h}:${min}`
    }
    //获取影院列表信息
    function reload_Studio(movieID){
        //缓存影片id
        scheduleData.movieID=movieID; 
        $("#studioList").datagrid('reload',{
            movieID: movieID,
            time: getNowTime()
        })
    }
    //获取放映厅(排片)列表信息
    function reload_Theater(stuidoID){
        //缓存影院id
        scheduleData.stuidoID=stuidoID;    
        $("#theaterList").datagrid('reload',{
            movieID: scheduleData.movieID,
            studioID: stuidoID,
            time: getNowTime()
        })
    }
    //获取座位列表信息
    function reload_Seats(scheduleID){
        scheduleData.scheduleID=scheduleID;    
        $("#seatsList").datagrid('reload',{
            scheduleID:scheduleID,
        });
    }
    //删除排片信息方法
    function delSchedule(scheduleID){
        $.ajax({
            url:"/schedules/deleteByScheduleID",
            type:"post",
            data:{_id:scheduleID},
            success: function(data){
                if(eval(data)){
                    reload_Studio(scheduleData.movieID);
                    reload_Theater(scheduleData.stuidoID);
                    reload_Seats()
                }
            }
        })
    }
    exports.load=function(){
        $(".schedule-detail").load("/ims/info/Schedule/scheduleList/scheduleList.html",function(){
            init();
        })
    }
})