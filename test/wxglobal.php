<?php
define("OPINION_PIC_URL", "http://bcs.duapp.com/shelian/shelian.jpg");
define("OPINION_URL", "http://www.scnutn.com/shelian_weixin/test/wxhtml/CollectionFormWx.html");
define("OPINION_DESCRIPT", "亲爱的会员，感谢您成为我们学校纵多社团会员的一份子，为更好地维护您的权益，我们会员部特设立会员意见收集系统为您提供更多的反馈渠道。");

define("SERVPROCESS_PIC_URL","http://bcs.duapp.com/shelian/servprocess.jpg");
define("EXAMINE_DESCRIPT", "审批流程说明");
define("CLUBACTIVE_DESCRIPT","各种社团活动类型说明");
define("APPLY_DESCRIPT", "各类申请说明");
define("MAS_DESCRIPT", "物资借用与申请场地须知");

//回退处理的javascript 方程

function dealcheck($result, $url){
	echo "<script type='text/javascript'>"; 
	echo "alert('{$result}');";
	echo "window.location.href='{$url}';";
	echo "</script>";
}
?>