
var WxShow={
	$name: $('#name'),
	$info: $('#info'),
	$part: $('#part'),
	seid:null,
	Init: function(){
		this.SetSeid();//设置seid
		this.LoadData();
		this.BindEvent();
	},
	LoadData: function(){
		var that=this;
		$.get('refresh.php',
						{getdata:'info',seid:that.seid},//order为数据库中的id值
						function(data,textStatus){
							that.$name.html('<strong>'+data.name+
								'社团概况</strong><hr><img class="img" src="'+data.img+'"  class="img" alt="社团logo"/>');
							that.$info.html(data.introduction);
							that.$part.html('<strong>'+data.name+'机构介绍</strong><hr>'+data.part);
							Common.CreateMenu(1,data.name,that.seid);//建立菜单栏
						},'json');
	},
	BindEvent: function(){
		
	},
	SetSeid: function(){
		this.seid = Common.getURLParam('seid');
		if(this.seid=='' || this.seid==null)
			this.seid=0;
	}
};
WxShow.Init();