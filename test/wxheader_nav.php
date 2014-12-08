<?php
function NavHTML($type){//type为类型，会员网址时为1，其余为0
	if($type==0)
		$seid0=0;
	else $seid0==$seid;
print <<<EOT
	<nav class="navbar navbar-inverse navbar-fixed-bottom" role="navigation">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<span class="navbar-brand">{$name}</span>
		</div>
		<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			<ul class="nav navbar-nav">
				<li><a href="{$info_url}{$seid0}">社团介绍</a></li>
				<li class="active"><a href="{$photo_url}{$seid0}">社团相册</a></li>
				<li><a href="{$action_url}{$seid0}">社团活动</a></li>
				<li><a href="{$register_url}{$seid0}">新生报名</a></li>
				<li><a href="{$forum_url}">社团微社区</a></li>
EOT;
	if($seid==0)
		echo "<li><a href='{$member_url}'>会员意见</a></li>";
print <<< EOT
				</ul>
			<div class="navbar-form navbar-left">
				<div class="row">
					<div class="col-xs-8 col-sm-8 col-md-8"></div>
					<div class="col-xs-4 col-sm-4 col-md-4">
						<a href="<?php echo $announce_url;?>" class="btn btn-default">发表评论</a>
					</div>
				</div>
			</div><!--社团评论，拓展功能-->
		</div>
	</nav>
EOT;
}
?>