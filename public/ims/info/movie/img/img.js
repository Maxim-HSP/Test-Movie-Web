define(function(require,exports){
	var $=require("easyui");
	var imgData={
		curImgType:"indexImg"
	}
	
	//图片删除
	function imgDelete(_id){
		$.ajax({
			url:"/imgs/delete",
			type:"post",
			data:{
				_id:_id
			},
			success:function(data){
//				console.log(data);
				if(eval(data)){
					imgListReload();
				}
			}
		})
	}
	
	//图片列表自动刷新
	function imgListReload(){
		$('#imgList').datagrid("reload",{
			movieId: imgData.movieId, //电影_id
			curImgType: imgData.curImgType, //图片类型
		})
	}
	
	//判断图片是否上传
	function movieImgIsUpload(name,callback){
		$.ajax({
			url:"/imgs/movieImgIsUpload",
			type:"post",
			data:{
				movieId:imgData.movieId,
				name:name,
				type:imgData.curImgType
			},
			success:function(data){
				console.log(data)
//				返回这张图片有几张
				callback(data.count)
			}
		})
	}
	
	
	function init(movieId){
		imgData.movieId=movieId;
		//图片类型下拉列表初始化
		$("#curImgType").combobox({    
			data:[{
				"id":"indexImg",
				"text":"主页图片"
			},{
				"id":"normal",
				"text":"剧情图片"
			}],
//			基础数据值名称绑定到该下拉列表框
			valueField:'id',   
//			基础数据字段名称绑定到该下拉列表框
			textField:'text',
			value:imgData.curImgType,
//			在用户选择列表项的时候触发
			onSelect: function(record){
				imgData.curImgType=record.id;
				imgListReload();
			}
		}); 
		
		//上传控件初始化
		$("#fileupload").fileupload({
			url: "/files/upload",
			dataType:"json",
			formData: {
				imgData: JSON.stringify({
					movieId: imgData.movieId,
					type: imgData.curImgType
				})
			},
			//上传之前判断图片是否已存在
			add:function(e,data){
//				console.log(data);
				movieImgIsUpload(data.files[0].name,function(count){
					console.log(data.files[0].name);
//					如果这张图片为0张的时候，就提交
					if(count===0){
						data.submit();
					}
				})
			},
			//上传成功之后方法
			done:function(e,data){
				console.log(data);
				imgListReload();
			},
		})
		.bind("fileuploadsubmit",function(e,data){
			data.formData = {
				imgData: JSON.stringify({
					movieId: imgData.movieId,
					type: imgData.curImgType
				})
			}
		})
		
		//图片列表初始化
		$('#imgList').datagrid({  
			
//			一个URL从远程站点请求数据
			url:'/imgs/getMovieImgByMovieId',  
			
//			method:该方法类型请求远程数据
			method:"post",
			
//			queryParams: 在请求远程数据的时候发送额外的参数
			queryParams: {
				movieId: imgData.movieId, //电影_id
				curImgType: imgData.curImgType, //图片类型
			},
			
//			显示一个行号列
			rownumbers:true,
			
//			只允许选择一行
			singleSelect:true,
			
//			在DataGrid控件底部显示分页工具栏
			pagination:true,
			
//			DataGrid列是一个数组对象，该元素也是一个数组对象。元素数组里面的元素是一个配置对象，它用来定义每一个列字段
			columns:[
				[{
					field:'type',
					title:'图片类型',
					formatter: function(value,row,index){
						if(value=="indexImg"){
							return `<span>主页图片</span>`
						}else{
							return `<span>剧情图片</span>`
						}
					}
				},{
					field:'name',
					title:'图片名称',
				},{
					field:'url',
					title:'缩放图',
					//	单元格formatter(格式化器)函数，带3个参数：
					//	value：字段值。
					//	row：行记录数据。
					//	index: 行索引
					formatter: function(value,row,index){
						return `<img width="50" heifht="50" src="${value}" />`
					}
				},{
					field:'_id',
					title:'缩放图',
					formatter: function(value,row,index){
						return `<a _id="${value}" class="removeBtn" href="#">删除</a>`
					}
				}]
			],
			
//			在数据加载成功的时候触发
			onLoadSuccess:function(data){
				
				$(".removeBtn")
					.linkbutton()
					.on("click",function(e){
						e.preventDefault();
						console.log($(this).attr("_id"));
						imgDelete($(this).attr("_id"));//点击删除
					});
			}
		})
		
	}
	
	
	exports.load=function(movieId){
		$(".movie-detail").load("./info/movie/img/img.html",function(){
			init(movieId);
		})
	}
})