<?php
	include('wxheader.php');
	include ("shelianwho.php");

	$seid = $_GET['seid'];
	$st = new Who($seid);
	$name=$st->name();
?>
<!--导航底菜单，悬浮不动-->
<?php NavHTML(1,$name,$seid);//菜单?>
<div class='pre_navigate pre_div'>
	<div class='navigate'>
		<div class='content'>
			<b><?php echo $name;?>社团概况</b><hr>
			<?php echo "<img src='{$st->img()}'  class='img' alt='{$name}的社团logo'/>";?>
		</div>
		<div class='content'><?php echo $st->introduction();?>
		</div>
	</div>
</div>
<div class='pre_navigate'>
	<div class='navigate'>
		<div class='content'>
			<b><?php echo $name;?>的机构介绍</b><hr>
			<?php echo $st->part();?>
		</div>
	</div>
</div>
<?php include('wxfooter.php');?>
