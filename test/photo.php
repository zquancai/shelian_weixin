<?php
	include('wxheader.php');
	include ("whophoto.php");
	$seid = $_GET['seid'];//获取社团的名称社团
	//$photo_arr是一个二维数组，第一列表示图片的连接，第二列表示图片的说明
	$wophoto = new WhoPhoto($seid);
	$photo_arr=$wophoto->GetPhotoArr();//获取社团相册的信息，照片和照片说明
	$name=$wophoto->GetName();
	$length=count($photo_arr);//获取照片的张数
	$photoarr0=json_encode($photo_arr);
	$length0=json_encode($length);
?>
<head>
<link rel="stylesheet" type="text/css" href="wxcss/photo.css"><!--引入相册专有css层叠样式---->
</head>
<body>
<!--导航底菜单，悬浮不动-->
<?php NavHTML(2,$name,$seid);//菜单?>
<div id="counter"><b>1/<?php echo $length;?></b></div>
<div class="content">
	<a href="javascript:ImgNav(-1)" class="previmg"><!--点击向左，移动大图-->
	</a>
	<a href="javascript:ImgNav(1)" class="nextimg"><!--点击向右，移动大图-->
	</a>
	<div id="scrollimg">
		<div>
			<img id="image" src=<?php echo "'{$photo_arr[0][0]}'";?>/>
		</div>
	</div><!--scrollimg-->
</div><!--content-->
<div id="img_info"><?php echo $photo_arr[0][1]?></div>
<div id="thumbwrapper"><!--预览框架-->
	<div id="scroll_left" onclick="ClickScroll(-1)"></div>
	<div id="scroll_right" onclick="ClickScroll(1)"></div>
	<div id="thumbarea">
		<ul id="thumbs"><!--预览列表-->
	<?php
			//$i计数
			for($i=0;$i<$length;$i++){
				$id="img".(string)($i+1);
				//onclick的函数要用双引号引起来！
				echo "<li id='{$id}'>".//li的id为img+数字
						"<img src='{$photo_arr[$i][0]}' onclick=\"TouchImg('{$i}','{$id}')\"/>".
						"</li>";
			}
		?>
		</ul>
	</div><!--thumbarea-->
</div><!--thumbwrapper-->
<script >
var photo_arr = <? echo $photoarr0;?>;//蒋json数组赋值给js中的变量
var img_count=<?echo $length0?>;//图片张数传入js中
//document.getElementById("img_info").innerHTML=length0;
</script>
<script  src="../js/photo.js"></script>
</body>
