ShetuanManager={//社联登陆，高级管理权限
	$user_edit_modal: $('#user_edit_modal'),
	$acount_edit_modal: $('#acount_edit_modal'),
	$mail_edit_modal: $('#mail_edit_modal'),
	$file_edit_modal: $('#file_edit_modal'),
	$business_edit_modal: $('#business_edit_modal'),
 	Init: function(){
		ShetuanManager.BindEvent();
	},
	BindEvent: function(){
		$('#view-shetuandelete').click(function(){
			ShetuanManager.SetBodyTitle('已删除社团列表','');
			ShetuanManager.GetList(1);
		});
		$('#view-shetuanlist').click(function(){//查看社团列表
			ShetuanManager.SetBodyTitle('社团列表','');
			ShetuanManager.GetList(0);
		});
		$('#view-shetuaninfo').click(function(){//查看呢社团信息
			ShetuanManager.DisplayTitle();
			ShetuanManager.InitAll();
		});
		$('#view-business').click(function(){//查看社团事务流程
			ShetuanManager.CreateBusinessTitleMenu('business');
			ShetuanManager.GetBusiness($('#nav-business').next(),'0',1);
		});//查看社团事务流程
		$('#view-upload').click(function(){//文件上传
			ShetuanManager.SetBodyTitle('文件资料管理','<a hrref="#" id="uploadfile"><img src="images/upload.png">上传文件</a>');
			$('#uploadfile').click(function(){
				ShetuanManager.$file_edit_modal.modal();
			});
			ShetuanUser.GetFile('#mytable','0');
		});//文件上传和删除
		$('#view-membermail').click(function(){//会员意见收集邮箱
			ShetuanManager.SetBodyTitle('社团会员邮箱','')
			ShetuanManager.GetMail(ShetuanUser.$mytable);
		});//会员邮箱
		$('#send-changeacount').click(function(){
			var modal=ShetuanManager.$acount_edit_modal;
			var content=modal.find('input[data-edit],select[data-edit]');
			var logo_upload=modal.find('input[data-upload="yes"]');//选中上传的input
			var seid=modal.attr('data-seid');
			var logo_name=[],logo_id=[];
			logo_name=logo_id=Common.UploadCheck(logo_upload);//检测大小是否在250kb以下
			Common.ajaxFileUpload('upload.php?change=acount&img='+logo_name,logo_id,function(data){
				var imgurl=eval('('+data+')');//将json字符串转化成js数组
				var acount=[seid,imgurl[0],content.eq(0).val(),content.eq(1).val(),content.eq(2).val()];
				console.log(acount);
				ShetuanUser.PostData('changeacount',seid,acount,function(){
					modal.modal('hide');//修改成功后隐藏模态框
					seid!=undefined?ShetuanUser.GetAllInfo(Common.GetPosition(seid),'',seid,'acount'):ShetuanManager.OnSearch(acount[3]);
				//	ShetuanUser.SetShade(false);//遮罩
				});//上传完成后，更新数据库信息
			});
		});
		$('#send-changeuser').click(function(){
			var modal=ShetuanManager.$user_edit_modal;
			var seid=modal.attr('data-seid');
			var edit=modal.find('input[data-edit="yes"]');
			mpw=edit.eq(0).val();
			acount=edit.eq(1).val();
			newpw=edit.eq(2).val();
			surepw=edit.eq(3).val();
			if(acount.length >= 4 && newpw.length >= 6 ){
				if(newpw==surepw){
					$.post(CONST.Server_URL,{
						changetype: 'changeuser',
						edit: [seid,mpw,acount,newpw]
						}, function (data,textStatus){
							if(data=="changesuccess"){
								alert("更新成功！该社团原来的账号将无法登陆，请及时通知！");
								modal.modal('hide');//修改成功后隐藏模态框
							}
							else if(data=="mpwerror")
								$('#userchange-tip').html(Common.Warning("管理员密码输入错误！无权修改社团账号密码！"));
							else if(data=="exist")
								$('#userchange-tip').html(Common.Warning("用户名已存在！请重新填写用户名！"));
							else alert("更新失败！");
						},"json");
				}
				else $('#userchange-tip').html(Common.Warning("两次密码输入不相符！"));
			}
			else $('#userchange-tip').html(Common.Warning("用户名长度要大于4哦！密码的长度必须都大于6哦！"));
		});
		$('#send-changemail').click(function(){
			var modal=ShetuanManager.$mail_edit_modal;
			var testm=/^[\w]+@[\w]+?\.[\w]{2,6}/;//正则表达式
			var mail=modal.find('input[type="text"]').val();
			if(testm.test(mail)){
				ShetuanUser.PostData('changemail','',[mail],function(){
					modal.modal('hide');//修改成功后隐藏模态框
					ShetuanManager.GetMail('#mytable');
				});
			}
			else
				$('#mail-tip').html(Common.Warning('邮箱格式不正确哦！'));
		});
	},
	DisplayTitle: function (){//显示社团信息标题，以及搜索框
		var search_html='<div class="row"><div class="col-xs-9 col-lg-9"><div class="input-group input-group-sm">'+
						'<input type="text" class="form-control" id="keyword" placeholder="输入关键字搜索社团信息">'+
						'<span class="input-group-btn">'+// onclick=\"OnSearch($('#keyword').val())\"
						'<button class="btn btn-primary" type="button" id="onsearch">搜索</button>'+
						'</span></div></div><div class="col-xs-3 col-lg-3 text-center">'+// onclick=\"AddAcount()\"
						'<button type="button" class="btn btn-success btn-sm" id="addacount" data-seid="-1">添加社团</button></div></div>';
		ShetuanManager.SetBodyTitle('社团信息',search_html);
		$('#onsearch').click(function(){
			var keyword=$('#keyword').val();
			if(keyword!='')
				ShetuanManager.OnSearch(keyword);
			else
				$('#mytable').html(Common.Warning('请输入社团名称的关键字！'));
		});
		$('#addacount').click(function(){
			var modal=ShetuanManager.$acount_edit_modal;
			modal.attr('data-seid','');
			modal.find('input[data-edit]').val('');
			modal.find('img').attr('src','');
			modal.modal();
		});
	},
	InitAll: function(){//初始化显示排前的5个社团
		$.post("refresh.php",{
				initall:"initall",
			},function(data,textStatus){//返回所有符合条件的社团的编号
				ShetuanManager.DisplayAll(data);
		});
	},
	GetList: function(isdelete){
		$.get(CONST.Server_URL,
			{info_nav:-1,isdelete:isdelete},
			function(data,textStatus){
				var listdata=eval('('+data+')');
				if(listdata.length!=0){
					var listHTML='<table class="mytable photo-table"><tbody><tr><th>社团logo</th><th style="width:20%;">社团全称</th>'+
						'<th>社团简称</th><th>社团类型</th><th>社团主页访问量</th><th>操作</th></tr>';
					for(var i=0; i<listdata.length; i++){
						listHTML += '<tr><td><img class="img-thumbnail img-box" src="'+listdata[i].img+'"/ ></td><td>'+listdata[i].name+'</td>';
						listHTML += '<td>'+listdata[i].short+'</td><td>'+CONST.shetuan_type[listdata[i].type]+'</td><td>'+listdata[i].vistcount+'</td>';
						if(isdelete==1){
							listHTML += '<td><a class="btn btn-success btn-sm my-btn reduction" data-seid="'+listdata[i].seid+'">还原</a>';
							listHTML += '<a rel="popover" class="btn btn-danger btn-sm delete acount-popover_d" data-seid="'+listdata[i].seid+'">删除</a></td></tr>';
						}
						else
							listHTML += '<td><a class="btn btn-success btn-sm edit-shetuan" data-name="'+listdata[i].short+'">编辑</a>';
					}
					$('#mytable').html(listHTML);
					ShetuanUser.$modal_choice.html('社团数量：'+listdata.length+'个');
					var text="真的要删除吗？删除后该社团的所有相册、活动、物资等一并删除且不可修复！";
					Common.DeleteTip($('#mytable').find('.acount-popover_d'),'deleteacount',text);//给删除操作添加删除提示，以免误删
					if(isdelete==1){
						$('#mytable').find('.reduction').click(function(){
							var dtr=$(this).parent().parent();
							ShetuanUser.PostData('reduction','',[$(this).attr('data-seid')],function(){dtr.remove();});
						});
					}
					else
						$('#mytable .edit-shetuan').click(function(){
							ShetuanManager.OnSearch($(this).attr('data-name'));
						});
				}
				else
					$('#mytable').html(Common.Warning('列表为空！'));
			});
	},
	GetMail: function(id){//获得当前的会员意见收集邮箱,id为显示的位置元素的id，带#的id
		$.get(CONST.Server_URL,//获取原来的会员意见收集邮箱
			{info_nav:7},
			function(data,textStatus){
				var txthtml='<div class="panel-body"><div class="form-group">'+
										'<label class="col-xs-4 col-lg-4 control-label text-right">当前会员意见收集邮箱账号：</label>'+
										'<div class="col-xs-6 col-lg-6">'+
										'<p id="mail-text" class="form-control-static text-left">'+data+'</p>'+
										'</div>'+
										'<div class="col-xs-2 col-lg-2">'+
										'<a data-toggle="modal" id="membermail" class="btn btn-success btn-sm">编辑</a>'+
										'</div></div></div>';
				$(id).html(txthtml);
				$('#membermail').click(function(){
					var modal=ShetuanManager.$mail_edit_modal;
					modal.modal();
					modal.find('input[type="text"]').val($('#mail-text').text());//会员意见邮箱
				});
			},"json");
	},
	FileChange: function (id){//文件名预览
		var filepath=$(id).val();//文件路径
		if(Common.CheckFile('office',filepath)){//是文档
			if(Common.GetFileSize($(id),CONST.maxFilesize)){//小于50MB
				$('#file-list tboay').append('<tr><td><img src="images/file/'+ShetuanUser.GetFileType(filepath)+'"></td>'+
					'<td>'+filepath+'</td>');
			}
			else $('#file-span').html(Common.Warning('只能上传小于50MB的文件！'));//错误提示
		}
		else $('#file-span').html(Common.Warning('只能上传doc、docx、xls、xlsx、ppt、pptx，zip、rar、war、7z等文件！'));//错误提示
	},
	//获得事务流程,type为要查看的事务类型，1为社团活动，
	//2为物资申请与借用，3为文案审批流程，4各类申请说明
	GetBusiness: function(id,status,part){
		var editlinkh="<a data-toggle='modal' onclick=\"openModal('"+id+"','business_edit','";
		var editlinkf="')\"><img src='images/edit.png'>编辑</a>&nbsp;&nbsp;&nbsp;&nbsp;";
		var deletelink="<a rel='popover' class='delete'><img src='images/cross.png'>删除</a>";
		$.get("refresh.php",
			{info_nav:4,part:part},
			function(data,textStatus){
				var n=data.length;
				var txthtml='';
				txthtml+="<table class='mytable'><tbody>"+//标题,span存放一级分类的类型号
										"<tr><th class='photo-table-th0'><span class='span-hidden'>"+data[0][1]+"</span></th><th class='td-type'>"+data[0][5]+"</th><th>"+data[0][6]+"</th><th class='photo-table-th1'>操作</th></tr>";
				for(var i=1;i<n;i++)
					txthtml+="<tr><td class='td-width text-center'>"+data[i][4]+"</td>"+//子类型
										"<td class='text-center'>"+data[i][5]+"</td>"+
										"<td>"+data[i][6]+"</td><td><span class='span-hidden'>"+data[i][0]+"</span>"+editlinkh+(i-1)+editlinkf+deletelink+"</td></tr>";
				txthtml+="</tbody></table>";
				$(id).html(txthtml);
			},"json");
	},
	CreateBusinessTitleMenu: function(id){//建立社团事务的菜单栏
		ShetuanManager.SetBodyTitle('社团事务流程管理','');
		var txthtml='<ul class="nav nav-tabs nav-justified nav-business" id="nav-business">'+
					  '<li class="active"><a href="#" data-toggle="tab" data-type="1">社团活动类型</a></li>'+
					  '<li><a href="#" data-toggle="tab"  data-type="2">物资申请与借用</a></li>'+
					  '<li><a href="#" data-toggle="tab"  data-type="3">文案审批流程</a></li>'+
					  '<li><a href="#" data-toggle="tab"  data-type="4">各类申请说明</a></li>'+
					'</ul><div></div>';
					//id为highttable的div是存放社团的资料，社联管理权限才有
		$('#mytable').html(txthtml);
		$('#nav-business li a').click(function(){
			var $business_div=$(this).parent().parent().next();
			ShetuanManager.GetBusiness($business_div,'0',$(this).attr('data-type'));
		});
	},
	DisplayAll: function(data){//输出所有社团的信息
		var shetuanacount=eval('('+data+')');
		var n=shetuanacount.length;//获得社团个数
		if(n==0)//没有查找数据时，给出提示
			$('#mytable').html(Common.Warning("不存在这样的社团！请重新搜索！"));
		else{
			var  txthtml="";
			for(var i=0;i<n;i++)
				txthtml+=ShetuanManager.CreatCMenuHtml(shetuanacount[i].seid,shetuanacount[i].name);
			$('#mytable').html(txthtml);
			$('.allhandle button[data-type]').click(function(){//为添加操作加载事件
				var seid=$(this).parent().attr('data-seid');
				switch($(this).attr('data-type')){
					case 'addaction':ShetuanUser.OpenAddModal(ShetuanUser.$action_edit_modal,seid);break;
					case 'addphoto':ShetuanUser.OpenAddModal(ShetuanUser.$photo_edit_modal,seid);break;
					case 'addmaterials':ShetuanUser.OpenAddModal(ShetuanUser.$materials_edit_modal,seid);break;
					default:console.log('事件绑定失败！');
				}
			});
			var text='真的要删除吗？删除后该社团将无法登录！你可以在回收站回复该社团的账户信息。';
			Common.DeleteTip($('.allhandle a'),'deleteacount0',text);//删除后放进回收站
			$('.nav-shetuan li a').click(function(){//为按钮绑定事件
				var $content_div=$(this).parent().parent().next();
				switch($(this).attr('data-type')){//绑定事件
					case 'acount':ShetuanUser.GetAllInfo($content_div,'',$content_div.attr('data-seid'),'acount');break;
					case 'info':ShetuanUser.GetAllInfo('',$content_div,$content_div.attr('data-seid'),'info');break;
					case 'action':ShetuanUser.GetAction($content_div,$content_div.attr('data-seid'));break;
					case 'photo':ShetuanUser.GetPhoto($content_div,$content_div.attr('data-seid'));break;
					case 'mail':ShetuanUser.GetRegister($content_div,$content_div.attr('data-seid'));break;
					case 'materials':ShetuanUser.GetMaterials($content_div,$content_div.attr('data-seid'),-1);break;
					default:console.log('绑定事件失败！');
				}
			});
			for(var i=0;i<n;i++)//获取账号信息
				ShetuanUser.GetAllInfo($('.nav-shetuan').eq(i).next(),'',$('.nav-shetuan').eq(i).next().attr('data-seid'),'acount');
		}
	},
	OnSearch: function(name){
		$.post("refresh.php",{
				opsearch:"search",//告诉后台现在是在执行搜索功能
				keyword: name//索索的关键词
			},function(data,textStatus){//返回所有符合条件的社团的编号
				ShetuanManager.DisplayAll(data);
		});
	},
	//生成高级管理员管理社团的子菜单
	CreatCMenuHtml: function(seid,name){//id为社团各种资料的显示位置，seid为社团编号
		var txthtml='<div class="row namerow"><div class="col-xs-4 col-lg-4 namecol">'+
								'<strong>社团名：'+name+'</strong></div>'+
								'<div class="col-xs-8 col-lg-8 text-right allhandle" data-seid="'+seid+'">'+
								'<button class="btn btn-info btn-sm my-btn" type="button" data-type="addaction">添加活动</button>'+
								'<button class="btn btn-success btn-sm my-btn" type="button" data-type="addphoto">添加相册</button>'+
								'<button class="btn btn-default btn-sm my-btn" type="button" data-type="addmaterials">添加物资</button>'+
								'<a class="btn btn-danger btn-sm delete acount-popover" rel="popover" data-seid="'+seid+'">删除社团</a>'+
								'</div></div>'+
					'<ul class="nav nav-tabs nav-justified nav-shetuan">'+
					'<li class="active"><a href="#home" data-toggle="tab" data-type="acount">社团账号信息</a></li>'+
					'<li><a href="#" data-toggle="tab" data-type="info">社团资料</a></li>'+
					'<li><a href="#" data-toggle="tab" data-type="action">社团活动</a></li>'+
					'<li><a href="#" data-toggle="tab" data-type="photo">社团相册</a></li>'+
					'<li><a href="#" data-toggle="tab" data-type="mail">社团信箱</a></li>'+
					'<li><a href="#" data-toggle="tab" data-type="materials">社团物资</a></li>'+
					'</ul><div id="mytable'+seid+'" data-seid="'+seid+'"></div>';
		return txthtml;
	},
	SetBodyTitle: function(titletype,choicehtml){
		ShetuanUser.AcountDisplay('none');
		ShetuanUser.$shetuan_body_title.html(titletype);
		ShetuanUser.$modal_choice.html(choicehtml);
	}
}
ShetuanManager.Init();