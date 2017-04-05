define(function(require,exports) {
    var $ = require("easyui");
    var movieID="";
    function getNewMovie(){
        return movie={
        _id:movieID,
        cName : $("#cName").val(),
        eName : $("#eName").val(),
        type : $("#type").val(),
        country : $("#country").val(),
        duration : $("#duration").val(),
        release : $("#release").val(),
        synopsis : $("#synopsis").val()
        }
    }
    function modifyMovie(){
        $.ajax({
            url : "/movies/update",
            type : "post",
            data : {movie:JSON.stringify(getNewMovie())},
            success: function(data){
                if(eval(data)){
                    require("router").go(`#/info/movie/movieList`);
                }
            }
        });
    }
    function getMovie(modifyId){
        movieID=modifyId;
        $.ajax({
            url : "/movies/getMovieByMovieID",
            type : "post",
            data : {
                _id:modifyId
            },
            success: function(data){
                init(data)
            }
        });
    }
    function init(data){
        $("#modifyBtn").linkbutton()
            .on("click",function(ev){
                var ev = ev || event;
                //阻止a标签默认事件
                ev.preventDefault();
                modifyMovie();

            });
        //重置
        $('#resetBtn').linkbutton({
            //图标
            // iconCls: 'icon-search'
        })
        .on("click",function(ev){
            var ev = ev || event;
            ev.preventDefault();
            $("#cName").textbox("clear");
            $("#eName").textbox("clear");
            $("#type").textbox("clear");
            $("#country").textbox("clear");
            $("#duration").textbox("clear");
            $("#release").textbox("clear");
            $("#synopsis").textbox("clear")
        });


        $("#cName").textbox({
            width:500,
            value:data.cName
        });
        $("#eName").textbox({
            width:500,
            value:data.eName
        });
        $("#type").textbox({
            width:500,
            value:data.type
        });
        $("#country").textbox({
            width:500,
            value:data.country
        });
        $("#duration").textbox({
            width:500,
            value:data.duration
        });
        $("#release").textbox({
            width:500,
            value:data.release
        });
        $("#synopsis").textbox({
            width:500,
            value:data.synopsis,
            height:100,
            multiline:true
        });
    }
    exports.load = function (modifyId) {
        $(".movie-detail").load("./info/movie/modifyMovie/modifyMovie.html", function () {
            getMovie(modifyId);
        })
    };
});