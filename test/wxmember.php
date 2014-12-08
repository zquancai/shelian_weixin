<?php
	include('wxheader.php');
?>
<script src="wxjs/huiyuanForm.js"></script>
<body onLoad="OtherQuestion0(); ChangeKind();">
<!--头部，悬浮不动-->
<?php NavHTML(6,"社团联合会",0);//菜单?>
<div class="pre_navigate">
	<div class="navigate">
		<div class="content">
			<center><label><b>会员意见收集系统</b></label></center><hr>
			<label>带<span class="important">*</span>号的为必填哦！<br></label>
			<form name="form"action="http://saunion.scnu.edu.cn/OpinionCollectSystem/php/FormHandler.php" method="post">
				<div class="form-group">
					<label ><span class="important">*</span>姓名</label>
					<input type="text" class="form-control" placeholder="请输入您的姓名" name="StudentName" />
				</div>
				<div class="form-group">
					<label >微博</label>
					<input type="text" class="form-control" placeholder="请输入您的微博" name="Weibo">
				</div>
				<div class="form-group">
					<label><span class="important">*</span>联系电话</label>
					<input type="text" class="form-control" placeholder="输入您的电话号码" name="PhoneNumber" />
				</div>
				<div class="form-group">
					<label><span class="important">*</span>邮箱</label>
					<input type="text" class="form-control" placeholder="输入您的邮箱" name="Email" />
				</div>
				<div class="form-group">
					<label><span class="important">*</span>所在社团</label>
					<input type="text" class="form-control" placeholder="输入您所在的社团" name="Organization"/>
				</div>
				<div class="form-group">
					<label><span class="important">*</span>您的身份是</label>
						<label for="Kind1">
							<input type="radio" id="Kind1" name="Kind" value="会员" checked="checked" onclick="ChangeKind()"/> 
							会员
						</label>
					<label for="Kind2">
						<input type="radio" id="Kind2" name="Kind" value="社团" onclick="ChangeKind()" />
                        社团负责人
					</label>
				</div>
				<div class="form-group">
				<label id='FormKind0'>
					<label><span class="important">*</span>问题类别</label>
						<label for="caiwu">
							<input type="radio" id="caiwu" name="Complain" value="财务管理" onclick="OtherQuestion0()" />
							财务管理
						</label>
						<label for="huodong">
							<input type="radio" id="huodong" name="Complain" value="活动开展" onclick="OtherQuestion0()" /> 
							活动开展
						</label>
						<label for="minzhu">
							<input type="radio" id="minzhu" name="Complain" value="民主机制" onclick="OtherQuestion0()" /> 
							民主机制
						</label>
						<label for="Complain4">
							<input type="radio" id="Complain4" name="Complain" value="其他" onclick="OtherQuestion0()" /> 
							<span id="other1">
								其他
							</span>
						</label>
				</label>
				<label id='FormKind1'>
					<label><span class="important">*</span>问题类别</label>
					<label for="zhidu"> 
						<input type="radio" id="zhidu" name="Complain" value="社团工作制度" onclick="OtherQuestion1()" /> 
						社团工作制度
					</label>
					<label for="shixiang"> 
						<input type="radio" id="shixiang" name="Complain" value="社团日常工作相关事项" onclick="OtherQuestion1()" /> 
						社团日常工作相关事项
					</label>
					<label for="xiaolue"> 
						<input type="radio" id="xiaolue" name="Complain" value="社联工作效率" onclick="OtherQuestion1()" /> 
						社联工作效率
					</label>
					<label for="Complain8"> 
						<input type="radio" id="Complain8" name="Complain" value="其他" onclick="OtherQuestion1()" /> 
							<span  id="other2">
								其他
							</span>
					</label>
				</label>
				</div>
				<div class="form-group">
					<label><span class="important">*</span>紧急程度</label>
					<label for="yiban">
						<input type="radio" id="yiban" name="DegreeOfEmergency" value="0" checked="checked" class="necessary" />
						一般
					</label>
					<label for="jinji">
						<input type="radio" id="jinji" name="DegreeOfEmergency" value="1" />
						紧急
					</label>
				</div>
				<div class="form-group">	
					<label><span class="important">*</span>简述事情的经过</label>
					<textarea id="editor1"  class="form-control" name="Process" placeholder="简要叙述事情的经过" wrap="virtual"></textarea>
				</div>
				<div class="form-group">
					<label>相关依据（选填）</label>
					<textarea id="editor2"  class="form-control" placeholder="可以不填" name="Evidence" wrap="virtual"></textarea>
				</div>
				<div class="form-group">		
					<label><span class="important">*</span>期望解决的方式</label>
					<textarea id="editor3"  class="form-control" placeholder="可以不填" name="Suggestion" wrap="virtual"></textarea>
				</div>
				<div class="form-group">
					<input type="submit" class="w-button" value="提交" onClick="javascript:return CheckForm(form)">
				</div>
			</form>
		</div>
	</div>
</div>
<?php include('wxfooter.php');?>
</body>
</html>