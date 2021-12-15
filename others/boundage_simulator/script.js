// ***************************************** 右上角函数
var restart = document.getElementById("restart");
restart.onclick = function() {
	window.history.back(-1);
	window.location.reload();
}


// ***************************************** 角色创建
function character_init() {
	heroine_select_button = document.getElementById("heroine_select_button");
	options_init(heroine_select_button, all_heroine_characters)
	villain_select_button = document.getElementById("villain_select_button");
	options_init(villain_select_button, all_villain_characters)
}

character_init()

var heroine_select_button = document.getElementById("heroine_select_button")
heroine_select_button.onchange = function() {
	heroine_select_index = document.getElementById("heroine_select_button").selectedIndex
	document.getElementById("heroine_name").value = all_heroine_characters[heroine_select_index]
}
var villain_select_button = document.getElementById("villain_select_button")
villain_select_button.onchange = function() {
	villain_select_index = document.getElementById("villain_select_button").selectedIndex
	document.getElementById("villain_name").value = all_villain_characters[villain_select_index]
}

var character_submit_button = document.getElementById("character_submit_button");
character_submit_button.onclick = function(){
	heroine_name = document.getElementById("heroine_name").value
	villain_name = document.getElementById("villain_name").value
	if (heroine_name == "" || villain_name == "") {
		window.alert("主角名或绑匪名为空。")
		return
	}
	character_array.push("被绑者角色名为" + heroine_name)
	character_array.push("绑架者角色名为" + villain_name)
	window.localStorage["heroine_name"] = heroine_name
	window.localStorage["villain_name"] = villain_name

	document.getElementById("character_buttons").style.display = "none";
	document.getElementById("character").innerHTML = display_array(character_array);
	document.getElementById("gift_select").style.display = ""
}



// ***************************************** 天赋选择
function gift_select(gift_bumber){
	document.getElementById("gift_buttons").style.display = "none"; // ""/"none"
	all_gifts_mode = all_gifts
	all_gifts_function_mode = all_gifts_function
	for (i = 0; i < gift_number; i++) { 
    	gift_index = Math.floor((Math.random()*all_gifts_mode.length));
    	gifts.push(all_gifts_mode[gift_index]);

    	all_gifts_function_mode[gift_index]();

    	all_gifts_mode = all_gifts_mode.filter(function(item) {
		    return item != all_gifts_mode[gift_index];
		});
		all_gifts_function_mode = all_gifts_function_mode.filter(function(item) {
			return item != all_gifts_function_mode[gift_index];
		})
	}
	document.getElementById("gifts").innerHTML = heroine_name + "的天赋为：" + display_array(gifts);
	clothes_init()
	document.getElementById("clothes_select").style.display = "";
	window_scroll()
}


var gift_button_1 = document.getElementById("gift_button_1");
gift_button_1.onclick = function(){  
	gift_number = 2;
    gift_select(gift_number);
}
var gift_button_2 = document.getElementById("gift_button_2");
gift_button_2.onclick = function(){  
	gift_number = 4;
    gift_select(gift_number);
}
var gift_button_3 = document.getElementById("gift_button_3");
gift_button_3.onclick = function(){  
	gift_number = 6;
    gift_select(gift_number);
}



// ***************************************** 衣着选择
function clothes_init() {
	clothes_select_button = document.getElementById("clothes_select_button");
	options_init(clothes_select_button, all_clothes)
	all_clothes_display[0]()
}

var clothes_select_button = document.getElementById("clothes_select_button")
clothes_select_button.onchange = function() {
	clothes_select_index = document.getElementById("clothes_select_button").selectedIndex
	all_clothes_display[clothes_select_index]()
	window_scroll()
}


var clothes_confirm_button = document.getElementById("clothes_confirm_button");
clothes_confirm_button.onclick = function() {  
	clothes_id = document.getElementById("clothes_select_button").selectedIndex;
    document.getElementById("clothes_buttons").style.display = "none";
	all_clothes_function[clothes_id]();
	document.getElementById("clothes").innerHTML = heroine_name + "的服装为：" + all_clothes[clothes_id];
	document.getElementById("tie_select").style.display = "";
	window_scroll();
    tie_select_init();
}


