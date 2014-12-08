<?php
include('wxheader.php');
include ("shelianwho.php");

$short = $_GET['short'];
$st = new Who($short);
$m_url="http://www.scnutn.com/shelian_weixin/test/photo.php?short=";
?>
<header>
	<nav>
	<b><?php echo $st->name();?>活动介绍</b>
	</nav>
</header>
<div class='pre_navigate pre_div'>
	<div class='navigate'>
		<div class='content'><?php echo "<img src='{$st->img()}'/>";?>
		</div>
		<div class='content'><?php echo $st->introduction();?>
		</div>
	</div>
</div>
<div class='pre_navigate'>
	<div class='navigate'>
		<div class='content'>
			>><b><?php echo $st->name();?>的机构介绍</b><br>
			<?php echo $st->part();?>
		</div>
	</div>
</div>
<div class='pre_navigate'>
	<div class='navigate'>
		<div class='content'>
			<?php echo "<a href='{$m_url}{$short}'>";?>
			>>查看<?php echo $st->name();?>的社团相册</a><br>
			<a href='dgdag'>
			>>查看<?php echo $st->name();?>以往的活动</a>
		</div>
	</div>
</div>
<?php include('wxfooter.php');?>
