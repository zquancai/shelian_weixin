//预加载
$(document).ready(function(){
	//----------左侧导航栏
	$('li >a ').click(function(e){
		e.preventDefault();
		var lis=$('li');
		lis.removeClass('active');
	});

	$('.panel-title > a ').click(function(e){
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
	if($('.power').length<=0)
		$('body').html("");
	//加载信息
	GetUser();//左侧社团基本信息
	GetAcount('#shetuan_account','');//社团账户信息
	GetInfo('#mytable','');//社团资料
	//点击左侧导航栏的响应事件
	$('#view-info').click(ViewInfo);//社团资料
	$('#view-action').click(ViewAction);//社团活动
	$('#view-photo').click(ViewPhoto);//社团相册
	$('#view-materials').click(ViewMaterials);//社团物资
	$('#view-mail').click(ViewMail);//社团信箱
	$('#view-market').click(ViewMarket);//社团市场
	$('#view-download').click(ViewDownload);//文件下载
	$('#view-membermail').click(ViewMembermail);//会员邮箱
	$('#view-upload').click(ViewUpload);//文件上传和删除
	$('#view-shetuaninfo').click(ViewShetuanInfo);//查看所有社团的信息
	$('#view-business').click(ViewBusiness);//查看社团事务流程
});

var maximgsize=250*1024;//图片上传的最大大小，250KB
var maxAcountsize=100*1024;//社团logo大小，小于50KB
var maxFilesize=50*1024*1024;//上传文件大小，小于50MB

//社团左侧资料
function GetUser(){
	$.get("refresh.php",
		{info_nav:0},
		function(data,textStatus){
			var txthtml1="<img src="+data[0][0]+" class='img-responsive'/>"+
									"<p class='text-center p-name'><b>"+data[0][1]+"</b></p>";
			$('#shetuan-user').html(txthtml1);
			$('#welcome-user').html("<small class='quit'>欢迎您，"+data[0][1]+"！</samll>");
		},"json");
}

//查看社团资料
function ViewInfo(){
	$('#account').css("display","");//显示社团账号信息
	$('#shetuan-body-title').html("<b>社团资料</b>");
	var modalchoice="<a data-toggle='modal' onclick=\"openModal('#mytable','info_edit','')\"><img src='images/edit.png'>编辑</a>&nbsp;&nbsp;&nbsp;&nbsp;"+
								  "<a data-toggle='modal' data-target='#info_preview_modal'><img src='images/phone.png'>预览</a>";
	$('#modal-choice').html(modalchoice);
	GetInfo("#mytable","");//将社团资料写入到id为mytable的元素中
}

//查看社团活动
function ViewAction(){
	$('#account').css("display","");//显示社团账号信息
	$('#shetuan-body-title').html("<b>社团活动</b>");
	var modalchoice=AddHandleHtml("action","添加活动")+"&nbsp;&nbsp;&nbsp;&nbsp;"+PreViewHandleHtml('#action_preview_modal');
	$('#modal-choice').html(modalchoice);
	GetAction("#mytable");//将活动内容写到id为mytable的元素里
}

//查看社团相册
function ViewPhoto(){
	$('#account').css("display","");//显示社团账号信息
	$('#shetuan-body-title').html("<b>社团相册</b>");
	var modalchoice=AddHandleHtml("photo","添加相册","")+"&nbsp;&nbsp;&nbsp;&nbsp;"+PreViewHandleHtml('#photo_preview_modal');
	$('#modal-choice').html(modalchoice);
	GetPhoto("#mytable");//写入社团相册信息到id为table的元素中
}

//查看社团物资
function ViewMaterials(){
	$('#account').css("display","");//显示社团账号信息
	$('#shetuan-body-title').html("<b>社团物资</b>");
	var modalchoice=AddHandleHtml("materials","添加物资","");//添加按钮
	$('#modal-choice').html(modalchoice);
	GetMaterials("#mytable");//写入社团物资信息到id为table的元素中
}
//查看社团事务流程
function ViewBusiness(){
	CreateBusinessTitleMenu('business');
	GetType('#business','0','1');
}

//查看社团信箱
function ViewMail(){
	$('#account').css("display","");//显示社团账号信息
	$('#shetuan-body-title').html("<b>社团信箱</b><div class='switch' data-on-label='开' data-off-label='关'><input type='checkbox' checked /></div>");
	$('#modal-choice').html("<a href='refresh.php?exportfile=yes'>导出报名表</a>");
	GetRegister('#mytable','');
}

//社团市场
function ViewMarket(){
	$('#account').css("display","");//显示社团账号信息
	DisplayMarketTitle();
	GetMaterials('#mytable',-1,1);
}
function DisplayMarketTitle(){//展示社团市场的标题
	$('#shetuan-body-title').html("<b>社团物资市场</b>");
	var search="<div class='row'><div class='col-xs-3 col-lg-3'></div><div class='col-xs-9 col-lg-9'><div class='input-group input-group-sm'>"+
					"<input type='text' class='form-control' id='market-search' placeholder='输入关键字搜索物资'>"+
					"<span class='input-group-btn'>"+
					"<button class='btn btn-primary' type='button' onclick=\"OnMarketSearch($('#market-search').val())\">搜索物资</button>";
	$('#modal-choice').html(search);
}
//物资搜索
function OnMarketSearch(keyword){
		$.post("refresh.php",{
			opsearch:"marketsearch",//告诉后台现在是在执行搜索功能
			keyword: keyword//索索的关键词
		},function(data,textStatus){//返回所有符合条件的社团的编号
			var mdata=eval('('+data+')');
			var n=mdata.length;
			var editlinkh="<a data-toggle='modal' onclick=\"openModal('#mytable','market_view','";
			var editlinkf="')\"><img src='images/all.png' class='img-16'>查看详细</a>";
			$('#mytable').html(MaterialsHTML(mdata,n,editlinkh,editlinkf,''));
	});
}
//文件下载
function ViewDownload(){
	$('#shetuan-body-title').html("<b>文件资料上传</b>");
	$('#modal-choice').html("");
	GetFile('#mytable','');
}

//文件上传
function ViewUpload(){
//$('#mytable').html(Warning("文件上传功能还在努力建设中！"));
	$('#account').css("display","none");//隐藏社团账号信息
	$('#shetuan-body-title').html("<b>文件资料下载</b>");
	var txthtml="<a hrref='#' onclick=\"Add('file','')\"><img src='images/upload.png'>上传文件</a>";
	$('#modal-choice').html(txthtml);
	GetFile('#mytable','0');
}

//会员意见收集邮箱
function ViewMembermail(){
//	$('#mytable').html(Warning("这个功能还在努力建设中！"));
	$('#account').css("display","none");//隐藏社团账号信息
	$('#shetuan-body-title').html("<b>会员意见收集邮箱</b>");
	$('#modal-choice').html("");
	GetMail('#mytable');
}

//获取（社团账号信息）,id为显示的位置，status为权限
function GetAcount(id,seid){
	var type=new Array("文娱体育类","理论学习类",
										"兴趣爱好类","学术科技类","社会实践类","院系社联类");
	$.get("refresh.php",
		{info_nav:0,seid:seid},
		function(data,textStatus){
			var txthtml="";
			if(seid!="")
				txthtml=EditAcountHtml(id,seid,'acount_edit');//返回操作选项的html代码
			txthtml+="<table class='mytable'><tbody>"+
								"<tr><td><b>社团logo</b></td><td><img class='small-logo' src='"+data[0][0]+"'></td>"+
									"<td><b>社团名</b></td><td>"+data[0][1]+"</td></tr>"+
								"<tr><td><b>社团简称</b></td><td>"+data[0][2]+"</td>"+
									"<td><b>社团类型</b></td><td>"+type[data[0][3]]+"</td></tr>"+
							"</tbody></table>";
			$(id).html(txthtml);//社团账户信息
		},"json");
}

//获得（社团基本资料），并将数据组装成一个table，id为写入基本资料的元素
function GetInfo(id,seid){
	$.get("refresh.php",
				{info_nav:1,seid:seid},
				function(data,textStatus){
					var txthtml="";
					if(seid!="")
						txthtml=EditAcountHtml(id,seid,'info_edit');//返回操作选项的html代码
					txthtml+="<table class='mytable'><tbody>"+
										"<tr><td class='td-width text-center'>社团简介</td><td id='brief_table'>"+data[0][0]+"</td></tr>"+
										"<tr><td class='td-width text-center'>社团介绍</td><td id='intro_table'>"+data[0][1]+"</td></tr>"+
										"<tr><td class='td-width text-center'>社团部门介绍</td><td id='part_table'>"+data[0][2]+"</td></tr>"+
										"</tbody></table>";
					$(id).html(txthtml);
				},"json");
}

//获取（社团活动）的信息并放在table里，id为写入的table的元素
function GetAction(id,seid){
	var actiontitle=new Array("活动组织方","活动名称","活动时间",
									"活动地点","活动介绍","活动照片1",
									"照片1描述","活动照片2","照片2描述");
	$.get("refresh.php",
				{info_nav:2,seid:seid},
				function(data,textStatus){
					var n=data.length;
					var txthtml="";
					if(n==0){
						txthtml=Warning("还未添加社团活动，赶快添加吧！");
						$(id).html(txthtml);
					}
					else{
						for(var i=0;i<n;i++){//输出所有活动的信息
							txthtml+="<table class='mytable'><tbody>"+
											//span用用于隐藏活动的id，便于传入服务器修改活动信息
											"<tr><th colspan='4' class='th-size'><div class='row'><div class='col-xs-6 col-lg-6 text-left'><span class='span-hidden'>"+data[i][0]+"</span>活动"+(i+1)+"："+data[i][3]+"</div>"+
											"<div class='col-xs-6 col-lg-6 text-right'><a data-toggle='modal' onclick=\"openModal('"+id+"','action_edit','"+i+"')\">"+
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
						$(id).html(txthtml);
						var text="真的要删除吗？删除后无法修复，请谨慎操作！";
						for(var i=0;i<n;i++)
							DeleteTip(id,0,2,"deleteaction",i,text);//给删除操作添加删除提示，以免误删
					}
				},"json");
}

//获取（社团相册）的信息并放在table里，id为写入的table的元素
function GetPhoto(id,seid){
	var editlinkh="<a data-toggle='modal' onclick=\"openModal('"+id+"','photo_edit','";
	var editlinkf="')\"><img src='images/edit.png'>编辑</a>&nbsp;&nbsp;&nbsp;&nbsp;";
	var deletelink="<a rel='popover' class='delete'><img src='images/cross.png'>删除</a>";
	$.get("refresh.php",
				{info_nav:3,seid:seid},
				function(data,textStatus){
				var n=data.length;
				var txthtml="";
				if(n==0){
					txthtml=Warning("还未添加社团相册，赶快添加吧！");
					$(id).html(txthtml);
				}
				else{
					var txthtml="<table class='mytable photo-table'><tbody>"+
											"<tr><th class='photo-table-th0'>相片序号</th><th>相片预览</th><th>相片描述</th><th class='photo-table-th1'>操作</th></tr>";
					for(var i=0;i<n;i++)
						txthtml+="<tr><td>"+(i+1)+"</td>"+//data[i][0]为id，隐藏显示
										"<td><span class='span-hidden'>"+data[i][0]+"</span><img class='img-thumbnail img-box' src='"+data[i][1]+"'></td>"+
										"<td>"+data[i][2]+"</td><td>"+editlinkh+i+editlinkf+deletelink+"</td></tr>";
					txthtml+="</tbody></table>";
					$(id).html(txthtml);
					var text="真的要删除吗？删除后无法修复，请谨慎操作！";
					for(var i=0;i<n;i++)
						DeleteTip(id,0,2,"deletephoto",i,text);//给删除操作添加删除提示，以免误删
				}
				},"json");
}

//获得（社团物资）信息并放在table里，id为写入的table的元素
function GetMaterials(id,seid,page){
	var deletelink="",market="yes";
	var editlinkh="<a data-toggle='modal' onclick=\"openModal('"+id+"','market_view','";
	var editlinkf="')\"><img src='images/all.png' class='img-16'>查看详细</a>";
	if(seid!=-1){
		deletelink="<a rel='popover' class='delete'><img src='images/cross.png' class='img-16'>删除</a>";
		market="";//不是社团市场功能
		editlinkh="<a data-toggle='modal' onclick=\"openModal('"+id+"','materials_edit','";
		editlinkf="')\"><img src='images/edit.png' class='img-16'>编辑/查看详细</a>";
	}
	$.get("refresh.php",
				{info_nav:6,seid:seid,market:market,page_order:page},
				function(data,textStatus){
					var n=data.length;
					var txthtml="";
					if(n==0){
						txthtml=Warning("还未添加社团物资，赶快添加吧！");
						$(id).html(txthtml);
					}
					else{
						$(id).html(MaterialsHTML(data,n,editlinkh,editlinkf,deletelink));//表格排版
						if(seid!=-1){//等于-1时为社团市场
							var text="真的要删除吗？删除后无法修复，请谨慎操作！";
							for(var i=0;i<n;i++)
								DeleteTip(id,0,2,"deletematerials",i,text);//给删除操作添加删除提示，以免误删
						}
						if(market=="yes")
							$(id).append(PagingHTML(data[0][0],page));//社团市场产生页数
					}
				},"json");
}

//显示分页的html片段，page_order为要显示的页面，npages为总页数
function PagingHTML(npages,page_order){
	var pagehtml="<div class='row child-item' id='market-page'><div class='col-lg-12 text-right'><ul class='pagination'>";
	if(page_order==1)//第一页
		pagehtml+="<li class='disabled'><a>&laquo;</a></li>";
	else
		pagehtml+="<li><a href='#' onclick=\"GetMaterials('#mytable','-1','"+(parseInt(page_order)-1)+"')\">&laquo;</a></li>";
	for(var i=1;i<=npages;i++)//置显示的页码为选中
		pagehtml+="<li "+(i==page_order?"class='active'":"")+"><a href='#'  onclick=\"GetMaterials('#mytable','-1','"+i+"')\">"+i+"<span class='sr-only'>(current)</span></a></li>";		
	if(page_order==npages)//最后一页
		pagehtml+="<li class='disabled'><a>&raquo;</a></li></ul></div></div>";
	else
	pagehtml+="<li><a href='#' onclick=\"GetMaterials('#mytable','-1','"+(parseInt(page_order)+1)+"')\">&raquo;</a></li></ul></div></div>";
	return pagehtml;//返回html片段
}

function MaterialsHTML(data,n,editlinkh,editlinkf,deletelink){
	txthtml="<table class='mytable photo-table'><tbody>"+
					"<tr><th class='photo-table-th0'>物资序号</th><th>物资名</th><th>图片预览</th><th>物资数量</th>"+
					"<th>物资单价</th><th>联系人</th><th class='td-type'>操作</th></tr>";
	for(var i=0;i<n;i++)//id,mname,murl,amount,mprice,contact
		txthtml+="<tr><td><span class='span-hidden'>"+data[i][0]+"</span>"+(i+1)+"</td>"+//data[i][0]为id，隐藏显示
						"<td class='span-hidden' type='name'>"+data[i][1]+"</td>"+//社团名
						"<td>"+data[i][2]+"</td>"+//物资id，物资名
						"<td class='span-hidden'>"+data[i][3]+"</td>"+//物资描述
						"<td type='no'><img class='img-thumbnail img-box' src='"+data[i][4]+"'></td>"+//图片链接
						"<td>"+data[i][5]+"</td>"+//数量
						"<td>"+data[i][6]+"</td>"+//单价
						"<td>"+data[i][7]+"</td>"+//联系人
						"<td class='span-hidden'>"+data[i][8]+"</td>"+//联系电话
						"<td class='span-hidden'>"+data[i][9]+"</td>"+//备注
						"<td type='no'>"+editlinkh+i+editlinkf+deletelink+"</td></tr>";
	txthtml+="</tbody></table>";//no属性方便选择器选择
	return txthtml;
}

/*//获取物资市场的所有物资，id为显示位置
function GetMaterials(id){
	var editlinkh="<a data-toggle='modal' onclick=\"openModal('"+id+"','materials_edit','";
	var editlinkf="')\"><img src='images/edit.png' class='img-16'>编辑/查看详细</a>";
	$.get("refresh.php",
				{info_nav:6,market:'yes'},
				function(data,textStatus){
				var n=data.length;
				var txthtml="";
				if(n==0){
					txthtml=Warning("市场还未有物品，赶快在社团物资里添加吧！");
					$(id).html(txthtml);
				}
				else{
					var txthtml="<table class='mytable photo-table'><tbody>"+
											"<tr><th class='photo-table-th0'>物资序号</th><th>物资名</th><th>图片预览</th><th>物资数量</th>"+
											"<th>物资单价</th><th>联系人</th><th>联系电话</th><th class='td-type'>操作</th></tr>";
					for(var i=0;i<n;i++)//id,mname,murl,amount,mprice,contact
						txthtml+="<tr><td><span class='span-hidden'>"+data[i][0]+"</span>"+(i+1)+"</td>"+//data[i][0]为id，隐藏显示
										"<td>"+data[i][2]+"</td>"+//物资id，物资名
										"<td class='span-hidden'>"+data[i][3]+"</td>"+//物资描述
										"<td title='no'><img class='img-thumbnail img-box' src='"+data[i][4]+"'></td>"+//图片链接
										"<td>"+data[i][5]+"</td>"+//数量
										"<td>"+data[i][6]+"</td>"+//单价
										"<td>"+data[i][7]+"</td>"+//联系人
										"<td class='span-hidden'>"+data[i][8]+"</td>"+//联系电话
										"<td class='span-hidden'>"+data[i][9]+"</td>"+//备注
										"<td title='no'>"+editlinkh+i+editlinkf+deletelink+"</td></tr>";
					txthtml+="</tbody></table>";//no属性方便选择器选择
					$(id).html(txthtml);
					var text="真的要删除吗？删除后无法修复，请谨慎操作！";
					for(var i=0;i<n;i++)
						DeleteTip(id,0,2,"deletematerials",i,text);//给删除操作添加删除提示，以免误删
				}
				},"json");
}
*/
//获取社团事务流程
function GetBusiness(id,seid){
}

//获得事务流程,type为要查看的事务类型，1为社团活动，
//2为物资申请与借用，3为文案审批流程，4各类申请说明
function GetType(id,status,part){
	var editlinkh="<a data-toggle='modal' onclick=\"openModal('"+id+"','business_edit','";
	var editlinkf="')\"><img src='images/edit.png'>编辑</a>&nbsp;&nbsp;&nbsp;&nbsp;";
	var deletelink="<a rel='popover' class='delete'><img src='images/cross.png'>删除</a>";
	$.get("refresh.php",
		{info_nav:4,part:part},
		function(data,textStatus){
			var n=data.length;
			var txthtml="";
			//if()
		//	txthtml+="<div class='row text-right'><div class='col-xs-8 col-lg-8'></div>"+
		//			"<div class='col-xs-4 col-lg-4 text-center'><a data-toggle='modal' onclick=\"Add('business','')\"><img src='images/edit.png'>添加子流程</a></div></div>";
			txthtml+="<table class='mytable'><tbody>"+//标题,span存放一级分类的类型号
									"<tr><th class='photo-table-th0'><span class='span-hidden'>"+data[0][1]+"</span></th><th class='td-type'>"+data[0][5]+"</th><th>"+data[0][6]+"</th><th class='photo-table-th1'>操作</th></tr>";
			for(var i=1;i<n;i++)
				txthtml+="<tr><td class='td-width text-center'>"+data[i][4]+"</td>"+//子类型
									"<td class='text-center'>"+data[i][5]+"</td>"+
									"<td>"+data[i][6]+"</td><td><span class='span-hidden'>"+data[i][0]+"</span>"+editlinkh+(i-1)+editlinkf+deletelink+"</td></tr>";
			txthtml+="</tbody></table>";
			$(id).html(txthtml);
			var text="真的要删除这个社团事务流程吗？删除后无法修复，请谨慎操作！";
			for(var i=0;i<n;i++)
		//	DeleteTip(id,deletepos,choice,order,text){
				DeleteTip(id,0,2,"deletebusiness",i,text);//给删除操作添加删除提示，以免误删
		},"json");
}

//获得当前的会员意见收集邮箱,id为显示的位置元素的id，带#的id
function GetMail(id){
	$.post("refresh.php",//获取原来的会员意见收集邮箱
				{op:"getmail",collectmail:''},
				function(data,textStatus){
					var txthtml="<div class='panel-body'><div class='form-group'>"+
											"<label class='col-xs-4 col-lg-4 control-label text-right'>当前会员意见收集邮箱账号：</label>"+
											"<div class='col-xs-6 col-lg-6'>"+
											"<p class='form-control-static text-left'>"+data+"</p>"+
											"</div>"+
											"<div class='col-xs-2 col-lg-2'>"+
											"<a data-toggle='modal' onclick=\"openModal('#mytable','mail_edit','')\"><img src='images/edit.png'>编辑</a>"+
											"</div>"+
										"</div></div>";
					$(id).html(txthtml);
				},"json");
}

function GetFileType(file){//判断文件类型，并返回文件类型的图片名
	var type=getFileExt(file);//后缀
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
}

//获得当前可下载的文件列表
function GetFile(id,status){
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
							txthtml+="<tr><td class='text-center'><img src='images/file/"+GetFileType(data[i][0])+"'></td><td class='filename-td'>"+data[i][0]+"</td>"+
											"<td class='text-center'>"+data[i][1]+"</td>"+//文件大小
											"<td class='text-center'>"+data[i][2]+"</td>"+//文件上传时间
											"<td class='text-center'>"+oplink+"</td></tr>";
						}
						txthtml+="</tbody></table>";
						$(id).html(txthtml);
						if(status=='0'){//高级权限具有删除文件的权利
							var text="真的要删除吗？删除后无法修复，请谨慎操作！";
							for(var i=0;i<n;i++)
								DeleteTip(id,0,1,"deletefile",i,text);//给删除操作添加删除提示，以免误删
						}
					}
					else
						$(id).html(Warning("点击右上角的加号就可以添加文件啦！"));
				},"json");
}

