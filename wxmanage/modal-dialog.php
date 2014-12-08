
<div id="edit-modal">
	<!-- 弹出社团资料编辑框-->
	<div class="modal fade" id="info_edit_modal" data-seid="-1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog  text-left ">
			<div class="modal-content">
				<div class="modal-header my-modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel">编辑社团资料</h4>
				</div>
				<form role="form">
					<span class="span-hidden"></span><!--存放社团的编号-->
					<div class="modal-body">
						<div class="form-group">
							<label for="edit_brief">社团简介</label>
							<textarea class="form-control mytextarea" data-type="info"></textarea>
						</div>
						<div class="form-group">
							<label for="edit_intro">社团介绍</label>
							<textarea class="form-control mytextarea" id="editor0" data-type="info" style="width:100%;height:200px;"></textarea>
						</div>
						<div class="form-group">
							<label for="edit_part">社团部门介绍</label>
							<textarea class="form-control mytextarea" id="editor1" data-type="info" style="width:100%;height:200px;"></textarea>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
						<input type="button" class="btn btn-success" id="send-changeinfo" value="提交">
					</div>
				</form>
			</div><!-- /.modal-content -->
		</div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
	<!-- 弹出预览框 -->
	<div class="modal fade" id="preview_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div  class="myiframe">
				<img class="myclose" data-dismiss="modal" src="images/close.png">
				<p>
				<iframe src=""></iframe>
				</p>
			</div>
		</div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
	<!--弹出社团活动编辑框-->
	<div class="modal fade" id="action_edit_modal" data-seid="-1" data-id="-1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog  text-left ">
			<div class="modal-content">
				<div class="modal-header my-modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel">编辑社团活动</h4>
				</div>
				<div class="modal-body modal-bottom">
					<span class="span-hidden"></span><!--存放活动编号-->
					<span class="span-hidden"></span><!--存放社团的编号-->
					<div class="form-group">
						<label for="edit_intro">活动名称</label>
						<input type="text" class="form-control" data-edit="yes">
					</div>
					<div class="form-group">
						<label for="edit_part">活动介绍</label>
						<textarea class="form-control mytextarea" id="editor2" data-edit="yes" style="width:100%;height:200px;"></textarea>
					</div>
					<div class="form-group">
						<label>编辑活动照片</label>
						<span></span><!--显示提示信息-->
						<div class="row">
							<div class="col-xs-6 col-lg-6">
								<div class="thumbnail thumbnail-bottom">
									<center><img class="img-box1" src="" data-edit="yes" alt="点击加号可添加图片"/></center>
									<div class="imgfile">
										<input type="file" class="img-review" id="actionimg1" name="actionimg1" data-upload="yes" value="上传文件" onchange="Common.PreviewImg(this)"/>
									</div>
									<span></span>
									<div class="caption caption-round">
										<textarea class="form-control mytextarea" data-edit="yes"></textarea>
									</div>
								</div>
							</div>
							<div class="col-xs-6 col-lg-6">
								<div class="thumbnail thumbnail-bottom">
									<center><img class="img-box1" src="" data-edit="yes" alt="点击加号可添加图片"/></center>
									<div class="imgfile">
										<input type="file" class="img-review" id="actionimg2" name="actionimg2" data-upload="yes" value="上传文件" onchange="Common.PreviewImg(this)"/>
									 </div>
									<span></span>
									<div class="caption caption-round">
										<textarea class="form-control mytextarea" data-edit="yes"></textarea>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-success" id="send-changeaction">提交</button>
				</div>
			</div><!-- /.modal-content -->
		</div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
	<!--弹出社团相册编辑框-->
	<div class="modal fade" id="photo_edit_modal" data-seid="-1" data-id="-1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog  text-left mymodal1">
			<div class="modal-content">
				<div class="modal-header my-modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel">编辑社团相册</h4>
				</div>
				<div class="modal-body modal-bottom">
					<div class="row">
						<center><img class="img-box1" src="" data-edit="yes" class="img-thumbnail photo-box" alt="无法获取图片"/></center>
						<div class="imgfile">
							<input type="file" class="img-review" id="photoimg" name="photoimg" data-upload="yes" onchange="Common.PreviewImg(this)"/>
						 </div>
						 <span></span><!--显示提示信息-->
					</div>
					<div class="row">
						<div class="form-group thumbnail-bottom">
							<label for="edit_part">照片描述</label>
							<textarea class="form-control mytextarea" data-edit="yes"></textarea>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-success" id="send-changephoto">提交</button>
				</div>
			</div><!-- /.modal-content -->
		</div><!-- /.modal-dialog -->
	</div><!-- /.modal -->

	<!--弹出修改密码的编辑框-->
	<div class="modal fade " id="password_edit_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog  text-left  mymodal">
			<div class="modal-content">
				<div class="modal-header my-modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel"><b>修改密码</b></h4>
				</div>
				<form role="form">
					<div class="modal-body">
						<span id="change-tip"></span>
						<div class="form-group">
							<label>请输入原密码</label>
							<input type="password" class="form-control"name="oldpassword"id="oldpassword">
						</div>
						<div class="form-group">
							<label>请输入新密码</label>
							<input type="password" class="form-control" name="newpassword" id="newpassword">
						</div>
						<div class="form-group">
							<label for="edit_brief">确认密码</label>
							<input type="password" class="form-control" name="surepassword" id="surepassword">
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
							<input type="button" class="btn btn-success" value="提交" id="send-newpassword">
						</div>
					</div>
				</form>
			</div><!-- /.modal-content -->
		</div><!-- /.modal-dialog -->
	</div><!-- /.modal -->

	<!--弹出报名详细信息框-->
	<div class="modal fade " id="register_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog  text-left">
			<div class="modal-content">
				<div class="modal-header my-modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel"><b>详细信息</b></h4>
				</div>
				<form role="form">
					<div class="modal-body">
						<span></span>
						<div class="table-responsive">
							<table class="mytable table-bordered">
								<tbody>
									<tr>
										<td class="td-width text-center">姓名</td><td></td>
										<td class="td-width text-center">性别</td><td></td>
									</tr>
									<tr>
										<td class="td-width text-center">院系/专业</td><td></td>
										<td class="td-width text-center">宿舍地址</td><td></td>
									</tr>
									<tr>
										<td class="td-width text-center">手机</td><td></td>
										<td class="td-width text-center">QQ</td><td></td>
									</tr>
									<tr>
										<td class="td-width text-center">邮箱地址</td><td></td>
										<td class="td-width text-center">微博</td><td></td>
									</tr>
									<tr>
										<td class="td-width text-center">特长或爱好</td><td colspan='3'></td>
									</tr>
									<tr>
										<td class="td-width text-center">曾任职务<br>或经历</td><td colspan='3'></td>
									</tr>
									<tr>
										<td class="td-width text-center">个人介绍</td><td colspan='3'></td>
									</tr>
									<tr>
										<td class="td-width text-center">申请类型</td><td colspan='3'></td>
									</tr>
									<tr>
										<td class="td-width text-center">第一志愿</td><td colspan='3'></td>
									</tr>
									<tr>
										<td class="td-width text-center">第一志愿<br>理由</td><td colspan='3'></td>
									</tr>
									<tr>
										<td class="td-width text-center">第二志愿</td><td colspan='3'></td>
									</tr>
									<tr>
										<td class="td-width text-center">第二志愿<br>理由</td><td colspan='3'></td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">返回</button>
						<!--	<input type="button" class="btn btn-danger" value="删除">-->
						</div>
					</div>
				</form>
			</div><!-- /.modal-content -->
		</div><!-- /.modal-dialog -->
	</div><!-- /.modal -->

	<!--弹出修改物资资料的编辑框-->
	<div class="modal fade " id="materials_edit_modal" data-id="-1" data-seid="-1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog  text-left">
			<div class="modal-content">
				<div class="modal-header my-modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel"><b>物资详细资料</b></h4>
				</div>
				<form role="form">
					<div class="modal-body">
						<div class="row">
							<center><img src="#" class="img-thumbnail photo-box" alt="无法获取图片"/></center>
							<div class="imgfile">
								<input type="file" id="materialsimg" class="img-review"name="materialsimg"  data-upload="yes" onchange="Common.PreviewImg(this)"/>
							 </div>
							 <span id="materials-span"></span>
							 <span></span><!--错误信息提示-->
						</div>
						<div class="form-group">
							<label>物资名</label>
							<input type="text" class="form-control">
						</div>
						<div class="form-group">
							<label>物资描述</label>
							<textarea class="form-control mytextarea"></textarea>
						</div>
						<div class="form-group">
							<div class="row">
								<div class="col-lg-6 col-xs-6">
									<label>物资数量</label>
									<input type="text" class="form-control">
								</div>
								<div class="col-lg-6 col-xs-6">
									<label>物资单价</label>
									<input type="text" class="form-control">
								</div>
							</div>
						</div>
						<div class="form-group">
							<div class="row">
								<div class="col-lg-6 col-xs-6">
									<label>联系人</label>
									<input type="text" class="form-control">
								</div>
								<div class="col-lg-6 col-xs-6">
									<label>联系电话</label>
									<input type="text" class="form-control">
								</div>
							</div>
						</div>
						<div class="form-group">
							<label>备注</label>
							<textarea class="form-control mytextarea"></textarea>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">返回</button>
							<button type="button" class="btn btn-success" id="send-materials">提交</button>
						</div>
					</div>
				</form>
			</div><!-- /.modal-content -->
		</div><!-- /.modal-dialog -->
	</div><!-- /.modal -->

	<!--弹出修改物资资料的查看框-->
	<div class="modal fade " id="market_view_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog  text-left">
			<div class="modal-content">
				<div class="modal-header my-modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel"><b>物资详细资料</b></h4>
				</div>
				<form role="form">
					<div class="modal-body">
						<table class="mytable mytable2 table-bordered">
							<tbody>
								<tr>
									<td class="td-width text-center">物资名</td><td class="td-width2" data-sort="3"></td>
									<td rowspan='6' colspan='2' data-sort="2"><img src="#" class="img-thumbnail photo-box" alt="无法获取图片"></td>
								</tr>
								<tr>
									<td class="td-width text-center important">所属社团</td><td class="text-center" data-sort="1"></td>
								</tr>
								<tr>
									<td class="td-width text-center">物资数量</td><td class="text-center" data-sort="5"></td>
								</tr>
								<tr>
									<td class="td-width text-center">物资单价</td><td class="text-center" data-sort="6"></td>
								</tr>
								<tr>
									<td class="td-width text-center">联系人</td><td class="text-center" data-sort="7"></td>
								</tr>
								<tr>
									<td class="td-width text-center">联系电话</td><td class="text-center" data-sort="8"></td>
								</tr>
								<tr>
									<td class="td-width text-center">物资描述</td><td colspan='3' data-sort="4"></td>
								</tr>
								<tr>
									<td class="td-width text-center">备注</td><td colspan='3' data-sort="9"></td>
								</tr>
							</tbody>
						</table>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">返回</button>
						</div>
					</div>
				</form>
			</div><!-- /.modal-content -->
		</div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
	<?php
	if($seid==0){//高级管理员可以编辑社团账号信息
print <<<EOT
	<div class="modal fade" id="acount_edit_modal" data-seid="-1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog  text-left mymodal1">
			<div class="modal-content">
				<div class="modal-header my-modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel">编辑社团账号信息</h4>
				</div>
				<div class="modal-body modal-bottom">
					<span></span><!--提示信息-->
					<div class="row">
						<center><img src="#" class="img-thumbnail photo-box" data-edit="yes" alt="点击加号添加图片"></center>
						<div class="imgfile">
							<input type="file" id="imglogo" name="imglogo" data-upload="yes" onchange="Common.PreviewImg(this)"/>
						 </div>
					</div>
					<div class="form-group">
						<label>社团名称</label>
						<input type="text" class="form-control" data-edit="yes">
					</div>
					<div class="form-group">
						<label for="edit_short">社团简称</label>
						<input type="text" class="form-control"  data-edit="yes">
					</div>
					<div class="form-group">
						<label for="edit_short">选择社团类型</label>
						<select class="form-control"  data-edit="yes">
							<option value="0">文娱体育类</option>
							<option value="1">理论学习类</option>
							<option value="2">兴趣爱好类</option>
							<option value="3">学术科技类</option>
							<option value="4">社会实践类</option>
							<option value="5">院系社联类</option>
						</select>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-success" id="send-changeacount">提交</button>
				</div>
			</div><!-- /.modal-content -->
		</div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
	<!--社联更改社团的登录信息-->
	<div class="modal fade " id="user_edit_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog  text-left  mymodal">
			<div class="modal-content">
				<div class="modal-header my-modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel">编辑社团登陆信息</h4>
				</div>
				<form role="form">
					<div class="modal-body">
						<span id="userchange-tip"></span><!--显示提示信息-->
						<div class="form-group">
							<label>管理员密码</label>
							<input type="password" class="form-control" data-edit="yes" placeholder="管理员密码">
						</div>
						<div class="form-group">
							<label>设置登录名</label>
							<input type="text" class="form-control"  data-edit="yes" placeholder="输入社团登陆账号">
						</div>
						<div class="form-group">
							<label>设置登陆密码</label>
							<input type="password" class="form-control"  data-edit="yes" placeholder="输入社团登陆密码">
						</div>
						<div class="form-group">
							<label>确认登陆密码</label>
							<input type="password" class="form-control"  data-edit="yes" placeholder="确认登陆密码">
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
							<input type="button" class="btn btn-success" value="提交" id="send-changeuser">
						</div>
					</div>
				</form>
			</div><!-- /.modal-content -->
		</div><!-- /.modal-dialog -->
	</div><!-- /.modal -->

	<!--社联更改社团事务流程-->
	<div class="modal fade " id="business_edit_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog  text-left  mymodal">
			<div class="modal-content">
				<div class="modal-header my-modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel">编辑社团事务流程</h4>
				</div>
				<form role="form">
					<div class="modal-body">
						<span class="span-hidden"></span><!--存放社团事务的id-->
						<span class="span-hidden"></span><!--存放社团类型的tpye-->
						<div class="form-group">
							<label>输入事务流程的子类型</label>
							<input type="text" class="form-control"name="childpart"id="childpart" placeholder="事务流程子类型">
						</div>
						<div class="form-group">
							<label></label>
							<textarea type="text" class="form-control"name="firstrow"id="firstrow" placeholder="类型说明"></textarea>
						</div>
						<div class="form-group">
							<label></label>
							<textarea type="text" class="form-control"name="secondrow"id="secondrow" placeholder="备注信息"></textarea>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
							<input type="button" class="btn btn-success" value="提交" id="send-changebusiness">
						</div>
					</div>
				</form>
			</div><!-- /.modal-content -->
		</div><!-- /.modal-dialog -->
	</div><!-- /.modal -->

	<!--社联更改会员意见收集邮箱-->
	<div class="modal fade " id="mail_edit_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog  text-left  mymodal">
			<div class="modal-content">
				<div class="modal-header my-modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel">编辑会员意见收集邮箱</h4>
				</div>
				<form role="form">
					<div class="modal-body">
						<span id="mail-tip"></span><!--显示提示信息-->
						<div class="form-group">
							<label>输入邮箱账号</label>
							<input type="text" class="form-control"name="childpart"id="childpart" placeholder="输入邮箱账号">
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
							<input type="button" class="btn btn-success" value="提交" id="send-changemail">
						</div>
					</div>
				</form>
			</div><!-- /.modal-content -->
		</div><!-- /.modal-dialog -->
	</div><!-- /.modal -->

	<!--社联上传文件-->
	<div class="modal fade " id="file_edit_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog  text-left  mymodal">
			<div class="modal-content">
				<div class="modal-header my-modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel">上传文件</h4>
				</div>
				<div class="modal-body">
					<span id="file-span"></span></br><!--显示提示信息-->
					文件列表：
					<table id="file-list">
						<tbody>
						</tbody>
					</table>
					<div id="addfilearea">
						<div class='imgfile'>
							<input type='file' id="file1" name="file1" value='上传文件'" onchange="ShetuanManager.FileChange(this)">
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
						<button type="button" class="btn btn-success" value="上传" id="send-uploadfile">上传</buttom>
					</div>
				</div>
			</div><!-- /.modal-content -->
		</div><!-- /.modal-dialog -->
	</div><!-- /.modal -->

EOT;
	}
?>
</div>





