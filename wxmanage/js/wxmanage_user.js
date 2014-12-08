
window.CONST={
	Server_URL: 'refresh.php',
	maximgsize: 250*1024,//图片上传的最大大小，250KB
	maxAcountsize: 100*1024,//社团logo大小，小于50KB
	maxFilesize: 50*1024*1024,//上传文件大小，小于50MB
	shetuan_type: new Array("文娱体育类","理论学习类","兴趣爱好类","学术科技类","社会实践类","院系社联类")
}

var editor_array=new Array();//编辑器数量
//对象模型
ShetuanUser={
	$shetuan_body_title : $('#shetuan-body-title'),
	$modal_choice : $('#modal-choice'),
	$mytable : $('#mytable'),
	$account : $('#account'),
	$info_edit_modal: $('#info_edit_modal'),
	$action_edit_modal: $('#action_edit_modal'),
	$photo_edit_modal: $('#photo_edit_modal'),
	$register_modal: $('#register_modal'),
	$materials_edit_modal: $('#materials_edit_modal'),
	$market_view_modal: $('#market_view_modal'),
	curDate : new Date,
	Init : function(){//初始化函数
		ShetuanUser.LoadData();
		ShetuanUser.LeftMenu();
		ShetuanUser.BindEvent();
	},
	LeftMenu : function(){//初始化左侧菜单
		$('li >a ').click(function(e){
			e.preventDefault();
			var lis=$('li');
			lis.removeClass('active');
		});
		$('.panel-title > a ').click(function(e){
			e.preventDefault();
			var submenu=$(this).parent().parent().next(),
				panel=submenu.parent(),
				panels=$('#sidebar div.panel-body'),
				panels_parents=$('#sidebar div.panel');
			
			if(submenu.parent().hasClass('open')){
				submenu.slideUp();
				panel.removeClass('open');
			}
			else{
				panels.slideUp();
				submenu.slideDown();
				panels_parents.removeClass('open');
				panel.addClass('open');
			}
		});
		if($('.power').length<=0)
			$('body').html("");
	},
	BindEvent : function(){//事件绑定
		//点击左侧导航栏的响应事件
		$('#view-info').click(function(){//查看社团资料
			ShetuanUser.SetBodyTitle('社团资料','','','','');
			ShetuanUser.GetAllInfo('',ShetuanUser.$mytable,-1,'info');//将社团资料写入到id为mytable的元素中
		});//社团资料
		$('#view-action').click(function(){//查看社团活动
			ShetuanUser.SetBodyTitle('社团活动','action',ShetuanUser.$action_edit_modal,'添加活动','action-add');
			ShetuanUser.GetAction(ShetuanUser.$mytable,-1);//将活动内容写到id为mytable的元素里
		});//社团活动
		$('#view-photo').click(function(){//查看社团相册
			ShetuanUser.SetBodyTitle('社团相册','photo',ShetuanUser.$photo_edit_modal,'添加相册','photo-add');
			ShetuanUser.GetPhoto(ShetuanUser.$mytable,-1);//写入社团相册信息到id为table的元素中*/
		});//社团相册
		$('#view-materials').click(function(){//查看社团物资
			ShetuanUser.SetBodyTitle('社团物资','materials',ShetuanUser.$materials_edit_modal,'添加物资','materials-add');
			ShetuanUser.GetMaterials(ShetuanUser.$mytable,-1,-1);//写入社团物资信息到id为table的元素中
		});//社团物资
		$('#view-mail').click(function(){//查看社团信箱
			ShetuanUser.SetBodyTitle('社团信箱','','','<a href="refresh.php?exportfile=yes">导出报名表</a>','');
			ShetuanUser.GetRegister(ShetuanUser.$mytable,-1);
		});//社团信箱
		$('#view-market').click(function(){//社团市场
			ShetuanUser.SetBodyTitle('社团物资市场','','',
			'<div class="row"><div class="col-xs-3 col-lg-3"></div><div class="col-xs-9 col-lg-9"><div class="input-group input-group-sm">'+
					'<input type="text" class="form-control" id="market-search" placeholder="输入关键字搜索物资">'+
					'<span class="input-group-btn">'+
					'<button class="btn btn-primary" type="button" id="marketsearch">搜索物资</button></span>',
			'');
			ShetuanUser.GetMaterials(ShetuanUser.$mytable,'',1);
			//物资搜索
			$('#marketsearch').click(function(){
				var keyword=$(this).parent().prev().val();
				$.post("refresh.php",{
					opsearch:"marketsearch",//告诉后台现在是在执行搜索功能
					keyword: keyword//索索的关键词
					},function(data,textStatus){//返回所有符合条件的社团的编号
						var mdata=eval('('+data+')');
						var n=mdata.length;
						if(n!=0){
							ShetuanUser.$mytable.html(ShetuanUser.MaterialsHTML(mdata,'',''));
							$('.market_view').click(ShetuanUser.OpenEditModal);//查看事件
						}
						else
							ShetuanUser.$mytable.html(Common.Warning('物资库里暂时不存在与"'+keyword+'"的物资'));
				});
			});
		});//社团市场
		$('#view-download').click(function(){//文件下载
			ShetuanUser.AcountDisplay('block');
			ShetuanUser.$shetuan_body_title.html('文件资料下载');
			ShetuanUser.$modal_choice.html('');
			ShetuanUser.GetFile(ShetuanUser.$mytable,'');
		});//文件下载
		$('.img-review').bind('change',function(){
		//	console.log('图片预览');
			var status=Common.change(this);
			if(status==-1)
			   $(this).parent().next().html(Common.Warning("文件必须为图片！图片格式：png、jpg、jpeg、gif")); //提示信息
			else if(status==-2)
				$(this).parent().next().html(Common.Warning("文件大小不能大于25KB哦")); //提示信息
			else
				$(this).parent().next().html('');
		});
		$('#send-newpassword').click(function(){
			var pass_input=$('#password_edit_modal input');
			var oldp=pass_input.eq(0).val(),newp=pass_input.eq(1).val(),surep=pass_input.eq(2).val();
			if(newp.length>=6)//密码长度必须大于6
				if(newp==surep)//两次密码输入是否一样
					$.post(CONST.Server_URL,{
						changetype:'changepassword',
						edit: [oldp,newp,surep]
						}, function (data,textStatus){
							console.log(data);
							if(data=="success"){
								alert('密码修改成功！请重新登陆！');
								window.location.href='wxlogin.php';
							}
							else if(data=="passworderror")
								$('#change-tip').html(Common.Warning("原密码输入错误！"));
							else if(data=="fail")
								$('#change-tip').html(Common.Warning("修改失败！可能是网络问题！"));
							else	console.log(data);
						},"json");
				else $('#change-tip').html(Common.Warning("两次密码输入不一致！"));
			else $('#change-tip').html(Common.Warning("密码长度必须大于6！"));
		});
		$('#send-changeinfo').click(function(){
			ShetuanUser.SetShade(true);//遮罩
			editor_array[0].sync();//将编辑好的html代码复制到textarea
			editor_array[1].sync();
			var $content=$('#info_edit_modal textarea[data-type="info"]');
			var seid=ShetuanUser.$info_edit_modal.attr('data-seid');
			var info=new Array($content.eq(0).val(),$content.eq(1).val(),$content.eq(2).val());
			ShetuanUser.PostData('changeinfo',seid,info,function(){
				ShetuanUser.$info_edit_modal.modal('hide');//修改成功后隐藏模态框
				ShetuanUser.GetAllInfo('',Common.GetPosition(seid),seid,'info');
				ShetuanUser.SetShade(false);//遮罩
			});
		});
		$('#send-changeaction').click(function(){
			ShetuanUser.SetShade(true);//遮罩
			editor_array[2].sync();
			var content=$('#action_edit_modal textarea[data-edit="yes"],input[data-edit="yes"]');
			var img_upload=$('#action_edit_modal input[data-upload="yes"]');
			var action_id=ShetuanUser.$action_edit_modal.attr('data-id');
			var seid=ShetuanUser.$action_edit_modal.attr('data-seid');
			var actionimg_name=[],actionimg_id=[];
			actionimg_name=actionimg_id=Common.UploadCheck(img_upload);
			Common.ajaxFileUpload('upload.php?change=action&img='+actionimg_name,actionimg_id,function(data){
				var imgurl=eval('('+data+')');//将json字符串转化成js数组
				var action=new Array(action_id,content.eq(0).val(),content.eq(1).val(),imgurl[0],content.eq(2).val(),imgurl[1],content.eq(3).val());
				ShetuanUser.PostData('changeaction',seid,action,function(){
					ShetuanUser.$action_edit_modal.modal('hide');//修改成功后隐藏模态框
					ShetuanUser.GetAction(Common.GetPosition(seid),seid);
					ShetuanUser.SetShade(false);//遮罩
				});
			});//上传完成后，更新数据库信息
		});
		$('#send-changephoto').click(function(){
		//	ShetuanUser.SetShade(true);//遮罩
			var modal=ShetuanUser.$photo_edit_modal;
			var content=modal.find('textarea[data-edit="yes"]');
			var photo_upload=modal.find('input[data-upload="yes"]');//选中上传的input
			var photo_id=modal.attr('data-id');
			var seid=modal.attr('data-seid');
			var photoimg_name=[],photoimg_id=[];
			photoimg_name=photoimg_id=Common.UploadCheck(photo_upload);//检测大小是否在250kb以下
			Common.ajaxFileUpload('upload.php?change=photo&img='+photoimg_name,photoimg_id,function(data){
				var imgurl=eval('('+data+')');//将json字符串转化成js数组
				var photo=new Array(photo_id,imgurl[0],content.eq(0).val());
				ShetuanUser.PostData('changephoto',seid,photo,function(){
					modal.modal('hide');//修改成功后隐藏模态框
					ShetuanUser.GetPhoto(Common.GetPosition(seid),seid);
				//	ShetuanUser.SetShade(false);//遮罩
				});//上传完成后，更新数据库信息
			});
		});
		$('#send-materials').click(function(){
			ShetuanUser.SetShade(true);//遮罩
			var modal=ShetuanUser.$materials_edit_modal;
			var content=modal.find('input[data-upload!="yes"],textarea');
			var materials_upload=modal.find('input[data-upload="yes"]');//选中上传的input
			var materials_id=modal.attr('data-id');
			var seid=modal.attr('data-seid');
			var materialsimg_name=[],materialsimg_id=[];
			materialsimg_name=materialsimg_id=Common.UploadCheck(materials_upload);//检测大小是否在250kb以下
			Common.ajaxFileUpload('upload.php?change=materials&img='+materialsimg_name,materialsimg_id,function(data){
				var imgurl=eval('('+data+')');//将json字符串转化成js数组
				var materials=new Array(materials_id,imgurl[0]);
				for(var i=2;i<content.length+2;i++)
					materials[i]=content.eq(i-2).val();
				console.log(materials);
				ShetuanUser.PostData('changematerials',seid,materials,function(){
					modal.modal('hide');//修改成功后隐藏模态框
					ShetuanUser.GetMaterials(Common.GetPosition(seid),seid,-1);
					ShetuanUser.SetShade(false);//遮罩
				});//上传完成后，更新数据库信息
			});
		});
	},
	LoadData : function(){
		//加载数据
		ShetuanUser.GetAllInfo('#shetuan_account',ShetuanUser.$mytable,-1,'all');//初始化页面
	},
	AcountDisplay: function(state){//显示与隐藏社团基本信息框
		ShetuanUser.$account.get(0).style.display=state;
	},
	LeftMenuClick: function(display_status,body_title,modal_choice,click_fun){
		ShetuanUser.AcountDisplay(display_status);
		ShetuanUser.$shetuan_body_title.html(body_title);
		ShetuanUser.$modal_choice.html(modal_choice);
		click_fun(ShetuanUser.$mytable,'');
	},
	GetAllInfo: function(acount_id,info_id,seid,type){//id为显示位置，seid社团编号，type数据类型（user，acount，info）
		$.get("refresh.php",
				{info_nav:0,seid:seid},
				function(data,textStatus){
					switch(type){
						case 'all':
						case 'user' ://用户基本信息
							var txthtml1='<img src="'+data[0].img+'" class="img-responsive">'+
													'<p class="text-center p-name"><b>'+data[0].name+'</b></p>';
							$('#shetuan-user').html(txthtml1);
							$('#welcome-user').html('<small class="quit">欢迎您，'+data[0].name+'！</samll>');
							if(type!='all')break;
						case 'acount' ://用户资料
							var txthtml2='';
							if(seid!=-1)//社联可以管理社团账号信息
								txthtml2 += '<div class="row modal-edit"><div class="col-xs-12 col-lg-12 text-right"><a data-toggle="modal" class="acount_edit" data-edit="acount_edit" data-seid="'+data[0].seid+'"><img class="img-op" src="images/edit.png">编辑</a><a data-toggle="modal" class="user_edit" data-edit="user_edit" data-seid="'+data[0].seid+'"><img class="img-op" src="images/user.png">编辑登陆信息</a></div></div>';
							txthtml2+='<table class="mytable"><tbody>'+
											'<tr><td><b>社团logo</b></td><td><img class="small-logo" data-type="edit" src="'+data[0].img+'"></td>'+
												'<td><b>社团名</b></td><td  data-type="edit">'+data[0].name+'</td></tr>'+
											'<tr><td><b>社团简称</b></td><td  data-type="edit">'+data[0]['short']+'</td>'+
												'<td><b>社团类型</b></td><td  data-type="edit" data-stype="'+data[0].type+'">'+CONST.shetuan_type[parseInt(data[0].type)]+'</td></tr>'+
										'</tbody></table>';
							$(acount_id).html(txthtml2);//社团账户信息
							if(seid != -1){
								acount_id.find('.acount_edit').click(ShetuanUser.OpenEditModal);
								acount_id.find('.user_edit').click(ShetuanUser.OpenEditModal);
							}
							if(type!='all')break;
						case 'info' ://社团基本资料
							var txthtml3='<div class="row modal-edit"><div class="col-xs-12 col-lg-12 text-right">'+
								'<a data-toggle="modal" class="info_edit" data-edit="info_edit"><img src="images/edit.png">编辑</a>'+
								'</div></div>';
							txthtml3+='<table class="mytable"><tbody>'+
													'<tr><td class="td-width text-center">社团简介</td><td id="brief_table">'+data[0].brief+'</td></tr>'+
													'<tr><td class="td-width text-center">社团介绍</td><td id="intro_table">'+data[0].introduction+'</td></tr>'+
													'<tr><td class="td-width text-center">社团部门介绍</td><td id="part_table">'+data[0].part+'</td></tr>'+
													'</tbody></table>';
							$(info_id).html(txthtml3);
							info_id.find('.info_edit').click(ShetuanUser.OpenEditModal);
						break;
						default:console.log('网络出问题啦');
					}
				},"json");
	},
	GetAction: function(id,seid){//获取（社团活动）的信息并放在table里，id为写入的table的元素
		$.get(CONST.Server_URL,
					{info_nav:2,seid:seid},
					function(data,textStatus){
					//	console.log(data);
						var n=data.length;
						var txthtml="";
						if(n==0){
							txthtml=Common.Warning('还未添加社团活动，赶快添加吧！');
							$(id).html(txthtml);
						}
						else{
							for(var i=0;i<n;i++){//输出所有活动的信息
								txthtml+='<div class="row modal-edit"><div class="col-xs-6 col-lg-6 text-left"><strong>活动'+(i+1)+'：<span>'+data[i].eventname+'</span></strong></div>'+
											'<div class="col-xs-6 col-lg-6 text-right"><a data-toggle="modal" class="action_edit" data-edit="action_edit" data-seid="'+data[i].seid+'" data-id="'+data[i].id+'"><img src="images/edit.png">编辑</a>'+
											'<a rel="popover" class="action-popover" data-id="'+data[i].id+'" data-seid="'+data[i].seid+'"><img src="images/cross.png">删除</a></div></div>'+
											'<table class="mytable" data-id="'+data[i].id+'"data-seid="'+data[i].seid+'"><tbody>'+
											'<td  class="td-width text-center">活动详细</td>'+
											'<td  colspan="3">'+data[i].eventinfo+'</td></tr>'+
											'<tr><td  class="td-width text-center">活动照片1</td>'+
											'<td><img src="'+data[i].img1+'" class="img-box" data-type="actionimg"/></td>'+
											'<td  class="td-width text-center">照片1描述</td>'+
											'<td >'+data[i].img1_info+'</td></tr>'+
											'<tr><td  class="td-width text-center">活动照片1</td>'+
											'<td><img src="'+data[i].img2+'"class="img-box"  data-type="actionimg"/></td>'+
											'<td  class="td-width text-center">照片1描述</td>'+
											'<td >'+data[i].img2_info+'</td></tr>'+
										'</tbody></table>';
							}
						//	console.log(txthtml);
							id.html(txthtml);
							id.find('.action_edit').click(ShetuanUser.OpenEditModal);//绑定编辑实践
							var text="真的要删除吗？删除后无法修复，请谨慎操作！";
							Common.DeleteTip(id.find('.action-popover'),'deleteaction',text);//给删除操作添加删除提示，以免误删
						}
					},"json");
		},
	GetPhoto: function(id,seid){//获取（社团相册）的信息并放在table里，id为写入的table的元素
		$.get(CONST.Server_URL,
			{info_nav:3,seid:seid},
			function(data,textStatus){
				var n=data.length;
				var txthtml="";
				if(n==0){
					txthtml=Common.Warning('还未添加社团相册，赶快添加吧！');
					$(id).html(txthtml);
				}
				else{
					var txthtml='<table class="mytable photo-table"><tbody>'+
											'<tr><th class="photo-table-th0">相片序号</th><th>相片预览</th><th>相片描述</th><th class="photo-table-th1">操作</th></tr>';
					for(var i=0;i<n;i++)
						txthtml+='<tr data-id="'+data[i].id+'"><td>'+(i+1)+'</td>'+
										'<td></span><img class="img-thumbnail img-box" src="'+data[i].imgurl+'"></td>'+
										'<td>'+data[i].imginfo+'</td><td><a data-toggle="modal" class="photo_edit" data-edit="photo_edit"><img class="img-op" src="images/edit.png">编辑</a>'+
										'<a rel="popover" class="delete photo-popover" data-id="'+data[i].id+'" data-seid="'+seid+'"><img class="img-op" src="images/cross.png">删除</a></td></tr>';
					txthtml+='</tbody></table>';
					id.html(txthtml);
					id.find('.photo_edit').click(ShetuanUser.OpenEditModal);//绑定编辑实践
					var text="真的要删除吗？删除后无法修复，请谨慎操作！";
					Common.DeleteTip(id.find('.photo-popover'),'deletephoto',text);//给删除操作添加删除提示，以免误删
			}
		},"json");
	},
	GetFile: function(id,status){//获得当前可下载的文件列表
		var oplink="";
		$.post("getfile.php",//获取原来的会员意见收集邮箱
					{fileop:'getfile'},
					function(data,textStatus){
						var n=data.length;//文件个数
						if(n!=0){
							var txthtml="<table class='mytable'><tbody>"+
										"<tr><th class='photo-table-th0'>文件类型</th><th>文件名</th><th>文件大小</th><th>上传时间</th><th>操作</th></tr>";
							for(var i=0;i<n;i++){
								if(status=='0')//高权限的有删除操作，
									oplink="<a rel='popover' class='delete'><img src='images/cross.png'>删除</a>";
								else//连接，提供下载
									oplink="<a href='../wxmanage/shetuan_file/"+data[i][0]+"' title='点击下载'><img src='images/download.png'></a>";
								txthtml+="<tr><td class='text-center'><img src='images/file/"+ShetuanUser.GetFileType(data[i][0])+"'></td><td class='filename-td'>"+data[i][0]+"</td>"+
												"<td class='text-center'>"+data[i][1]+"</td>"+//文件大小
												"<td class='text-center'>"+data[i][2]+"</td>"+//文件上传时间
												"<td class='text-center'>"+oplink+"</td></tr>";
							}
							txthtml+="</tbody></table>";
							$(id).html(txthtml);
						}
						else
							$(id).html(Common.Warning("点击右上角的加号就可以添加文件啦！"));
					},"json");
	},
	GetRegister: function(id,seid){
		$.get(CONST.Server_URL,
					{info_nav:5,seid:seid},
					function(data,textStatus){
						var n=data.length;
						if(n!=0){
							var txthtml="",offset=0;
							txthtml+='<table class="mytable"><tbody>'+
												'<tr><th class="td-width text-center">姓名</th><th>性别</th><th>申请类别</th><th>第一志愿</th>'+
													'<th>联系方式</th><th class="td-width text-center">操作</th></tr>';
							for(var i=0;i<n;i++)
								txthtml+='<tr><td class="text-center">'+data[i].name+'</td>'+
														'<td class="text-center">'+data[i].sex+'</td>'+//性别
														'<td class="text-center tip-color">'+data[i].type+'</td>'+//申请类别
														'<td class="text-center tip-color">'+data[i].first_wish+'</td>'+//第一志愿
														'<td class="text-center">'+data[i].phone+'</td>'+//联系方式
														'<td class="td-type text-center"><strong>'+
															'<a  data-toggle="modal" class="register_view" data-edit="register_view"  data-id="'+data[i].id+'"><img class="img-16" src="images/all.png">查看详细</a>'+
															'<a rel="popover" class="register-popover" data-seid="'+data[i].seid+'"data-id="'+data[i].id+'"><img  class="img-16" src="images/cross.png">删除</a>'+
														'</strong></td></tr>';
							txthtml+='</tbody></table>';
							id.html(txthtml);
							id.find('.register_view').click(ShetuanUser.OpenEditModal);//绑定编辑实践
							var text='真的要删除吗？删除后无法修复，请谨慎操作！';
							Common.DeleteTip(id.find('.register-popover'),'deleteregister',text);//给删除操作添加删除提示，以免误删
						}
						else
							$(id).html(Common.Warning("呜呜，还没有人报名~~"));
					},"json");
	},
	GetMaterials: function(id,seid,page){//获得（社团物资）信息并放在table里，id为写入的table的元素
		var market=(page==-1?'':'yes');
		$.get(CONST.Server_URL,
			{info_nav:6,seid:seid,market:market,page_order:page},
			function(data,textStatus){
				var n=data.length;
				var txthtml="";
				if(n==0){
					txthtml=Common.Warning("还未添加社团物资，赶快添加吧！");
					id.html(txthtml);
				}
				else{
					id.html(ShetuanUser.MaterialsHTML(data,seid,page));//表格排版
					if(market=='yes'){
						$(id).append(ShetuanUser.PagingHTML(data[0][0],page));//社团市场产生页数
						$('#market-page a[data-page]').click(function(){
							console.log($(this).attr('data-page'));
							ShetuanUser.GetMaterials(ShetuanUser.mytable,'',$(this).attr('data-page'));
						});
					}
					id.find('.materials_edit').click(ShetuanUser.OpenEditModal);//绑定编辑事件
					page==-1?'':$('.market_view').click(ShetuanUser.OpenEditModal);//查看事件
					var text="真的要删除吗？删除后无法修复，请谨慎操作！";
					Common.DeleteTip(id.find('.materials-popover'),'deletematerials',text);//给删除操作添加删除提示，以免误删
				}
			},"json");
	},
	PagingHTML: function (npages,page_order){
		var pagehtml="<div class='row child-item' id='market-page'><div class='col-lg-12 text-right'><ul class='pagination'>";
		if(page_order==1)//第一页
			pagehtml+="<li class='disabled'><a>&laquo;</a></li>";
		else
			pagehtml+="<li><a href='#' onclick=\"ShetuanUser.GetMaterials('#mytable','-1','"+(parseInt(page_order)-1)+"')\">&laquo;</a></li>";
		for(var i=1;i<=npages;i++)//置显示的页码为选中
			pagehtml+="<li "+(i==page_order?"class='active'":"")+"><a href='#'  onclick=\"ShetuanUser.GetMaterials('#mytable','-1','"+i+"')\">"+i+"<span class='sr-only'>(current)</span></a></li>";		
		if(page_order==npages)//最后一页
			pagehtml+="<li class='disabled'><a>&raquo;</a></li></ul></div></div>";
		else
		pagehtml+="<li><a href='#' onclick=\"ShetuanUser.GetMaterials('#mytable','-1','"+(parseInt(page_order)+1)+"')\">&raquo;</a></li></ul></div></div>";
		return pagehtml;//返回html片段
	},
	PostData: function(changetype,seid,edit,successfun){//向服务器发送数据，changtype为更新类别，seid为社团编号，edit为更新内容，successfun为更新成功后的执行函数
		$.post(CONST.Server_URL,{
				changetype: changetype,
				seid: seid,//将社团编号传进服务端，便于高级管理员修改指定社团的资料
				edit: edit
			}, function (data,textStatus){
					if(data=="changesuccess"){
						alert("更新成功！");
						successfun();
					}
					else if(data=="addsuccess"){
						alert("添加成功！");
						successfun();
					}
					else alert("操作失败！可能是您的网络出现问题了！错误代码："+data);
				},"json");
	},
	MaterialsHTML: function(data,seid,page){
		txthtml='<table class="mytable photo-table"><tbody>'+
						'<tr><th class="photo-table-th0">物资序号</th><th>图片预览</th><th>物资名</th><th>物资数量</th>'+
						'<th>物资单价</th><th>联系人</th><th class="td-type">操作</th></tr>';
		for(var i=0;i<data.length;i++){//id,mname,murl,amount,mprice,contact
			txthtml+='<tr data-id="'+data[i].id+'" data-seid="'+(isNaN(data[i][1])?-1:data[i][1])+'"><td>'+(i+1)+'</td>'+
							'<td class="span-hidden" data-edit="no">'+data[i][1]+'</td>'+//社团名或id
							'<td data-edit="yes"><img class="img-thumbnail img-box" src="'+data[i][4]+'"></td>'+//图片链接
							'<td data-edit="yes">'+data[i].mname+'</td>'+//物资名
							'<td class="span-hidden" data-edit="yes">'+data[i].minfo+'</td>'+//物资描述
							'<td data-edit="yes">'+data[i].amount+'</td>'+//数量
							'<td data-edit="yes">'+data[i].mprice+'</td>'+//单价
							'<td data-edit="yes">'+data[i].contact+'</td>'+//联系人
							'<td class="span-hidden" data-edit="yes">'+data[i].phone+'</td>'+//联系电话
							'<td class="span-hidden" data-edit="yes">'+data[i].remark+'</td>';//备注
			var deletelink='';
			var editlink='<a data-toggle="modal" class="market_view" data-edit="market_view"><img src="images/all.png" class="img-16">查看详细</a>';
			if(page==-1){//不是社团市场
				deletelink='<a rel="popover" class="delete materials-popover" data-seid="'+seid+'" data-id="'+data[i].id+'"><img src="images/cross.png" class="img-16">删除</a>';
				editlink='<a data-toggle="modal" class="materials_edit" data-edit="materials_edit"><img src="images/edit.png" class=img-16>编辑</a>';
			}
			txthtml += '<td>'+editlink+deletelink+'</td></tr>';
		}
		txthtml+='</tbody></table>';//no属性方便选择器选择
		return txthtml;
	},
	AddHandleHtml: function(choice,text,id){
		var addhtml='<a data-toggle="modal" id="'+id+'"><img src="images/add_'+choice+'_small.png">'+text+'</a>';
		return addhtml;
	},
	PreViewHandleHtml:function(id){
		var viewhtml="<a data-toggle='modal' data-target='"+id+"'><img src='images/phone.png'>预览</a>";
		return viewhtml; 
	},
	SetBodyTitle: function(titletype,imgchoice,modaltype,text,id){
		ShetuanUser.AcountDisplay('block');
		ShetuanUser.$shetuan_body_title.html(titletype);
		if(id != '' && text != ''){
			ShetuanUser.$modal_choice.html('<a data-toggle="modal" id="'+id+'"><img src="images/add_'+imgchoice+'_small.png">'+text+'</a>');
			$('#'+id).click(function(){ShetuanUser.OpenAddModal(modaltype,'');});//打开添加的弹框
		}
		else if(id == '')
			ShetuanUser.$modal_choice.html(text);
		else
			ShetuanUser.$modal_choice.html('');
	},
	OpenAddModal: function(modaltype,seid){
		modaltype.attr('data-id','-1');
		seid==''?modaltype.attr('data-seid','-1'):modaltype.attr('data-seid',seid);//设置seid
		modaltype.find('textarea,input').val('');//清空所有输入框的内容
		modaltype.find('img').attr('src','');
		for(var i=0;i<editor_array.length;i++)
			editor_array[i].html('');
		modaltype.modal();
	},
	GetFileType: function(file){//判断文件类型，并返回文件类型的图片名
		var type=file.replace(/.+\./,"");//后缀
		switch(type){
			case 'docx':
			case 'doc':return "word.png";
			case 'xls':
			case 'xlsx':return "excel.png";
			case 'ppt':
			case 'pptx':return "ppt.png";
			case 'zip':
			case 'war':
			case 'rar':
			case '7z':return "zip.png";
			default:return "zip.png";
		}
	},
	OpenEditModal: function (){
		var modalchoice=$(this).attr('data-edit');
		console.log(modalchoice);
		var modal=null;
		switch(modalchoice){
			case 'info_edit'://编辑社团协会和部门资料
				modal=ShetuanUser.$info_edit_modal;
				var $textarea=modal.find('textarea');
				var $table=$(this).parent().parent().next().find('td');//获得table元素
				var data_seid=$(this).parent().parent().parent().attr('data-seid');
				modal.attr('data-seid',data_seid==undefined?-1:data_seid);
				modal.modal();
				var arr=new Array();
				$textarea.eq(0).val($table.eq(1).html());//选择奇数的td
				for(var i=0;i<2;i++)
					editor_array[i].html($table.eq(2*i+3).html());
			break;
			case 'action_edit':
				modal=ShetuanUser.$action_edit_modal;
				var $textarea=modal.find('textarea[data-edit="yes"],input[data-edit="yes"],img[data-edit="yes"]');
				var $thisarea=$(this).parent().parent();//获得范围内的jq对象
				var $table=$thisarea.next().find('td');//获得table元素
				modal.attr('data-id',$thisarea.next().attr('data-id'));//设置id
				var data_seid=$thisarea.parent().attr('data-seid');
				modal.attr('data-seid',data_seid==undefined?-1:data_seid);//设置seid
				modal.modal();
				var arr = new Array();
				$textarea.eq(0).val($(this).parent().prev().find('span').html());//选择奇数的td
				$textarea.eq(2).attr('src',$table.eq(3).children('img').attr('src'));//选择奇数的td
				$textarea.eq(3).val($table.eq(5).html());//选择奇数的td
				$textarea.eq(4).attr('src',$table.eq(7).children('img').attr('src'));//选择奇数的td
				$textarea.eq(5).val($table.eq(9).html());//选择奇数的td
				editor_array[2].html($table.eq(1).html());
			break;
			case 'photo_edit':
				modal=ShetuanUser.$photo_edit_modal;
				var photo_td=$(this).parent().siblings();//获得一行的数据
				var edit_em=modal.find('img[data-edit="yes"],textarea[data-edit="yes"]');
				modal.attr('data-id',photo_td.parent().attr('data-id'));//设置id
				var data_seid=$(this).parent().parent().parent().parent().parent().attr('data-seid');
				modal.attr('data-seid',data_seid==undefined?-1:data_seid);//设置seid
				modal.modal();
				edit_em.eq(0).attr('src',photo_td.eq(1).children('img').attr('src'));
				edit_em.eq(1).val(photo_td.eq(2).text());
			break;
			case 'acount_edit':
				modal=$('#acount_edit_modal');
				modal.attr('data-seid',$(this).attr('data-seid'));
				var table=$(this).parent().parent().next().find('td[data-type],img[data-type]');
				var edit=modal.find('img[data-edit],input[data-edit],select[data-edit]');
				edit.eq(0).attr('src',table.eq(0).attr('src'));
				for(var i=1;i<3;i++)
					edit.eq(i).val(table.eq(i).text());
				edit.eq(3).val(table.eq(3).attr('data-stype'));
				modal.modal();
			break;
			case 'user_edit':
				modal=$('#user_edit_modal');
				modal.attr('data-seid',$(this).attr('data-seid'));
				$('#userchange-tip').html('');
				modal.find('input[data-edit]').val('');
				modal.modal();
			break;
			case 'business_edit':
			break;
			case 'mail_edit':
			break;
			case 'register_view':
				modal=ShetuanUser.$register_modal;
				var id=$(this).attr('data-id');
				console.log(id);
				$.get(CONST.Server_URL,
						{info_nav:5,id:id},//order为数据库中的id值
						function(data,textStatus){
							var $alltd=modal.find('td:odd');
							var n=$alltd.length;
							console.log(data);
							for(var i=0;i<n;i++)
								$alltd.eq(i).text(data[i+2]);//将详细信息填写到对话框中
						},"json");
				modal.modal();
			break;
			case 'materials_edit':
				modal=ShetuanUser.$materials_edit_modal;
				var materials_td=$(this).parent().siblings('td[data-edit="yes"]');
				modal.attr('data-id',materials_td.parent().attr('data-id'));//设置id
				var data_seid=$(this).parent().parent().parent().parent().parent().attr('data-seid');
				modal.attr('data-seid',data_seid==undefined?-1:data_seid);//设置seid
				var modal_edit=modal.find('img,input[data-upload!="yes"],textarea');
				modal_edit.eq(0).attr('src',materials_td.eq(0).children('img').attr('src'));
				for(var i=1;i<materials_td.length;i++)
					modal_edit.eq(i).val(materials_td.eq(i).text());
				modal.modal();
			break;
			case 'market_view':
				modal=ShetuanUser.$market_view_modal;
				var materials_td=$(this).parent().siblings('td[data-edit="yes"],td[data-edit="no"]');
				var view_td=modal.find('td[data-sort]');
				console.log(materials_td);
				view_td.eq(2).text(materials_td.eq(0).text());
				view_td.eq(0).text(materials_td.eq(2).text());
				view_td.eq(8).text(materials_td.eq(8).text());
				view_td.eq(7).text(materials_td.eq(3).text());
				view_td.eq(1).children('img').attr('src',materials_td.eq(1).children('img').attr('src'));
				for(var i=3;i<7;i++)
					view_td.eq(i).text(materials_td.eq(i+1).text());
				console.log(view_td);
				modal.modal();
			break;
			default: console.log('输入参数为：'+modalchoice);
		}
	},
	SetShade: function(btype){
		if(btype){
			var shadeHTML='<div id="shadediv" class="shadediv">系统正在加载，请稍后...</div>';
			$('body').append(shadeHTML);
		}
		else
			$('#shadediv').remove();
	}
};
ShetuanUser.Init();

