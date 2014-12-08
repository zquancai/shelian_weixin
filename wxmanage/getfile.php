<?php
	function getFileList(){
		$dir=dirname(__FILE__)."./shetuan_file";//这里输入其它路径
		$handle=opendir($dir.".");//PHP遍历文件夹下所有文件
		$array_file = array();//定义用于存储文件名的数组
		$i=0;
		while (false !== ($file = readdir($handle))){
			if ($file != "." && $file != "..") {
			$filepath="shetuan_file/{$file}";
		//	iconv是转码函数
			$array_file[$i]=array();
			$array_file[$i][0]=iconv("GBK","UTF-8",$file);//文件名
			$array_file[$i][1]=floor(filesize($filepath)/1000)."KB";//文件大小
			$array_file[$i][2]=date("Y-m-d H:i:s",filemtime($filepath));//文件上传时间
		//	$array_file[$i][2]=filetype("shetuan_file/10101010.docx");
			$i++;
			}
		}
		closedir($handle);
		foreach($array_file as $k=>$v)
			$time[$k] = $v[2];
		array_multisort($time,SORT_DESC,SORT_STRING, $array_file);//按时间排序
		return $array_file;//返回文件信息的数组
	}
	if(isset($_POST['fileop'])&&$_POST['fileop']=="getfile")
		echo  json_encode(getFileList());
?>