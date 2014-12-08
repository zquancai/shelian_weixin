function RegisterType(id){//根据不同申请类别显示不同表单
	var type=$(id).val();//类型
	if(type=="会员")//会员时，不显示志愿选项
		$('#minister-staff').css("display","none");
	else//干事或者部长时显示志愿选项
		$('#minister-staff').css("display","block");
}
$('body').bind('keyup',//监听回车事件
	function(event) {  
		if(event.keyCode==13)
            sendRegister();
});
//$('#send-register').click(
function sendRegister(){
	//获取所有inpu（处于checked状态的radio）t和textarea、button的jq对象
	var $all_input=$('#registerform :input[type!="radio"],:input:checked');
	$('#registerform label:eq(0)').children('span:eq(1)').remove();//删除提示
	$('#registerform label:eq(6)').children('span:eq(1)').remove();//删除提示
	$('#registerform label:eq(8)').children('span:eq(1)').remove();//删除提示
	$('#registerform label:eq(17)').children('span:eq(1)').remove();//删除提示
	if(chinese($all_input.eq(1).val()) && phoneNumber($all_input.eq(5).val()) 
		&& isMail($all_input.eq(7).val()) ){//输入符合规范，三个必填项
//		$('#refister-tip').html("");
//		alert($all_input.eq(12).val());
		if($all_input.eq(12).val()=="会员"){//选择了会员
			$('#refister-tip').html("");
			sendDB($all_input);//jq对象数组
		}
		else{
			if(!moreTwo($all_input.eq(13).val())){
				$('#refister-tip').html("报名表有错误哦，请返回再次编辑。");
				$('#registerform label:eq(17)').append("<span class='important'><br>(申请部长或干事，必须填写志愿！)</span>");
				$('#registerform label:eq(17)').focus();//焦点集中到邮箱输入框
			}
			else sendDB($all_input);//jq对象数组
		}
	}
	else{
		$('#refister-tip').html("报名表有错误哦，请返回再次编辑。");
		if(!isMail($all_input.eq(7))){
			$('#registerform label:eq(8)').append("<span class='important'>(邮箱格式输入错误！)</span>");
			$('#registerform label:eq(8)').focus();//焦点集中到邮箱输入框
		}
		if(!phoneNumber($all_input.eq(5).val())){
			$('#registerform label:eq(6)').append("<span class='important'>(手机号输入错误！)</span>");
			$('#registerform label:eq(6)').focus();//焦点集中到号码输入框
		}
		if(!chinese($all_input.eq(1).val())){
			$('#registerform label:eq(0)').append("<span class='important'>(姓名不能为空且要为中文！)</span>");
			$('#registerform label:eq(0)').focus();//焦点集中到姓名输入框
		}
	}
}

function sendDB(jqobj){
	var allinputval=new Array();
	var n=jqobj.length;
	for(var i=0;i<n-2;i++)
		allinputval[i]=jqobj.eq(i).val();
		//	alert(allinputval);
	$.post("refresh.php",{//获取原来的会员意见收集邮箱
		addchoice:"addregister",
		allinputval:allinputval//所有input的值
		},function(data,textStatus){
			if(data=="addsuccess")
				alert("报名成功！");
			else if(data=="repeat")
				alert("您已报名，请不要重复报名！");
			else
				alert("报名失败，请检查网络问题！");
		//	alert(data);
		},"json");
}

$('#viewregister').click(function(){
	$('#register_modal').modal();
	$('#refister-tip').html("");
	var $all_input=$('#registerform :input[type!="radio"],:input:checked');
	var text="";
	var allattr=new Array("<b>报名社团：</b>","<b>姓名：</b>","<b>性别：</b>","<b>学院(专业)：</b>","<b>宿舍地址：</b>","<b>联系电话：</b>",
										"<b>QQ：</b>","<b>邮箱：</b>","<b>微博微信：</b>","<b>爱好特长：</b>","<b>个人曾任职务或经历：</b>",
										"<b>个人介绍：</b>","<b>申请类别：</b>","<b>第一志愿：</b>","<b>第一志愿理由：</b>","<b>第二志愿:</b>",
										"<b>第二志愿理由：</b>");
	var n=$all_input.length;
	text+=allattr[0]+$('#shetuan-name').text()+"<br>";//社团名字
	for(var i=1;i<n-2;i++)//2为button
		text+=allattr[i]+$all_input.eq(i).val()+"<br>";
	$('#viewregisterinfo').html(text);
});

function openPart(){$('#part_modal').modal();}