<?php
include('../test/wxdb.php');

$table = 'shelian_user';
header("cache-control:no-cache,must-revalidate");
header("content-type:text/html; charset=utf8");
session_start();
if(isset($_POST['username']) && isset($_POST['password'])){
//	$status=$_POST['status'];//身份信息
	$username=$_POST['username'];//用户名
	$password=$_POST['password'];//密码
	$condition="where username='{$username}'";
	$arr = WXDB::getSomething("username,password,seid",$table,$condition);
	$arr=$arr[0];
	$seid=$arr[2];
	if($arr!=null){
		if($password==$arr[1]){
			$_SESSION['username']= $username;
			$_SESSION['password']= $password;
			$_SESSION['seid']= $seid;//社团编号就是该社团的session标志
		//	if($seid==0)//设置高权限
		//		$_SESSION['hight']= 1;
			$url = "wxmanage.php";  
			echo "<script type='text/javascript'>".
					"window.location.href='{$url}'".
					"</script>"; 
		}
		else{
			echo "密码错误，请核对后再输入！";
		}
	}
	else{
			echo "用户名不存在，请核对后再输入！";
	}
}

if(isset($_GET['logout']) && $_GET['logout'] == 'true'){
	unset($_SESSION['username']);
	unset($_SESSION['password']);
	unset($_SESSION['seid']);
	$url="wxlogin.php";
	echo "<script type='text/javascript'>".
					"window.location.href='{$url}';".
					"alert('您已登出');".
					"</script>"; 
}

?>