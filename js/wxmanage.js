//预加载
$(document).ready(function(){
	//----------左侧导航栏
	$('li >a ').click(function(e)
	{
		e.preventDefault();
		var lis=$('li');
		lis.removeClass('active');
	});

	$('.panel-title > a ').click(function(e)
	{
		e.preventDefault();
		var submenu=$(this).parent().parent().next();
		var panel=submenu.parent();
		var panels=$('#sidebar div.panel-body');
		var panels_parents=$('#sidebar div.panel');
		
		if(submenu.parent().hasClass('open'))
		{
			submenu.slideUp();
			panel.removeClass('open');
		}
		else
		{
			panels.slideUp();
			submenu.slideDown();
			panels_parents.removeClass('open');
			panel.addClass('open');
		}
	});
	//加载信息
	$.get("refresh.php",
				{info_nav:0},
				function(data,textStatus){
				var txthtml="<tbody>"+
											"<tr><td><b>社团logo</b></td><td><img class='small-logo' src='"+data[0][7]+"'></td>"+
													"<td><b>社团名</b></td><td>"+data[0][2]+"</td>"+
											"</tr>"+
											"<tr><td><b>社团编号</b></td><td>"+data[0][1]+"</td>"+
												"<td><b>社团简称</b></td><td>"+data[0][3]+"</td>"+
											"</tr>"+
										"</tbody>";
				var txthtml1="<img src="+data[0][7]+" class='img-responsive'/>"+
										"<p class='text-center p-name'><b>"+data[0][2]+"</b></p>";
				$('#shetuan_account').html(txthtml);//社团账户信息
				$('#shetuan-user').html(txthtml1);
				$('#welcome-user').html("<small class='quit'>欢迎您，"+data[0][2]+"！</samll>");
				var txthtml2="<table class='mytable'><tbody>"+
											"<tr><td class='td-width text-center'>社团简介</td><td id='brief_table'>"+data[0][4]+"</td></tr>"+
											"<tr><td class='td-width text-center'>社团介绍</td><td id='intro_table'>"+data[0][5]+"</td></tr>"+
											"<tr><td class='td-width text-center'>社团部门介绍</td><td id='part_table'>"+data[0][6]+"</td></tr>"+
											"</tbody></table>";
				$('#mytable').html(txthtml2);
					},"json");
	
	//点击左侧导航栏的响应事件
	$('#view-info').click(viewInfo);//社团资料
	$('#view-action').click(viewAction);//社团活动
	$('#view-photo').click(viewPhoto);//社团相册
	$('#view-shetuaninfo').click(ViewShetuanInfo);//查看所有社团的信息
});

//查看社团资料
function viewInfo(){
	$('#shetuan-body-title').html("<b>社团资料</b>");
	var modalchoice="<a data-toggle='modal' onclick=\"openModal('info_edit')\"><img src='images/edit.png'>编辑</a>&nbsp;&nbsp;&nbsp;&nbsp;"+
								  "<a data-toggle='modal' data-target='#info_preview_modal'><img src='images/phone.png'>预览</a>";
	$('#modal-choice').html(modalchoice);
	$.get("refresh.php",
				{info_nav:1},
				function(data,textStatus){
				var txthtml="<table class='mytable'><tbody>"+
										"<tr><td class='td-width text-center'>社团简介</td><td id='brief_table'>"+data[0][0]+"</td></tr>"+
										"<tr><td class='td-width text-center'>社团介绍</td><td id='intro_table'>"+data[0][1]+"</td></tr>"+
										"<tr><td class='td-width text-center'>社团部门介绍</td><td id='part_table'>"+data[0][2]+"</td></tr>"+
										"</tbody></table>";
					$('#mytable').html(txthtml);
				},"json");
}

