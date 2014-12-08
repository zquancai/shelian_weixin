<?php
//define your token
define("TOKEN", "shelian_weixin");//微信token验证

include('conn.php');//数据库连接

include('db.php');//数据库操作

include('./weixin/slservice.php');//微信的主程序

$weixin =new weixin();

$weixin->route();

class weixin
{
    
	private $fromUsername;
	
	private $toUsername;
	
	private $content;
	
	private $createTime;
	
	private $textTpl;
	 
	 private $event;
	
	public function __construct(){
	  if(!$this->checkSignature()){
	    echo "false";
		exit;
	  }
	  $postStr = $GLOBALS["HTTP_RAW_POST_DATA"];
	  $postObj = simplexml_load_string($postStr, 'SimpleXMLElement', LIBXML_NOCDATA);
	  $this->fromUsername = $postObj->FromUserName;
	  $this->toUsername   = $postObj->ToUserName;
	  $this->content      = trim($postObj->Content);
	  $this->event =$postObj->Event;
	  $this->createTime   = time();
	}
	
	/*
	 * 业务控制器
	 */
	public function route()
    {	
		//SLSevrvice类作为this的代理类，测试开发用
		$service = new SLService($this->toUsername, 
		$this->fromUsername, 
		$this->createTime);
		//测试开发用的
		if($this->event=='subscribe') //关注事件
		{ 
			$service->subscribe();//欢迎词
		} 
		if($this->content=="菜单"){
			$service->menu();
		}
		switch($this->content){
			case "1":	//社联简介
				$service->whoIs("社联");
			break;
			case "2"://社团简介
				$service->shetuan();
			break;
			case "3"://查询事务流程
				$service->tellyouhow();
			break;
			case "4"://近期社团活动回顾
				$service->clubEvent();
			break;
			case "5"://会员意见
				$service->showOpinion();
			break;
			case "6"://社团微社区
				$service->showWxforum();
			break;
			case "7"://消息推送
			break;
			default:
		}
	if($service->checkNames($this->content)){//社团介绍
			$service->whoIs($this->content);
			}
		$service->echoStr();
    }
	 
	 /*
      * 检查授权
      */	 
	private function checkSignature()
	{
        $signature = $_GET["signature"];
        $timestamp = $_GET["timestamp"];
        $nonce = $_GET["nonce"];	
        		
		$token = TOKEN;
		$tmpArr = array($token, $timestamp, $nonce);
		sort($tmpArr, SORT_STRING);
		$tmpStr = implode( $tmpArr );
		$tmpStr = sha1( $tmpStr );
		
		if( $tmpStr == $signature ){
			return true;
		}else{
			return false;
		}
	}
}
	 
	 


?>