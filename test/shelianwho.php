<?php
include('wxdb.php');

class Who{
	private $seid;//社团编号
	private $name;//社团名城
	private $brief;//社团简介
	private $introduction;//社团整体介绍
	private $part;//社团部门介绍
	private $img;//社团logo的url
	private $short;//社团简称
	
	function __construct($seid)
	{
		$arr = WXDB::getSomething("*", "shetuan_info", "where seid='{$seid}'");
		//取出多行的符合要求的数据
		$arr = $arr[0];
		if(count($arr) < 6*2){
			die("传入参数数组长度不符合要求，应为6<br/>");
		}
		$this->setSeid($arr[1]);//社团编号
		$this->setName($arr[2]);//社团名称
		$this->setShort($arr[3]);//社团简称
		$this->setBrief($arr[4]);//社团简介
		$this->setIntrouduction($arr[5]);//社团整体介绍
		$this->setPart($arr[6]);//社团部门介绍
		$this->setImg($arr[7]);//社团logo的url
		
	}
	
	public function setSeid($seid)
	{
		$this->seid = $seid;
	}
	public function setBrief($brief)
	{
		$this->brief = $brief;
	}
	public function setName($name)
	{
		$this->name = $name;
	}
	
	public function setIntrouduction($introduction)
	{
		$this->introduction = $introduction;
	}
	
	public function setPart($part)
	{
		$this->part=$part;
	}
	
	public function setImg($img){
		$this->img = $img;
	}
	
	public function setShort($short)
	{
		$this->short = $short;
	}
	
	public function seid(){
		return $this->seid;
	}
	
	public function brief(){//获取社团简称
	return $this->brief;
	}
	
	public function name(){
		return $this->name;
	}
	
	public function introduction(){
		return $this->introduction;
	}
	
	public function part(){
		return $this->part;
	}
	
	public function img(){
		return $this->img;
	}
	
	public function short(){
		return $this->isexit;
	}
};

?>