//查看社团活动
function viewAction(){
	$('#account').css("display","");//显示社团账号信息
	var actiontitle=new Array("活动组织方","活动名称","活动时间",
										"活动地点","活动介绍","活动照片1",
										"照片1描述","活动照片2","照片2描述");
	$('#shetuan-body-title').html("<b>社团活动</b>");
	var modalchoice="<a data-toggle='modal' onclick=\"Add('action')\"><img src='images/add_action_small.png'>添加活动</a>&nbsp;&nbsp;&nbsp;&nbsp;"+
								"<a data-toggle='modal' data-target='#action_preview_modal'><img src='images/phone.png'>预览</a>";
	$('#modal-choice').html(modalchoice);
	$.get("refresh.php",
				{info_nav:2},
				function(data,textStatus){
				var n=data.length;
				var txthtml="";
					for(var i=0;i<n;i++){//输出所有活动的信息
						txthtml+="<table class='mytable'><tbody>"+
										//span用用于隐藏活动的id，便于传入服务器修改活动信息
										"<tr><th colspan='4' class='th-size'><div class='row'><div class='col-xs-6 col-lg-6 text-left'><span class='span-hidden'>"+data[i][0]+"</span>活动"+(i+1)+"："+data[i][3]+"</div>"+
										"<div class='col-xs-6 col-lg-6 text-right'><a data-toggle='modal' onclick=\"openPhotoActionModal('action_edit','"+i+"')\">"+
										"<img src='images/edit.png'>编辑</a>&nbsp;&nbsp;&nbsp;&nbsp;<a rel='popover' ><img src='images/cross.png'>删除</a></div></div></th></tr>";
						for(var j=2;j<11;j++){
							if(j==2 || j==4 || j==5 || j==6)//活动组织者、活动介绍等占用
								txthtml+="<tr><td  class='td-width text-center'>"+actiontitle[j-2]+
													"</td><td colspan='3'>"+data[i][j]+"</td></tr>";
							else if(j==7 || j==9){//图片和解说
								txthtml+="<tr><td  class='td-width text-center'>"+actiontitle[j-2]+"</td>"+
													"<td><img src='"+data[i][j]+"'class='img-box'/></td>"+
													"<td  class='td-width text-center'>"+actiontitle[j-1]+"</td>"+
													"<td  colspan='3'>"+data[i][j+1]+"</td></tr>";
								j++;
							}
							else//其他数据
							{
								txthtml+="<tr><td  class='td-width text-center'>"+actiontitle[j-2]+"</td>"+
											"<td>"+data[i][j]+"</td>"+
											"<td  class='td-width text-center'>"+actiontitle[j-1]+"</td>"+
											"<td  colspan='3'>"+data[i][j+1]+"</td></tr>";
								j++;
							}
							
						}
						txthtml+="</tbody></table>";
					}
					$('#mytable').html(txthtml);
					for(var i=0;i<n;i++)
						DeleteTip("deleteaction",i);//给删除操作添加删除提示，以免误删
				},"json");
}

//查看社团相册
function viewPhoto(){
	$('#shetuan-body-title').html("<b>社团相册</b>");
	var modalchoice="<a data-toggle='modal' onclick=\"Add('photo')\"><img src='images/add_photo_small.png'>添加相册</a>&nbsp;&nbsp;&nbsp;&nbsp;"+
								"<a data-toggle='modal' data-target='#photo_preview_modal'><img src='images/phone.png'>预览</a>";
	var editlinkh="<a data-toggle='modal' onclick=\"openPhotoActionModal('photo_edit','";
	var editlinkf="')\"><img src='images/edit.png'>编辑</a>&nbsp;&nbsp;&nbsp;&nbsp;";
	var deletelink="<a rel='popover' class='delete'><img src='images/cross.png'>删除</a>";
	$('#modal-choice').html(modalchoice);
	$.get("refresh.php",
				{info_nav:3},
				function(data,textStatus){
				var n=data.length;
				var txthtml="<table class='mytable photo-table'><tbody>"+
										"<tr><th class='photo-table-th0'>相片序号</th><th>相片预览</th><th>相片描述</th><th class='photo-table-th1'>操作</th></tr>";
				for(var i=0;i<n;i++)
					txthtml+="<tr><td>"+(i+1)+"</td>"+//data[i][0]为id，隐藏显示
									"<td><span class='span-hidden'>"+data[i][0]+"</span><img class='img-thumbnail img-box' src='"+data[i][1]+"'></td>"+
									"<td>"+data[i][2]+"</td><td>"+editlinkh+i+editlinkf+deletelink+"</td></tr>";
				txthtml+="</tbody></table>";
				$('#mytable').html(txthtml);
				for(var i=0;i<n;i++)
					DeleteTip("deletephoto",i);//给删除操作添加删除提示，以免误删
				},"json");
}

