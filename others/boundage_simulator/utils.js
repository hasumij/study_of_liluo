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

function from_array_extract_index(source_array, target_array) {
	index_array = []
	for(i = 0; i < source_array.length; i++) {
		index = target_array.indexOf(source_array[i])
		index_array.push(index)
	}
	return index_array
}

function list_function_action(index_array, function_array) {
	for(i = 0; i < index_array.length; i++) {
		index = index_array[i]
		function_array[index]()
	}
}


