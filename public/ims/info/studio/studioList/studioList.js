 define(function (require, exports) {
     var $ = require("easyui");

     function init() {
         $('#studioList').datagrid({
             url: "/studios/getStudios"
             , method: "post"
             , width: 1000
             , pagination: true
             , singleSelect: true
             , rownumbers: true
             , columns: [
				[{
                     field: 'name'
                     , title: '影院名称'
                 , }, {
                     field: 'address'
                     , title: '影院地址'
				}, {
                     field: '_id'
                     , title: '操作'
                     , width: 150
                     , formatter: function (value, row, index) {
                         return `<a _id="${value}" class="removeBtn" href="#">删除</a>
                                <a _id="${value}" class="updateBtn" href="#">修改</a>
                                <a _id="${value}" class="getStudioBtn" href="#">查询</a>
                               `
                     }
				}]
			]
             , onLoadSuccess: function (data) {
                 $(".removeBtn").linkbutton().on("click", function (e) {
                     e.preventDefault();
                     studioDelete($(this).attr("_id"))
                 });
                 $(".updateBtn").linkbutton().on("click", function (e) {
                     e.preventDefault();
                     console.log($(this).attr("_id"))
                     updateStudio($(this).attr("_id"))
                 });
                 $(".getStudioBtn").linkbutton().on("click", function (e) {
                     e.preventDefault();
                     getStudio($(this).attr("_id"))
                 });
             }
         });
     }

     function updateStudio(_id) {
         if (_id) {
             require("router").go(`#/info/studio/updateStudio/${_id}`);// //传递哈希值和影院id过去 //go 方法里面是一个传参值  path接受，传递到router中最下面的load方法中，
         }
     }

     function studioDelete(studioID) {
         alert("fd")
         $.ajax({
             url: "/studios/deleteByID"
             , type: "post"
             , data: {
                 _id: studioID
             }
             , success: function (data) {
                 if (eval(data)) {
                     studioListReload();
                 }
             }
         })
     }
     //url: "/studios/getStudioByID"
     function getStudio(studio_id) {
         $.ajax({
             url: "/studios/getStudioByID"
             , type: 'post'
             , data: {
                 _id: studio_id
             }
             , success: function (data) {
                 console.log(data)
                 console.log("this is studio")
                 $('#name').val(data.name);
                 $('#address').val(data.address);
             }
         })
     }

     function studioListReload() {
         $('#studioList').datagrid('reload')
     }
     exports.load = function (studioID) {
         $(".studio-detail").load("/ims/info/studio/studioList/studioList.html", function () {
             init();
         })
     };
 })