//编辑框功能，将原有信息加载到编辑界面上
function openModal(modalchoice){
	if(modalchoice=="info_edit")//社团资料编辑
	{
		$('#info_edit_modal').modal();//调用模态框
		//选取模态框里的第一个textarea
		$('#info_edit_modal textarea:eq(0)').html($('#mytable td:eq(1)').html());
		$('#info_edit_modal textarea:eq(1)').html($('#mytable td:eq(3)').html());
		$('#info_edit_modal textarea:eq(2)').html($('#mytable td:eq(5)').html());
	}
}

//打开社团活动和社团相册的模态编辑框
function openPhotoActionModal(modalchoice,order){
	if(modalchoice=="action_edit")//社团活动
	{
		$('#action_edit_modal').modal();//调用模态框
		$('#action_edit_modal span:eq(0)').text($('#mytable span:eq('+order+')').text());//活动编号
		$('#action_edit_modal input:eq(0)').val($('#mytable td:eq('+(1+18*order)+')').text());//活动组织者
		$('#action_edit_modal input:eq(1)').val($('#mytable td:eq('+(3+18*order)+')').text());//活动名称
		$('#action_edit_modal input:eq(2)').val($('#mytable td:eq('+(5+18*order)+')').text());//活动时间
		$('#action_edit_modal input:eq(3)').val($('#mytable td:eq('+(7+18*order)+')').text());//活动地点
		$('#action_edit_modal textarea:eq(0)').val($('#mytable td:eq('+(9+18*order)+')').text());//活动介绍
		$('#action_edit_modal img:eq(0)').attr("src",$('#mytable img:eq('+(4*order+2)+')').attr("src"));//活动图片1
		$('#action_edit_modal textarea:eq(1)').text($('#mytable td:eq('+(13+18*order)+')').text());//活动图片1解说
		$('#action_edit_modal img:eq(1)').attr("src",$('#mytable img:eq('+(4*order+3)+')').attr("src"));//活动图片2
		$('#action_edit_modal textarea:eq(2)').text($('#mytable td:eq('+(17+18*order)+')').text());//活动图片2解说
	}
	else 	if(modalchoice=="photo_edit")//社团相册
	{
		$('#photo_edit_modal').modal();//调用模态框
		$('#photo_edit_modal span:eq(0)').text($('#mytable span:eq('+order+')').text());//相片编号
		$('#photo_edit_modal img:eq(0)').attr("src",$('#mytable img:eq('+(3*order)+')').attr("src"));//照片
		$('#photo_edit_modal textarea:eq(0)').val($('#mytable td:eq('+(4*order+2)+')').text());//照片介绍
	}
}

//添加社团活动和社团相册
function Add(choice){
	if(choice=="photo"){//添加相片
		$('#photo_edit_modal').modal();//调用模态框
		//清空模态框的值
		$('#photo_edit_modal span:eq(0)').text("");
		$('#photo_edit_modal img:eq(0)').attr("src","#");
		$('#photo_edit_modal textarea:eq(0)').val("");
	}
	else if(choice=="action"){//添加活动
		$('#action_edit_modal').modal();//调用模态框
		$('#action_edit_modal span:eq(0)').text("");//活动编号
		$('#action_edit_modal input:eq(0)').val("");//活动组织者
		$('#action_edit_modal input:eq(1)').val("");//活动名称
		$('#action_edit_modal input:eq(2)').val("");//活动时间
		$('#action_edit_modal input:eq(3)').val("");//活动地点
		$('#action_edit_modal textarea:eq(0)').val("");//活动介绍
		$('#action_edit_modal img:eq(0)').attr("src","");//活动图片1
		$('#action_edit_modal textarea:eq(1)').text("");//活动图片1解说
		$('#action_edit_modal img:eq(1)').attr("src","");//活动图片2
		$('#action_edit_modal textarea:eq(2)').text("");//活动图片2解说
	}
}

//图片上传
function ajaxFileUpload(severurl,fileId,id,Fun){
	$(id).html("<b>正在奋力上传！请稍后！</b>");
	$.ajaxFileUpload ({
		url :severurl,//服务器端处理地址
		secureuri :false,
		fileElementId :fileId,//input file控件的name属性，一组input
		dataType : 'JSON',
		success : Fun,//成功上传后的回调函数
	})
	return false;
}

