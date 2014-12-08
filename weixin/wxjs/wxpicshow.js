
var WxPicShow={
	$a_title: $('#a-title'),
	$all_action: $('#all-action'),
	$s_bottom: $('#s-bottom'),
	seid:null,
	id:null,
	Init: function(){
		this.SetSeid();//设置seid
		this.LoadData();
		this.BindEvent();
	},
	LoadData: function(){
		var that=this;
		if(that.seid != null)
			$.get('refresh.php',
				{getdata:'action-seid',seid:that.seid},//order为数据库中的id值
				function(data,textStatus){
					Common.CreateMenu(3,data[0].name,that.seid);//建立菜单栏
					that.$a_title.html('<center><strong>'+data[0].name+'精彩活动回顾<hr></strong></center>');
					that.$all_action.html(that.GetActionHTML(data));
				},'json');
		else{
			$.get('refresh.php',
				{getdata:'action-id',id:that.id},//order为数据库中的id值
				function(data,textStatus){
					that.$all_action.html(that.GetActionHTML(data));
					that.$s_bottom.remove();
				},'json');
		}
	},
	BindEvent: function(){
		
	},
	GetActionHTML: function(data){
		var actionHTML='';
		for(var i=0; i < data.length; i++){
			actionHTML += '<div class="s-info"><strong>活动名：'+data[i].eventname+'<hr></strong>';
			actionHTML += data[i].eventinfo;
			if(data[i].img1 != '#')
				actionHTML += '<img class="img" src="'+data[i].img1+'"><p>'+data[i].img1_info+'</p>';
			if(data[i].img2 != '#')
			actionHTML += '<img class="img" src="'+data[i].img2+'"><p>'+data[i].img2_info+'</p>';
			actionHTML += '</div>';
		}
		return actionHTML;
	},
	SetSeid: function(){
		var seid = Common.getURLParam('seid');
		var id= Common.getURLParam('id');
		if(seid!=null)
			this.seid=seid;
		else if(id!=null)
			this.id = id;
		else
			this.seid = 0;
	}
};
WxPicShow.Init();