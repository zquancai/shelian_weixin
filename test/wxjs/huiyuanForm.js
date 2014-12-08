function CheckForm(objForm)//验证表单
{
	var sn=/^[\u4e00-\u9fa5]*[\u4e00-\u9fa5]$/;//姓名
	var sn_alert="要输入您的真实姓名哦！";
	var pn=/^[0-9][^<>]*[0-9]?$/;//电话号码
	var pn_alert="要输入正确的电话号码哦！";
	var mail=/^[\w]+@[\w]+?\.[\w]{2,6}/;//
	var mail_alert="要输入正确的邮箱哦！";
	var org=/^[\u4e00-\u9fa5_A-Za-z_0-9][^<>]*[\u4e00-\u9fa5_A-Za-z_0-9]?$/;
	var org_alert="要输入您所在的社团哦！";
	var text0="事情经过都忘写了~";
	var text1="诶，忘了写我自己期望解决的方式哦！";
	if (!sn.test(objForm.StudentName.value))
	{
			alert(sn_alert);
			objForm.StudentName.focus();
			return false;
	}
	if (!pn.test(objForm.PhoneNumber.value))
	{
			alert(pn_alert);
			objForm.PhoneNumber.focus();
			return false;
	}
	if (!mail.test(objForm.Email.value))
	{
			alert(mail_alert);
			objForm.Email.focus();
			return false;
	}
	if (!org.test(objForm.Organization.value))
	{
			alert(org_alert);
			objForm.Organization.focus();
			return false;
	}
	if (objForm.Process.value==null || objForm.Process.value=="")
	{
			alert(text0);
			objForm.Process.focus();
			return false;
	}
	if (objForm.Suggestion.value==null || objForm.Suggestion.value=="")
	{
			alert(text1);
			objForm.Suggestion.focus();
			return false;
	}
	return true;
}

var flag = true;
function ChangeKind() {//显示不同种类的类别
	if( document.getElementById("Kind1").checked ) {
		document.getElementById("FormKind1").style.display = 'none';
		document.getElementById("FormKind0").style.display = 'table-row';
		document.getElementById("other1").innerHTML = "<span id='other1'>其他</span>";
		document.getElementById("caiwu").checked = true;
		flag = true;
	} else {
		document.getElementById("FormKind1").style.display = 'table-row';
		document.getElementById("FormKind0").style.display = 'none';
		document.getElementById("other2").innerHTML = "<span id='other2'>其他</span>";
		document.getElementById("zhidu").checked = true;
		flag = true;
	}
}

function OtherQuestion0() {//点击其他时弹出输入框
	var object1 = document.getElementById("other1");	
	if( document.getElementById("Complain4").checked && flag ) {
		object1.innerHTML += "&nbsp;&nbsp;&nbsp;<input type='text' class='w-input' value='' size='20' id='OtherInput' name='Complain' />"
		document.getElementById("Complain4").checked == false;
		flag = false;
	} else {
		object1.innerHTML = "<span id='other1'>其他</span>";
		flag = true;
	}
}

function OtherQuestion1() {
	var object2 = document.getElementById("other2");
	if( document.getElementById("Complain8").checked && flag ) {
		object2.innerHTML += "&nbsp;&nbsp;&nbsp;<input type='text' class='w-input' value='' size='20' id='OtherInput' name='Complain' />"
		document.getElementById("Complain8").checked == false;
		flag = false;
	} else {
		object2.innerHTML = "<span id='other2'>其他</span>";
		flag = true;
	}
}