<div class=" left-fixed"><!--使左侧导航栏固定-->
	<div class="col-xs-3 col-lg-3 my-col-3"><!--左侧导航栏-->
		<div class="row row-padd"  id="shetuan-user"><!--社团logo-->
		<!--社团用户信息显示处-->
		</div>
		<div class="row" style="padding-left:45px;"><!--添加项-->
			<div class="col-xs-5 col-lg-5">
				 <a class="thumbnail mythumbnail" onclick="Add('photo','')"><!--添加相片,打开模态框-->
					<img src="images/add_photo.png" class="img-responsive">
				</a>
			</div>
			<div class="col-xs-5 col-lg-5">
				<a class="thumbnail mythumbnail" onclick="Add('action','')"><!--添加活动，打开模态框-->
					<img src="images/add_action.png" class="img-responsive">
				</a>
			</div>
		</div>
		<div class="row" style="padding-top:10px;">
			<div class="col-xs-2 col-lg-2"></div>
			<div class="col-xs-10 col-lg-10 text-right" style="padding-right:0;"><!--功能选项-->
				<div id="sidebar">
					<div class="panel open mypanel">
							<div>
								<h4 class="panel-title">
									<a ><div class="panel-heading panel-back">社团基本信息</div></a>
								</h4>
							</div>
						<div class="panel-body panel-body1">
							<ul class="nav nav-pills mynav">
									  <li class="active li-text"><a id="view-info" data-toggle="tab">查看/编辑社团资料</a></li>
									  <li class=" li-text"><a id="view-action" data-toggle="tab">查看/编辑社团活动</a></li>
									  <li class=" li-text"><a id="view-photo" data-toggle="tab">查看/编辑社团相册</a></li>
									  <li class=" li-text"><a id="view-materials" data-toggle="tab">查看/编辑社团物资</a></li>
							</ul>									 
						</div>
					</div>
					<div class="panel mypanel">
						<div>
								<h4 class="panel-title">
									<a ><div class="panel-heading panel-back">社团动态信息</div></a>
								</h4>
							</div>
						<div class="panel-body panel-body1" style="display:none;">
							<ul class="nav nav-pills mynav">
							  <li class=" li-text"><a id="view-mail" data-toggle="tab">查看社团信箱</a></li>
							  <li class=" li-text"><a id="view-market" data-toggle="tab">进入社团物资市场</a></li>
							  <?php
									if($seid!=0)
										echo "<li class='li-text'><a id='view-download' data-toggle='tab'>文件下载</a></li>";
							  ?>
							</ul>
						</div>						
					</div>
					<?php 
if($seid==0)
print <<<EOT
	<div class="panel mypanel">
		<div>
				<h4 class="panel-title">
					<a ><div class="panel-heading panel-back">管理社团信息</div></a>
				</h4>
			</div>
		<div class="panel-body panel-body1" style="display:none;">
			<ul class="nav nav-pills mynav">
			  <li class=" li-text"><a id='view-shetuanlist' data-toggle="tab">查看社团列表</a></li>
			  <li class=" li-text"><a id='view-shetuaninfo' data-toggle="tab">查看社团信息</a></li>
			  <li class=" li-text"><a id='view-business' data-toggle="tab">查看社团事务流程</a></li>
			</ul>
		</div>						
	</div>
	<div class="panel mypanel">
		<div>
				<h4 class="panel-title">
					<a ><div class="panel-heading panel-back">文档管理</div></a>
				</h4>
			</div>
		<div class="panel-body panel-body1" style="display:none;">
			<ul class="nav nav-pills mynav">
			  <li class=" li-text"><a id="view-membermail" data-toggle="tab">更改会员意见收件箱</a></li>
			  <li class=" li-text"><a id="view-upload" data-toggle="tab">文件上传和删除</a></li>
			</ul>
		</div>						
	</div>
EOT;
					
					?>
				</div> 
			</div>
		</div>
	</div>
</div>