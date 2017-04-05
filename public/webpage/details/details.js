define(function(require, exports) {
    var $=require("$");
    
    var pageData={
        curMovieData: {
            _id: "", //主键
            cName: "",  //中文名称
            eName: "",  //英文名称
            type: "",     //影片类型
            country: "",  //制片国家/地区
            duration: "", //片长, 单位 分钟
            release: "", //上映时间 格式: 2016-08-23
            synopsis: "", //剧情简介
            director: [], //导演, 关联演员_id 
            actors: [], //演员, 关联演员_id 
            imgs: [], //相关图片, 关联电影图片_id,
            stata: ""  //电影状态 0: 下映, 1: 上映, 2: 热映
        },
        news:[{name:"新闻1"},{name:"新闻2"},{name:"新闻3"}],
    }
    
    function init(movieId){
        //缓存页面数据
        $.ajax({
            url:"/movies/getMovieDetailsByMovieID",
            type:"post",
            data: { _id : movieId },
            success: function(data){
                pageData.curMovieData = data;
                //渲染页面节点
                $(".movie-brief > h1").html(pageData.curMovieData.cName);
                $(".movie-brief > h3").html(pageData.curMovieData.eName);
                $(".movie-brief > p").eq(0).html(pageData.curMovieData.type);
                $(".movie-brief > p").eq(1).html(`${pageData.curMovieData.country} / ${pageData.curMovieData.duration}`);
                $(".movie-brief > p").eq(2).html(pageData.curMovieData.release);
                $("#synopsis").html(pageData.curMovieData.synopsis);
                //绑定购票按钮
                $(".ticket-button").on("click",function(e){
                    e.preventDefault();
                    require("router").go(`#/studio/${pageData.curMovieData._id}`)
                })
            }
        })
        //获取封面
        $.ajax({
            url:"/imgs/getMovieImgByMovieId",
            type:"post",
            data: { movieId : movieId , curImgType: 'indexImg'},
            success: function(data){
                $("#MovieCover").attr("src",data.rows[0].url);
            }
        })
        //获取其他类型图片
        $.ajax({
            url:"/imgs/getMovieImgByMovieId",
            type:"post",
            data: { movieId : movieId , curImgType: 'normal'},
            success: function(data){
                $(".directorImg").attr("src",data.rows[0].url);//导演
                $(".album-container > .pic-L > img").attr("src",data.rows[3].url);//图集-大图
                for(var i=0;i<4;i++){
                    $(".actorImg").eq(i).attr("src",data.rows[i+1].url);//演员
                    $(".album-container > .pic-S > img").eq(i).attr("src",data.rows[i+4].url)
                }
            }
        })
    }
    
    exports.load=function(movieId){
        $("#AppContainer").load("./details/details.html",function(){
            init(movieId);
        })
    }
})