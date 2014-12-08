// javascript Document
var onsubmit=new Array();//申请数组做最后提交的判断是否符合规范
function check_form(string,reg_string)
{
	var name;
	name = document.getElementById(string).value;
	var re = new RegExp(reg_string);
	//alert(re);
	if(re.test(name))
	{
		load_dom(1,"ico_"+string);onsubmit[string]--;
	}
	else 
	{
	//alert("你输入的不是真实姓名！");
		load_dom(0,"ico_"+string);
		if(!onsubmit.hasOwnProperty(string)){
		onsubmit.push(string);
		onsubmit[string]=1;
		}
	}
}

function submit_check()
{
	for(var key in onsubmit){
		if(onsubmit[key] == 1){
		alert("您填写的信息不符合标准！");
		return false;
		}
	}
}
function load_dom(e,string)
{
	var xmlHttpReq = null;
	if(window.ActiveXObject)
	{
		xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
	}else if(window.XMLHttpRequest)
	{
		xmlHttpReq = new XMLHttpRequest();
	}
	
	if(xmlHttpReq != null)
	{
		xmlHttpReq.open("GET","http://www.scnutn.com/weixin/test/wxjs/ico.xml",true);
		
		xmlHttpReq.onreadystatechange = function(){
			if(xmlHttpReq.readyState == 4){
			//alert(xmlHttpReq.readyState);
			//alert(xmlHttpReq.status);
			if(xmlHttpReq.status == 200){
				var h;
				if(e == 1)
				h = xmlHttpReq.responseXML.documentElement.getElementsByTagName("right");
				else if( e == 0)
				h = xmlHttpReq.responseXML.documentElement.getElementsByTagName("wrong");
				var img = h[0].firstChild.nodeValue;
				//alert(img);
				document.getElementById(string).src = "wximg/"+img+".png";
				}
			}
		}
		xmlHttpReq.send();
	}
}

