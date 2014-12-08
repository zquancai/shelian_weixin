
var WxShowType={
	URL: 'http://saunion.scnu.edu.cn/shelian_weixin/weixin/wxshow.html?seid=',
	$type_all: $('#type-all'),
	typearr: ["文娱体育类","理论学习类","兴趣爱好类","学术科技类","社会实践类","院系社联类"],
	type:null,
	Init: function(){
		this.SetType();
		this.LoadData();
		this.BindEvent();
	},
	LoadData: function(){
		var that=this;
		$.get('refresh.php',
						{getdata:'allinfo',type:that.type},//order为数据库中的id值
						function(data,textStatus){
							console.log(data);
							var txtHTML='';
							for(var j=0; j < data.length; j++){
								txtHTML += '<div class="s-info"><strong>'+that.typearr[data[j][0]]+'<hr></strong>';
								var this_type = data[j][1];
								for(var i=0; i < this_type.length; i++){
									txtHTML += '<div class="shetuan">';
									txtHTML += '<a href="'+that.URL+this_type[i].seid+'">';
									txtHTML += '<img src="'+this_type[i].img+'">';
									txtHTML += '<span>'+this_type[i].name+'</span></a></div>';
								}
								txtHTML += '</div>';
							}
							that.$type_all.html(txtHTML);
						},'json');
	},
	BindEvent: function(){
	},
	SetType: function(){
		this.type = Common.getURLParam('type');
		if(this.type==null)
			this.type=0;
	}
};
WxShowType.Init();