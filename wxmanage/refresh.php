<?php  
include('../weixin/wxdb.php');//加入数据库文件
//include('upload.php');//上传文件的函数
if((isset($_GET['seid'])&&$_GET['seid']!=-1) || (isset($_POST['seid'])&&$_POST['seid']!=-1)){
	if(isset($_GET['seid']))
		$seid=$_GET['seid'];
	else
		$seid=$_POST['seid'];
}
else{
	session_start();//开启session
	$seid=$_SESSION['seid'];//从session获取社团编号
}
header("cache-control:no-cache,must-revalidate");
header("Content-Type:text/html;charset=utf-8"); 
$user="shelian_user";//用户，用于修改密码
$info="shetuan_info";//社团资料
$action="shetuan_action";//社团活动
$photo="shetuan_photo";//社团相册
$materials="shetuan_materials";//社团物资
$business="shelian_business";//社团事务流程
$mail="scnutn_config";//会员意见收集
$register="shetuan_register";//报名表
$type=array("文娱体育类","理论学习类","兴趣爱好类","学术科技类","社会实践类","院系社联类");
function AddPHA($str){//将关键字拼接成”%字%字%“的形式
	$strlen=mb_strlen($str,"utf-8");
	$str0="%";
	$i=0;
	while($i<$strlen){
		$str0=$str0.mb_substr($str,$i,1,"utf-8")."%";
		$i++;
	}
	return $str0;
}
function DeleteFile($filepath){
	if(!empty($filepath))//存在原链接
		unlink($filepath);//删除原链接的文件
}
if(isset($_GET["info_nav"])){//是获取信息的操作
	$condition="where seid='{$seid}'";//连接用户表和社团资料表，获得登录名
	if($_GET["info_nav"]==-1){//获取社团列表
		$isdelete=$_GET["isdelete"];
		$arr00 = WXDB::getSomething("*",$info,"where isdelete={$isdelete} order by vistcount desc");
		echo json_encode($arr00);
	}
	else if($_GET["info_nav"]=="0"){//社团资料
		$arr0 = WXDB::getSomething("*",$info,$condition);
		echo json_encode($arr0);
	}
	else if($_GET["info_nav"]=="2"){//社团活动
		$arr2 = WXDB::getSomething("*",$action,$condition);
		echo json_encode($arr2);
	}
	else if($_GET["info_nav"]=="3"){//社团相册
		$arr3 = WXDB::getSomething("*",$photo,$condition);
		echo json_encode($arr3);
	}
	//社团事务流程,返回对应的流程,type为要返回的流程类型
	else if($_GET["info_nav"]=="4"&&isset($_GET["part"])){
		$part=$_GET["part"];//类型
		$arr4 = WXDB::getSomething("*",$business,"where part='{$part}'");
		echo json_encode($arr4);
	}
	//社团信箱
	else if($_GET["info_nav"]=="5"){
		if(isset($_GET["id"])){//获取详细信息
			$id=$_GET["id"];//id值
			$arr5 = WXDB::getSomething("*",$register,"where id='{$id}'");
			echo json_encode($arr5[0]);//返回查找到的数据
		}
		else{
			$arr5 = WXDB::getSomething("*",$register,$condition);
			echo json_encode($arr5);
		}
	}
	else if($_GET["info_nav"]=="6"){//社团物资
		if($_GET["market"]=="yes"){
			$page_order=$_GET['page_order'];//页面编号
			$page_start=($page_order-1)*10;
			$n=WXDB::getSomething("count(*)",$materials);//计算物资数量
			$n=ceil($n[0][0]/10);//向上取整
			$m_values="{$materials}.id,{$info}.name,{$materials}.mname,{$materials}.minfo,{$materials}.murl,".
								"{$materials}.amount,{$materials}.mprice,{$materials}.contact,{$materials}.phone,{$materials}.remark";
			$arr6 =  WXDB::getSomething($m_values,"{$materials},{$info}","where {$materials}.seid={$info}.seid limit {$page_start},10");//选择所有
			$arr6[0][0]=$n;//物资数量保存在data[0][0]中
		}
		else
			$arr6 =  WXDB::getSomething("*",$materials,"where seid='{$seid}'");
		echo json_encode($arr6);
	}
	else if($_GET['info_nav']=="7"){//获取邮箱
		$mail = WXDB::getSomething("email1",$mail,"where username='2'");
		$mail=$mail[0][0];
		echo json_encode($mail);
	}
}

