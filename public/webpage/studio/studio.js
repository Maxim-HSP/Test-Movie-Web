define(function(require, exports) {
    var $=require("$");
    
    var pageData = {
        movieId : null,
        movieTime: 0,
        curDay : Date(),
    }
    var date=new Date();

    function render_dayChose(){
        for(var i=0;i<4;i++){
            $(".day_wrap").append(node_dayChose(i));
        };
        $(".dayBtn").on("click",function(){
            $(".dayBtn").removeClass("dayActive");
            $(this).addClass("dayActive");
            pageData.curDay = getTime($(this).attr("day"));
            render_Studio();
        })
    }
    function node_dayChose(index){
        switch(index){
            case 0:
                return `<span day=0 class="dayBtn dayActive">今天（${date.getMonth()+1}.${date.getDate()} 周${date.getDay()}）</span>`;
            case 1:
                return `<span day=1 class="dayBtn">明天（${date.getMonth()+1}.${date.getDate()+1} 周${date.getDay()+1}）</span>`;
            case 2:
                return `<span day=2 class="dayBtn">后天（${date.getMonth()+1}.${date.getDate()+2} 周${date.getDay()+2}）</span>`;
            default:
                return `<span day=${index} class="dayBtn">${date.getMonth()+1}.${date.getDate()+index} 周${date.getDay()+index}</span>`;
        }
    }
    function getTime(day){
        var y = date.getFullYear();
        var m = date.getMonth()+1;
        var d = date.getDate();
        var h = date.getHours();
        var min = date.getMinutes();
        if(day>0){
            return `${m}/${d+ ~~(day)}/${y} 00:00`
        }else{
            return `${m}/${d}/${y} ${h}:${min}`
        }
    }
    //获取影院信息函数
    function render_Studio(){
        $(".studioList").slideUp(200,function(){
            $.ajax({
                url:"/schedules/getStudiosByMovieID",
                type: "post",
                data:{movieID : pageData.movieId, time : pageData.curDay},
                success: function(data){
                    $(".studioList").html("");
                    for(var i=0;i<data.total;i++){
                        $(".studioList").append(node_studio(data.rows[i]._id,data.rows[i].name,data.rows[i].address));
                    };
                    $(".studioList").slideDown(200);
                    //绑定放映厅按钮
                    $(".theaterBtn").on("click",function(){
                        get_theater($(this).attr("studioId"));
                    })
                }
            })
        })
    }
    function node_studio(studioId,name,address){
        return `
        <div class="studio">
            <p> <span studioId=${studioId} class="studioName">${name}</span> </p>
            <p class="studioAdd">地址： <span class="studioAdd2">${address}</span> </p>
            <p class="studioTime2">影讯： <span class="studioTime3">16:10</span> | <span class="studioTime3">18:30</span> | <span class="studioTime3">23:10</span> | </p>
            <div class="price"> <span class="price1">￥</span> <span class="price2">34</span> <span class="price3">起</span> </div>
            <div studioId=${studioId} class="btn-small theaterBtn"> 选择放映厅 </div>
        </div>
            `
    }
    //获取放映厅函数
    function get_theater(studioId){
        $.ajax({
            url:"/schedules/getScheduleListByMoiveIDAndStudioIDAndTime",
            type: "post",
            data : {
                movieID: pageData.movieId,
                studioID: studioId,
                time: pageData.curDay,
            },
            success:function(data){
                //渲染列表
                $(".theaterName").html(data.rows[0].studioID.name);
                $("tbody").html("");
                for(var i=0;i<data.total;i++){
                    $(" tbody").append(node_theater(data.rows[i].theaterID.name,data.rows[i].price,data.rows[i].showTime.slice(11,16),data.rows[i]._id));
                }
                $(".theaterList").show(100);
                //绑定选座按钮
                $(".seatsBtn").on("click",function(){
                    require("router").go(`#/seats/${$(this).attr("scheduleId")}`);
                })
            }
        })
    }
    function node_theater(name,price,showTime,scheduleId){
        return `
                <tr>
                    <td><b id="startTime">${showTime}</b>− <span id="endTime">${showTime}+${pageData.movieTime}</span></td>
                    <td>英语2D</td>
                    <td>${name}</td>
                    <td class="price2">${price}元</td>
                    <td>
                        <button scheduleId=${scheduleId} class="btn-small seatsBtn">选座购票</button>
                    </td>
                </tr>
                `
    }
    
    function init(movieId){
        pageData.movieId=movieId;
        //获取并渲染电影信息
        $.ajax({
            url: "/movies/getMovieDetailsByMovieID",
            type:"post",
            data: {_id: movieId},
            success : function(data){
                $(".heave > h2").html(data.cName);
                $(".movie-body > span").eq(0).html(data.release.slice(0,10));
                $(".movie-body > span").eq(1).html(data.type);
                $(".movie-body > span").eq(3).html(data.country);
                $(".movie-body > span").eq(4).html(data.duration);
                pageData.movieTime= ~~(data.duration.replace("分钟",""))
                $(".movie-foot > p").html(data.synopsis);
                $(".page1 > img").attr("src",data.imgs[0].url);
            }
        });
        //渲染并绑定日期选择按钮事件
        render_dayChose();
        //默认以当前时间（今天）获取并渲染影院信息列表
        pageData.curDay = Date();
        render_Studio();
        //初始化放映厅模块
        $(".closeListBtn").on("click",function(){
            $(".theaterList").hide(200);
        })
    }
    
    exports.load= function(movieId){
        $("#AppContainer").load("./studio/studio.html",function(){
            init(movieId);
        })
    }
})