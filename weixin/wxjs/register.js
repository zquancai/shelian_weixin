
var Register={
	$type_choice: $('#type-choice input'),
	$name: $('#shetuan-name'),
	$part: $('#part'),
	$fold: $('#fold'),
	$preview_t: $('#preview-t tbody'),//预览报名表
	$preview_b: $('#preview-b'),//预览报名表的按钮
	$send_register: $('#send-register'),
	$registerform: $('#registerform'),
	$rechange: $('#rechange'),
	$name_tip: $('#name-tip'),
	$phone_tip: $('#phone-tip'),
	$mail_tip: $('#mail-tip'),
	$first_tip: $('#first-tip'),
	$s_info: $('#s-info'),
	isopen: 0,
	seid:null,
	name: '',
	allattr: ["姓名","性别","学院(专业)","宿舍地址","联系电话",
										"QQ","邮箱","微博微信","爱好特长","个人曾任职务或经历",
										"个人介绍","申请类别","第一志愿","第一志愿理由","第二志愿",
										"第二志愿理由"],
	Inti: function(){
		this.SetSeid();
		this.LoadData();
		this.BindEvent();
	},//var $all_input=$('#registerform :input[type!="radio"],:input:checked');
	BindEvent: function(){
		var that=this;
		that.$type_choice.click(that.RegisterType);
		that.$fold.click(function(event){
			event.stopPropagation();
			if(that.$part.css('display')!='block'){
				that.$part.slideDown();
				$(this).text('收起');
			}
			else{
				that.$part.slideUp();
				$(this).text('部门介绍');
			}
		});
		that.$preview_b.click(function(){
			that.$registerform.find('span[id~="tip"]').text('');//取消提示
			var $all_input=that.$registerform.find('input[type!="radio"],textarea, input:checked');
			var inputHTML='<tr><td>报名社团</td><td>'+that.name+'</td></tr>';;
			if(that.CheckInput($all_input,$all_input.eq(11).val())){
				for(var i=0;i<$all_input.length;i++)
					inputHTML += '<tr><td>'+that.allattr[i]+'</td><td>'+$all_input.eq(i).val()+'</td></tr>';
				that.$preview_t.html(inputHTML);
				that.$rechange.show();
				that.$preview_b.hide();
				that.$registerform.hide();
				that.$preview_t.show();
			}
		});
		that.$rechange.click(function(){
			that.$preview_t.hide();
			that.$preview_b.show();
			that.$rechange.hide();
			that.$registerform.show();
		});
		that.$send_register.click(that.sendDB);
	},
	LoadData: function(){
		this.GetInfo();
	},
	CheckInput: function($all_input,type){
		var that=this;
		if(chinese($all_input.eq(0).val())) 
			if(phoneNumber($all_input.eq(4).val()))
				if(isMail($all_input.eq(6).val()))
					if(type == '会员')
						return true;
					else if(moreTwo($all_input.eq(12).val()))//第一志愿
						return true;
					else{
						that.$first_tip.text('请填写第一志愿');
						that.$first_tip.parent().focus();
					}
				else{
					that.$mail_tip.text('(邮箱格式不正确！)');
					that.$mail_tip.parent().focus();
				}
			else{
				that.$phone_tip.text('(请输入11位号码)');
				that.$phone_tip.parent().focus();
			}
		else{
			that.$name_tip.text('(请填写真实姓名)');
			that.$name_tip.parent().focus();
		}
		return false;
	},
	RegisterType: function (){//根据不同申请类别显示不同表单
		var type=$(this).val();//类型
		if(type=="会员")//会员时，不显示志愿选项
			$('#minister-staff').css("display","none");
		else//干事或者部长时显示志愿选项
			$('#minister-staff').css("display","block");
	},
	GetInfo: function(){//初始化社团数据
		var that=this;
		$.get("refresh.php",
			{getdata:'info',seid:that.seid},
			function(data){
				data=eval('('+data+')');
				that.seid=data.seid;
				that.name=data.name;
				if(data.isopen==1){//判断社团是否开放了报名
					Common.CreateMenu(4,data.name,that.seid);//建立菜单栏
					that.$name.text(data.name);
					that.$part.append(data.part);
				}
				else{
					alert(data.name+'尚未开放报名！');
					$('body').html('<h3>正在跳转，请稍后...</h3><a href="'+Common.preURL+'/wxshow.htnl?seid='+that.seid+'">手动返回</a>');
					window.location.href=Common.preURL+'/wxshow.htnl?seid='+that.seid;
				}
			});
	},
	SetSeid: function(){
		this.seid = Common.getURLParam('seid');
		if(this.seid=='' || this.seid==null)
			this.seid=0;
	},
	sendDB: function (){
		var $all_input=Register.$registerform.find('input[type!="radio"],textarea, input:checked');
		if(Register.CheckInput($all_input,$all_input.eq(11).val())){
			var allinputval = [];
			allinputval[0] = Register.seid;
			for(var i = 0 ;i < $all_input.length; i ++)
				allinputval[i+1]=$all_input.eq(i).val();
			console.log(allinputval);
			$.post("refresh.php",{
				addchoice:"addregister",
				allinputval:allinputval//所有input的值
				},function(data,textStatus){
					if(data=="addsuccess"){
						Register.$s_info.html('<div class="success"><h3>恭喜您，申请报名成功！</h3>'+
							'<p>申请社团：'+Register.name+'</p><p><span class="important">备注：</span>具体面试时间，'+Register.name+
							'会另行通知，近期留意你报名时填写的<span class="important">手机号码以及邮箱</span>。</p></div>');
					}
					else if(data=="repeat")
						alert('您已报名，请不要重复报名！');
					else
						alert('报名失败，请检查网络问题！');
				},"json");
		}
	}
};
Register.Inti();