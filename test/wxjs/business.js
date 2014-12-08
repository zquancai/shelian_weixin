



var flag;
function GoDown(){//进入网页时被加载
	var i;
	flag=new Array(m);
	flag[0]=true;
	for(i=1;i<m;i++){
		flag[i]=false;
		var id="item"+(i+1);
		document.getElementById(id).style.display= 'none';//隐藏除第一行的条目
	}
}
function Hide(id,index){
	index=index-1;
	var state=document.getElementById(id);
	if(flag[index]==true){
		state.style.display= 'none';
		flag[index]=false;
	}
	else if(flag[index]==false){
		state.style.display = 'block';
		flag[index]=true;
	}
}