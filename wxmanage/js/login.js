//检测是否为合法用户
function submit(){
	$.post("logincheck.php",{
		username: $('#username').val(),
		password:$('#password').val()
		}, function (data,textStatus){
			$('#login-tip').html(data);
		});
}
$('#submit').click(function(){submit();})
var KeyUp=function(){
	console.log('keyup');
	$('body').bind('keyup',//监听回车事件
		function(event) {  
			if(event.keyCode==13)
				submit();
		});
};
$('#username').focus(KeyUp);//焦点事件
$('#password').focus(KeyUp);

function Warning(text){
	var warningh="<div class='alert alert-warning alert-dismissable'>"+
			"<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>"+
			"<strong>提示：</strong>";
	var warningf="</div>";
	return warningh+text+warningf;
}