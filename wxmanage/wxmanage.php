<!DOCTYPE html>
<?php
header("content-type:text/html; charset=utf8");
session_start(); 
include('../weixin/wxglobal.php');
include('../weixin/wxdb.php');
$url = 'wxlogin.php';
$table="shelian_user";
$table1="shetuan_info";
if(isset($_SESSION['seid']))
	$seid=$_SESSION['seid'];//一般权限
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
			<div class="col-xs-3 col-lg-3 my-col-3 col-lwidth left-fixed"><!--使左侧导航栏固定-->
			<?php include("left_menu.php");?>
			</div>
			<div class="col-xs-9 col-lg-9 rpos">
				<div id="displayinfo" style="min-width:700px">
					<?php include("shetuan_account.php");//社团账号信息?>
					<?php include("shetuan_body.php");//社团信息?>
				</div>
			</div>
		</div>
		<div class="my-preview" id="preview"><img src="images/prephone.png" ></div>
		<?php include("footer.php");//底栏，版权和技术支持信息?>
	</div>
	<?php include("modal-dialog.php");//弹出对话框?>
</body>
<head>
	<script src="js/jquery.js"></script>
	<link rel="stylesheet" href="kindeditor/themes/default/default.css" />
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