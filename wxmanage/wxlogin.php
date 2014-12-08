<!DOCTYPE html>
<html>
  <head>
    <title>华南师范大学社团联合会微信公众平台后台登陆</title>
    <meta name="viewport" content="width=device-width, height=device-height,initial-scale=1.0">
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
	<link href="css/bootstrap.css" rel="stylesheet"> 
	<link href="css/wxmanage.css" rel="stylesheet"> 
    <link rel="stylesheet" href="css/login.css">
	<script src="js/jquery.js"></script>
	<script src="js/bootstrap.js"></script>
</head>
<body>
<header><!--顶栏-->
	<nav>
	<div class="col-xs-7 col-lg-7 head-col">
		<b><img src="images/shelian_logo0.png">华南师范大学社团联会微信公众号后台管理平台</b>
	</div>
	<div class="col-xs-3 col-lg-3 text-center head-col1" id="welcome-user"></div>
	</nav>
</header>
<div class="container">
	<div class="row login-row">
		<div class="col-xs-8 col-lg-8"></div>
		<div class="col-xs-4 col-lg-4">
			<div class="panel panel-success">
				<div class="panel-heading"><h3><b>请登录</b></h3></div>
				<div class="panel-body login-body">
					<span id="login-tip"></span>
					<form rel="form">
						<div class="form-group has-success">
							<label for="username"><h4><b>用户名：</b></h4></label>
							<input type="text" class="form-control" name="username" id="username" required="required" placeholder="输入您的用户名">
						</div>
						<div class="form-group has-success">
							<label for="password"><h4><b>密码：</b></h4></label>
						<input type="password" class="form-control" name="password" id="password" required="required" placeholder="输入您的密码">
						</div>
						<p class="text-right"><button class="btn btn-success" type="button" id="submit"><h4><b>登陆</b></h4></button></p>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
	<script src="js/login.js"></script>
<?php include("footer.php");//底栏，版权和技术支持信息?>
</body>
</html>