function GetRegister(id,seid){
	$.get("refresh.php",
				{info_nav:5,seid:seid},
				function(data,textStatus){
					var n=data.length;
					if(n!=0){
						var txthtml="",offset=0;
						if(seid!=""){
							txthtml+=EditAcountHtml(id,seid,'exportfile');//返回导出操作选项的html代码
							offset=1;
						}
						txthtml+="<table class='mytable'><tbody>"+
											"<tr><th class='td-width text-center'>姓名</th><th>性别</th><th>申请类别</th><th>第一志愿</th>"+
												"<th>联系方式</th><th class='td-width text-center'>操作</th></tr>";
						for(var i=0;i<n;i++)
							txthtml+="<tr><td class='text-center'><span class='span-hidden'>"+data[i][0]+"</span>"+data[i][1]+"</td>"+
													"<td class='text-center'>"+data[i][2]+"</td>"+//性别
													"<td class='text-center tip-color'>"+data[i][3]+"</td>"+//申请类别
													"<td class='text-center tip-color'>"+data[i][4]+"</td>"+//第一志愿
													"<td class='text-center'>"+data[i][5]+"</td>"+//联系方式
													"<td class='td-type text-center'><b>"+
														"<a  data-toggle='modal' onclick=\"openModal('"+id+"','register_view','"+data[i][0]+"')\"><img class='img-16' src='images/all.png'>查看详细</a>&nbsp;&nbsp;&nbsp;&nbsp;"+
														"<a rel='popover' ><img  class='img-16' src='images/cross.png'>删除</a>"+
													"</b></td></tr>";
						txthtml+="</tbody></table>";
						$(id).html(txthtml);
						var text="真的要删除吗？删除后无法修复，请谨慎操作！";
						for(var i=0;i<n;i++)
							DeleteTip(id,offset,2,"deleteregister",i,text);//给删除操作添加删除提示，以免误删
					}
					else
						$(id).html(Warning("呜呜，还没有人报名~~"));
				},"json");
}

