
var Photo={
	scrollimg: document.getElementById('scrollimg'),
	page_span: $('#page-span'), 
	p_title: $('#p-title'), 
	p_text: $('#p-text'), 
	seid:'',
	photo_arr: null,
	maxp:'',
	curp:0,
	Init: function(){
		this.SetSeid();//设置seid
		this.LoadData();
		this.BindEvent();
	},
	LoadData: function(){
		var that=this;
		$.get("refresh.php",
						{getdata:"photo",seid:that.seid},//order为数据库中的id值
						function(data,textStatus){
							that.photo_arr=data;//保存数据
							that.maxp=data.length//最大页码
							that.scrollimg.src=data[0].imgurl;
							Photo.p_title.text('图片标题');
							Photo.p_text.text(data[0].imginfo);
							that.page_span.text((that.curp+1)+'/'+that.maxp);
							Common.CreateMenu(2,data[0].name,that.seid);//建立菜单栏
						},"json");
	},
	BindEvent: function(){
		var that=this;
		//向大图的id添加触摸事件
		that.scrollimg.addEventListener("touchstart", that.ScrollImg, false);
		that.scrollimg.addEventListener("touchend", that.ScrollImg, false);
		that.scrollimg.addEventListener("touchmove", that.ScrollImg, false);
	},
	SetSeid: function(){
		this.seid = Common.getURLParam('seid');
		if(this.seid=='' || this.seid==null)
			this.seid=0;
	},
	ScrollImg: function (event)
	{	
		switch (event.type) {
			case "touchstart"://触摸屏幕时
				var touch = event.touches[0]; //获取第一个触点 
				startX = Number(touch.pageX); //页面触点X坐标 */
			break;
			case "touchend"://结束时
				b_left = Photo.scrollimg.style.left.replace("px","");
				b_left=Number(b_left);
				if(b_left < 0){//左滑
					if(b_left >= -50 || Photo.curp == Photo.maxp-1)//滑动距离小于50px回到原位
						Photo.scrollimg.style.left='0px';
					else{
						Photo.curp ++;
						Photo.scrollimg.src='';
						Photo.scrollimg.src=Photo.photo_arr[Photo.curp].imgurl;
						Photo.p_title.text('图片标题');
						Photo.p_text.text(Photo.photo_arr[Photo.curp].imginfo);
						Photo.page_span.text((Photo.curp+1)+'/'+Photo.maxp);
						Photo.scrollimg.style.left='0px';
					}
				}
				else{//右滑
					if(b_left  <= 50 || Photo.curp == 0)//滑动距离小于50px回到原位
						Photo.scrollimg.style.left='0px';
					else{
						Photo.curp --;
						Photo.scrollimg.src='';
						Photo.scrollimg.src=Photo.photo_arr[Photo.curp].imgurl;
						Photo.p_title.text('图片标题');
						Photo.p_text.text(Photo.photo_arr[Photo.curp].imginfo);
						Photo.page_span.text((Photo.curp+1)+'/'+Photo.maxp);
						Photo.scrollimg.style.left='0px';
					}
				}
			break;
			case "touchmove"://移动时
				event.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等 
				var touch = event.touches[0]; //获取第一个触点
				var x = Number(touch.pageX); //页面触点X坐标
				Photo.scrollimg.style.left =x-startX+"px";//改变位置，产生移动效果
			break;
		}//case
	}
};
Photo.Init();