//更新、添加功能
if(isset($_POST['changetype'])){
	$changetype=$_POST['changetype'];
	$changearray=$_POST['edit'];
	if($changetype=='changeinfo'){
		$brief=$changearray[0];//简介
		$introduction=$changearray[1];//社团介绍
		$part=$changearray[2];//社团部门介绍
		$update="brief='{$brief}',introduction='{$introduction}',part='{$part}'";
		$condition="where seid={$seid}";
		$success=WXDB::updateSomething($update,$info,$condition);//更新社团资料
		if($success) echo json_encode("changesuccess"); //修改成功返回success字符串
		else echo json_encode("changefail");
	}
	else if($changetype=="changeaction"){
		$id=$changearray[0];//id
		$eventname=$changearray[1];//活动名
		$eventinfo=$changearray[2];//活动介绍
		$img1=$changearray[3];//活动照片1地址
		$img1_info=$changearray[4];
		$img2=$changearray[5];//活动照片2地址
		$img2_info=$changearray[6];
		if($id!=-1){//活动修改
			$update="eventname='{$eventname}',eventinfo='{$eventinfo}',".
							"img1_info='{$img1_info}',img2_info='{$img2_info}'";
			$condition="where id={$id}";
			if($img1!="#"){//修改了图片的链接
				$oldimg1=WXDB::getSomething("img1",$action,$condition);
				if(!empty($oldimg1[0][0]))//存在原链接
					unlink($oldimg1[0][0]);//删除原链接的文件
				$update="{$update},img1='../wxmanage/{$img1}'";
			}
			if($img2!="#"){
				$oldimg2=WXDB::getSomething("img2",$action,$condition);
				if(!empty($oldimg2[0][0]))//存在原链接
					unlink($oldimg2[0][0]);//删除原链接的文件
				$update="{$update},img2='../wxmanage/{$img2}'";
			}
			$success= WXDB::updateSomething($update, $action, $condition);
			if($success)
				echo  json_encode("changesuccess");
			else
				echo json_encode('changefail');
		}
		else{ //活动添加
			$values = "'".$seid."','".$eventname."','".$eventinfo.
							"','".$img1."','".$img1_info."','".$img2."','".$img2_info."'";
			$success = WXDB::addOne($action, "seid,eventname,eventinfo,img1,img1_info,img2,img2_info", $values);
			if($success)
				echo  json_encode("addsuccess");
			else
				echo json_encode("addfail");
		}
	}
	else if($changetype=="changephoto"){
		$id=$changearray[0];//id
		$imgurl=$changearray[1];//相片地址
		$imginfo=$changearray[2];//相片描述
		if($id!=-1){//修改相册
			$update="imginfo='{$imginfo}'";
			$condition="where id={$id}";
			if($imgurl!="#"){//修改了图片的链接
				$oldimg=WXDB::getSomething("imgurl",$photo,$condition);
				if(!empty($oldimg[0][0]))//存在原链接
					unlink($oldimg[0][0]);//删除原链接的文件
				$update="{$update},imgurl='{$imgurl}'";
			}
			$success= WXDB::updateSomething($update, $photo, $condition);
			if($success)
				echo  json_encode("changesuccess");
			else
				echo json_encode("changefail");
		}
		else{//添加新照片
			$values = "'{$seid}','{$imgurl}','{$imginfo}'";
			$success = WXDB::addOne($photo, "seid,imgurl,imginfo", $values);
			if($success)
				echo json_encode("addsuccess");
			else
				echo json_encode("addfail");
		}
	}
	else if($changetype=="changematerials"){
		$id=$changearray[0];//id
		$murl=$changearray[1];//物资照片地址
		if($id!=-1){//修改
			$update="mname='{$changearray[2]}',minfo='{$changearray[3]}',".
							"amount='{$changearray[4]}',mprice='{$changearray[5]}',".
								"contact='{$changearray[6]}',phone='{$changearray[7]}',remark='{$changearray[8]}'";
			$condition="where id={$id}";
			if($murl!="#"){//修改了图片的链接
				$oldimg=WXDB::getSomething("murl",$materials,$condition);
				if(!empty($oldimg[0][0]))//存在原链接
					unlink($oldimg[0][0]);//删除原链接的文件
				$update="{$update},murl='{$murl}'";
			}
			$success= WXDB::updateSomething($update, $materials, $condition);
			if($success)
				echo  json_encode("changesuccess");
			else
				echo json_encode("changefail");
		}
		else{//添加新物资
			$values = "'{$seid}','{$changearray[2]}','{$changearray[3]}','{$murl}','{$changearray[4]}',".
								"'{$changearray[5]}','{$changearray[6]}','{$changearray[7]}','{$changearray[8]}'";
			$success = WXDB::addOne($materials, "seid,mname,minfo,murl,amount,mprice,contact,phone,remark", $values);
			if($success)
				echo json_encode("addsuccess");
			else
				echo json_encode($materials_info);
		}
	}
	else if($changetype=="changepassword"){//更新密码
		$oldpassword=$changearray[0];
		$newpassword=$changearray[1];
		$surepassword=$changearray[2];
		$password = WXDB::getSomething("password",$user,"where seid='{$seid}'");
		$password =$password[0][0];//获取密码
		if(!empty($password)){
			if($oldpassword==$password){
				$update="password='{$newpassword}'";
				$condition="where seid={$seid}";
				$success=WXDB::updateSomething($update,$user,$condition);
				if($success) echo json_encode("success"); //密码修改成功返回success字符串
				else echo json_encode("fail");
			}
			else
				echo json_encode("passworderror");
		}
	}
	else if($changetype=="changeacount"){//更新社团账号信息
		$seid=$changearray[0];
		$img=$changearray[1];
		$name=$changearray[2];
		$short=$changearray[3];
		$type=$changearray[4];
		if($seid!=""){//有seid的操作是修改社团账号信息
			$update="name='{$name}',short='{$short}',type='{$type}'";
			$condition="where seid={$seid}";
			if($img!="#"){//修改了图片的链接
				$oldimg=WXDB::getSomething("img",$info,$condition);
				if(!empty($oldimg[0][0]))//存在原链接
					unlink($oldimg[0][0]);//删除原链接的文件
				$update="{$update},img='{$img}'";//在数据库中修改图片连接
			}
			$success= WXDB::updateSomething($update, $info, $condition);
			if($success)
				echo  json_encode("changesuccess");
			else
				echo json_encode("changefail");
		}
		else{//添加社团账号
			$username=$changearray[6];
			$password=$changearray[7];
			$values = "'{$name}','{$short}','{$img}','{$type}'";
			$success = WXDB::addOne($info, "name,short,img,type", $values);//添加账号
			$update="seid=id";
			$condition="where name='{$name}'";
			$success1 = WXDB::updateSomething($update, $info, $condition);//添加社团编号，就是id值
			if($success&&$success1)
				echo json_encode("addsuccess");
			else
				echo json_encode("addfail");
		}
	}
	else if($changetype=="changeuser"){
		$seid=$changearray[0];//社团编号
		$mpw=$changearray[1];//管理员密码
		$un=$changearray[2];
		$npw=$changearray[3];
		$mpwdb = WXDB::getSomething("password",$user,"where seid='0'");//高级管理员密码
		$mpwdb = $mpwdb[0][0];//获取密码
		$f=WXDB::getSomething("*",$user,"where username='{$un}'");//用户名不能重复
		if($f==null){
			if($mpwdb==$mpw){//判断管理员密码输入是否正确
				$update="username='{$un}',password='{$npw}'";
				$condition="where seid='{$seid}'";
				$e=WXDB::getSomething("*",$user,$condition);
				if($e!=null)//已存在账户
					$success=WXDB::updateSomething($update,$user,$condition);
				else
					$success=WXDB::addOne($user,"username,password,seid","'{$un}','{$npw}','{$seid}'");
				if($success) echo json_encode("changesuccess"); //密码修改成功返回success字符串
				else echo json_encode("changefail");
			}
			else
				echo json_encode("mpwerror");
		}
		else
			echo json_encode("exist");//已存在相同账户名
	}
	else if($changetype=="reduction"){//还原社团账户
		$condition="where seid={$changearray[0]}";
		$success0= WXDB::updateSomething("isdelete=0", $user, $condition);//改变字段值，说明该社团已被删除
		$success1= WXDB::updateSomething("isdelete=0", $info, $condition);
		if($success0 && $success1)
			echo json_encode("reductionsuccess");
		else
			echo json_encode("reductionfail：".$condition);
	}
	else if($changetype=="changemail"){
		$condition="where username='2'";
		$newmail=$changearray[0];//新的邮箱
		$update="email1='{$newmail}'";
		$success=WXDB::updateSomething($update,$mail,$condition);//更新会员意见收集邮箱
		if($success) echo json_encode("changesuccess"); //修改成功返回success字符串
		else echo json_encode("changefail");
	}
	else if($changetype=="changeisopen"){
		$isopen=$changearray[0];
		$condition="where seid={$seid}";
		$success=WXDB::updateSomething("isopen='{$isopen}'",$info,$condition);//更新社团资料
		if($success) echo json_encode("changeisopen"); //修改成功返回success字符串
		else echo json_encode("changefail".$seid);
	}
}