//更新社团活动信息
function UpdateActioImg(data, status){//更新社团活动信息
	var imgpath=eval('('+data+')');//将json字符串转化成js数组
	$('#action-span').html("<b>上传成功！</b>");
	var $input1=$('#action_edit_modal input:eq(4)');
	var $input2=$('#action_edit_modal input:eq(5)');
	if(imgpath.secondfile!="inexistence")//修改了图片的连接
		imgpath.secondfile="../wxmanage/"+imgpath.secondfile;
	if(imgpath.firstfile!="inexistence")
		imgpath.firstfile="../wxmanage/"+imgpath.firstfile;
	UpdateAction(imgpath.firstfile,imgpath.secondfile);
}

//更新社团相册
function UpdatePhotoImg(data, status){
	var imgpath=eval('('+data+')');//将json字符串转化成js数组
	$('#photo-span').html("<b>上传成功！</b>");
	var $input=$('#photo_edit_modal input:eq(0)');
	if(imgpath.inputfile!="inexistence")//修改了图片的连接
		imgpath.inputfile="../wxmanage/"+imgpath.inputfile;
	UpdatePhoto(imgpath.inputfile);
}

//post更新action，更改数据库，tip1和tip2判断是否修改了图片，值为inexistence时表示没有修改
function UpdateAction(tip1,tip2){
		$.post("refresh.php",{
			action_id: $('#action_edit_modal span:eq(0)').text(),//活动的id，活动唯一识别信息
			organizers_edit: $('#action_edit_modal input:eq(0)').val(),//活动组织方
			eventname_edit: $('#action_edit_modal input:eq(1)').val(),//活动名
			eventtime_edit: $('#action_edit_modal input:eq(2)').val(),//活动时间
			eventplace_edit: $('#action_edit_modal input:eq(3)').val(),//活动地点
			eventinfo_edit: $('#action_edit_modal textarea:eq(0)').val(),//活动介绍
			img1_edit: tip1,
			img1_info_edit: $('#action_edit_modal textarea:eq(1)').val(),//活动图片1解说
			img2_edit: tip2,
			img2_info_edit: $('#action_edit_modal textarea:eq(2)').val()//活动图片2解说
			}, function (data,textStatus){
			//	alert("这是服务器的返回数据"+data);
				if(data=="updatesuccess"){
					alert("修改成功！");
					$('#action_edit_modal').modal('hide');//修改成功后隐藏模态框
					viewAction();//重新加载社团资料
				}
				else if(data=="addsuccess"){
					alert("添加成功！");
					$('#action_edit_modal').modal('hide');//修改成功后隐藏模态框
					viewAction();//重新加载社团资料
				}
				else alert("修改失败！");
		},"json");
}

//post更新photo，tip为inexistence时表示没有更改相片
function UpdatePhoto(tip){
	$.post("refresh.php",{
		photo_id: $('#photo_edit_modal span:eq(0)').text(),//活动的id，活动唯一识别信息
		imginfo: $('#photo_edit_modal textarea:eq(0)').val(),//图片描述
		imgurl: tip,//图片地址，如果没有修改图片，则tip=inexistence
		}, function (data,textStatus){
		//	alert("这是服务器的返回数据"+data);
			if(data=="updatesuccess"){
				alert("修改成功！");
				$('#photo_edit_modal').modal('hide');//修改成功后隐藏模态框
				viewPhoto();//重新加载社团资料
			}
			else if(data=="addsuccess"){
				alert("添加成功！");
				$('#photo_edit_modal').modal('hide');//修改成功后隐藏模态框
				viewPhoto();//重新加载社团资料
			}
			else alert("修改失败！");
		},"json");
}

//删除社团相册的提示，choice为删除选项，order为删除项的序号
function  DeleteTip(choice,order){
	var content="<p><b>真的要删除吗？删除后<br>无法修复哦！</b></p>"+
				"<div class='row'><div class='col-xs-6 col-lg-6 text-center'>"+
				"<input type='button' value='取消'class='btn btn-md btn-success' onclick=\"ClosePopover('#mytable a:eq("+(1+2*order)+")')\">"+
				"</div><div class='col-xs-6 col-lg-6 text-center'>"+
				"<input type='button' value='删除'class='btn btn-md btn-danger' onclick=\"Delete('"+choice+"','"+order+"')\"></div></div>";
	var title="<b class='text-danger'>提示：</b>";
	//生成弹出框，提示用户是否确认删除，使用了bootstrap的popover
	$('#mytable a:eq('+(1+2*order)+')').popover({delay:{ show: 0, hide: 100 },title: title, html:'true',content: content,trigger:'click',placement:'left'});
}

