<?php  
include('../test/wxdb.php');//加入数据库文件
header("cache-control:no-cache,must-revalidate");
header("Content-Type:text/html;charset=utf-8"); 
$register="shetuan_register";//报名表
$post_table="shetuan_forum_post";//发帖
$reply_table="shetuan_forum_reply";//回复人表
$interact_table="shetuan_forum_interact";//互动人表

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
?>