//建立社团事务的菜单栏
function CreateBusinessTitleMenu(id){
	$('#account').css("display","none");//隐藏社团账号信息
	$('#shetuan-body-title').html("<b>社团事务流程管理</b>");
	$('#modal-choice').html("");//添加社团事务流程
	var txthtml="<ul class='nav nav-tabs nav-justified nav-shetuan'>"+
				  "<li class='active'><a href='#home' data-toggle='tab' onclick=\"GetType('#"+id+"','0','1')\">社团活动类型</a></li>"+
				  "<li><a href='#' data-toggle='tab' onclick=\"GetType('#"+id+"','0','2')\">物资申请与借用</a></li>"+
				  "<li><a href='#' data-toggle='tab'onclick=\"GetType('#"+id+"','0','0')\">文案审批流程</a></li>"+
				  "<li><a href='#' data-toggle='tab' onclick=\"GetType('#"+id+"','0','4')\">各类申请说明</a></li>"+
				"</ul><div id='"+id+"'></div>";
				//id为highttable的div是存放社团的资料，社联管理权限才有
	$('#mytable').html(txthtml);
}

//预览选项，id为预览的模态框id,返回html代码
function PreViewHandleHtml(id){
	var viewhtml="<a data-toggle='modal' data-target='"+id+"'><img src='images/phone.png'>预览</a>";
	return viewhtml; 
}

//fun为onclick的执行函数，text为操作说明,返回html代码，id为操作向所在的元素
function AddHandleHtml(choice,text,id){
	var addhtml="<a data-toggle='modal' onclick=\"Add('"+choice+"','"+id+"')\"><img src='images/add_"+choice+"_small.png'>"+text+"</a>";
	return addhtml;
}