//取消删除的函数，隐藏
function ClosePopover(dom){$(dom).popover('toggle');}

//post删除相片和活动,choice为删除选项，order为删除项的序号
function Delete(choice,order){
	if(choice=="deletephoto"){
		$.post("refresh.php",{
			choice:choice,
			photo_id: $('#mytable span:eq('+order+')').text(),//相片的id，唯一识别信息
			photo_url: $('#mytable img:eq('+(3*order)+')').attr("src")//相片的连接
			}, function (data,textStatus){
			//	alert("这是服务器的返回数据"+data);
				if(data=="deletesuccess"){
				//	alert("删除成功！");
					$('#photo_edit_modal').modal('hide');//修改成功后隐藏模态框
					viewPhoto();//重新加载社团资料
				}
				else if(data=="deletefail")alert("删除失败！");
			},"json");
	}
	else if(choice=="deleteaction"){
		$.post("refresh.php",{
			choice:choice,
			action_id: $('#mytable span:eq('+order+')').text(),//相片的id，唯一识别信息
			img1url: $('#mytable img:eq('+(4*order+2)+')').attr("src"),//相片的连接
			img2url: $('#mytable img:eq('+(4*order+3)+')').attr("src")//相片的连接
			}, function (data,textStatus){
			//	alert("这是服务器的返回数据"+data);
				if(data=="deletesuccess"){
				//	alert("删除成功！");
					$('#action_edit_modal').modal('hide');//修改成功后隐藏模态框
					viewAction();//重新加载社团资料
				}
				else if(data=="deletefail")alert("删除失败！");
			},"json");
	}
}

//实现编辑功能的函数，将数据传入后台，更新数据库数据
$(function(){
	$('#send-changeinfo').click(function(){
		$.post("refresh.php",{
			brief_edit: $('#info_edit_modal textarea:eq(0)').val(),//社团简介
			intro_edit: $('#info_edit_modal textarea:eq(1)').val(),//社团介绍
			part_edit: $('#info_edit_modal textarea:eq(2)').val()//部门介绍
			}, function (data,textStatus){
				if(data=="success"){
					alert("修改成功！");
					$('#info_edit_modal').modal('hide');//修改成功后隐藏模态框
					viewInfo();//重新加载社团资料
				}
				else alert("修改失败！");
			},"json");
		});
	$('#send-changeaction').click(function(){//更新社团活动
		var $input1=$('#action_edit_modal input:eq(4)');
		var $input2=$('#action_edit_modal input:eq(5)');
		inputfile1=$input1.attr("name");//获得file的name值，id值
		inputfile2=$input2.attr("name");//获得file的name值，id值
		var severurl=null;
		id='#action-span';//显示提示信息
		if($input1.val()!="" && $input2.val()!=""){//同时修改两个图片
			fileId=[$input1.attr("id"),$input2.attr("id")];
			severurl="upload.php?inputfile1="+inputfile1+"\&inputfile2="+inputfile2;
			ajaxFileUpload(severurl,fileId,id,UpdateActioImg);//上传完成后，更新数据库信息
		}
		else if($input1.val()!="" && $input2.val()=="")//只修改第一张图片
		{
			fileId=[$input1.attr("id")];
			severurl="upload.php?inputfile1="+inputfile1;
			ajaxFileUpload(severurl,fileId,id,UpdateActioImg);//上传完成后，更新数据库信息
		}
		else if($input1.val()=="" && $input2.val()!="")//只修改第二张图片
		{
			fileId=[$input2.attr("id")];
			severurl="upload.php?inputfile2="+inputfile2;
			ajaxFileUpload(severurl,fileId,id,UpdateActioImg);//上传完成后，更新数据库信息
		}
		else
			UpdateAction("inexistence","inexistence");//图片的更改连接不存在，只修改了文字部分
	});
	$('#send-changephoto').click(function(){
		var $input=$('#photo_edit_modal input:eq(0)');
		inputfile=$input.attr("name");//获得file的name值，id值
		var severurl=null;//服务器处理地址
		var id='#photo-span';//信息输出元素的id
		if($input.val()!=""){//有修改了图片
			fileId=[$input.attr("id")];//file的id
			severurl="upload.php?inputfile="+inputfile;
			ajaxFileUpload(severurl,fileId,id,UpdatePhotoImg);//上传完成后，更新数据库信息
		}
		else//没有修改图片
			UpdatePhoto("inexistence");
	});
})

