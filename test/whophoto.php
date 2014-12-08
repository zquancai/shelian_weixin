<?php
include('wxdb.php');

class WhoPhoto{
	private $photo_arr;//社团简称
	private $name;
//构造函数
	function __construct($seid)//社团编号建立映射
	{
		//多行的符合要求的数据
		$photoarr = WXDB::getSomething("imgurl,imginfo,short", "shetuan_photo", "where seid='{$seid}'");
		$name = WXDB::getSomething("name", "shetuan_info", "where seid='{$seid}'");
		$this->SetPhotoArr($photoarr);
		$this->SetName($name[0][0]);
	}
	
	public function SetPhotoArr($photoarr){$this->photo_arr=$photoarr;}
	//获取照片和照片描述
	public function GetPhotoArr(){return $this->photo_arr;}
	public function SetName($name){$this->name=$name;}
	public function GetName(){return $this->name;}//返回社团名字
};
?>
