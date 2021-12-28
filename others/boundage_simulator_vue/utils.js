// ***************************************** 辅助函数
function range(min, max) {
	array = []
	for(i = min; i <= max; i++) {
		array.push(i)
	}
	return array
}

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

function random_sample(array) {
	rand = Math.floor(Math.random() * array.length);
	return array[rand];
}

function delete_value(array, value) {
	array = array.filter(function(item) {return item != value});
	return array
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

function get_tie_part() {
	tie_part_index = []
	if (event_eye_free == false) {
		tie_part_index.push(0)
	}
	if (event_mouth_free == false) {
		tie_part_index.push(1)
	}
	if (event_arm_free == false) {
		tie_part_index.push(2)
	} 
	if (event_finger_free == false) {
		tie_part_index.push(3)
	}
	if (event_leg_free == false) {
		tie_part_index.push(4)
	}
	return tie_part_index
}


// 脱缚阶段通用函数
function general_judge() {
	// 条件事件判定
	if (tie_eye <= 0) {
		tie_eye = 0;
		if (event_eye_free == false) {
			event_eye_free_function()
		}
	}
	if (tie_mouth <= 0) {
		tie_mouth = 0;
		if (event_mouth_free == false) {
			event_mouth_free_function()
		}
	}
	if (tie_arm <= 0) {
		tie_arm = 0;
		if (event_arm_free == false) {
			event_arm_free_function()
		}
	}
	if (tie_finger <= 0) {
		tie_finger = 0;
		if (event_finger_free == false) {
			event_finger_free_function()
		}
	}
	if (tie_leg <= 0) {
		tie_leg = 0;
		if (event_leg_free == false) {
			event_leg_free_function()
		}
	}
	if (pleasant > pleasant_max) {
		event_pleasure_max_function()
	}

	// 处理负数的脱缚能力
	if (untie_eye < 0) {
		untie_eye = 0
	}
	if (untie_mouth < 0) {
		untie_mouth = 0
	}
	if (untie_arm < 0) {
		untie_arm = 0
	}
	if (untie_finger < 0) {
		untie_finger = 0
	}
	if (untie_leg < 0) {
		untie_leg = 0
	}

	// 判断是否满足可脱缚条件
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
	return "none"
}

function result_judge(result) {
	function calculate_evaluation() {
		final_evaluation = final_difficulty - (tie_eye*0.1 + tie_mouth*0.1 + tie_arm*0.3 + tie_finger*0.3 + tie_leg*0.2);
		return final_evaluation
	}
	function result_action(judge) {
		document.getElementById("event_untie_main_buttons").style.display = "none";
		document.getElementById("struggle_buttons").style.display = "none";
		document.getElementById("skill_buttons").style.display = "none"
		document.getElementById("final_evaluate").style.display = ""
		document.getElementById("final_evaluate_content").innerHTML = "<p>恭喜逃脱" + judge + "！最终得分为：" + 
		calculate_evaluation() + "</p>";
	}

	general_result = general_judge()
	if (general_result == true || general_result == false) {
		result = general_result
	}
	// 结局事件判定
	if (power <= 0) {
		document.getElementById("event_untie_content").innerHTML = "<p>体力值耗尽，" + heroine_name + "没有挣脱束缚。</p>"
		result = false
	} else if (epoch >= epoch_max) {
		document.getElementById("event_untie_content").innerHTML = "<p>脱缚时间到，" + heroine_name + "没有挣脱束缚。</p>"
		result = false
	} else if (event_eye_free == true && event_mouth_free == true && event_arm_free == true && event_finger_free == true && event_leg_free == true) {
		document.getElementById("event_untie_content").innerHTML += "所有部位解缚成功，成功逃脱。";
		result = true
	}
	if (result == true) {
		result_action("成功")
	} else if (result == false) {
		result_action("失败")
	}
}


function general_action() {
	epoch += 1
	document.getElementById("event_untie_content").innerHTML = "<p>第" + epoch + "(" + epoch_max + ")轮脱缚回合</p>"

	// 每轮触发的被缚者被动技能
	if (heroine_name == "璃落(英雄)") {
		sklill_liluo_1()
	}

	if (tie_reinforce_11_judge == true) {
		tie_reinforce_11_function()
	}
	if (event_tie_reinforce_11_able == true && random(1, 100) <= event_tie_reinforce_11_prob) {
		return event_tie_reinforce_11_function()
	}

	// 显示当前脱缚进展
	if (tie_eye <= 0) {
		current_attribute_array = [
		"眼部束缚值——" + tie_eye,
		"嘴部束缚值——" + tie_mouth,
		"手臂束缚值——" + tie_arm,
		"手指束缚值——" + tie_finger,
		"腿部束缚值——" + tie_leg,
		"当前快感值——" + pleasant + "(" + pleasant_max + ")",
		"当前体力值——" + power,
		];
	} else {
		current_attribute_array = [
		heroine_name + "的眼前一片黑暗，无法看到当前身上的束缚情况。",
		"当前快感值——" + pleasant + "(" + pleasant_max + ")",
		"当前体力值——" + power,
		];
	}
	document.getElementById("event_untie_content").innerHTML += display_array(current_attribute_array);
	return "none"
}