Common={
	GetPosition: function(seid){// 返回写入位置
		return $('#mytable'+seid).length==0?$('#mytable'):$('#mytable'+seid);
	},
	change: function (thiselement) {//id为选择文件的按钮，choice为图片预览位置的选择，预览
		var file=$(thiselement).get(0);
		var img=$(thiselement).parent().prev().children('img');
	     var ext=file.value.substring(file.value.lastIndexOf(".")+1).toLowerCase();
	     // gif在IE浏览器暂时无法显示
	     if(!Common.CheckFile('img',file.value))
			return -1;//不符合的类型
		else if(!Common.GetFileSize($(thiselement),CONST.maximgsize))
			return -2;//超过大小
	     // IE浏览器
	     if (document.all) {
	         file.select();
	         var reallocalpath = document.selection.createRange().text;
	         var ie6 = /msie 6/i.test(navigator.userAgent);
	         // IE6浏览器设置img的src为本地路径可以直接显示图片
	         if (ie6) img.attr('src',reallocalpath); 
	         else { 
	             // 非IE6版本的IE由于安全问题直接设置img的src无法显示本地图片，但是可以通过滤镜来实现
	             pic.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src=\"" + reallocalpath + "\")";
	             // 设置img的src为base64编码的透明图片 取消显示浏览器默认图片
	             pic.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
	         }
	     }else{//html5实现预览
	         var file = file.files[0]; 
		     var reader = new FileReader(); 
		     reader.readAsDataURL(file); 
		     reader.onload = function(e){
				img.attr("src",this.result);
		     } 
	     }
		return 1;//符合
	 },
	ajaxFileUpload: function(severurl,fileId,Fun){//图片、社团文件上传
		$.ajaxFileUpload ({
			url :severurl,//服务器端处理地址
			secureuri :false,
			fileElementId :fileId,//input file控件的name属性，一组input
			dataType : 'JSON',
			success : Fun,//成功上传后的回调函数
		})
		return false;
	},
/*	FileChange: function (id){//文件名预览
		var filepath=$(id).val();//文件路径
		if(CheckFile("office",filepath))//是文档
			if(GetFileSize($(id))<=maxFilesize)//小于50MB
				$('#file_edit_modal span:eq(1)').append("<br>"+filepath);
			else $('#file_edit_modal span:eq(0)').html(Warning("只能上传小于50MB的文件！"));//错误提示
		else $('#file_edit_modal span:eq(0)').html(Warning("只能上传doc、docx、xls、xlsx、ppt、pptx，zip、rar、war、7z等文件！"));//错误提示
	},*/
	GetFileSize: function (fileobj,MAXsize){//获得文件大小,fileobj为JQ对象
		if(fileobj[0].files[0].size<=MAXsize)
			return true;//在最大值范围内
		return false;//超过大小
	},
	CheckFile: function (type,filepath){//检测上传文件的后缀,type为检测类型，img为图片，office为文档,filepath为文件路径
		var ext=filepath.substring(filepath.lastIndexOf(".")+1).toLowerCase();
		if(type=="img"){
			if(ext!='png'&&ext!='jpg'&&ext!='jpeg'&&ext!='gif')//不是图片
				return false;
			return true;//文件为图片息
		}
		else if(type=="office"){
			if(ext!='zip'&&ext!='rar'&&ext!='war'&&ext!='7z'&&ext!='doc'
			&&ext!='docx'&&ext!='xls'&&ext!='xlsx'&&ext!='ppt'&&ext!='pptx')
				return false;
			return true;
		}
	},
	DeleteTip: function  (position,deletetype,text){
		var title='<b class="text-danger">提示：</b>';
		var content='<p><b>'+text+'</b></p>'+
					'<div class="row"><div class="col-xs-6 col-lg-6 text-center">'+
					'<input type="button" value="取消" class="btn btn-md btn-success" onclick="Common.ClosePopover(this)">'+
					'</div><div class="col-xs-6 col-lg-6 text-center">'+
					'<input type="button" value="删除" class="btn btn-md btn-danger" onclick="Common.Delete(\''+deletetype+'\',this)"></div></div>';
		//生成弹出框，提示用户是否确认删除，使用了bootstrap的popover,this为当前点击的元素
		position.popover({delay:{ show: 0, hide: 100 },title: title, html:'true',content: content,trigger:'click',placement:'left'});
	},
	ClosePopover: function(dom){
	//	console.log($(dom).parents('div[class~="popover"]').prev());//找到a标签
		$(dom).parents('div[class~="popover"]').prev().popover('toggle');
	},
	//post删除相片和活动,choice为删除选项，order为删除项的序号
	Delete: function (deletetype,dom){
		console.log(deletetype);
		var delete_a=$(dom).parents('div[class~="popover"]').prev();
		var seid = delete_a.attr('data-seid');
		switch(deletetype){
			case 'deleteaction':
				Common.PostDelete(deletetype,delete_a.attr('data-id'),function(){
					ShetuanUser.GetAction(Common.GetPosition(seid),seid);
				});
			break;
			case 'deletephoto':
				Common.PostDelete(deletetype,delete_a.attr('data-id'),function(){
					ShetuanUser.GetPhoto(Common.GetPosition(seid),seid);
				});
			break;
			case 'deleteregister':
				Common.PostDelete(deletetype,delete_a.attr('data-id'),function(){
					ShetuanUser.GetRegister(Common.GetPosition(seid),seid);
				});
			break;
			case 'deletematerials':
				Common.PostDelete(deletetype,delete_a.attr('data-id'),function(){
					ShetuanUser.GetMaterials(Common.GetPosition(seid),seid,-1);
				});
			break;
			case 'deletefile':
			break;
			case 'deleteacount':
			break;
			default: console.log('删除失败，找不到目标');
		}
	},
	PostDelete: function(deletetype,deleteid,successfun){//deletecontent为删除的内容
		$.post(CONST.Server_URL,{
					deletetype: deletetype,
					deleteid: deleteid
					}, function (data,textStatus){
						if(data=="deletesuccess"){
							successfun();//删除成功后执行刷新
						}
						else
							alert("删除失败！错误代码："+data);
					},"json");
	},
	UploadCheck: function(upload){
		var name=[];
		for(var i=0; i<upload.length; i++){
			if(upload.eq(i).val()!=''){
				name[i]=upload.eq(i).attr('name');
				if(!Common.GetFileSize(upload.eq(i),CONST.maximgsize))//大小不在限制范围内
					name[i]='unchanged';//超过大小，不予上传
			}
			else
				name[i]='unchanged';
		}//end for
		return name;
	},
	Warning: function(text){//错误提醒
		var warningh='<div class="alert alert-warning alert-dismissable">'+
				'<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+
				'<strong>提示：</strong>'+text+'</div>';
		return warningh;
	},
	CreateEditor: function(textarea_arr){
		for(var i=0;i<textarea_arr.length;i++){
			editor_array[i] = KindEditor.create(textarea_arr[i], {
					resizeType : 1,
					allowPreviewEmoticons : false,
					allowImageUpload : false,
					pasteType : 2,
					items : [
						'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
						'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
						'insertunorderedlist', '|', 'emoticons', 'image','link']
				});
		}
	}
}
Common.CreateEditor(new Array($('#editor0'),$('#editor1'),$('#editor2')));