// ***************************************** 束缚选择
function tie_post_select() {
	post = document.getElementsByName("post");
	if (post[0].checked == true) {
		all_tie_post_function[0]()
	} else if (post[1].checked == true) {
		all_tie_post_function[1]()
	} else if (post[2].checked == true) {
		all_tie_post_function[2]()
	}
}

function tie_select_init() {
	eye_select_button = document.getElementById("eye_select_button");
	options_init(eye_select_button, all_tie_eye)

	mouth_select_button = document.getElementById("mouth_select_button")
	options_init(mouth_select_button, all_tie_mouth)

	arm_select_button = document.getElementById("arm_select_button")
	options_init(arm_select_button, all_tie_arm)

	finger_select_button = document.getElementById("finger_select_button")
	options_init(finger_select_button, all_tie_finger)

	leg_select_button = document.getElementById("leg_select_button")
	options_init(leg_select_button, all_tie_leg)

	body_select_button = document.getElementById("body_select_button")
	options_init(body_select_button, all_tie_body)

	reinforce_select_button = document.getElementById("reinforce_select_button")
	options_init(reinforce_select_button, all_tie_reinforce)

	tie_select_display(0, 0);
}

function tie_select_display(tie_id, tie_select_id) {
	if (tie_id == 0) {
		all_tie_eye_display[tie_select_id]()
	} else if (tie_id == 1) {
		all_tie_mouth_display[tie_select_id]()
	} else if (tie_id == 2) {
		all_tie_arm_display[tie_select_id]()
	} else if (tie_id == 3) {
		all_tie_finger_display[tie_select_id]()
	} else if (tie_id == 4) {
		all_tie_leg_display[tie_select_id]()
	} else if (tie_id == 5) {
		all_tie_body_display[tie_select_id]()
	} else if (tie_id == 6) {
		all_tie_reinforce_display[tie_select_id]()
	}
}

function tie_select(tie_id, tie_select_id) {
	if (tie_id == 0) {
		all_tie_eye_function[tie_select_id]()
	} else if (tie_id == 1) {
		all_tie_mouth_function[tie_select_id]()
	} else if (tie_id == 2) {
		all_tie_arm_function[tie_select_id]()
	} else if (tie_id == 3) {
		all_tie_finger_function[tie_select_id]()
	} else if (tie_id == 4) {
		all_tie_leg_function[tie_select_id]()
	} else if (tie_id == 5) {
		all_tie_body_function[tie_select_id]()
	} else if (tie_id == 6) {
		all_tie_reinforce_function[tie_select_id]()
	}
}

var eye_select_button = document.getElementById("eye_select_button")
eye_select_button.onchange = function() {
	eye_select_index = document.getElementById("eye_select_button").selectedIndex
	tie_select_display(0, eye_select_index)
	window_scroll()
}

var mouth_select_button = document.getElementById("mouth_select_button")
mouth_select_button.onchange = function() {
	mouth_select_index = document.getElementById("mouth_select_button").selectedIndex
	tie_select_display(1, mouth_select_index)
	window_scroll()
}

var arm_select_button = document.getElementById("arm_select_button")
arm_select_button.onchange = function() {
	arm_select_index = document.getElementById("arm_select_button").selectedIndex
	tie_select_display(2, arm_select_index)
	window_scroll()
}

var finger_select_button = document.getElementById("finger_select_button")
finger_select_button.onchange = function() {
	finger_select_index = document.getElementById("finger_select_button").selectedIndex
	tie_select_display(3, finger_select_index)
	window_scroll()
}

var leg_select_button = document.getElementById("leg_select_button")
leg_select_button.onchange = function() {
	leg_select_index = document.getElementById("leg_select_button").selectedIndex
	tie_select_display(4, leg_select_index)
	window_scroll()
}

