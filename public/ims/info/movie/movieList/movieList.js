/**
 * Created by Administrator on 2017/1/16.
 */
define(function(require,exports){
    var $ = require("easyui");

    var movieListData = {};

    //电影列表刷新
    function movieListReload(_id){
        $("#movieList").
            datagrid("reload",{
                movieListId : movieListData._id
            })
    }
    function movieDelete(_id){
        $.ajax({
            url : "/movies/delete",
            type : "post",
            data : {
                _id : _id
            },
            success: function(data){
                if(eval(data)){
                    console.log(data);
                    movieListReload(_id);
                }
            }
        })
    }
    //查询电影
    var search={};
    function movieSearch(_id){
        $.ajax({
            url : "/movies/getMovieByMovieID",
            type : "post",
            data : {
                _id : _id
            },
            success: function(data){
                search = data;
                $("#search").css("display","block");
                // console.log(search);
                 $("#cName").textbox({
                    width:500,
                    value:search.cName
                });
                $("#eName").textbox({
                    width:500,
                    value:search.eName
                });
                $("#type").textbox({
                    width:500,
                    value:search.type
                });
                $("#country").textbox({
                    width:500,
                    value:search.country
                });
                $("#duration").textbox({
                    width:500,
                    value:search.duration
                });
                $("#release").textbox({
                    width:500,
                    value:search.release
                });
                $("#synopsis").textbox({
                    width:500,
                    value:search.synopsis,
                    height:100,
                    multiline:true
                });
            }
        })
    }
    function init(){
        $('#movieList').datagrid({
            url:'/movies/getMoviesByPage',
            method :"post",
            width:800,
            pagination:true,
            singleSelect:true,
            rownumbers:true,
            columns:[[
                {
                    field:'cName',
                    title:'电影名称'
                },{
                    field:'type',
                    title:'电影类型'
                },{
                    field:'country',
                    title:'制作国家/地区'
                },{
                    field:'release',
                    title:'上映时间'
                },{
                    field:'_id',
                    title:'操作',
                    width:300,
                formatter : function(value,row,index){
                        return `<p>
                                    <a href="#" _id="${value}" class="deleteBtn">删除</a>
                                    <a href="#" _id="${value}" class="modifyBtn">修改</a>
                                    <a href="#" _id="${value}" class="searchMovie">查询</a>
                                </p>`
                    }
                }
            ]],
            onLoadSuccess:function(data){
                $(".deleteBtn").linkbutton().
                    on("click",function(ev){
                       var ev = ev || event;
                        ev.preventDefault();
                        movieDelete($(this).attr("_id"));
                    });
                $(".modifyBtn").linkbutton().
                    on("click",function(ev){
                        var ev = ev || event;
                        ev.preventDefault();
                        if($(this).attr("_id")){
                            // console.log($(this).attr("_id"))
                        require("router").go(`#/info/movie/modifyMovie/${$(this).attr("_id")}`);
                        }
                    });
                $(".searchMovie").linkbutton().
                    on("click",function(ev){
                        var ev = ev || event;
                        ev.preventDefault();
                        movieSearch($(this).attr("_id"));

                    })
            }
        });
    }
    exports.load = function(){
        $(".movie-detail").load("./info/movie/movieList/movieList.html",function(){
            init();
        })
    }
});