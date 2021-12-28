var save = document.getElementById('save')
save.onclick = function() { //所有变量，模块是否显示，模块中的内容
	localStorage.setItem("heroine_name", heroine_name)
	localStorage.setItem("villain_name", villain_name)
	localStorage.setItem("untie_eye", untie_eye)
	localStorage.setItem("untie_mouth", untie_mouth)
	localStorage.setItem("untie_arm", untie_arm)
	localStorage.setItem("untie_finger", untie_finger)
	localStorage.setItem("untie_leg", untie_leg)
	localStorage.setItem("sensitivity", sensitivity)
	localStorage.setItem("power_consume", power_consume)
	localStorage.setItem("power_consume_pleasure", power_consume_pleasure)
	localStorage.setItem("untie_eye_able", untie_eye_able)
	localStorage.setItem("untie_mouth_able", untie_mouth_able)
	localStorage.setItem("untie_arm_able", untie_arm_able)
	localStorage.setItem("untie_finger_able", untie_finger_able)
	localStorage.setItem("untie_leg_able", untie_leg_able)
	localStorage.setItem("tie_eye", tie_eye)
	localStorage.setItem("tie_mouth", tie_mouth)
	localStorage.setItem("tie_arm", tie_arm)
	localStorage.setItem("tie_finger", tie_finger)
	localStorage.setItem("tie_leg", tie_leg)
	localStorage.setItem("tie_post", tie_post)
	localStorage.setItem("tie_difficulty", tie_difficulty)
	localStorage.setItem("untie_difficulty", untie_difficulty)
	localStorage.setItem("sensitivity_difficulty", sensitivity_difficulty)
	localStorage.setItem("final_difficulty", final_difficulty)
	localStorage.setItem("epoch", epoch)
	localStorage.setItem("epoch_max", epoch_max)
	localStorage.setItem("power", power)
	localStorage.setItem("power_recover", power_recover)
	localStorage.setItem("pleasant", pleasant)
	localStorage.setItem("pleasant_augment", pleasant_augment)
	localStorage.setItem("pleasant_max", pleasant_max)
	localStorage.setItem("pleasant_max_number", pleasant_max_number)
	localStorage.setItem("final_evaluation", final_evaluation)
	localStorage.setItem("event_no_clothes_prob", event_no_clothes_prob)
	localStorage.setItem("event_no_clothes_able", event_no_clothes_able)
	localStorage.setItem("event_string_prob", event_string_prob)
	localStorage.setItem("event_string_able", event_string_able)
	localStorage.setItem("event_careless_prob", event_careless_prob)
	localStorage.setItem("event_careless_able", event_careless_able)
	localStorage.setItem("event_call_for_help_prob", event_call_for_help_prob)
	localStorage.setItem("event_call_for_help_able", event_call_for_help_able)
	localStorage.setItem("event_call_for_help_success_prob", event_call_for_help_success_prob)
	localStorage.setItem("event_sudden_string_prob", event_sudden_string_prob)
	localStorage.setItem("event_sudden_string_able", event_sudden_string_able)
	localStorage.setItem("event_very_cute_prob", event_very_cute_prob)
	localStorage.setItem("event_very_cute_able", event_very_cute_prob)
	localStorage.setItem("event_persuade_prob", event_persuade_able)
	localStorage.setItem("event_persuade_able", event_persuade_able)
	localStorage.setItem("event_tk_prob", event_tk_prob)
	localStorage.setItem("event_tk_able", event_tk_able)
	localStorage.setItem("event_unlock_eye_able", event_unlock_eye_able)
	localStorage.setItem("event_unlock_eye_prob", event_unlock_eye_prob)
	localStorage.setItem("event_unlock_mouth_prob", event_unlock_mouth_prob)
	var event_unlock_mouth_able = false
	var event_unlock_mouth_prob = 30
	var event_unlock_arm_able = false
	var event_unlock_arm_prob = 30
	var event_unlock_finger_able = false
	var event_unlock_finger_prob = 30
	var event_unlock_leg_able = false
	var event_unlock_leg_prob = 30
	var event_knife_prob = 30 //找到小刀
	var event_knife_able = true
	var event_expose_prob = 30 //暴露行踪
	var event_expose_able = true
	var event_glass_prob = 10 // 玻璃碴
	var event_glass_able = true
	var event_eye_free = false // 是否能够看见
	var event_mouth_free = false //嘴部是否自由
	var event_arm_free = false // 手臂是否自由
	var event_finger_free = false //手指是否自由
	var event_leg_free = false // 双腿是否自由
	var p_gift_6_judge = false
	var p_gift_15_judge = false
	var p_gift_18_judge = false
	var n_gift_6_judge = false
	var n_gift_15_judge = false
	var n_gift_18_judge = false
	var n_gift_19_judge = false
	var unlock_clothes_5 = true
	event_clothes_8_able = false
	event_clothes_8_prob = 100
	event_clothes_8_condition_pleasure_number = 3
	var unlock_tie_eye_3 = true;
	var unlock_tie_finger_3 = true;
	var unlock_string_1 = true;
	var unlock_string_2 = true;
	var unlock_string_3 = true;
	var unlock_string_4 = true;
	var unlock_string_5 = true;
	tie_reinforce_11_judge = false
	tie_reinforce_11_condition_epoch = 10
	var event_tie_reinforce_11_able = false;
	var event_tie_reinforce_11_prob = 100;
}

var reload = document.getElementById("reload")
reload.onclick = function() {
	heroine_name = localStorage.getItem("heroine_name")
	window.alert(heroine_name)
}