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

function general_judge() {
	if (pleasant > pleasant_max) {
		event_pleasure_max_function()
	}

	if (unlock_clothes_5 == true && unlock_tie_eye_3 == true && unlock_string_1 == true) {
		untie_eye_able = true;
	}
	if (unlock_string_2 == true) {
		untie_mouth_able = true;
	}
	if (unlock_string_3 == true) {
		untie_arm_able = true;
	}
	if (unlock_tie_finger_3 == true && unlock_string_4 == true) {
		untie_finger_able = true
	}
	if (unlock_string_5 == true) {
		untie_leg_able = true;
	}

	if (untie_eye_able == false || event_eye_free == true) {
		document.getElementById("struggle_button_1").style.display = "none";
	} else {
		document.getElementById("struggle_button_1").style.display = "";
	}
	if (untie_mouth_able == false || event_mouth_free == true) {
		document.getElementById("struggle_button_2").style.display = "none";
	} else {
		document.getElementById("struggle_button_2").style.display = "";
	}
	if (untie_arm_able == false || event_arm_free == true) {
		document.getElementById("struggle_button_3").style.display = "none";
	} else {
		document.getElementById("struggle_button_3").style.display = "";
	}
	if (untie_finger_able == false || event_finger_free == true) {
		document.getElementById("struggle_button_4").style.display = "none";
	} else {
		document.getElementById("struggle_button_4").style.display = "";
	}
	if (untie_leg_able == false || event_leg_free == true) {
		document.getElementById("struggle_button_5").style.display = "none";
	} else {
		document.getElementById("struggle_button_5").style.display = "";
	}
}


