// JavaScript Document

function Check() {
	var editor1=tinyMCE.get('editor1').getContent();
	var editor4=tinyMCE.get('editor4').getContent();
	//alert(editor1.length+"_"+editor4.length);
	if( document.getElementById('StudentName').value == '' ||
		document.getElementById('PhoneNumber').value == '' ||
		document.getElementById('Email').value == '' ||
		document.getElementById('Organization').value == 0 ||
		document.getElementById('Complain').value == '' ||
		document.getElementById('DegreeOfEmergency').value == '' ||
		editor1.length<=0 || editor4.length<=0
		) {
		alert("请完整填写信息");
		return false;
	} else {
		var object = document.getElementById("Complain4");
		var Input = document.getElementById('OtherInput');
		if( object.checked == 4 || object.checked == 8 ) {
			object.value = Input.value;
		}
	}
}