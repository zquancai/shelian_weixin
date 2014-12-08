<?php
	include('wxheader.php');
	include ("shelianwho.php");

	$seid = $_GET['seid'];
	$st = new Who($seid);
	$name=$st->name();
?>
<!--导航底菜单，悬浮不动-->
<?php NavHTML(4,$name,$seid);//菜单?>
<div class="pre_div">
	<div class='pre_navigate'>
		<div class='navigate'>
			<div class='content'>
				<center><label><span id="shetuan-name"><?php echo $name;?></span>报名表<br></label></center>
				<hr>
				<h3><small>带<span class="important">*</span>为必填项。</small></h3>
				<form role="form" id="registerform">
					<input type="hidden" value="<?php echo $seid;?>">
					<div class="form-group"><!--姓名-->
						<label for="name"><span class="important">*</span>姓名</label>
						<input type="text" class="form-control" id="name" placeholder="请输入真实姓名">
					</div>
					<div class="form-group"><!--性别-->
						<label>性别</label>
						<label class="radio-inline"><input type="radio" name="sex"  value="男" checked="checked">男</label>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<label class="radio-inline"><input type="radio" name="sex" value="女">女</label>
					</div>
					<div class="form-group"><!--学院专业-->
						<label for="major">学院（专业）</label>
						<input type="text" class="form-control" id="major" placeholder="请输入您的学院和专业">
					</div>
					<div class="form-group"><!--宿舍地址-->
						<label for="dorm_addr">宿舍地址</label>
						<input type="text" class="form-control" id="dorm_addr" placeholder="请输入您的宿舍地址">
					</div>
					<div class="form-group"><!--联系电话-->
						<label for="phone"><span class="important">*</span>联系电话</label>
						<input type="text" class="form-control" id="phone" placeholder="请输入您的11位手机号码">
					</div>
					<div class="form-group"><!--QQ-->
						<label for="qq">QQ</label>
						<input type="text" class="form-control" id="qq" placeholder="请输入您的常用QQ账号">
					</div>
					<div class="form-group"><!--邮箱-->
						<label for="mail"><span class="important">*</span>邮箱</label>
						<input type="text" class="form-control" id="mail" placeholder="请输入您的常用邮箱账号">
					</div>
					<div class="form-group"><!--微博微信-->
						<label for="sina_wechat">微博微信</label>
						<input type="text" class="form-control" id="sina_wechat" placeholder="请输入您的微博或微信账号">
					</div>			
					<div class="form-group"><!--爱好特长-->
						<label for="hobbies">爱好特长</label>
						<textarea class="form-control" rows="3" id="hobbies" placeholder="请输入您的个人爱好"></textarea>
					</div>
					<div class="form-group"><!--个人曾任职务-->
						<label for="experience">个人曾任职务或经历</label>
						<textarea class="form-control" rows="5" id="experience" placeholder="请输入您的个人真实经历"></textarea>
					</div>
					<div class="form-group"><!--个人介绍-->
						<label for="experience">个人介绍</label>
						<textarea class="form-control"rows="5" id="experience" placeholder="请输入您的个人介绍"></textarea>
					</div>
					<div class="form-group"><!--申请类别-->
						<label><span class="important">*</span>申请类别</label>
						<label class="radio-inline"><input type="radio" name="type" value="干部" onclick="RegisterType(this)">干部</label>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<label class="radio-inline"><input type="radio" name="type"  value="干事" checked="checked" onclick="RegisterType(this)">干事</label>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<label class="radio-inline"><input type="radio" name="type" value="会员" onclick="RegisterType(this)">会员</label>
					</div>
					<span id="minister-staff"><!--选项为部长或者干事时，显示志愿选项-->
						<div class="form-group"><!--第一志愿-->
							<label for="first_wish"><span class="important">*</span>第一志愿<a data-dismiss="modal" onclick="openPart()">查看相关职位介绍</a></label>
							<input type="text" class="form-control" id="first_wish" placeholder="请输入您的第一志愿">
						</div>
						<div class="form-group"><!--第一志愿理由-->
							<label for="first_reason">第一志愿理由</label>
							<textarea class="form-control" rows="5" id="first_reason" placeholder="请输入您的申请理由"></textarea>
						</div>
						<div class="form-group"><!--第二志愿-->
							<label for="second_wish">第二志愿</label>
							<input type="text" class="form-control" id="second_wish" placeholder="请输入您的第二志愿">
						</div>
						<div class="form-group"><!--第二志愿理由-->
							<label for="second_reason">第二志愿理由</label>
							<textarea class="form-control" rows="5" id="second_reason" placeholder="请输入您的申请理由"></textarea>
						</div>
					</span>
					<div class="row">
						<div class="col-sm-6 col-xs-6">
							<center><button class="btn btn-default" data-toggle="modal" id="viewregister">预览报名表</button></center>
						</div>
						<div class="col-sm-6 col-xs-6">
							<center><button type="button" class="btn btn-success" onclick="sendRegister()">提交报名表</button></center>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
<div class="modal fade " id="register_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog  text-left  mymodal">
		<div class="modal-content">
			<div class="modal-header my-modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="myModalLabel">您的报名报名表信息如下：</h4>
			</div>
			<div class="modal-body">
				<span id="viewregisterinfo"></span>
				<span id="refister-tip" class="important"></span>
				<div class="modal-footer my-modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">返回修改</button>
					<button type="button" class="btn btn-success" onclick="sendRegister()"> 提交报名表</button>
				</div>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<div class="modal fade " id="part_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog  text-left  mymodal">
		<div class="modal-content">
			<div class="modal-header my-modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title" id="myModalLabel"><?php echo $st->name();?>部门职位介绍</h4>
			</div>
			<div class="modal-body">
				<?php echo $st->part();//部门介绍?>
				<div class="modal-footer my-modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<script src="wxjs/allcheck.js"></script><!--表单验证函数-->
<script src="wxjs/register.js"></script><!--表单验证-->
<?php include('wxfooter.php');?>


