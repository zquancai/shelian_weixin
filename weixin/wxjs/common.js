
var Common={
	preURL: 'http://saunion.scnu.edu.cn/shelian_weixin/weixin',
	CreateMenu: function(type, name, seid){
		this.ProHTML(type, name, seid);
		this.BindEvent();
	},
	BindEvent:function(){
		$('#menu-nav').click(function(event){
			$('#nav-content').slideToggle();
			event.stopPropagation();
		});
		$('body').on('click',function(){
			$('#nav-content').slideUp();
		});
	},
	ProHTML: function(type, name, seid){
		var seid0=null;
		if(type==6)//社联拥有会员意见收集菜单选项
			seid0=0;
		else seid0=seid;
		var txtHTML='<div class="nav">';
		txtHTML += '<div class="nav-name">'+name+'</div>';
		txtHTML += '<nav class="menu-nav">';
		txtHTML += '<a href="http://wx.wsq.qq.com/253368538/t/new"><img class="img-edit" src="wximg/edit.png"></a><img id="menu-nav" class="img-menu" src="wximg/menulist.png">';
		txtHTML += '</nav>';
		txtHTML += '<div id="nav-content" class="nav-content">';
		txtHTML += '<ul class="menu-list">';
		txtHTML += '<li '+(type==1?'class="active"':'')+'><a href="'+this.preURL+'/wxshow.html?seid='+seid+'">社团介绍</a></li>';
		txtHTML += '<li '+(type==2?'class="active"':'')+'><a href="'+this.preURL+'/wxphoto.html?seid='+seid+'">社团相册</a></li>';
		txtHTML += '<li '+(type==3?'class="active"':'')+'><a href="'+this.preURL+'/wxpicshow.html?seid='+seid+'">社团活动</a></li>';
		txtHTML += '<li '+(type==4?'class="active"':'')+'><a href="'+this.preURL+'/wxregister.html?seid='+seid+'">新生报名</a></li>';
		if(seid==0)
			txtHTML += '<li '+(type==5?'class="active"':'')+'><a href="'+this.preURL+'/wxmember.html'+'">会员意见收集</a></li>';
		txtHTML += '<li '+(type==6?'class="active"':'')+'><a href="http://wx.wsq.qq.com/253368538">社团微社区</a></li>';
		txtHTML += '</div></div>';
		$('body').append(txtHTML);
	},
	getURLParam: function (name) {//处理url参数
		return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)', "ig").exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
	}
};