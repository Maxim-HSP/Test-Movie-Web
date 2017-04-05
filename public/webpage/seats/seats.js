define(function(require, exports) {
    var $=require("$");
    
    var pageData = {
        movieId : null ,
        studioId : null , 
        theaterId : null ,
        scheduleId : null,
        curData : {},
        seatsId : [],
    }
    
    function getPageInfo(){
        //获取电影信息
        $.ajax({
            url: "/movies/getMovieDetailsByMovieID",
            type: "post",
            data: {_id: pageData.movieId},
            success :function(data){
                $(".movieImg > img").attr("src",data.imgs[0].url);
                $(".movies > h3").html(data.cName);
                $(".type2").html(data.type);
                $(".time2").html(data.duration);
            }
        })
        //获取排片信息
        $.ajax({
            url:"/schedules/getSchedulesByMST",
            type: "post",
            data: {
                movieID:pageData.movieId,
                studioID:pageData.studioId,
                theaterID:pageData.theaterId
            },
            success :function(data){
                data.rows.forEach(function(value,index,array){
                    if(value._id == pageData.scheduleId){
                        pageData.curData = value;
                    }
                })
                $(".stuidoName").eq(0).html(pageData.curData.studioID.name);
                $("#showTime").html(pageData.curData.showTime);
                $(".theaterName").html(pageData.curData.theaterID.name);
                $(".seat1 > span").html(pageData.curData.theaterID.name);
            }
        })
    }
    function node_seats(row,col,dataArr){
        $(".seatList").html("")
        for(var i=1,m=0;i<=row;i++){
            $(".seatList").append(`<p> <span class="seatNum">${i}</span> <span class="textNum row${i}"> </span>`);
            for(var n = 1; n<=col ;n++){
                $(`.row${i}`).append(`<span seatId=${dataArr[m]._id} class="seat state_${dataArr[m].state}"></span>`)
                m++
            };
        };
        //绑定单位座位事件
        $(".state_0").on("click",function(){
            $(this).addClass("active");
            $(".jiage2").html($(".active").length * ~~($("#price").text()));
        })
    }
    function reload_seats(){
        $.ajax({
            url: "/schedules/getSeatingsByScheduleID",
            type: "post",
            data: {scheduleID : pageData.scheduleId},
            success : function(data){
                node_seats(data.rows[data.rows.length-1].seatID.rowNo,data.rows[data.rows.length-1].seatID.colNo,data.rows);
            }
        })
    }
    
    function init(scheduleId){
        pageData.scheduleId = scheduleId
        //通过排片id缓存及渲染座位信息
        $.ajax({
            url: "/schedules/getSeatingsByScheduleID",
            type: "post",
            data: {scheduleID : scheduleId},
            success : function(data){
                pageData.movieId = data.rows[0].scheduleID.movieID._id;
                pageData.studioId = data.rows[0].scheduleID.studioID;
                pageData.theaterId = data.rows[0].scheduleID.theaterID;
                $("#price").html(data.rows[0].scheduleID.price);
                getPageInfo();
                //渲染座位列表
                node_seats(data.rows[data.rows.length-1].seatID.rowNo,data.rows[data.rows.length-1].seatID.colNo,data.rows);
                //绑定提交订单按钮
                $(".tijiao2").on("click",function(){
                    pageData.seatsId = []; //清空
                    for(var i=0;i<$(".active").length;i++){
                        pageData.seatsId.push($(".active").eq(i).attr("seatId"));
                        //将数据发送到后台
                        $.ajax({
                            url: "/schedules/updateSeatings",
                            type: "post",
                            data:{_id:pageData.seatsId[i]},
                            success : function(data){
                                console.log(data);
                            }
                        })
                    }
                    //重载座位列表
                    reload_seats();
                })
            }
        })
    }
    
    exports.load= function(scheduleId){
        $("#AppContainer").load("./seats/seats.html",function(){
            init(scheduleId);
        })
    }
    
})