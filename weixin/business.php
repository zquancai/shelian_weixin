<!DOCTYPE html>
<!-- saved from url=(0047)file:///C:/Users/Administrator/Desktop/chat.htm -->
<html "=""><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta charset="utf-8">
	<title>社团事务流程</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" type="text/css" href="../css/business.css">
	<script src="wxjs/business.js"></script>
<?php
include('wxdb.php');

if(isset($_GET['spid'])){//活动回顾
	$spid = $_GET['spid'];
	$arr = WXDB::getSomething("bname,child_name,child_part,first_row,second_row", "shelian_business", "where part={$spid} order by child_part asc");
	$n=count($arr);//计算行数
	$m=$arr[$n-1][2];//分类的种类数
	$j_m=json_encode($m);
}
?>
<script>
	var m=<?php echo $j_m;?>//复制到js中
</script>
<body onload="GoDown()">
<header>
	<nav>
		<b>社团事务流程>><?php echo $arr[1][0];?></b>
	</nav>
</header>
<?php
	$k=1;
	for($j=1;$j<=$m;$j++){//$m是类别的个数
print <<<EOT
			<div class="pre_navigate pre_div">
				<div class="navigate">
					<div class="content">
						<div class="item" onclick="Hide('item{$j}','{$j}')">
							<b>{$arr[$k][1]}</b>
						</div>
						<div  id="item{$j}">
							<table>
								<tr>
									<th>{$arr[0][3]}</th>
									<th>{$arr[0][4]}</th>
								</tr>
EOT;
								for($i=1;$i<$n;$i++)//扫描所有数据
									if($j==$arr[$i][2]){//挑选符合分类的数据
										echo "<tr><td>{$arr[$i][3]}</td><td>{$arr[$i][4]}</td></tr>";
										$k++;
									}
print <<<EOT
					</table>
				</div>
			</div><!--content-->
		</div><!--nagigate-->
	</div>
EOT;
}
?>
<?php include ("wxfooter.php");?>