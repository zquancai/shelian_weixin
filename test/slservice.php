<?php

include('shelianwho.php');
include('wxglobal.php');

class SLService{
	//众社团的简称
	private $clubNames;
	private $ToUserName;
	private $FromUserName;
	private $CreateTime;
	private $resultStr;
	private $preurl="http://saunion.scnu.edu.cn/shelian_weixin/test/";
	private $preimgurl="http://saunion.scnu.edu.cn/shelian_weixin/wxmanage/";
	
	private $newsTpl = "<xml>
						 <ToUserName><![CDATA[%s]]></ToUserName>
						 <FromUserName><![CDATA[%s]]></FromUserName>
						 <CreateTime>%s</CreateTime>
						 <MsgType><![CDATA[news]]></MsgType>
						 <ArticleCount>%s</ArticleCount>
						 <Articles>
						 <item>
						 <Title><![CDATA[%s]]></Title> 
						 <Description><![CDATA[%s]]></Description>
						 <PicUrl><![CDATA[%s]]></PicUrl>
						 <Url><![CDATA[%s]]></Url>
						 </item>
						 </Articles>
						 <FuncFlag>1</FuncFlag>
						 </xml>";
	private $textTpl="<xml>
						<ToUserName><![CDATA[%s]]></ToUserName>
						<FromUserName><![CDATA[%s]]></FromUserName>
						<CreateTime>%s</CreateTime>
						<MsgType><![CDATA[text]]></MsgType>
						<Content><![CDATA[%s]]></Content>
						</xml>";
						
						
		public function __construct($ToUserName, $FromUserName, $CreateTime){
		//	取得所有社团的简称，以备后面检查
		$this->clubNames = WXDB::getSomething("seid,short", "shetuan_info","");
		$this->FromUserName = $FromUserName;
		$this->ToUserName = $ToUserName;
		$this->CreateTime = $CreateTime;
	}
	
	//测试社团微社区
/*	public function testuser(){
		$this->setTextTpl("用户OpenID：".$this->FromUserName.
		"<a href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6292681b13329528&redirect_uri=http://israel.duapp.com/weixin/oauth2.php?userid=oc7tbuIvE1s10DSXpEApWo7AM0jM&response_type=code&scope=snsapi_userinfo&state=1&uin=MjgxMzc0MDg4Mg%3D%3D&key=8b55e25b65896569d9d9e5af2ad4bee6a25f85aa8fe34ed7a10a8711eb84ae930b3d4f6c415b72e205e2ffdd01f1e4e5&version=70000001'>点击认</a>");
	}*/

	//检查社团是否存在，通过简称
	public function checkNames($name){
		foreach($this->clubNames as $value){
			//print_r($value[0]);
			if($value[1] == $name){
				return $value[0];//返回社团编号
			}
		}
		
		return false;
	}
	
	//设置文字消息内容
	private function setTextTpl($content){
		$this->resultStr = sprintf($this->textTpl, $this->FromUserName, $this->ToUserName, $this->CreateTime, $content);
	}
	
	//微信对话框回复用户
	public function echoStr(){
		echo $this->resultStr;
	}
	
	public function subscribe()//关注事件
	{
		$this->setTextTpl("欢迎关注华南师大社团联合会光放微信，更多精彩尽在社联。\n【回复菜单查看主菜单】");  
	}
	
	//菜单栏，社联和社团简介模板
	//参数说明：$num为item的数量，title是说明语，desc描述
	//picurl为图片链接，url为html连接，变量均为数组
	public function brieftemp($num,$title,$desc,$picurl,$url){
		$header = "<xml>
				 <ToUserName><![CDATA[%s]]></ToUserName>
				 <FromUserName><![CDATA[%s]]></FromUserName>
				 <CreateTime>%s</CreateTime>
				 <MsgType><![CDATA[news]]></MsgType>
				 <ArticleCount>%s</ArticleCount>
				 <Articles>";
	 	$header = sprintf($header, $this->FromUserName, $this->ToUserName, 
									$this->CreateTime, $num);
	 	for($i=0; $i<$num; ++$i){
	 		$clip = "<item>
						 <Title><![CDATA[%s]]></Title> 
						 <Description><![CDATA[%s]]></Description>
						 <PicUrl><![CDATA[%s]]></PicUrl>
						 <Url><![CDATA[%s]]></Url>
						 </item>";
	 		$clip = sprintf($clip, $title[$i], $desc[$i], $picurl[$i], $url[$i]);
	 		$list .= $clip;
	 	}
	 	$end = "</Articles>
						 <FuncFlag>1</FuncFlag>
						 </xml>";
	 	$eventTpl = "".$header."".$list."".$end;
	 	
	 	$this->resultStr = $eventTpl;
	}
	
	//菜单栏模板实现
	public function menu()
	{
		$num=2;
		$menu_title=array("菜单","----------欢迎使用----------\n".
					"1、华南师范大学社团联合会简介\n".
					"2、华师各大社团简介\n".
					"3、查询社团常规事务流程\n".
					"4、社团近期活动回顾\n".
					"5、我是会员，我要提议\n".
					"6、进入社团微社区，参与讨论\n".
					"7、给社联君留言(直接回复即可)\n".
					"【回复相应序号查看】\n");
		$desc=array("","");
		$picurl=array("http://bcs.duapp.com/shelian/servprocess.jpg","");
		$url=array("","");//连接为空，菜单栏不可点击
		$this->brieftemp($num,$menu_title,$desc,$picurl,$url);
	}