//打开社团活动和社团相册的模态编辑框，id为table的父元素，用来寻找table里的元素
function openModal(id,modalchoice,order){
	var seid=id.replace(/[^\d]/g,'');//获取id中的数字，代表社团编号
	if(modalchoice=="action_edit"){//社团活动
		$('#action_edit_modal').modal();//调用模态框
		$('#action_edit_modal span:eq(0)').text($(id+' span:eq('+order+')').text());//活动编号
		if(seid!="")
			$('#action_edit_modal span:eq(1)').text(seid);//社团编号
		else
			$('#action_edit_modal span:eq(1)').text("");//社团编号
		$('#action_edit_modal input:eq(0)').val($(id+' td:eq('+(1+18*order)+')').text());//活动组织者
		$('#action_edit_modal input:eq(1)').val($(id+' td:eq('+(3+18*order)+')').text());//活动名称
		$('#action_edit_modal input:eq(2)').val($(id+' td:eq('+(5+18*order)+')').text());//活动时间
		$('#action_edit_modal input:eq(3)').val($(id+' td:eq('+(7+18*order)+')').text());//活动地点
		$('#action_edit_modal textarea:eq(0)').val($(id+' td:eq('+(9+18*order)+')').text());//活动介绍
		$('#action_edit_modal img:eq(0)').attr("src",$(id+' img:eq('+(4*order+2)+')').attr("src"));//活动图片1
		$('#action_edit_modal textarea:eq(1)').val($(id+' td:eq('+(13+18*order)+')').text());//活动图片1解说
		$('#action_edit_modal img:eq(1)').attr("src",$(id+' img:eq('+(4*order+3)+')').attr("src"));//活动图片2
		$('#action_edit_modal textarea:eq(2)').val($(id+' td:eq('+(17+18*order)+')').text());//活动图片2解说
	}
	else	if(modalchoice=="photo_edit"){//社团相册
		$('#photo_edit_modal').modal();//调用模态框
		$('#photo_edit_modal span:eq(0)').text($(id+' span:eq('+order+')').text());//相片编号
		if(seid!="")
			$('#photo_edit_modal span:eq(1)').text(seid);//社团编号
		else
			$('#photo_edit_modal span:eq(1)').text("");//社团编号
		$('#photo_edit_modal img:eq(0)').attr("src",$(id+' img:eq('+(3*order)+')').attr("src"));//照片
		$('#photo_edit_modal textarea:eq(0)').val($(id+' td:eq('+(4*order+2)+')').text());//照片介绍
	}
	else if(modalchoice=="info_edit"){//社团资料编辑
		$('#info_edit_modal').modal();//调用模态框
		if(seid!="")
			$('#info_edit_modal span:eq(0)').text(seid);//社团编号
		else
			$('#info_edit_modal span:eq(0)').text("");
	//	alert(id+seid);
		//选取模态框里的第一个textarea
		$('#info_edit_modal textarea:eq(0)').val($(id+' td:eq(1)').html());
		$('#info_edit_modal textarea:eq(1)').val($(id+' td:eq(3)').html());
		$('#info_edit_modal textarea:eq(2)').val($(id+' td:eq(5)').html());
	}
	else if(modalchoice=="acount_edit"){
//	alert("kghalksghkjsahgshgkjfhghhhhhhhhhhhhhhhhhh");
		$('#acount_edit_modal').modal();//调用模态框
		if(seid!="")
			$('#acount_edit_modal span:eq(0)').text(seid);//社团编号
		else
			$('#acount_edit_modal span:eq(0)').text("");
		$('#adduser').html("");//清空
		$('#acount_edit_modal img:eq(0)').attr("src",$(id+' img:eq(2)').attr("src"));//logo
		$('#acount_edit_modal input:eq(1)').val($(id+' td:eq(3)').text());//社团名称
		$('#acount_edit_modal input:eq(2)').val($(id+' td:eq(5)').text());//社团简称
		var type=GetType($(id+' td:eq(7)').text());
		 $('#acount_edit_modal select').val(type);//设置社团类型
	}
	else if(modalchoice=="user_edit"){//更改社团登陆账号和密码
		$('#user_edit_modal').modal();//调用模态框
		if(seid!="")
			$('#user_edit_modal span:eq(0)').text(seid);//社团编号
		else
			$('#user_edit_modal span:eq(0)').text("");
		for(var i=0;i<4;i++)//管理员密码、账号，新密码，确认密码，清空编辑框的内容
			$('#user_edit_modal input:eq('+i+')').val("");
	}
	else if(modalchoice=="business_edit"){//编辑社团事务流程
		$('#business_edit_modal').modal();//调用模态框
	//	alert(order+1);
		$('#business_edit_modal span:eq(0)').text($(id+' span:eq('+(1*order+1)+')').text());//社团事务id
		$('#business_edit_modal span:eq(1)').text($(id+' span:eq(0)').text());//社团事务一级流程
		$('#business_edit_modal label:eq(1)').text($(id+' th:eq(1)').text());//社团事务描述
		$('#business_edit_modal label:eq(2)').text($(id+' th:eq(2)').text());//社团事务备注信息
		$('#business_edit_modal input:eq(0)').val($(id+' td:eq('+4*order+')').text());//事务流程子流程
		$('#business_edit_modal textarea:eq(0)').val($(id+' td:eq('+(4*order+1)+')').html());//事务描述
		$('#business_edit_modal textarea:eq(1)').val($(id+' td:eq('+(4*order+2)+')').html());//事务备注信息
	}
	else if(modalchoice=="mail_edit"){//编辑邮箱
		$('#mail_edit_modal').modal();//调用模态框
		$('#mail_edit_modal input:eq(0)').val($(id+' p:eq(0)').text());//会员意见邮箱
	}
	else if(modalchoice=="register_view"){//查看报名信息的详细内容
		$('#register_modal').modal();//调用模态框
		$.get("refresh.php",
				{info_nav:5,id:order},//order为数据库中的id值
				function(data,textStatus){
					var $alltd=$("#register_modal td:odd");
					var n=$alltd.length;
					for(var i=0;i<n;i++)
						$alltd.eq(i).text(data[i+2]);//将详细信息填写到对话框中
				},"json");
	}
	else if(modalchoice=="materials_edit"){//查看物资详细，编辑物资
		$('#materials_edit_modal').modal();//调用模态框
		$('#materials_edit_modal span:eq(0)').text($(id+' span:eq('+order+')').text());//相片编号
		if(seid!="")
			$('#materials_edit_modal span:eq(1)').text(seid);//社团编号
		else
			$('#materials_edit_modal span:eq(1)').text("");//社团编号
		$('#materials_edit_modal img:eq(0)').attr("src",$(id+' img:eq('+(3*order)+')').attr("src"));//照片
		var $input=$('#materials_edit_modal :input[type!="file"]&&[type!="button"]');//模态框表单
		var n=$input.length;
		var $td=$(id+' td[type!=no][type!=name]:gt('+8*order+')');//选取物资信息
		for(var i=0;i<n;i++)
			$input.eq(i).val($td.eq(i).text());
	}
	else if(modalchoice=="market_view"){
		$('#market_view_modal').modal();
		var $td=$(id+' td[type!=no]:gt('+9*order+')');//选取物资信息，所属社团
		var $view=$('#market_view_modal tr :nth-child(2)');
		$('#market_view_modal img:eq(0)').attr("src",$(id+' img:eq('+(2*order)+')').attr("src"));//照片
		var n=$view.length;
		$view.eq(0).text($td.eq(1).text());
		$view.eq(1).text($td.eq(0).text());
		for(var i=2;i<6;i++)
			$view.eq(i).text($td.eq(i+1).text());
		$view.eq(6).text($td.eq(2).text());
		$view.eq(7).text($td.eq(7).text());
	}
}


//添加社团活动和社团相册，社团账户,id为添加按钮所在的元素
function Add(choice,id){
	var seid=id.replace(/[^\d]/g,'');//获取id中的数字，代表社团编号
	if(choice=="photo"){//添加相片
		$('#photo_edit_modal').modal();//调用模态框
		//清空模态框的值
		$('#photo_edit_modal span:eq(0)').text("");
		if(seid!="")
			$('#photo_edit_modal span:eq(1)').text(seid);
		else
			$('#photo_edit_modal span:eq(1)').text("");
		$('#photo_edit_modal img:eq(0)').attr("src","");
		$('#photo_edit_modal textarea:eq(0)').val("");
	}
	else if(choice=="action"){//添加活动
		$('#action_edit_modal').modal();//调用模态框
		$('#action_edit_modal span:eq(0)').text("");//活动编号
		if(seid!="")
			$('#action_edit_modal span:eq(1)').text(seid);//社团编号
		else
			$('#action_edit_modal span:eq(1)').text("");//社团编号
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
	else if(choice=="acount"){//修改社团的账号信息
		$('#acount_edit_modal').modal();//调用模态框
		$('#acount_edit_modal span:eq(0)').text("");
		$('#acount_edit_modal img:eq(0)').attr("src","");//logo
		$('#acount_edit_modal input:eq(1)').val("");//社团名称
		$('#acount_edit_modal input:eq(2)').val("");//社团简称
//		$('#acount_edit_modal input:eq(3)').val("");//社团登录名
		$('#acount_edit_modal select').val(0);//社团类型
	}
	else if(choice=="business"){
		alert("添加子流程");
	}
	else if(choice=="file"){
		$('#file_edit_modal').modal();//调用模态框
		$('#file_edit_modal span:eq(0)').text("");
		$('#file_edit_modal span:eq(1)').html("点击加号添加文件<br>文件列表：");//清空上传信息
		$('#file_edit_modal div.imgfile:gt(0)').remove();//删除多余节点
		$('#file_edit_modal div.imgfile:eq(0)').removeClass("display-none");//显示第一个选项
	}
	else if(choice=="materials"){//添加物资
		$('#materials_edit_modal').modal();//调用模态框
		$('#materials_edit_modal span:even').text("");
		if(seid!="")
			$('#materials_edit_modal span:eq(1)').text(seid);
		else
			$('#materials_edit_modal span:eq(1)').text("");
		$('#materials_edit_modal img:eq(0)').attr("src","");
		var $input=$('#materials_edit_modal :input[type!="file"]&&[type!="button"]');
	//	alert($input.length);
		var n=$input.length;
		for(var i=0;i<n;i++)
			$input.eq(i).val("");//清空所有信息
	}
}

//图片、社团文件上传
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
//	alert($('#photo_edit_modal input:eq(0)').val());
	if(imgpath.inputfile!="inexistence")//修改了图片的连接
		imgpath.inputfile="../wxmanage/"+imgpath.inputfile;
	UpdatePhoto(imgpath.inputfile);//将数据保存到数据库
}