//删除操作，删除活动、删除相片、删除社团、删除文件、删除报名表、删除物资
if(isset($_POST['deletetype'])){
	$id=$_POST['deleteid'];
	$condition="where id={$id}";
	if($_POST['deletetype']=="deletephoto"){//删除相片
		$img = WXDB::getSomething("imgurl",$photo,$condition);
		if($img[0][0]!="#")//有图片才可以删除)
			unlink($img[0][0]);//删除原文件
		$delsucc = WXDB::deleteOne($photo, $condition);
		if($delsucc) echo json_encode("deletesuccess");
		else echo json_encode("deletefail");
	}
	else if($_POST['deletetype']=="deleteaction"){//删除活动
		$img = WXDB::getSomething("img1,img2",$action,$condition);
		$n=count($img);
		for($i=0;$i<$n;$i++)
			if($img[0][$i]!="#")//有图片才可以删除
				unlink($img[0][$i]);//删除文件
		$delsucc = WXDB::deleteOne($action, "where id={$id}");
		if($delsucc) echo json_encode("deletesuccess");
		else echo json_encode("deletefail");
	}
	else if($_POST['deletetype']=="deletematerials"){
		$murl = WXDB::getSomething("murl",$materials,$condition);
		if($murl[0][0]!="#")
			unlink($murl[0][0]);
		$deletesuccess = WXDB::deleteOne($materials, $condition);
		if($deletesuccess) echo json_encode("deletesuccess");//删除成功
		else echo json_encode("deletefail"+$condition);//删除失败
	}
	else if($_POST['deletetype']=="deleteacount"){//删除社团账户，以及该账户的所有信息
		$condition="where seid={$id}";//在用户列表中，id=seid
		$actionimgurl = WXDB::getSomething("img1,img2",$action,$condition);//取出该社团活动的图片存储地址
		$nimg=count($actionimgurl);//获得活动个数
		for($i=0;$i<$nimg;$i++){
			if($actionimgurl[$i][0]!="inexistence")
				unlink($actionimgurl[$i][0]);//删除文件
			if($actionimgurl[$i][1]!="inexistence")
				unlink($actionimgurl[$i][1]);//删除文件
		}
		$delaction = WXDB::deleteOne($action, "where seid={$seid}");//删除活动
		$photoimgurl=WXDB::getSomething("imgurl",$photo,$condition);//取出该社团相册的图片存储地址
		$nimg=count($photoimgurl);
		for($i=0;$i<$nimg;$i++){
			if($photoimgurl[$i][0]!="inexistence")
				unlink($photoimgurl[$i][0]);//删除文件
		}
		$delphoto = WXDB::deleteOne($photo, $condition);//删除相册
		$delinfo = WXDB::deleteOne($info, $condition);//删除社团资料
		$deluser = WXDB::deleteOne($user, $condition);//删除社团用户
		if($delaction&&$delphoto&&$delinfo&&$deluser) echo json_encode("deletesuccess");
		else echo json_encode("deletefail");
	}
	else if($_POST['deletetype']=="deletefile"){//删除文件
		$filepath="shetuan_file/".$id;//文件路径
		$filepath=iconv("UTF-8","GBK",$filepath);//转码
		$deletesuccess=unlink($filepath);
		if($deletesuccess)
			echo json_encode("deletesuccess");
		else echo json_encode($filepath);
	}
	else if($_POST['deletetype']=="deleteregister"){//删除注册信息
		$deletesuccess = WXDB::deleteOne($register, $condition);
		if($deletesuccess) echo json_encode("deletesuccess");//删除成功
		else echo json_encode("deletefail");//删除失败
	}
	else if($_POST['deletetype']=="deleteacount0"){//将社团资料放进已删除社团列表
		$condition0="where seid={$id}";
		$success0= WXDB::updateSomething("isdelete=1", $user, $condition0);//改变字段值，说明该社团已被删除
		$success1= WXDB::updateSomething("isdelete=1", $info, $condition0);
		if($success0 && $success1)
			echo json_encode("deletesuccess");
		else
			echo json_encode("deletefail：".$condition0);
	}
}

