<!DOCTYPE html>
<html>
<head>
	<title>华南师大社联</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0,user-scalable=no">
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
	<link rel="stylesheet" type="text/css" href="wxcss/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="wxcss/shetuan.css">
	<script src="wxjs/jquery.js"></script>
	<script src="wxjs/bootstrap.js"></script>
</head>
<body>
<?php
	//type为类型，1为社团介绍，2为社团相册，3为社团活动，4为新生报名，5为社区，6为会员，,name为社团名
	//此函数的功能为产生底部菜单
	function NavHTML($type,$name,$seid){
		$info_url="http://saunion.scnu.edu.cn/shelian_weixin/test/wxshow.php?seid=";//社团介绍
		$photo_url="http://saunion.scnu.edu.cn/shelian_weixin/test/photo.php?seid=";//相册
		$action_url="http://saunion.scnu.edu.cn/shelian_weixin/test/wxpicshow.php?seid=";//活动
		$register_url="http://saunion.scnu.edu.cn/shelian_weixin/test/wxregister.php?seid=";//新生报名
		$member_url="http://saunion.scnu.edu.cn/shelian_weixin/test/wxmember.php";//会员一件
		$forum_url="http://wx.wsq.qq.com/253368538";//微社区地址
		$announce_url="http://wx.wsq.qq.com/253368538/t/new";//社区发表看法的url
		$seid0=null;
		if($type==6)
			$seid0=0;
		else $seid0=$seid;
		print <<<EOT
			<nav class="navbar navbar-inverse navbar-fixed-bottom" role="navigation">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<span class="navbar-brand"><strong>{$name}</strong></span>
				</div>
				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-nav">
EOT;
			echo	"<li ".($type==1?"class='active'":"")."><a href='{$info_url}{$seid0}'>社团介绍</a></li>".
						"<li ".($type==2?"class='active'":"")."><a href='{$photo_url}{$seid0}'>社团相册</a></li>".
						"<li ".($type==3?"class='active'":"")."><a href='{$action_url}{$seid0}'>社团活动</a></li>".
						"<li ".($type==4?"class='active'":"")."><a href='{$register_url}{$seid0}'>新生报名</a></li>".
						"<li ".($type==5?"class='active'":"")."><a href='{$forum_url}'>社团微社区</a></li>";
			if($seid==0)
				echo "<li class='active'><a href='{$member_url}'>会员意见</a></li>";
			print <<< EOT
					</ul>
					<div class="navbar-form navbar-left">
						<div class="row">
							<div class="col-xs-8 col-sm-8 col-md-8"></div>
							<div class="col-xs-4 col-sm-4 col-md-4">
								<a href="{$announce_url}" class="btn btn-default">发表评论</a>
							</div>
						</div>
					</div><!--社团评论，拓展功能-->
				</div>
			</nav>
EOT;
}
?>