//更新社团物资
function UpdateMaterialsImg(data, status){
	var imgpath=eval('('+data+')');//将json字符串转化成js数组
	$('#materials-span').html("<b>上传成功！</b>");
	var $input=$('#materials_edit_modal input:eq(0)');
//	alert($('#photo_edit_modal input:eq(0)').val());
	if(imgpath.materialsfile!="inexistence")//修改了图片的连接
		imgpath.materialsfile="../wxmanage/"+imgpath.materialsfile;
	UpdateMaterials(imgpath.materialsfile);//将数据保存到数据库
}

//更新社团的logo
function UpdateAcountImg(data,status){
	var imgpath=eval('('+data+')');//将json字符串转化成js数组
	$('#acount-span').html("<b>上传成功！</b>");
	var $input=$('#acount_edit_modal input:eq(0)');
	if(imgpath.inputlogo!="inexistence")//修改了图片的连接
		imgpath.inputlogo="../wxmanage/"+imgpath.inputlogo;
	UpdateAcount(imgpath.inputlogo);//将数据保存到数据库
}

//post更新action，更改数据库，tip1和tip2判断是否修改了图片，值为inexistence时表示没有修改
function UpdateAction(tip1,tip2){
	var id='#mytable';
	var seid="";
	if($('#action_edit_modal span:eq(1)').text()!=""){//高级管理员则存在id为highttable的div
		id='#highttable'+$('#action_edit_modal span:eq(1)').text();
		seid=$('#action_edit_modal span:eq(1)').text();
	}
	$.post("refresh.php",{
		action_id: $('#action_edit_modal span:eq(0)').text(),//活动的id，活动唯一识别信息
		seid:seid,//存在社团编号时，说明是高级管理员在操作
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
				GetAction(id,seid);//重新加载社团资料
			}
			else if(data=="addsuccess"){
				alert("添加成功！");
				$('#action_edit_modal').modal('hide');//修改成功后隐藏模态框
				GetAction(id,seid);//重新加载社团资料
			}
			else alert("修改失败！建议在其他闲时段修改。");
	},"json");
}

//post更新photo，tip为inexistence时表示没有更改相片,值代表图像路径
function UpdatePhoto(tip){
	var id='#mytable';
	var seid="";
	if($('#photo_edit_modal span:eq(1)').text()!=""){//高级管理员则存在id为highttable的div
		id='#highttable'+$('#photo_edit_modal span:eq(1)').text();
		seid=$('#photo_edit_modal span:eq(1)').text();
	}
	$.post("refresh.php",{
		seid:seid,//存在社团编号时，说明是高级管理员在操作
		photo_id: $('#photo_edit_modal span:eq(0)').text(),//活动的id，活动唯一识别信息
		imginfo: $('#photo_edit_modal textarea:eq(0)').val(),//图片描述
		imgurl: tip,//图片地址，如果没有修改图片，则tip=inexistence
		}, function (data,textStatus){
		//	alert("这是服务器的返回数据"+data);
			if(data=="updatesuccess"){
				alert("修改成功！");
				$('#photo_edit_modal').modal('hide');//修改成功后隐藏模态框
					GetPhoto(id,seid);
			}
			else if(data=="addsuccess"){
				alert("添加成功！");
				$('#photo_edit_modal').modal('hide');//修改成功后隐藏模态框
				GetPhoto(id,seid);//重新加载社团资料
			}
			else alert("修改失败！");
		},"json");
}

//更新社团物资的信息
function UpdateMaterials(tip){
	var id='#mytable';
	var seid="";
	if($('#materials_edit_modal span:eq(1)').text()!=""){//高级管理员则存在id为highttable的div
		id='#highttable'+$('#materials_edit_modal span:eq(1)').text();
		seid=$('#materials_edit_modal span:eq(1)').text();
	}
	var $input=$('#materials_edit_modal :input[type!="file"]&&[type!="button"]');
	var minfo=new Array();
	var n=$input.length;
	for(var i=0;i<n;i++)
		minfo[i]=$input.eq(i).val();//获取表单的信息
	$.post("refresh.php",{
		seid:seid,//存在社团编号时，说明是高级管理员在操作
		materials_id: $('#materials_edit_modal span:eq(0)').text(),//物资的id，物资唯一识别信息
		materials_info: minfo,//物资信息
		materials_url: tip//图片地址，如果没有修改图片，则tip=inexistence
		}, function (data,textStatus){
		//	alert("这是服务器的返回数据"+data);
			if(data=="updatesuccess"){
				alert("修改成功！");
				$('#materials_edit_modal').modal('hide');//修改成功后隐藏模态框
					GetMaterials(id,seid);
			}
			else if(data=="addsuccess"){
				alert("添加成功！");
				$('#materials_edit_modal').modal('hide');//修改成功后隐藏模态框
				GetMaterials(id,seid);//重新加载社团资料
			}
			else alert("修改失败！"+data);
		},"json");
}
//post更新社团账号信息，添加社团账号
function UpdateAcount(tip){
	var id='';
	var seid="";
	var username="",password="";
	if($('#acount_edit_modal span:eq(0)').text()!=""){//高级管理员则存在id为highttable的div
		id='#highttable'+$('#acount_edit_modal span:eq(0)').text();
		seid=$('#acount_edit_modal span:eq(0)').text();
	}
	if($('#acount_edit_modal input:eq(3)').length>0)
		username=$('#acount_edit_modal input:eq(3)').val();
	if($('#acount_edit_modal input:eq(4)').length>0)
		password=$('#acount_edit_modal input:eq(4)').val();
	$.post("refresh.php",{
		seid:seid,//将社团编号传进服务端，便于高级管理员修改指定社团的资料
		name_edit: $('#acount_edit_modal input:eq(1)').val(),//社团名称
		short_edit: $('#acount_edit_modal input:eq(2)').val(),//社团简称
		type_edit:$('#acount_edit_modal select').val(),//社团类型
		username_edit:username,//社团登录名
		password_edit:password,//社团登录密码
		logo_url:tip//logo的地址，默认为不存在
		}, function (data,textStatus){
			if(data=="updatesuccess"){
				alert("修改成功！");
				$('#acount_edit_modal').modal('hide');//修改成功后隐藏模态框
			//	alert(id+"    "+seid);
				GetAcount(id,seid);//重新加载社团资料
			}
			else if(data=="addsuccess"){//添加社团账号
				alert("添加成功！");
				$('#acount_edit_modal').modal('hide');//修改成功后隐藏模态框
			//	GetAcount(id,seid);//重新加载社团资料
				OnSearch($('#acount_edit_modal input:eq(1)').val());//执行一次搜索，显示新添加的社团信息
			}
			else if (data=="updatefail")
				alert("修改失败！");
			else if (data=="addfail")
				alert("添加失败！");
		},"json");
}

//更新社团会员意见收集邮箱
function UpdateMail(){
	$.post("refresh.php",//获取原来的会员意见收集邮箱
				{op:"changemail",collectmail:''},
				function(data,textStatus){
					GetMail('#mytable');
				},"json");
}

//上传文件
function UploadFile(data,status){
	var tip=eval('('+data+')');//将json字符串转化成js数组
	if(tip=="uploadsuccess"){
		alert("上传成功！");
		$('#file_edit_modal').modal('hide');//修改成功后隐藏模态框
		GetFile('#mytable','0');
	}
	else alert("上传失败"+data);
}

//下载报名表
function UploadRegister(id){
	$.post("refresh.php",{
		exportfile:"yes"
		},function(data){
		//	window.location
		},"json");
}

