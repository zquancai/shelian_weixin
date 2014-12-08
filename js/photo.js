//img_count为图片数量
//photo_arr为图片链接和图片说明

var i=0;//控制相片递进的变量，全局变量

function PrintImgAndInfo(index)
{
	document.getElementById("image").src=photo_arr[index][0];
	document.getElementById("img_info").innerHTML=photo_arr[index][1];
	document.getElementById("counter").innerHTML="<b>"+(index+1)+"/"+img_count+"</b>";
}
//图片导航d=-1时后面一张图片，1时下一张
function ImgNav(d){
    if(i<img_count-1&&d == 1){//imgcount
		i++;
		PrintImgAndInfo(i);
    }
	else if(i>0&&d==-1){
		i--;
		PrintImgAndInfo(i);
    }
}

var b_left=0;//大图的初始位置
var b_left;
var scrollimg = document.getElementById('scrollimg');//获取大图p元素的id
function ScrollImg(event)
{
	switch (event.type) {
		case "touchstart"://触摸屏幕时
			var touch = event.touches[0]; //获取第一个触点 
			startX = Number(touch.pageX); //页面触点X坐标 */
		break;
		case "touchend":
			b_left = scrollimg.style.left.replace("px","");
			b_left=Number(b_left);
			if(i<img_count-1&&b_left<-30){
				i++;
				PrintImgAndInfo(i);
			}
			if(i>0&&b_left>30){
			  i--;
			  PrintImgAndInfo(i);
			}
			scrollimg.style.left="0px";//图片回归原位
		break;
		case "touchmove":
			event.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等 
			var touch = event.touches[0]; //获取第一个触点
			var x = Number(touch.pageX); //页面触点X坐标
			scrollimg.style.left =x-startX+"px";//改变位置，产生移动效果
		break;
	}//case
}
//向大图的id添加触摸事件
scrollimg.addEventListener("touchstart", ScrollImg, false);
scrollimg.addEventListener("touchend", ScrollImg, false);
scrollimg.addEventListener("touchmove", ScrollImg, false);

//点击预览窗口的小图，可以在大图相册上显示
//点击小图出现大图
//index为点击的图像的序号，new_id为点击的图片的id
var old_id="";
function TouchImg(index,new_id){
	document.getElementById(new_id).style.border="2px solid #666";//点击小图时，边框有显示
	if(old_id!="")
		document.getElementById(old_id).style.border="";
	old_id=new_id;//保存之前小图的li的id
	i=Number(index);//将当前图片序号置为点击的图片
	PrintImgAndInfo(i);//向大图部分输出大图和图片说明
}

//点击预览图两边的小图，移动预览框
function ClickScroll(p){
	var offset;
	if(p==-1) 
		offset=-5;
	else if(p==1)
		offset=5;
	thumbarea.style.left =(left+offset)+"px";//改变位置，产生移动效果
	//记录手指离开的位置
	left = thumbarea.style.left.replace("px","");
	left=Number(left);
	ScrollRange();//判断是否超过图片预览范围
}

//鼠标长按，预览窗口持续滑动
var timeobj = null;
var move_left = function(){ClickScroll(-1);}
var move_right = function(){ClickScroll(1);}
var scroll_left=document.getElementById("scroll_left");
scroll_left.onmousedown = function()
{
	timeobj=setInterval(move_left,50);//连续执行move函数
}
var scroll_right=document.getElementById("scroll_right");
scroll_right.onmousedown = function()
{
	timeobj=setInterval(move_right,50);//连续执行move函数
}
document.onmouseup = function()
{
	clearInterval(timeobj);
}

//预览框滚动范围
var range=-105*img_count;//预览框的长度
function ScrollRange(){
	//document.documentElement.clientWidth获取当前屏幕的可视宽度
	max=range+document.documentElement.clientWidth;//最大的滚动范围
 	if(left>0){
		thumbarea.style.left="0px";//如果滑动大于零，那么就回到原位
		left=0;//置位置记录为0
    }
	 if(left<max){
			thumbarea.style.left=max+"px";//如果滑动小于最小值，那么就回到原位
			left=max;//置位置记录为-500
		}
}

var thumbarea =document.getElementById("thumbarea");//获取滑动画面
var startX=0,startY=0,endX=0,endY=0;
var left=0;//记录预览相框的每一次初始位置
//触摸小图预览框产生的操作，移动预览框
function handleTouchEvent(event) {
        switch (event.type) {
            case "touchstart"://触摸屏幕时
             	var touch = event.touches[0]; //获取第一个触点 
            	//记录位置
        		startX = Number(touch.pageX); //页面触点X坐标 
            break;
            case "touchend":
            	//记录手指离开的位置
            	left = thumbarea.style.left.replace("px","");
            	left=Number(left);
            	ScrollRange();//判断是否超过图片预览范围
            break;
            case "touchmove":
            	event.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等 
        		var touch = event.touches[0]; //获取第一个触点
        		var x = Number(touch.pageX); //页面触点X坐标
        		var y = Number(touch.pageY); //页面触点Y坐标
            	thumbarea.style.left =left+x-startX+"px";//改变位置，产生移动效果
            break;
        }//case
}
//为thumbarea添加事件，产生滑动效果
var idname=document.getElementById("thumbarea");
idname.addEventListener("touchstart", handleTouchEvent, false);
idname.addEventListener("touchend", handleTouchEvent, false);
idname.addEventListener("touchmove", handleTouchEvent, false);
