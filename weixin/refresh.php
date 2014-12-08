<?php  
include('wxdb.php');//加入数据库文件
header("cache-control:no-cache,must-revalidate");
header("Content-Type:text/html;charset=utf-8"); 
$info="shetuan_info";//社团资料
$action="shetuan_action";//社团活动
$photo="shetuan_photo";//社团相册
$business="shelian_business";//社团事务流程
$register="shetuan_register";//报名表

if(isset($_POST['addchoice'])){//添加操作
	if($_POST['addchoice']=="addregister"){//添加报名
		$allinputval=$_POST['allinputval'];
		$n=count($allinputval);
		$values="";
		$attributes="seid,name,sex,major,dorm_addr,phone,qq,mail,sina_wechat,hobbies,experience,".
						"self_introduction,type,first_wish,firstreason ,second_wish,second_reason";
		for($i=0;$i<$n;$i++)//值
			if($i==$n-1)
				$values.="'{$allinputval[$i]}'";
			else
				$values.="'{$allinputval[$i]}',";
		$condition="where phone='{$allinputval[5]}'";//一个电话号码只能报名一次
		$phone=WXDB::getSomething("phone",$register,$condition);
		if(empty($phone)){
			$success = WXDB::addOne($register, $attributes, $values);//添加账号
			if($success)
				echo json_encode("addsuccess");
			else
				echo json_encode("addfail".$values);
		}
		else
			echo json_encode("repeat");//已报名
	}
}

if(isset($_GET['getdata'])){
	$getdata=$_GET['getdata'];
	$seid=$_GET['seid'];
	$id=$_GET['id'];
	$type=$_GET['type'];
	if($getdata=="photo"){
		$condition="where {$photo}.seid='{$seid}' and {$info}.seid={$photo}.seid";
		$arr = WXDB::getSomething("{$info}.name,{$photo}.*", "{$photo},{$info}", $condition);
		echo json_encode($arr);
	}
	else if($getdata=="info"){
		$condition="where seid={$seid}";
		$arr = WXDB::getSomething("*", $info, $condition);
		echo json_encode($arr[0]);
	}
	else if($getdata=="allinfo"){
		if($type == -1){
			$arr0 = WXDB::getSomething("*", $info,'where isdelete=0 and seid != 0');
			$arr = array(array(0,array()),array(1,array()),array(2,array()),array(3,array()),array(4,array()),array(5,array()));
			$n=count($arr0);
			$i0=$i1=$i2=$i3=$i4=$i5=0;
			for($i = 0 ; $i < $n ; $i++){
				$type_db = $arr0[$i]['type'];
				switch($type_db){
					case 0:$arr[0][1][$i0]=$arr0[$i];$i0++;break;
					case 1:$arr[1][1][$i1]=$arr0[$i];$i1++;break;
					case 2:$arr[2][1][$i2]=$arr0[$i];$i2++;break;
					case 3:$arr[3][1][$i3]=$arr0[$i];$i3++;break;
					case 4:$arr[4][1][$i4]=$arr0[$i];$i4++;break;
					case 5:$arr[5][1][$i5]=$arr0[$i];$i5++;break;
				}
			}
		}
		else{
			$arr=array(array($type));
			$condition="where type={$type} and isdelete=0 and seid != 0";
			$arr0 = WXDB::getSomething("*", $info, $condition);
			$arr[0][1] = $arr0;
		}
		echo json_encode($arr);
	}
	else if($getdata=="action-seid"){
		$condition="where {$action}.seid='{$seid}' and {$info}.seid={$action}.seid";
		$arr = WXDB::getSomething("{$info}.name,{$action}.*", "{$action},{$info}", $condition);
		echo json_encode($arr);
	}
	else if($getdata=="action-id"){
		$condition="where id='{$id}'";
		$arr = WXDB::getSomething("*", "{$action}", $condition);
		echo json_encode($arr);
	}
}
?>