//密码修改
$(function(){
	var warningh="<div class='alert alert-warning alert-dismissable'>"+
				"<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>"+
				"<strong>提示：</strong>";
	var warningf="</div>";
	var loginagin="<script type='text/javascript'>window.location.href='wxlogin.html';"+
							"alert('密码修改成功！请重新登陆！');</script>"; 
	$('#send-newpassword').click(function(){
		if($('#password_edit_modal input:eq(1)').val().length>=6)//密码长度必须大于6
			if($('#password_edit_modal input:eq(1)').val()==$('#password_edit_modal input:eq(2)').val())//两次密码输入是否一样
				$.post("refresh.php",{
					oldpassword:$('#password_edit_modal input:eq(0)').val(),
					newpassword:$('#password_edit_modal input:eq(1)').val(),
					surepassword:$('#password_edit_modal input:eq(2)').val()
					}, function (data,textStatus){
						if(data=="success")
							$('#change-tip').html(loginagin);
						else if(data=="passworderror")
							$('#change-tip').html(warningh+"原密码输入错误！"+warningf);
						else if(data=="fail")
							$('#change-tip').html(warningh+"修改失败！可能是网络问题！"+warningf);
					},"json");
			else $('#change-tip').html(warningh+"两次密码输入不一致！"+warningf);
		else $('#change-tip').html(warningh+"密码长度必须大于6！"+warningf);
		//	$('#change-tip').html($('#password_edit_modal input:eq(0)').val());
	});
})

//id为选择文件的按钮，choice为图片预览位置的选择，预览
function change(id,choiceid) {
     var file = document.getElementById(id);
     var ext=file.value.substring(file.value.lastIndexOf(".")+1).toLowerCase();
     // gif在IE浏览器暂时无法显示
     if(ext!='png'&&ext!='jpg'&&ext!='jpeg'){
         alert("文件必须为图片！"); return;
     }
     // IE浏览器
     if (document.all) {
         file.select();
         var reallocalpath = document.selection.createRange().text;
         var ie6 = /msie 6/i.test(navigator.userAgent);
         // IE6浏览器设置img的src为本地路径可以直接显示图片
         if (ie6) $(choiceid).attr("src",reallocalpath); 
         else { 
             // 非IE6版本的IE由于安全问题直接设置img的src无法显示本地图片，但是可以通过滤镜来实现
             pic.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src=\"" + reallocalpath + "\")";
             // 设置img的src为base64编码的透明图片 取消显示浏览器默认图片
             pic.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
         }
     }else{
         html5Reader(file,choiceid);
     }
 }
 
//html5实现图片上传预览
function html5Reader(file,choiceid){ 
     var file = file.files[0]; 
     var reader = new FileReader(); 
     reader.readAsDataURL(file); 
     reader.onload = function(e){
		$(choiceid).attr("src",this.result);
     } 
 }

//--------------社联登陆，高级管理权限-------------------
function ViewShetuanInfo(){
	$('#account').css("display","none");
	$('#shetuan-body-title').html("<b>社团信息</b>");
	var search="<div class='input-group input-group-sm'>"+
					"<input type='text' class='form-control'>"+
					"<span class='input-group-btn'>"+
					"<button class='btn btn-primary' type='button'>搜索</button>"+
					"</span></div>";
	$('#modal-choice').html(search);
	var txthtml="<div class='row namerow'><b>社团名：塔内PC协会</b></div>"+
				"<ul class='nav nav-tabs nav-justified nav-shetuan'>"+
				  "<li class='active'><a href='#home' data-toggle='tab'>社团账号信息</a></li>"+
				  "<li><a href='#profile' data-toggle='tab'>社团资料</a></li>"+
				  "<li><a href='#messages' data-toggle='tab'>社团活动</a></li>"+
				  "<li><a href='#settings' data-toggle='tab'>社团相册</a></li>"+
				  "<li><a href='#settings' data-toggle='tab'>社团信箱</a></li>"+
				  "<li><a href='#settings' data-toggle='tab'>社团互动</a></li>"+
				"</ul>";
				
	$('#mytable').prepend(txthtml);
}







