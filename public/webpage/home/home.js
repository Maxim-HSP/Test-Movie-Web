define(function(require, exports) {
    var $=require("$");
    
    var pageData={
        movieData: [{
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
        },{}],   
        movieImg: {
            ongoingSrc:[],//正在热映封面
            comingSrc:[], //即将上映封面
            hotSrc:[], //热播封面
            BoxTopSrc:"", //票房TOP封面
            status:[]
        },
        OfficeboxSum: 0,
        news:[{name:"新闻1"},{name:"新闻2"},{name:"新闻3"},{name:"新闻4"},{name:"新闻5"},{name:"新闻6"}],
    }
    //随机 电影版本、排序数组
    function randomVer(num){
        switch(Math.round(Math.random()*5)){
            case 1: return "";
            case 2: return "v2dimax";
            case 3: return "v3d";
            case 4: return "v3dimax"
            case 5: return "";
        }
    }
    function randomRankNum(count){
        var NumArr=[];
        var num=0;
        pageData.OfficeboxSum=0;
        
        for(var i=0;i<count;i++){
            num=Math.round(Math.random()*999)+(Math.ceil(Math.random()*99)*0.01)
            NumArr.push(num);
            pageData.OfficeboxSum += num//缓存票房总数
        }
        //清除小数点后两位数之后的数字
        pageData.OfficeboxSum=''+pageData.OfficeboxSum
        var WrNum=pageData.OfficeboxSum.substring((pageData.OfficeboxSum.indexOf(".")+3))
        pageData.OfficeboxSum=pageData.OfficeboxSum.replace(WrNum,"")
        
        //倒序排序
        for(var i = 0; i < NumArr.length; i++){
            for(var n = i + 1; n < NumArr.length; n++){
                if(NumArr[n] > NumArr[i]){
                    var temp = NumArr[n];
                    NumArr[n] = NumArr[i];
                    NumArr[i] = temp;
                }
            }
        }
        return NumArr;
    }
    //主列表节点渲染
    function render_OngoingList(){
        //根据电影id获取8个封面信息,并向页面添加节点
        for(var i=0, m=0;i<8;i++){
            $.ajax({
                url:"/imgs/getMovieImgByMovieId",
                type:"post",
                data:{movieId: pageData.movieData[i]._id , curImgType:"indexImg"},
                success: function(data){
                    pageData.movieImg.ongoingSrc.push(data.rows[0].url);
                    pageData.movieImg.status.push(data.rows[0].status);
                    $("#ongoingList").append(node_ongoing(pageData.movieImg.ongoingSrc[m],pageData.movieData[m].cName,pageData.movieData[m]._id));
                    m++;
                }
            })         
        }
        //总数
        $("#onging-sum").html(pageData.movieData.length);
    }
    function node_ongoing(src,name,movieId){
        return `
                <!--单位电影海报模块结构-->
                <dd>
                    <div class="movie-item">
                        <a class="movieBtn" movieId=${movieId} href="">
                            <!--更改海报和信息-->
                            <div class="movie-poster"> <img src="${src}">
                                <div class="poster-bg">
                                    <div class="movie-info">
                                        <div class="movie-score"> <i class="integer">${Math.round(Math.random()*9)}</i><i class="fraction">.${Math.round(Math.random()*9)}</i> </div>
                                        <div class="movie-name" title="${name}">${name}</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                        <div class="buy-ticket"> <a movieId=${movieId} href="" class="buyBtn active">购 票</a> </div>
                        <!--电影版本-->
                        <div class="movie-ver ${randomVer()}"></div>
                    </div>
                </dd>
                <!--单位电影海报模块结束位置-->
            `
    }
    function render_comingList(){
        //根据电影id获取8个封面信息,并向页面添加节点
        for(var i=0, m=0;i<8;i++){
            $.ajax({
                url:"/imgs/getMovieImgByMovieId",
                type:"post",
                data:{movieId: pageData.movieData[i]._id , curImgType:"indexImg"},
                success: function(data){
                    pageData.movieImg.comingSrc.push(data.rows[0].url);
                    pageData.movieImg.status.push(data.rows[0].status);
                    $("#comingList").append(node_comingMoive(pageData.movieImg.comingSrc[m],pageData.movieData[m].cName,pageData.movieData[m].release,pageData.movieData[m]._id));
                    m++;
                }
            })         
        }
        //总数
        $("#coming-sum").html(pageData.movieData.length);
    }
    function node_comingMoive(src,name,time,movieId){
        return `
                <!--单位电影海报模块结构-->
                <dd>
                    <div class="movie-item">
                        <a class="movieBtn" movieId=${movieId} href="">
                            <!--更改海报和信息-->
                            <div class="movie-poster"> <img src="${src}">
                                <div class="poster-bg">
                                    <div class="movie-info">
                                        <div class="movie-name" title="${name}">${name}</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                        <div class="movie-wish"> <span>${Math.round(Math.random()*30000)}</span>人想看 </div>
                        <div class="movie-presale"> <a href="" class="preview" target="_blank">预告片</a><a href="" class="presale" target="_blank">预 售</a> </div>
                        <!--电影版本及上映时间-->
                        <div class="movie-ver"></div>
                    </div>
                    <div class="movie-date">${time}</div>
                </dd>
                <!--单位电影海报模块结束位置-->
                `
    }
    function render_hotList(){
        //根据电影id获取7个封面信息,并向页面添加节点
        for(var i=0, m=0;i<7;i++){
            $.ajax({
                url:"/imgs/getMovieImgByMovieId",
                type:"post",
                data:{movieId: pageData.movieData[i]._id , curImgType:"indexImg"},
                success: function(data){
                    pageData.movieImg.hotSrc.push(data.rows[0].url);
                    pageData.movieImg.status.push(data.rows[0].status);
                    $("#hotList").append(node_hotMovie(pageData.movieImg.hotSrc[m],pageData.movieData[m].cName,m,pageData.movieData[m]._id));
                    m++
                }
            })         
        }
    }
    function node_hotMovie(src,name,sortIndex,movieId){
        if(sortIndex==0){
            sortIndex = 'poster-long';
        }
        return `
                <!--单位电影海报模块结构-->
                <dd>
                    <div class="movie-item">
                        <a class="movieBtn" movieId=${movieId} href="">
                            <!--更改海报和信息-->
                            <div class="movie-poster ${sortIndex}"> <img src="${src}">
                                <div class="poster-bg">
                                    <div class="movie-info">
                                        <div class="movie-score"> <i class="integer">${Math.round(Math.random()*9)}</i><i class="fraction">.${Math.round(Math.random()*9)}</i> </div>
                                        <div class="movie-name" title="${name}">${name}</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                        <!--电影版本-->
                        <div class="movie-ver ${randomVer()}"></div>
                    </div>
                </dd>
                <!--单位电影海报模块结束位置-->
                `
    }
    //侧边栏-票房列表渲染
    function render_boxofficeList(){
        //获取 列表长度、一个经过排序的随机数组
        var rankLength = pageData.movieData.length
        var SortNumArr=randomRankNum(rankLength);
        rankLength = (rankLength<8 ? rankLength : 7);
        //设置排行榜Top
        $("#BoxTopName").html(pageData.movieData[0].cName);
        $("#topBoxNum").html(SortNumArr[0]);
        $(".rank-top > a").attr("movieId",pageData.movieData[0]._id);
        getBoxTopSrc();
        //开始渲染普通列表
        for(var i=0;i< rankLength;i++){
            //排行首项已存在节点，sortIndex从2开始
            $("#boxofficeList").append(node_TodayBoxoffice(pageData.movieData[i+1].cName,i+2,SortNumArr,pageData.movieData[i+1]._id))
        }  
    }
    function getBoxTopSrc(){
        $.ajax({
            url:"/imgs/getMovieImgByMovieId",
            type:"post",
            data:{movieId:pageData.movieData[0]._id,curImgType:"normal"},
            success:function(data){
                pageData.movieImg.BoxTopSrc = data.rows[7].url;
                $("#BoxTopImg").attr("src",pageData.movieImg.BoxTopSrc);
            }
        })
    }
    function node_TodayBoxoffice(name,sortIndex,SortNumArr,movieId){
        return `
                <li class="rank-normal">
                    <a class="movieBtn" movieId=${movieId} href=""> <i class="sec">${sortIndex}</i> <span class="RK-movieName">${name}</span> <span class="RK-boxOffice BO-normal"><span>${SortNumArr[sortIndex-1]}</span>万</span>
                    </a>
                </li>
                `
    }
    function render_TotalBox(){
        //实时显示时间
        window.setInterval(node_NowTime,900);
        //设置总票房(并使缓存清零)
        $("#BoxSum").html(pageData.OfficeboxSum);
    }
    function node_NowTime(){
        var date=new Date();
        var nowTime=`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        $("#nowTime").html(nowTime);
    }
    //主横幅轮播
    var bannerIndex=1; //src索引
    var cycleBanner; // interval返回值
    var option="play" //轮播状态
    function render_banner(){ 
        //渲染横幅索引按钮
        for(var i=0;i<(pageData.news.length>6? 6 : pageData.news.length);i++){
            $("#bannerPointWrap").append(node_BnPoint(i))
        }
        //开启轮播
        if(cycleBanner == undefined){
            cycleBanner=setInterval(bannerPlay,4000);
        }
        //绑定事件
        $(".prev").on("click",function(e){
            e.preventDefault();
            clearInterval(cycleBanner);
            option="prev"
            bannerPlay();
            cycleBanner= undefined;
        });
        $(".next").on("click",function(e){
            e.preventDefault();
            clearInterval(cycleBanner);
            option="next";
            bannerPlay();
            cycleBanner= undefined;
        });
        $(".pointSlide").on("click",function(e){
            e.preventDefault();
            bannerIndex= $(this).text();
            $(".pointSlide").removeClass("PS_active");
            $(this).addClass("PS_active");
            clearInterval(cycleBanner);
            bannerPlay();
            cycleBanner= undefined;
        })
    }
    function bannerPlay(){
        switch(option){
            case "play":
                if(bannerIndex<6){
                    bannerIndex++;
                }else{
                    bannerIndex=1;
                };
                break;
            case "prev":
                if(bannerIndex>1){
                    bannerIndex --;
                }else{
                    bannerIndex=6;
                }
                break;
            case "next":
                if(bannerIndex<6){
                    bannerIndex ++;
                }else{
                    bannerIndex=1;
                }
                break;
        }
        $(".pic-banner").fadeOut(50,function(){
            $(".pic-banner").attr("src","./img/home-page/banner"+bannerIndex+".jpg");
            var point=$(".pointSlide");
            $(point).removeClass("PS_active");
            $(point[bannerIndex-1]).addClass("PS_active");
            $(".pic-banner").fadeIn(200);
        });
    }
    function node_BnPoint(count){
        if(count==0){
            return `<span class="pointSlide PS_active"><button>${count}</button></span>`
        }else{
            return `<span class="pointSlide"><button>${count}</button></span>`
        }
    }
    
    function init(){
        //获取电影信息
        $.ajax({
            url:"/movies/getMoviesByPage",
            type:"post",
            success: function(data){
                pageData.movieData=data.rows;
                //渲染“正在热映”
                render_OngoingList();
                //渲染“即将上映”
                render_comingList();
                //渲染“热播”
                render_hotList();
                //渲染侧边栏“今日票房”
                render_boxofficeList();
                render_TotalBox();
                //渲染横幅轮播
                render_banner();
                //绑定电影单位链接事件
                $(".pane-1").on("click",".movieBtn",function(e){
                    e.preventDefault();
                    require("router").go("#/details/"+$(this).attr("movieId"));
                })
                $(".pane-1").on("click",".buyBtn",function(e){
                    e.preventDefault();
                    require("router").go("#/studio/"+$(this).attr("movieId"));
                })
            }
        })
    }

    exports.load=function(){
        $("#AppContainer").load("./home/home.html",function(){
            //重置图片轮播
            bannerIndex=1;
            option="play";
            //渲染初始化
            init();
        })
    }
})