//删除社团相册、活动、事务流程、社团的提示，id为table所在的元素id，
//deletepos为删除操作连接的位置（相对于order来说）,offset为a的偏移量，相对于id来说
//choice为删除选项，order为删除项的序号
function  DeleteTip(id,offset,deletepos,choice,order,text){
	var set=(offset+deletepos-1+deletepos*order);
	var content="<p><b>"+text+"</b></p>"+
				"<div class='row'><div class='col-xs-6 col-lg-6 text-center'>"+
				"<input type='button' value='取消'class='btn btn-md btn-success' onclick=\"ClosePopover('"+id+" a:eq("+set+")')\">"+
				"</div><div class='col-xs-6 col-lg-6 text-center'>"+
				"<input type='button' value='删除'class='btn btn-md btn-danger' onclick=\"Delete('"+id+"','"+choice+"','"+order+"')\"></div></div>";
	var title="<b class='text-danger'>提示：</b>";
	//生成弹出框，提示用户是否确认删除，使用了bootstrap的popover
	$(id+' a:eq('+set+')').popover({delay:{ show: 0, hide: 100 },title: title, html:'true',content: content,trigger:'click',placement:'left'});
}

//取消删除的函数，隐藏
function ClosePopover(dom){$(dom).popover('toggle');}

//post删除相片和活动,choice为删除选项，order为删除项的序号
function Delete(id,choice,order){
	var seid=id.replace(/[^\d]/g,'');//获取id的数字部分，即为社团编号
	if(choice=="deletephoto"){
		$.post("refresh.php",{
			choice:choice,
			photo_id: $(id+' span:eq('+order+')').text(),//相片的id，唯一识别信息
			photo_url: $(id+' img:eq('+(3*order)+')').attr("src")//相片的连接
			}, function (data,textStatus){
			//	alert("这是服务器的返回数据"+data);
				if(data=="deletesuccess"){
				//	alert("删除成功！");
					$('#photo_edit_modal').modal('hide');//修改成功后隐藏模态框
					GetPhoto(id,seid);//重新加载社团资料
				}
				else if(data=="deletefail")alert("删除失败！");
			},"json");
	}
	else if(choice=="deleteaction"){
		$.post("refresh.php",{
			choice:choice,
			action_id: $(id+' span:eq('+order+')').text(),//相片的id，唯一识别信息
			img1url: $(id+' img:eq('+(4*order+2)+')').attr("src"),//相片的连接
			img2url: $(id+' img:eq('+(4*order+3)+')').attr("src")//相片的连接
			}, function (data,textStatus){
			//	alert("这是服务器的返回数据"+data);
				if(data=="deletesuccess"){
					GetAction(id,seid);//重新加载社团资料
				}
				else if(data=="deletefail")alert("删除失败！");
			},"json");
	}
	else if(choice=="deleteacount"){//删除社团账号
		$.post("refresh.php",{
			choice:choice,
			seid: seid,//社团唯一编号seid
			}, function (data,textStatus){
				if(data=="deletesuccess"){
				//	alert("删除成功！");
					var keyword=$('#keyword').val();//搜索的关键词，判断用户是否是搜索出来的结果
					if(keyword=="")//不是搜索出来的结果
						InitAll();
					else
						OnSearch(keyword);//搜索出的结果，用户删除成功后再次搜索，返回用户之气那的搜索结果
				}
				else if(data=="deletefail")alert("删除失败！");
			},"json");
	}
	else if(choice=="deletebusiness"){
		alert("删除事务流程操作");
	}
	else if(choice=="deletefile"){
	//	alert("删除文件"+order);
		$.post("refresh.php",{
			filepath: "shetuan_file/"+$(id+' td:eq('+(5*order+1)+')').text(),//文件路径
			choice:"deletefile"//操作选项，删除文件
			},function(data,textStatus){
				if(data=="deletesuccess")
					GetFile('#mytable','0');
				else alert("删除失败！"+data);
			},"json");
	}
	else if(choice=="deleteregister"){//删除报名表
		$.post("refresh.php",{
			id: $(id+' span:eq('+order+')').text(),//报名表编号
			choice:"deleteregister"//操作选项，删除报名表
			},function(data,textStatus){
				if(data=="deletesuccess")
					GetRegister(id,seid);//加载报名表
				else alert("删除失败！"+data);
			},"json");
	}
	else if(choice=="deletematerials"){//删除
		$.post("refresh.php",{
			id: $(id+' span:eq('+order+')').text(),//报名表编号
			choice:"deletematerials"//操作选项，删除报名表
			},function(data,textStatus){
				if(data=="deletesuccess")
					GetMaterials(id,seid);//加载报名表
				else alert("删除失败！"+data);
			},"json");
	}
}

//获得文件大小,fileobj为JQ对象
function GetFileSize(fileobj){
	return fileobj[0].files[0].size;//文件大小
}

