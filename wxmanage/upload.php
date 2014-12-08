<?php
	header("cache-control:no-cache,must-revalidate");
	header("Content-Type:text/html;charset=utf-8"); 
	function FoundFolder($folderpath){//$foldername为新建的文件夹路径，如果存在则返回存在的文件夹路径，不存在则创建该文件夹
		if(!is_dir($folderpath)){//判断路径下是否存在文件夹名为$folderpath
		//	echo "成功创建文件夹dir";
			mkdir($folderpath, 0700);//创建一个文件夹， 0777指意味着最大可能的访问权。
		}
		return $folderpath;
	}
	function UploadFile($inputfile,$folderpath,$filename){//文件上传，inputfile为input的name属性名
	//	$folderpath=FoundFolder($folderpath);
		if ($_FILES[$inputfile]["error"] > 0)
		{
			return "Return Code: " . $_FILES[$inputfile]["error"] . "<br />";
		}
		else
		{
			$filetype = pathinfo($_FILES[$inputfile]["name"], PATHINFO_EXTENSION);//获取后缀 
			if($filename!="")//有重新命名
				$filename = $filename.".".$filetype; //构建新名称
			else
				$filename=iconv("UTF-8","GBK",$_FILES[$inputfile]["name"]);//转码
			move_uploaded_file($_FILES[$inputfile]["tmp_name"],
			"{$folderpath}/" . $filename);
			return "{$folderpath}/" . $filename;//返回存储路径
		}
	}
	function GetServerPath($change){
		switch($change){
			case 'action':return 'action_images';break;
			case 'photo':return 'photo_images';break;
			case 'materials':return 'materials_images';break;
			case 'acount':return 'acount_images';break;
			default:return 'images';
		}
	}
	if(isset($_GET['change'])){//上传社团活动的照片
		$serverpath=GetServerPath($_GET['change']);//
		$img=split(',',$_GET['img']);//input的name属性值
		$n=count($img);
		$arr=array();
		for($i=0;$i<$n;$i++){
			$arr[$i]='unchanged';//未改变图片
			if($img[$i]!='unchanged'){
				$filename=date("Ymd").rand();//文件名，以上传时间命名+
				$arr[$i]=UploadFile($img[$i],$serverpath,$filename);
			}
		}
		echo  json_encode($arr);//返回文件的存放路径*/
	}
	/*
	
	
	
	
	
	if(isset($_GET['inputfile'])){//上传相册
		$filepath="inexistence";//初始化变量，不存在该路径
		$serverpath="photo_images/photo_images".$seid;//文件目录
		$filename=date("Ymd").rand();//文件名，以上传时间命名+随机数命名
		$filepath=UploadFile($_GET['inputfile'],$serverpath,$filename);
		$arr=array('inputfile'=>$filepath);
		echo  json_encode($arr);//返回文件的存放路径
	}
	if(isset($_GET['inputlogo'])){//修改、添加社团logo
		$filepath="inexistence";//初始化变量，不存在该路径
		$serverpath="acount_images";//文件目录
		$filename=date("Ymd").rand();//文件名，以上传时间命名+随机数命名
		$filepath=UploadFile($_GET['inputlogo'],$serverpath,$filename);
		$arr=array('inputlogo'=>$filepath);
		echo  json_encode($arr);//返回文件的存放路径
	}
	if(isset($_GET['uploadfile'])){//社团文件上传，批量上传
		$filenamelist=split(',',$_GET['uploadfile']);//获得文件的name列表
		$serverpath="shetuan_file";//文件目录
		$n=count($filenamelist);
		for($i=0;$i<$n;$i++)
			UploadFile($filenamelist[$i],$serverpath,'');//轮流上传文件
		echo json_encode("uploadsuccess");//返回成功标志
	}
	if(isset($_GET['materialsfile'])){//社团物资图片上传
		$filepath="inexistence";//初始化变量，不存在该路径
		$serverpath="materials_images";//文件目录
		$filename=date("Ymd").rand();//文件名，以上传时间命名+随机数命名
		$filepath=UploadFile($_GET['materialsfile'],$serverpath,$filename);
		$arr=array('materialsfile'=>$filepath);
		echo  json_encode($arr);//返回文件的存放路径
	}
//	if(isset($_GET['']))*/
?>