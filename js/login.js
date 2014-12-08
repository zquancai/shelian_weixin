//检测是否为合法用户
$(function(){
	$('#submit').click(function(){
		$.post("logincheck.php",{
			username: $('#username').val(),
			password:$('#password').val()
			}, function (data,textStatus){
				$('#login-tip').html(data);
			});
		});
})