//点击按钮，实现编辑功能的函数，将数据传入后台，更新数据库数据
$(function(){
	$('#send-changeinfo').click(function(){//更新社团资料
		var id='#mytable';
		var seid="";
		if($('#info_edit_modal span:eq(0)').text()!=""){//高级管理员则存在id为highttable的div
			id='#highttable'+$('#info_edit_modal span:eq(0)').text();
			seid=$('#info_edit_modal span:eq(0)').text();
		}
		$.post("refresh.php",{
			seid:seid,//将社团编号传进服务端，便于高级管理员修改指定社团的资料
			brief_edit: $('#info_edit_modal textarea:eq(0)').val(),//社团简介
			intro_edit: $('#info_edit_modal textarea:eq(1)').val(),//社团介绍
			part_edit: $('#info_edit_modal textarea:eq(2)').val()//部门介绍
			}, function (data,textStatus){
				if(data=="success"){
					alert("修改成功！");
					$('#info_edit_modal').modal('hide');//修改成功后隐藏模态框
				//	alert(id+"    "+seid);
					GetInfo(id,seid);//重新加载社团资料
				}
				else alert("修改失败！");
			},"json");
		});
	$('#send-changeaction').click(function(){//更新社团活动
		var $input1=$('#action_edit_modal input:eq(4)');
		var $input2=$('#action_edit_modal input:eq(5)');
		var $typetip=$('#action_edit_modal span:eq(2)');//类型提示
		inputfile1=$input1.attr("name");//获得file的name值，id值
		inputfile2=$input2.attr("name");//获得file的name值，id值
		var tip1="第一张图不是图片！图片格式：png、jpg、jpeg、gif";
		var tip2="第二张图不是图片！图片格式：png、jpg、jpeg、gif";
		var tipsize1="第一张图片大小超过了250KB，请上传小于250KB的图片。";
		var tipsize2="第二张图片大小超过了250KB，请上传小于250KB的图片。";
		var severurl=null;
		var tipid='#action-span';//显示提示信息
		var filepath1=$input1.val(),filepath2=$input2.val();
		if(filepath1!="" && filepath2!=""){//同时修改两个图片
			if(CheckFile('img',filepath1)){//是图片
				if(GetFileSize($input1)<=maximgsize){//图片小于250KB
					if(CheckFile('img',filepath2)){//是图片
						if(GetFileSize($input2)<=maximgsize){//图片小于250KB
							fileId=[$input1.attr("id"),$input2.attr("id")];
							alert(fileId);
							severurl="upload.php?inputfile1="+inputfile1+"\&inputfile2="+inputfile2;
							ajaxFileUpload(severurl,fileId,tipid,UpdateActioImg);//上传完成后，更新数据库信息
						}
						else $typetip.html(Warning(tipsize2)); //大小，提示信息
					}
					else $typetip.html(Warning(tip2)); //文件类型，提示信息
				}
				else $typetip.html(Warning(tipsize1)); //大小，提示信息
			}
			else
				$typetip.html(Warning(tip1)); //提示信息
		}
		else if(filepath1!="" && filepath2=="")//只修改第一张图片
		{
			if(CheckFile('img',filepath1)){//是图片
				if(GetFileSize($input1)<=maximgsize){//图片小于250KB
					fileId=[$input1.attr("id")];
					severurl="upload.php?inputfile1="+inputfile1;
					ajaxFileUpload(severurl,fileId,tipid,UpdateActioImg);//上传完成后，更新数据库信息
				}
				else $typetip.html(Warning(tipsize1)); //大小信息
			}
			else
				$typetip.html(Warning(tip1)); //提示信息
		}
		else if(filepath1=="" && filepath2!="")//只修改第二张图片
		{
			if(CheckFile('img',filepath2)){//是图片
				if(GetFileSize($input2)<=maximgsize){//图片小于250KB
					fileId=[$input2.attr("id")];
					severurl="upload.php?inputfile2="+inputfile2;
					ajaxFileUpload(severurl,fileId,tipid,UpdateActioImg);//上传完成后，更新数据库信息
				}
				else $typetip.html(Warning(tipsize2)); //大小信息
			}
			else
				$typetip.html(Warning(tip2)); //提示信息
		}
		else
			UpdateAction("inexistence","inexistence");//图片的更改连接不存在，只修改了文字部分
	});
	$('#send-changephoto').click(function(){//更新社团相册
		var $input=$('#photo_edit_modal input:eq(0)');
		var $tip=$('#photo_edit_modal span:eq(3)');//错误提示
		var filepath=$input.val();
		var inputfile=$input.attr("name");//获得file的name值，id值
		var severurl=null;//服务器处理地址
		var tipid='#photo-span';//信息输出元素的id，上传进度提示
			if($input.val()!=""){//有修改了图片
				if(CheckFile('img',filepath)){//是图片
					if(GetFileSize($input)<=maximgsize){//文件大小小于250kb
						var fileId=[$input.attr("id")];//file的id
						severurl="upload.php?inputfile="+inputfile;
						ajaxFileUpload(severurl,fileId,tipid,UpdatePhotoImg);//上传完成后，更新数据库信息
					}
					else $tip.html(Warning("图片大小不能大于250kb哦！")); 
				}
				else//不是图片时，给出提示
					$tip.html(Warning("文件必须为图片！图片格式：png、jpg、jpeg、gif")); //提示信息
			}
			else//没有修改图片
				UpdatePhoto("inexistence");
	});
	$('#send-changeacount').click(function(){//修改社团账号信息
		var $input=$('#acount_edit_modal input:eq(0)');
		var filepath=$input.val();
		var inputlogo=$input.attr("name");//获得file的name值，id值
		var severurl=null;//服务器处理地址
		var tipid='#acount-span';//信息输出元素的id
		var tip="文件必须为图片！图片格式：png、jpg、jpeg、gif";
		var tipsize="图片文件超过了100KB哦！请上传小于100KB的社团logo！";
		if(filepath!=""){//有修改了logo
			if(CheckFile('img',filepath)){//是图片
				if(GetFileSize($input)<=maxAcountsize){//小于100KB
					var fileId=[$input.attr("id")];//file的id
					severurl="upload.php?inputlogo="+inputlogo;
					ajaxFileUpload(severurl,fileId,tipid,UpdateAcountImg);//上传完成后，更新数据库信息
				}
				else $(tipid).html(Warning(tipsize)); //提示超过限制大小信息
			}
			else $(tipid).html(Warning(tip)); //提示信息
		}
		else//没有修改图片
			UpdateAcount("inexistence");
	});
	$('#send-changeuser').click(function(){//修改社团账号信息
		var id='#mytable';
		var seid="";
		if($('#user_edit_modal span:eq(0)').text()!=""){//高级管理员则存在id为highttable的div
			id='#highttable'+$('#user_edit_modal span:eq(0)').text();
			seid=$('#user_edit_modal span:eq(0)').text();
		}
		var managerpassword=$('#user_edit_modal input:eq(0)').val();//管理员密码
		var acount=$('#user_edit_modal input:eq(1)').val();
		var password=$('#user_edit_modal input:eq(2)').val();
		var surepassword=$('#user_edit_modal input:eq(3)').val();
//		alert(managerpassword+"账号："+acount+"密码："+password+"确认密码："+surepassword);
		if(acount.length>=6&&password.length>=6){
			if(password==surepassword){
				$.post("refresh.php",{
					seid:seid,//将社团编号传进服务端，便于高级管理员修改指定社团的资料
					managerpassword_edit: managerpassword,//管理员密码
					acount_edit: acount,//社团登录名
					password_edit: password,//登录密码
					surepassword_edit: surepassword//确认密码
					}, function (data,textStatus){
						if(data=="updatesuccess"){
							alert("更新成功！该社团原来的账号将无法登陆，请及时通知！");
							$('#user_edit_modal').modal('hide');//修改成功后隐藏模态框
						//	alert(id+"    "+seid);
							GetAcount(id,seid);//重新加载社团资料
						}
						else if(data=="mangerpassworderror")
							$('#userchange-tip').html(Warning("管理员密码输入错误！无权修改社团账号密码！"));
						else alert("更新失败！");
					},"json");
			}
			else $('#userchange-tip').html(Warning("两次密码输入不相符！"));
		}
		else $('#userchange-tip').html(Warning("用户名和密码的长度必须都大于6！"));
	});
	$('#send-changebusiness').click(function(){
		var type=$('#business_edit_modal span:eq(1)').text();
		$.post("refresh.php",{
			id_edit:$('#business_edit_modal span:eq(0)').text(),//将社团事务流程编号传进服务端，便于高级管理员修改指定社团的资料
			type_edit:type,//事务类型
			childname_edit: $('#business_edit_modal input:eq(0)').val(),//社团事务子流程
			firstrow_edit: $('#business_edit_modal textarea:eq(0)').val(),//社团事务流程描述
			secondrow_edit: $('#business_edit_modal textarea:eq(1)').val()//社团事务流程说明
			}, function (data,textStatus){
				if(data=="updatesuccess"){
					alert("更新成功！");
					$('#business_edit_modal').modal('hide');//修改成功后隐藏模态框
					GetType('#business','',type);//重新加载社团资料
				}
				else alert("修改失败！");
			},"json");
	});
	$('#send-changemail').click(function(){//更新邮箱
		var mail=/^[\w]+@[\w]+?\.[\w]{2,6}/;//正则表达式
		var collectmail=$('#mail_edit_modal input:eq(0)').val();
		if (mail.test(collectmail)){//邮箱格式不正确
			$.post("refresh.php",{
				op:'changemail',collectmail:collectmail//新的邮箱
				}, function (data,textStatus){
					if(data=="updatesuccess"){
						alert("更新成功！");
						$('#mail_edit_modal').modal('hide');//修改成功后隐藏模态框
						GetMail('#mytable');
					}
					else alert("修改失败！");
				},"json");
		}
		else
			$('#mail_edit_modal span').html(Warning("邮箱格式输入错误！请核对邮箱账号。"));
	});
	$('#send-uploadfile').click(function(){//上传文件
	//	alert($('#file_edit_modal input:eq(0)').val());//文件路径
		var $input=$('#file_edit_modal input');
		var n=$input.length-1;
		var $tip=$('#file_edit_modal span:eq(0)');//错误提示
		var severurl=null;//服务器处理地址
	//	alert(filepath+uploadfile);
		var tipid='#file-span';//信息输出元素的id，上传进度提示
		var fileId=[],uploadfile=[];
	//alert(n);
		for(var i=0;i<n;i++){
			if(CheckFile('office',$input.eq(i).val())){//文档
				if(GetFileSize($input.eq(i))<=maxFilesize){//文件大小于50MB
					uploadfile[i]=$input.eq(i).attr("name");//获得file的name值，id值
					fileId[i]=$input.eq(i).attr("id");//file的id
				}
				else//大于50MB，给出提示信息
					$tip.html(Warning("只能上传小于50MB的文件！"));//错误提示
			}
			else//不是图片时，给出提示
				$tip.html(Warning("只能上传doc、docx、xls、xlsx、ppt、pptx，zip、rar、war、7z等文件！")); //提示信息
		}
		severurl="upload.php?uploadfile="+uploadfile;
		ajaxFileUpload(severurl,fileId,tipid,UploadFile);//上传完成后，更新数据库信息
	//	alert(fileId);
	});
	$('#send-materials').click(function(){//更新物资
		var $input=$('#materials_edit_modal input:eq(0)');
		var $tip=$('#materials_edit_modal span:eq(3)');//错误提示
		var filepath=$input.val();
		var materialsfile=$input.attr("name");//获得file的name值，id值
		var severurl=null;//服务器处理地址
		var tipid='#materials-span';//信息输出元素的id，上传进度提示
		if($input.val()!=""){//有修改了图片
			if(CheckFile('img',filepath)){//是图片
				if(GetFileSize($input)<=maximgsize){//文件大小小于250kb
					var fileId=[$input.attr("id")];//file的id
					severurl="upload.php?materialsfile="+materialsfile;
					ajaxFileUpload(severurl,fileId,tipid,UpdateMaterialsImg);//上传完成后，更新数据库信息
				}
				else $tip.html(Warning("图片大小不能大于250kb哦！")); 
			}
			else//不是图片时，给出提示
				$tip.html(Warning("文件必须为图片！图片格式：png、jpg、jpeg、gif")); //提示信息
		}
		else//没有修改图片
			UpdateMaterials("inexistence");
	});
})

//添加文件
function AddFileHtml(){
//	alert("0000000000");
	$('#addfilearea div').addClass("display-none");
	var d=parseInt(Math.random()*10000+1); //随机数
	var txthtml="<div class='imgfile'>"+
						"<input type='file' id='file"+d+"' name='file"+d+"' value='上传文件' onchange=\"FileChange(this)\" onclick=\"AddFileHtml()\">"+
						"</div>";
	$('#addfilearea').append(txthtml);
}

//错误提醒
function Warning(text){
	var warningh="<div class='alert alert-warning alert-dismissable'>"+
			"<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>"+
			"<strong>提示：</strong>";
	var warningf="</div>";
	return warningh+text+warningf;
}

