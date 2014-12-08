//所有表单验证
function chinese(string){//中文
	 var reg = /^[\u4e00-\u9fa5]+$/;
      if(!reg.test(string)){
       return false;
      }
      return true;
}

function moreTwo(string){//字符数大于2个
	var reg = /[\u4e00-\u9fa5a-z]{2}/;
	if(!reg.test(string)){
       return false;
      }
      return true;
}

function isMail(string){//是邮箱格式
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
	if(reg.test(string)){
		return true;
	}
	return false;
}

function phoneNumber(string){//11个数字
	reg = /^[0-9][0-9]{9,9}[0-9]$/;
	if(reg.test(string)){
		return true;
	}
	return false;
}
function more5Number(string){//大于5个数字
reg = /^[0-9][0-9]{3}[0-9]$/;
	if(reg.test(string)){
		return true;
	}
	return false;
}

function isEmpty(string){//是否为空
	reg = /^[\s]$/;
	if(reg.test(string) || string.length == 0){
		return true;
	}
	return false;
}

function test(string){
	if(isEmpty(string)){
		return true;
	}
	return false;
}