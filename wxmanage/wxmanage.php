<!DOCTYPE html>
<?php
header("content-type:text/html; charset=utf8");
session_start(); 
include('../test/wxglobal.php');
include('../test/wxdb.php');
$url = 'wxlogin.php';
$table="shelian_user";
$table1="shetuan_info";
if(isset($_SESSION['seid']))
{
	$seid=$_SESSION['seid'];//一般权限
	//if($seid==0)//设置高权限
	//	$hight=$_SESSION['hight'];//seid=0时，为高级权限
}
else
	dealcheck('没有登录，请重新登录！', $url);
?>
<html lang="en"> 
<head> 
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
	<title>华南师范大学社联联合会微信后台管理平台</title> 
	<meta name="description" content="Creating Modal Window with Bootstrap">
	<link href="css/bootstrap.css" rel="stylesheet"> 
	<link href="css/bootstrap-switch.css" rel="stylesheet">
	<link href="css/wxmanage.css" rel="stylesheet"> 
	<link rel="stylesheet" href="kindeditor/themes/default/default.css" />
</head>
<body>
	<div style="width:100%;">
		<?php include("header.php");//顶栏?>
		<div class="row row-round">
			<?php include("left_menu.php");?>
			<div class="col-xs-3 col-lg-3"></div><!--排版，弥补左侧导航栏空出的位置-->
			<div class="col-xs-9 col-lg-9">
				<div id="displayinfo">
					<?php include("shetuan_account.php");//社团账号信息?>
					<?php include("shetuan_body.php");//社团信息?>
				</div>
			</div>
		</div>
		<?php include("footer.php");//底栏，版权和技术支持信息?>
	</div>
</body>
<head>
	<script src="js/jquery.js"></script>
	<script charset="utf-8" src="kindeditor/kindeditor-min.js"></script>
	<script charset="utf-8" src="kindeditor/lang/zh_CN.js"></script>
	<script src="js/bootstrap.js"></script>
	<script src="js/ajaxfileupload.js"></script>
	<script src="js/wxmanage_user.js"></script>
<?php	if($seid==0)
	echo '<script src="js/wxmanage_manager.js"></script>';
?>
</head>
</html>