//密码修改
$(function(){
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
							$('#change-tip').html(Warning("原密码输入错误！"));
						else if(data=="fail")
							$('#change-tip').html(Warning("修改失败！可能是网络问题！"));
					},"json");
			else $('#change-tip').html(Warning("两次密码输入不一致！"));
		else $('#change-tip').html(Warning("密码长度必须大于6！"));
		//	$('#change-tip').html($('#password_edit_modal input:eq(0)').val());
	});
})

//文件名预览
function FileChange(id){
	var filepath=$(id).val();//文件路径
	if(CheckFile("office",filepath))//是文档
		if(GetFileSize($(id))<=maxFilesize)//小于50MB
			$('#file_edit_modal span:eq(1)').append("<br>"+filepath);
		else $('#file_edit_modal span:eq(0)').html(Warning("只能上传小于50MB的文件！"));//错误提示
	else $('#file_edit_modal span:eq(0)').html(Warning("只能上传doc、docx、xls、xlsx、ppt、pptx，zip、rar、war、7z等文件！"));//错误提示
}

//id为选择文件的按钮，choice为图片预览位置的选择，预览
function change(id,choiceid,tipid) {
     var file = document.getElementById(id);
     var ext=file.value.substring(file.value.lastIndexOf(".")+1).toLowerCase();
     // gif在IE浏览器暂时无法显示
     if(ext!='png'&&ext!='jpg'&&ext!='jpeg'&&ext!='gif'){
         $(tipid).html(Warning("文件必须为图片！图片格式：png、jpg、jpeg、gif")); //提示信息
		return;
     }
	$(tipid).html("");
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

//检测上传文件的后缀,type未检测类型，img为图片，office为文档,filepath为文件路径
function CheckFile(type,filepath){
	var ext=filepath.substring(filepath.lastIndexOf(".")+1).toLowerCase();
	if(type=="img"){
		if(ext!='png'&&ext!='jpg'&&ext!='jpeg'&&ext!='gif')//不是图片
			return false;
		return true;//文件为图片
	//         $('#photo_edit_modal span:eq(3)').html(Warning("文件必须为图片！图片格式：png、jpg、jpeg、gif")); //提示信息
	}
	else if(type=="office"){
		if(ext!='zip'&&ext!='rar'&&ext!='war'&&ext!='7z'&&ext!='doc'
		&&ext!='docx'&&ext!='xls'&&ext!='xlsx'&&ext!='ppt'&&ext!='pptx')
			return false;
		return true;
	}
}

//获得文件的扩展名
function getFileExt(file){
    return file.replace(/.+\./,"");//获取文件的后缀
}

//--------------社联登陆，高级管理权限-------------------
function ViewShetuanInfo(){
	DisplayTitle();
	InitAll();
}

//输出所有社团的信息
function DisplayAll(data){
	var shetuanacount=eval('('+data+')');
	var n=shetuanacount.length;//获得社团个数
//	alert("个数"+n+"数据"+data);
	if(n==0)//没有查找数据时，给出提示
		$('#mytable').html(Warning("不存在这样的社团！请重新搜索！"));
	else{
		var  txthtml="";
		for(var i=0;i<n;i++){
			txthtml+=CreatCMenuHtml('highttable'+shetuanacount[i].seid,shetuanacount[i].seid,shetuanacount[i].name);
			GetAcount('#highttable'+shetuanacount[i].seid,shetuanacount[i].seid);//初始化highttable，进入时查看社团账号信息
		}
		$('#mytable').html(txthtml);
		var deletetip="真的要删除该社团的账号吗？删除后，与该社团相关的一切活动和照片将一并删除，请谨慎操作！";
		var allhandle="";
		for(var i=0;i<n;i++){
			allhandle=AddHandleHtml("action","添加活动",'#allhandle'+shetuanacount[i].seid)+
								AddHandleHtml("photo","添加相册",'#allhandle'+shetuanacount[i].seid)+
								AddHandleHtml("materials","添加物资",'#allhandle'+shetuanacount[i].seid)+
								"<a rel='popover' class='delete'><img src='images/cross.png'>删除社团</a>";
			$('#allhandle'+shetuanacount[i].seid).html(allhandle);//显示操作选项
			DeleteTip('#allhandle'+shetuanacount[i].seid,0,4,"deleteacount",0,deletetip);//添加删除操作的提示项
		}
	}
}

//显示社团信息标题，以及搜索框
function DisplayTitle(){
	$('#account').css("display","none");//隐藏社团账号信息
	$('#shetuan-body-title').html("<b>社团信息</b>");
	var search="<div class='row'><div class='col-xs-9 col-lg-9'><div class='input-group input-group-sm'>"+
					"<input type='text' class='form-control' id='keyword' placeholder='输入关键字搜索社团信息'>"+
					"<span class='input-group-btn'>"+
					"<button class='btn btn-primary' type='button' onclick=\"OnSearch($('#keyword').val())\">搜索</button>"+
					"</span></div></div><div class='col-xs-3 col-lg-3 text-center'><button type='button' class='btn btn-success btn-sm' onclick=\"AddAcount()\">添加社团</button></div></div>";
	$('#modal-choice').html(search);
}

//添加社团时要的登陆账号信息
function AddAcount(){
	var txthtml="<div class='form-group'><label>后台登录名</label><input type='text' class='form-control'></div>"+
						"<div class='form-group'><label>后台登陆密码</label><input type='password' class='form-control'></div>";
	$('#adduser').html(txthtml);
	Add('acount','add');
}
$(document).ready(function(){
	$('body').bind('keyup',//监听回车事件
	function(event) {
		if(event.keyCode==13)
            OnSearch($('#keyword').val());
});
})
//搜索功能，从服务器返回符合条件的社团编号，name为搜索的关键词
function OnSearch(name){
	$.post("refresh.php",{
			opsearch:"search",//告诉后台现在是在执行搜索功能
			keyword: name//索索的关键词
		},function(data,textStatus){//返回所有符合条件的社团的编号
			//	var d=eval('('+data+')');
			DisplayAll(data);
		//	alert(data);
	});
//	alert($('#keyword').val());
}

//初始化显示排前的4个社团
function InitAll(){
	$.post("refresh.php",{
			initall:"initall",
		},function(data,textStatus){//返回所有符合条件的社团的编号
			DisplayAll(data);
	});
}

//生成高级管理员管理社团的子菜单
function CreatCMenuHtml(id,seid,name){//id为社团各种资料的显示位置，seid为社团编号
	var txthtml="<div class='row namerow'><div class='col-xs-6 col-lg-6 namecol'><b>社团名："+name+"</b></div><div class='col-xs-6 col-lg-6 text-right allhandle' id='allhandle"+seid+"'></div></div>"+
				"<ul class='nav nav-tabs nav-justified nav-shetuan'>"+
				  "<li class='active'><a href='#home' data-toggle='tab' onclick=\"GetAcount('#"+id+"','"+seid+"')\">社团账号信息</a></li>"+
				  "<li><a href='#' data-toggle='tab' onclick=\"GetInfo('#"+id+"','"+seid+"')\">社团资料</a></li>"+
				  "<li><a href='#' data-toggle='tab'onclick=\"GetAction('#"+id+"','"+seid+"')\">社团活动</a></li>"+
				  "<li><a href='#' data-toggle='tab' onclick=\"GetPhoto('#"+id+"','"+seid+"')\">社团相册</a></li>"+
				  "<li><a href='#' data-toggle='tab' onclick=\"GetRegister('#"+id+"','"+seid+"')\">社团信箱</a></li>"+
				  "<li><a href='#' data-toggle='tab' onclick=\"GetMaterials('#"+id+"','"+seid+"')\">社团物资</a></li>"+
				"</ul><div id='"+id+"'></div>";
				//id为highttable的div是存放社团的资料，社联管理权限才有
	return txthtml;
}

//带操作的社团资料
function EditAcountHtml(id,seid,choicemodal){//高级管理员，编辑指定社团的账号信息的操作html
	var edithtml="",changehtml="";
	var seid=id.replace(/[^\d]/g,'');//获取id中的数字，代表社团编号
	if(choicemodal=="info_edit"||choicemodal=="acount_edit"){
		edithtml="<a data-toggle='modal' onclick=\"openModal('"+id+"','"+choicemodal+"','')\">"+
										"<img src='images/edit.png'>编辑</a>";
		if(choicemodal=="acount_edit")
			changehtml="<a data-toggle='modal' onclick=\"openModal('"+id+"','user_edit','')\">"+
									"<img src='images/user.png'>修改登录账号</a>";
	}
	if(choicemodal=="exportfile")
		edithtml="<a href='refresh.php?exportfile=yes&seid="+seid+"'>导出报名表</a>";
	var txthtml="<div class='row text-right' ><div class='col-xs-8 col-lg-8'></div><div class='col-xs-4 col-lg-4 text-center'>"+edithtml+changehtml+"</div></div>";
	return txthtml;
}