var body_select_button = document.getElementById("body_select_button")
body_select_button.onchange = function() {
	body_select_index = document.getElementById("body_select_button").selectedIndex
	tie_select_display(5, body_select_index)
	window_scroll()
}

var reinforce_select_button = document.getElementById("reinforce_select_button")
reinforce_select_button.onchange = function() {
	reinforce_select_index = document.getElementById("reinforce_select_button").selectedIndex
	tie_select_display(6, reinforce_select_index)
	window_scroll()
}

var tie_confirm_button = document.getElementById("tie_confirm_button");
tie_confirm_button.onclick = function() {  
	document.getElementById("tie_buttons").style.display = "none";

	tie_post_select();

	eye_select_index = document.getElementById("eye_select_button").selectedIndex
	tie_select(0, eye_select_index)
	mouth_select_index = document.getElementById("mouth_select_button").selectedIndex
	tie_select(1, mouth_select_index)
	arm_select_index = document.getElementById("arm_select_button").selectedIndex
	tie_select(2, arm_select_index)
	finger_select_index = document.getElementById("finger_select_button").selectedIndex
	tie_select(3, finger_select_index)
	leg_select_index = document.getElementById("leg_select_button").selectedIndex
	tie_select(4, leg_select_index)
	body_select_index = document.getElementById("body_select_button").selectedIndex
	tie_select(5, body_select_index)
	reinforce_select_index = document.getElementById("reinforce_select_button").selectedIndex
	tie_select(6, reinforce_select_index)

	document.getElementById("tie_functions").innerHTML = tie_string;
	document.getElementById("tight_select").style.display = "";

	window_scroll()
}


// ***************************************** 收紧程度
function tight_select(tight_id){
	document.getElementById("tight_buttons").style.display = "none";
	all_tight_function[tight_id]()
	document.getElementById("tight_grade").innerHTML = heroine_name + "的束缚收紧程度为：" + all_tight[tight_id];
	document.getElementById("event_tie").style.display = "";
	window_scroll()
}


var tight_button_1 = document.getElementById("tight_button_1");
tight_button_1.onclick = function(){  
	tight_id = 0
    tight_select(tight_id);
}
var tight_button_2 = document.getElementById("tight_button_2");
tight_button_2.onclick = function(){  
	tight_id = 1
    tight_select(tight_id);
}
var tight_button_3 = document.getElementById("tight_button_3");
tight_button_3.onclick = function(){  
	tight_id = 2
    tight_select(tight_id);
}


// ***************************************** 紧缚过程
function event_tie_action() {
	document.getElementById("event_tie_buttons").style.display = "none";
	if (event_no_clothes_able == true && random(1, 100) <= event_no_clothes_prob) {
		event_no_clothes_function()
		return
	}
	if (event_string_able == true && random(1, 100) <= event_string_prob) {
		event_string_function()
		return
	}
	if (event_careless_able == true && random(1, 100) <= event_careless_prob) {
		event_careless_function()
		return
	}

	event_tie_array.push("捆绑过程无特殊事件")
}

