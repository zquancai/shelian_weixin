<?php
	include('wxheader.php');
	include('wxdb.php');
?>
<div class='pre_navigate pre_div'>
	<div class='navigate'>
		<div class='content'>
			<center><strong>社团类型分类</strong></center><hr>
		</div>
	</div>
</div>
<?php
//	include ("shelianwho.php");
	if(isset($_GET['type'])){
		$type = $_GET['type'];
		$info_url="http://saunion.scnu.edu.cn/shelian_weixin/test/wxshow.php?seid=";//社团介绍
		$alltype=array("文娱体育类","理论学习类","兴趣爱好类","学术科技类","社会实践类","院系社联类");
		$all=1;
		if($type==-1){
			$type=0;
			$all=6;
		}
		for($j=0;$j<$all;$type++,$j++){
			//根据传进来的type参数获得社团名称
			$typeshetuan=WXDB::getSomething("name,seid", "shetuan_info", "where type='{$type}'");
			$shetuan_acount=count($typeshetuan);//社团数量
			
			print <<< EOT
			<div class='pre_navigate'>
				<div class='navigate'>
					<div class='content'>
						<strong>{$alltype[$type]}</strong><hr>
					</div>
					<div class='content'>
						<ul class="nav nav-pills nav-stacked" role="tablist">
EOT;
				for($i=0;$i<$shetuan_acount;$i++)
					echo "<li role='presentation'><a href='{$info_url}{$typeshetuan[$i][1]}'>{$typeshetuan[$i][0]}</a></li>";
			print <<<EOT
						</ul>
					</div>
				</div>
			</div>
EOT;
		}
}
?>