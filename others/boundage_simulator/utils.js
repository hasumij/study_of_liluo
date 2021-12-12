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

function options_init(select_button, select_array) {
	for (i = 0; i < select_array.length; i++) {
		option = document.createElement("option")
		option.innerHTML = select_array[i]
		option.value = select_array[i]
		select_button.appendChild(option)
	}
}