function display_attributes_values() {
	tie_difficulty = (tie_eye + tie_mouth)*0.1 + tie_arm*0.3 + tie_finger*0.3 + tie_leg*0.2 + tie_post*0.1
	untie_difficulty = ((untie_eye + untie_mouth)*0.2 + (untie_arm + untie_finger)*0.3 + untie_leg*0.2)*10
	sensitivity_difficulty = sensitivity*10
	final_difficulty = tie_difficulty + untie_difficulty + sensitivity_difficulty
	tie_array = [
	"脱缚能力值:",
	"眼部脱缚能力——" + untie_eye,
	"嘴部脱缚能力——" + untie_mouth,
	"手臂脱缚能力——" + untie_arm,
	"手指脱缚能力——" + untie_finger,
	"腿部脱缚能力——" + untie_leg,
	"特殊姿势增量——" + tie_post,
	"敏感度:" + sensitivity,
	"体力值:" + power,
	"每轮脱缚的体力消耗" + power_consume,
	"当前束缚值:",
	]
	if (tie_eye <= 0) {
		tie_array = tie_array.concat([
	"眼部束缚值——" + tie_eye,
	"嘴部束缚值——" + tie_mouth,
	"手臂束缚值——" + tie_arm,
	"手指束缚值——" + tie_finger,
	"腿部束缚值——" + tie_leg,
	"难度值:",
	"束缚程度-难度值——" + tie_difficulty,
	"敏感程度-难度值——" + sensitivity_difficulty,
	"脱缚能力-难度值——" + untie_difficulty,
	"最终难度值——" + final_difficulty
	])
	} else {
		tie_array = tie_array.concat([
	"眼前一片黑暗，无法看到束缚程度。",
		])
	}
	tie_array = tie_array.concat([
	"难度值:",
	"束缚程度-难度值——" + tie_difficulty,
	"敏感程度-难度值——" + sensitivity_difficulty,
	"脱缚能力-难度值——" + untie_difficulty,
	"最终难度值——" + final_difficulty
	])
	
	return tie_array
}

var event_tie_button_1 = document.getElementById("event_tie_button_1");
event_tie_button_1.onclick = function(){  
    event_tie_action();
    document.getElementById("event_tie_content").innerHTML = "<p>紧缚过程的特殊事件为:" + event_tie_array + "</p>";
	document.getElementById("start_to_untie_buttons").style.display = "";
	window_scroll()
}


// ***************************************** 脱缚过程和最终评价
var untie_main_button_1 = document.getElementById("untie_main_button_1");
untie_main_button_1.onclick = function(){  
	document.getElementById("event_untie_buttons").style.display = "";
	document.getElementById("event_untie_main_buttons").style.display = "none";
	window_scroll()
}


function display_untie_information() {
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
		]
	}
	document.getElementById("event_untie_content").innerHTML += display_array(current_attribute_array);
}

function calculate_evaluation() {
	final_evaluation = final_difficulty - (tie_eye*0.1 + tie_mouth*0.1 + tie_arm*0.3 + tie_finger*0.3 + tie_leg*0.2);
	return final_evaluation
}

function result_judge(result) {
	// 结局事件判定
	if (power <= 0) {
		document.getElementById("event_untie_content").innerHTML = "<p>体力值耗尽，" + heroine_name + "没有挣脱束缚。</p>"
		result = false
	}
	if (epoch >= epoch_max) {
		document.getElementById("event_untie_content").innerHTML = "<p>脱缚时间到，" + heroine_name + "没有挣脱束缚。</p>"
		result = false
	}
	if (event_eye_free == true && event_mouth_free == true && event_arm_free == true && event_finger_free == true && event_leg_free == true) {
		document.getElementById("event_untie_content").innerHTML += "所有部位解缚成功，成功逃脱。";
		result = true
	}
	if (result == true) {
		document.getElementById("event_untie_buttons").style.display = "none";
		document.getElementById("final_evaluate_content").innerHTML = "<p>恭喜逃脱成功！最终得分为：" 
		document.getElementById("final_evaluate_content").innerHTML = calculate_evaluation() + "</p>"
		document.getElementById("final_evaluate").style.display = "";
	} else if (result == false) {
		document.getElementById("event_untie_buttons").style.display = "none";
		document.getElementById("final_evaluate_content").innerHTML = "<p>恭喜逃脱失败！最终得分为：" + 
		calculate_evaluation() + "</p>";
		document.getElementById("final_evaluate").style.display = "";
	}
	return result
}