//搜索社团、物资
if(isset($_POST['opsearch'])){
	$keyword=AddPHA($_POST['keyword']);
	if($_POST['opsearch']=="marketsearch")//物资搜索
		$arr = WXDB::getSomething("*",$materials,"where mname like '{$keyword}'");
	else//社团搜索
		$arr = WXDB::getSomething("seid,name",$info,"where name like '{$keyword}' and isdelete=0");
	echo json_encode($arr);//返回所有符合搜索条件的社团编号
}

if(isset($_POST['initall'])){//点击所有社团信息时，初始化社团信息
	$arr = WXDB::getSomething("seid,name",$info," where isdelete=0 order by seid asc limit 5");//取出前5个社团
	echo json_encode($arr);
}

//社团事务流程更新
if(isset($_POST['id_edit'])&&isset($_POST['childname_edit'])&&
	isset($_POST['firstrow_edit'])&&isset($_POST['secondrow_edit'])){
	$id=$_POST['id_edit'];//事务流程编号
	$child_name=$_POST['childname_edit'];//事务流程子类型名
	$first_row=$_POST['firstrow_edit'];//流程描述
	$second_row=$_POST['secondrow_edit'];//流程说明
	$update="child_name='{$child_name}',first_row='{$first_row}',second_row='{$second_row}'";
	$condition="where id={$id}";
	$success=WXDB::updateSomething($update,$business,$condition);//更新社团资料
	if($success) echo json_encode("updatesuccess"); //修改成功返回success字符串
	else echo json_encode("updatefail");
}
/*
//更改会员意见收集的邮箱账号
if(isset($_POST['op'])){
	$condition="where username='2'";
	if($_POST['op']=="changemail"){//更新操作
		$newmail=$_POST['collectmail'];//新的邮箱
		$update="email1='{$newmail}'";
		$success=WXDB::updateSomething($update,$mail,$condition);//更新会员意见收集邮箱
		if($success) echo json_encode("updatesuccess"); //修改成功返回success字符串
		else echo json_encode("updatefail");
	}
	else if($_POST['op']=="getmail"){//获得邮箱账号
		$mail = WXDB::getSomething("email1",$mail,$condition);
		$mail=$mail[0][0];//原来的会员意见收集邮箱
		echo json_encode($mail);
	}
}*/

