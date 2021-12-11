// ***************************************** 辅助函数
function display_array(array){
	array_mode = array
	for (i = 0; i < array.length; i++) {
		array_mode[i] = "<p>" + array[i] + "</p>"
	}
	return array_mode.join("")
}

function window_scroll(){
	var t = document.body.clientHeight;
	window.scroll({ top: t, left: 0, behavior: 'smooth' });
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}