function struggle_judge(sudden_event) {
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

	// 突发事件判定
	if (sudden_event == true) { //只在每轮脱缚阶段之前进行事件判定
		if (event_call_for_help_able == true && random(1, 100) <= event_call_for_help_prob) {
		return event_call_for_help_function()
		}
		if (event_sudden_string_able == true && random(1, 100) <= event_sudden_string_prob) {
			return event_sudden_string_function()
		}
		if (event_very_cute_able == true && random(1, 100) <= event_very_cute_prob) {
			return event_very_cute_function()
		}
		if (event_persuade_able == true && random(1, 100) <= event_persuade_prob) {
			return event_persuade_function()
		}
		if (event_tk_able == true && random(1, 100) <= event_tk_prob) {
			return event_tk_function()
		}
	}

	return "none"
}


var start_to_untie_button = document.getElementById("start_to_untie_button");
start_to_untie_button.onclick = function(){  
	document.getElementById("start_to_untie_buttons").style.display = "none";
	document.getElementById("event_tie_content").innerHTML += display_array(display_attributes_values());
	document.getElementById("event_untie").style.display = "";
	struggle_judge(false)
	window_scroll()
}


function struggle_action(struggle_index) {
	epoch += 1
	document.getElementById("event_untie_content").innerHTML = "<p>第" + epoch + "(" + epoch_max + ")轮脱缚回合</p>"
	result_judge(struggle_judge(true))
	struggle_function(struggle_index)
	display_untie_information()
	result_judge(struggle_judge(false))
}


var struggle_button_1 = document.getElementById("struggle_button_1");
struggle_button_1.onclick = function(){  
	struggle_action(1)
	window_scroll()
}
var struggle_button_2 = document.getElementById("struggle_button_2");
struggle_button_2.onclick = function(){  
	struggle_action(2)
	window_scroll()
}
var struggle_button_3 = document.getElementById("struggle_button_3");
struggle_button_3.onclick = function(){  
	struggle_action(3)
	window_scroll()
}
var struggle_button_4 = document.getElementById("struggle_button_4");
struggle_button_4.onclick = function(){  
	struggle_action(4)
	window_scroll()
}
var struggle_button_5 = document.getElementById("struggle_button_5");
struggle_button_5.onclick = function(){  
	struggle_action(5)
	window_scroll()
}
var struggle_button_6 = document.getElementById("struggle_button_6");
struggle_button_6.onclick = function(){  
	document.getElementById("event_untie_buttons").style.display = "none";
	document.getElementById("event_untie_main_buttons").style.display = "";
	window_scroll()
}

var untie_main_button_2 = document.getElementById("untie_main_button_2");
untie_main_button_2.onclick = function() {
	result_judge("none")
	epoch += 1
	document.getElementById("event_untie_content").innerHTML = "<p>第" + epoch + "(" + epoch_max + ")轮脱缚回合</p>"
	document.getElementById("event_untie_content").innerHTML += "<p>本回合休息，体力值获得了少量恢复。</p>"

	rest_function();

	display_untie_information()
	
	document.getElementById("event_untie_content").innerHTML += display_array(current_attribute_array);
	result_judge("none")
	window_scroll()
}

function explore_judge() {
	if (event_knife_able == true && random(1, 100) <= event_knife_prob && event_knife == false) {
		return event_knife_function()
	}
	if (event_expose_able == true && random(1, 100) <= event_expose_prob) {
		return event_expose_function()
	}
	return "none_event"
}

var untie_main_button_3 = document.getElementById("untie_main_button_3");
untie_main_button_3.onclick = function() {
	epoch += 1
	document.getElementById("event_untie_content").innerHTML = "<p>第" + epoch + "(" + epoch_max + ")轮脱缚回合</p>"
	document.getElementById("event_untie_content").innerHTML += "<p>" + heroine_name + "对自己周围进行了探索。</p>"
	result = result_judge(explore_judge())
	if (result == "none_event") {
		document.getElementById("event_untie_content").innerHTML += "<p>没有找到什么东西。</p>"
	}
	explore_function()

	display_untie_information()
	result_judge("none")
	window_scroll()
}

/*
try {
		
	}
catch(err) {
	 window.alert(err)
}
*/