//导出社团信箱的表格
if(isset($_GET['exportfile'])&&$seid!=""){
	$condition="where seid='{$seid}'";
	$result=WXDB::getSomething("*",$register,$condition);//获得报名表
	$name=WXDB::getSomething("name",$info,$condition);//获取社团名
	$name=$name[0][0];
	$time=date("Y年m月d日");//导出的文件名
	$filename = "{$name}新生报名表({$time}).xls";
	$n=count($result);
	$str="姓名,性别,专业,宿舍地址,电话号码,QQ,邮箱,微博微信,爱好特长,".
				"职务经历,个人介绍,申请类型,第一志愿,第一志愿理由,第二志愿,第二志愿理由\r\n";
	$m=count($result[0]);
	foreach($result as $value){
		for($i=2;$i<$m;$i++)
			$str .= "{$value[$i]},";
		$str .= "\r\n";
	}
	exportExcel($filename,$str); 
}
function exportExcel($filename,$content){ 
	header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
	header("Content-Type: application/vnd.ms-execl"); 
	header("Content-Type: application/force-download"); 
	header("Content-Type: application/download"); 
	header("Content-Disposition: attachment; filename=".$filename); 
	header("Content-Transfer-Encoding: UTF-8"); 
	header("Pragma: no-cache"); 
	header("Expires: 0"); 
	print $content; 
} 
?>







