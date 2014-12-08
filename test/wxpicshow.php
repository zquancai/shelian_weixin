<body>
<?php
include('wxheader.php');
include('wxdb.php');

if(isset($_GET['seid'])){//指定的社团活动
	$seid = $_GET['seid'];
	$arr = WXDB::getSomething("organizers, eventname,eventtime,eventplace,
				eventinfo, img1, img1_info,img2,img2_info", "shetuan_action", "where seid={$seid}");
	$name=WXDB::getSomething("name", "shetuan_info", "where seid={$seid}");//获得社团名称
	$name=$name[0][0];
	$action_count=count($arr);//活动的数量
	if($action_count>3)//如果活动个数大于3，则只显示3个活动~
		$action_count=3;
	//导航底菜单，悬浮不动
	NavHTML(3,$name,$seid);
}
else if(isset($_GET['id'])){//社团近期活动回顾
	$id=$_GET['id'];
	$arr = WXDB::getSomething("organizers, eventname,eventtime,eventplace,
				eventinfo, img1, img1_info,img2,img2_info", "shetuan_action", "where id={$id}");
	$name="";
	$action_count=1;
}
?>
<div class="pre_div">
<div class='pre_navigate'>
	<div class='navigate'>
		<div class='content'>
			<center><b><?php echo $name;?>精彩活动回顾<hr></b></center>
		</div>
	</div>
</div>
<?php
for($i=0;$i<$action_count;$i++){
print <<<EOT
			<div class='pre_navigate'>
				<div class='navigate'>
					<div class='content'>
						【活动名称】{$arr[$i][1]}<hr>
						【活动举办方】{$arr[$i][0]}<br>
						【活动地点】{$arr[$i][3]}<br>
						【活动时间】{$arr[$i][2]}<br>
					    【活动介绍】{$arr[$i][4]}<br>
					</div>
					<div class='content'>【精彩照片】<br>
EOT;
if($arr[$i][5]!="inexistence")//如果有第一张图片，就输出第一张图片的连接
	echo "<img src='{$arr[$i][5]}' class='img' alt='第一张图片'/>{$arr[$i][6]}</div>";
if($arr[$i][7]!="inexistence")//如果有第二张图片，就输出第二张图片的连接
		echo "<div class='content'><img src='{$arr[$i][7]}' class='img' alt='第二张图片'/>{$arr[$i][8]}</div>";
if($arr[$i][5]=="inexistence"&&$arr[$i][7]=="inexistence")
	echo "未提供活动照片！</div>";
print <<<EOT
				</div>
			</div>
EOT;
}
?>
</div>
<?php include('wxfooter.php');?>