	//业务一：社联、社团介绍
	public function whoIs($shortName){
		$num=4;
		$title=array();//社团简介
		$desc=array();
		$url=array();//社团详细介绍的连接
		$picurl=array();//社团logo的图片连接
		if( $this->checkNames($shortName) == false && $this->checkNames($shortName) !=0){
			$this->setTextTpl("没有找到这个社团");
			return;
		}
		else
			$seid=$this->checkNames($shortName);
		$st = new Who($seid);
		$title[0]=$st->name();
		$title[1]=$st->brief();
		$imgarr=split('[/]',$st->img());
		$title[2]=">>进入".$st->name()."的社团相册";
		$title[3]=">>查看".$st->name()."以往的活动";
		$picurl[0]="{$this->preimgurl}acount_images/{$imgarr[3]}";//
		$url[0]=$url[1]="{$this->preurl}wxshow.php?seid=".$st->seid();//社团介绍
		$url[2]="{$this->preurl}photo.php?seid=".$st->seid();//相册
		$url[3]="{$this->preurl}wxpicshow.php?seid=".$st->seid();//活动
		$this->brieftemp($num,$title,$desc,$picurl,$url);
	}
	
	//业务二：社团介绍
	public function shetuan(){
		$num=7;
		$shetuan_list0=WXDB::getSomething("type,short,name", "shetuan_info","");//获取所有社团的名称和简称
		$shetuan_list=array("2、社团介绍篇（回复【】的内容查看社团介绍）",
											"----------文娱体育类----------","----------理论学习类----------",
											"----------兴趣爱好类----------","----------学术科技类----------",
											"----------社会实践类----------","----------院系社联类----------");
		$n=count($shetuan_list0);//社团个数
		for($i=1;$i<$n;$i++){
			$type=$shetuan_list0[$i][0];//社团类型
			$shetuan_list[$type+1].="【{$shetuan_list0[$i][1]}】{$shetuan_list0[$i][2]}\n";
		}
		$desc=array();
		$picurl=array("http://bcs.duapp.com/shelian/servprocess.jpg","");
		$url=array("{$this->preurl}wxshow_type.php?type=-1","{$this->preurl}wxshow_type.php?type=0","{$this->preurl}wxshow_type.php?type=1",
							"{$this->preurl}wxshow_type.php?type=2","{$this->preurl}wxshow_type.php?type=3","{$this->preurl}wxshow_type.php?type=4",
							"{$this->preurl}wxshow_type.php?type=5");//点击菜单栏，转到社团页面
		$this->brieftemp($num,$shetuan_list,$desc,$picurl,$url);
	}
	 
	 //业务三：社团常规事务流程
	 public function tellyouhow(){
		$num=5;
		$title_business=array("社团事务流程查询（点击即可查询）",
											"社团活动类型","公共物资借用与活动场地申请",
											"文案审批流程","各类申请说明");
		$desc=array();
		$url=array();
		$picurl=array();
		$picurl[0]=constant("SERVPROCESS_PIC_URL");//大图显示
	 	for($i=0; $i<$num; ++$i){
			//第一个大图没有连接
	 		$url[$i+1] = "{$this->preurl}business.php?spid=".($i+1);
			$desc[$i]="";
	 	}
		$this->brieftemp($num,$title_business,$desc,$picurl,$url);
	 }
	
	 //业务四：社团近期活动回顾
	 public function clubEvent(){
		$title=array();
		$desc=array();
		$url=array();
		$picurl=array();
		//获取活动具体内容
		$events = WXDB::getSomething("*", "shetuan_action"," order by id desc limit 10");
		$num=count($events);
	 	for($i=0; $i<$num; ++$i){
			$title[$i] = $events[$i][3];//活动名称
	 		$desc[$i] = "";
			$imgurl=split('[/]',$events[$i][7]);
	 		$picurl[$i] = "{$this->preimgurl}action_images/{$imgurl[3]}/{$imgurl[4]}";//活动图片链接
	 		$url[$i] = "{$this->preurl}wxpicshow.php?id={$events[$i][0]}";//$events[0][0]为活动id
		}
		$this->brieftemp($num,$title,$desc,$picurl,$url);
	//	$this->setTextTpl($picurl[2]);
	 }
	 
	 //业务五：活动消息订阅
	 
	 //业务六：会员意见收集
	public function showOpinion(){
		$num=1;
	 	$title=array("会员意见收集");
		$desc=array();
		$desc[0]=constant("OPINION_DESCRIPT");
		$hyurl="{$this->preurl}wxmember.php";
		$url=array($hyurl);
		$picurl=array();
		$picurl[0]=constant("SERVPROCESS_PIC_URL");
		$this->brieftemp($num,$title,$desc,$picurl,$url);
	}
	
	 //业务七：社区微社区
	 public function showWxforum(){
		$num=1;
	 	$title=array("华师社团微社区");
		$desc=array();
		$desc[0]="华师社团微社区是在校社联管理下的在社团范围内的移动社区。在微社区你可以发表你社团的看法、发布社团活动消息！";
		$forumurl="http://wx.wsq.qq.com/253368538";//微社区地址
		$url=array($forumurl);
		$picurl=array();
		$picurl[0]=constant("SERVPROCESS_PIC_URL");
		$this->brieftemp($num,$title,$desc,$picurl,$url);
	}
	 
	 //业务八：给社联君留言
	
}
/*
$demo = new SLService("11", "22", "33");
$demo->clubEvent();
$demo->echoStr();
*/
?>