define(function (require, exports) {
    var $ = require("easyui");
    var studio = {}

    function init() {
        $("#studioName").textbox({
            width: 500
            , value: "皇家影院"
        });
        $("#studioAddr").textbox({
            width: 500
            , value: "一环路212抚琴路"
        });
        $('#addBtn').linkbutton({
            disabled: true
        })
        .on("click",function(e){
            e.preventDefault();
            if(studio._id){
             require("router").go(`#/info/studio/theater/${studio._id}`)}
        })
        .on("click",function(){
            console.log("dhhsdsd")
        })
        $('#saveBtn').linkbutton().on("click", function (e) {
            e.preventDefault();
            saveStudio();
            setAddBtnState()
        });
        $('#resetBtn').linkbutton().on("click", function (e) {
                e.preventDefault();
                clearInput()
            })
            //得到value值
        function getStudio() {
            return {
                name: $("#studioName").val()
                , address: $("#studioAddr").val()
            , }
        }
        //保存影院信息
        function saveStudio() {
            console.log(getStudio())
            $.ajax({
                url: "/studios/addStudio"
                , type: "post"
                , data: getStudio()
                , success: function (data) {
                    studio = data;
                }
            })
        }

        function setAddBtnState() {
            $("#addBtn").linkbutton({
                disabled: false
            })
        }
        //清楚value的方法
        function clearInput() {
            $("#studioName").textbox({
                value: ""
            })
            $("#studioAddr").textbox({
                value: ""
            })
        }
    }
    exports.load = function () {
        $(".studio-detail").load("/ims/info/studio/chooseStudio/chooseStudio.html", function () {
            init()
            console.log("zhelishiList")
        })
    };
})