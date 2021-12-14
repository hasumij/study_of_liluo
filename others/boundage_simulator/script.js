// ***************************************** 右上角函数
var restart = document.getElementById("restart");
restart.onclick = function() {
	window.history.back(-1);
	window.location.reload();
}


// ***************************************** 角色创建
function character_init() {
	character_select_button = document.getElementById("character_select_button");
	options_init(character_select_button, all_characters)
}

character_init()


var character_select_button = document.getElementById("character_select_button")
character_select_button.onchange = function() {
	character_select_index = document.getElementById("character_select_button").selectedIndex
	if (character_select_index == 0) {
		document.getElementById("heroine_name").value = ""
		document.getElementById("villain_name").value = ""
	} else if (character_select_index == 1) {
		document.getElementById("heroine_name").value = "璃落"
		document.getElementById("villain_name").value = "沐沐"
	} else if (character_select_index == 2) {
		document.getElementById("heroine_name").value = "香月"
		document.getElementById("villain_name").value = "安宁"
	} else if (character_select_index == 3) {
		document.getElementById("heroine_name").value = "花梦"
		document.getElementById("villain_name").value = "言兮"
	}
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
	}
	if (event_string_able == true && random(1, 100) <= event_string_prob) {
		event_string_function()
	}
	if (event_no_clothes == false && event_string == false) {
		event_tie_array.push("捆绑过程无特殊事件")
	}
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
function start_to_untie_judge() {
	if (tie_eye <= 0) {
		if (event_eye_free == false) {
			event_untie_eye_function()
		}
	}
	if (tie_mouth <= 0) {
		if (event_mouth_free == false) {
			event_untie_mouth_function()
		}
	}
	if (tie_arm <= 0) {
		if (event_arm_free == false) {
			event_untie_arm_function()
		}
	}
	if (tie_finger <= 0) {
		if (event_finger_free == false) {
			event_untie_finger_function()
		}
	}
	if (tie_leg <= 0) {
		if (event_leg_free == false) {
			event_untie_leg_function()
		}
	}
}

function able_to_untie_judge() {
	if (untie_eye_able == false || event_eye_free == true) {
		document.getElementById("untie_button_1").style.display = "none";
	} else {
		document.getElementById("untie_button_1").style.display = "";
	}
	if (untie_mouth_able == false || event_mouth_free == true) {
		document.getElementById("untie_button_2").style.display = "none";
	} else {
		document.getElementById("untie_button_2").style.display = "";
	}
	if (untie_arm_able == false || event_arm_free == true) {
		document.getElementById("untie_button_3").style.display = "none";
	} else {
		document.getElementById("untie_button_3").style.display = "";
	}
	if (untie_finger_able == false || event_finger_free == true) {
		document.getElementById("untie_button_4").style.display = "none";
	} else {
		document.getElementById("untie_button_4").style.display = "";
	}
	if (untie_leg_able == false || event_leg_free == true) {
		document.getElementById("untie_button_5").style.display = "none";
	} else {
		document.getElementById("untie_button_5").style.display = "";
	}
}


var start_to_untie_button = document.getElementById("start_to_untie_button");
start_to_untie_button.onclick = function(){  
	document.getElementById("start_to_untie_buttons").style.display = "none";
	tie_array = display_attributes_values()
	document.getElementById("event_tie_content").innerHTML += display_array(display_attributes_values());
	document.getElementById("event_untie").style.display = "";
	start_to_untie_judge()
	able_to_untie_judge()
	window_scroll()
}


function untie_judge() {
	start_to_untie_judge()
	able_to_untie_judge()
	if (power <= 0) {
		document.getElementById("event_untie_content").innerHTML = "<p>体力值耗尽，" + heroine_name + "没有挣脱束缚。</p>"
		return false
	}
	if (epoch >= epoch_max) {
		document.getElementById("event_untie_content").innerHTML = "<p>脱缚时间到，" + heroine_name + "没有挣脱束缚。</p>"
		return false
	}
	if (event_eye_free == true && event_mouth_free == true && event_arm_free == true && event_finger_free == true && event_leg_free == true) {
		document.getElementById("event_untie_content").innerHTML += "所有部位解缚成功，成功逃脱。";
		return true
	}
	if (pleasant > pleasant_max) {
		document.getElementById("event_untie_content").innerHTML += "快感到达极限，" + heroine_name + "忍不住达到高潮，体力大幅度下降。";
		power -= power_consume_pleasure
		pleasant = 0
		if (gift_18_judge == true) {
			gift_18_fucntion()
		}
	}
	return "none"
}


function untie_event_judge() {
	if (event_call_for_help_able == true && random(1, 100) <= event_call_for_help_prob) {
		document.getElementById("event_untie_content").innerHTML += "<p>触发特殊事件——呼救。"
		if (random(1, 100) <= event_call_for_help_success_prob <= 30) {
			document.getElementById("event_untie_content").innerHTML += heroine_name + "的呼救引来了" + villain_name + "，逃脱失败。</p>"
			return false
		} else if (random(1, 100) >= (100 - event_call_for_help_success_prob)) {
			document.getElementById("event_untie_content").innerHTML += heroine_name + "的呼救引来了帮手，她帮助" + heroine_name + "成功逃脱。</p>"
			return true
		} else {
			document.getElementById("event_untie_content").innerHTML += heroine_name + "的呼救没有引来任何人，请继续逃脱。</p>"
			untie_action(eye_struggle, mouth_struggle, arm_struggle, finger_struggle, leg_struggle)
			return "none"
		}
	}
	if (event_sudden_lose_able == true && random(1, 100) <= event_sudden_lose_prob) {
		document.getElementById("event_untie_content").innerHTML += "<p>触发特殊事件——突发加固。" + heroine_name +
		"挣扎的样子让监控中观察的" + villain_name + "控制不住，她不顾承诺强行将" + heroine_name + "全身的束缚收紧了。</p>";
		tie_eye *= 1.2
		tie_mouth *= 1.2
		tie_arm *= 1.2
		tie_finger *= 1.2
		tie_leg *= 1.2
		return "none"
	}
	if (event_very_cute_able == true && random(1, 100) <= event_very_cute_prob) {
		document.getElementById("event_untie_content").innerHTML += "<p>触发特殊事件——萌化。" + 
		"由于" + heroine_name + "挣扎的样子太萌了，让" + villain_name + "忍不住与" + heroine_name + "贴贴，" + heroine_name + "达到了巅峰。</p>" 
		power -= power_consume_pleasure
		pleasant = 0
		return "none"
	}
	if (event_persuade_able == true && random(1, 100) <= event_persuade_prob) {
		document.getElementById("event_untie_content").innerHTML += "<p>触发特殊事件——说服。" + 
		"由于" + heroine_name + "晓之以理动之以情，" + villain_name + "被" + heroine_name + "成功说动了，最终决定放了" + heroine_name + "。</p>" 
		return true
	}
	if (event_tk_able == true && random(1, 100) <= event_tk_prob) {
		document.getElementById("event_untie_content").innerHTML += "<p>触发特殊事件——挠痒。" + 
		villain_name + "忍不住将手伸向" + heroine_name + "的脚丫，" + heroine_name + "被阵阵钻心的痒感刺激的无力挣扎。</p>" 
		pleasant += 20
		power -= 10
		return "none"
	}

	return "none"
}


function untie_action(eye_struggle, mouth_struggle, arm_struggle, finger_struggle, leg_struggle) {
	untie_judge_epoch = untie_judge()
	if (untie_judge_epoch == true || untie_judge_epoch == false) {
		return untie_judge_epoch
	}

	if (eye_struggle == true) {
		tie_eye -= untie_eye
		if (tie_eye <= 0) {
			tie_eye = 0
		}
	} else if (mouth_struggle == true) {
		tie_mouth -= untie_mouth
		if (tie_mouth <= 0) {
			tie_mouth = 0
		}
	} else if (arm_struggle == true) {
		tie_arm -= untie_arm
		if (tie_arm <= 0) {
			tie_arm = 0
		}
	} else if (finger_struggle == true) {
		tie_finger -= untie_finger
		if (tie_finger <= 0) {
			tie_finger = 0
		}
	} else if (leg_struggle == true) {
		tie_leg -= untie_leg
		if (tie_leg <= 0) {
			tie_leg = 0
		}
	}

	pleasant += sensitivity*pleasant_augment
	power -= power_consume

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

	untie_judge_epoch = untie_judge()
	if (untie_judge_epoch == true || untie_judge_epoch == false) {
		return untie_judge_epoch
	}
	untie_event_judge_epoch = untie_event_judge()
	if (untie_event_judge_epoch == true || untie_event_judge_epoch == false) {
		return untie_event_judge_epoch
	}

	return "none"
}

function untie_epoch(eye_struggle, mouth_struggle, arm_struggle, finger_struggle, leg_struggle) {
	epoch += 1
	document.getElementById("event_untie_content").innerHTML = "<p>第" + epoch + "(" + epoch_max + ")轮脱缚回合</p>"
	return untie_action(eye_struggle, mouth_struggle, arm_struggle, finger_struggle, leg_struggle)
}


function calculate_evaluation() {
	final_evaluation = final_difficulty - (tie_eye*0.1 + tie_mouth*0.1 + tie_arm*0.3 + tie_finger*0.3 + tie_leg*0.2);
	return final_evaluation
}


function result_judge(eye_struggle, mouth_struggle, arm_struggle, finger_struggle, leg_struggle) {
	result = untie_epoch(eye_struggle, mouth_struggle, arm_struggle, finger_struggle, leg_struggle)
	if (result == true) {
		document.getElementById("event_untie_buttons").style.display = "none";
		document.getElementById("final_evaluate_content").innerHTML = "<p>恭喜逃脱成功！最终得分为：" 
		tie_eye = 0
		tie_mouth = 0
		tie_arm = 0
		tie_finger = 0
		tie_leg = 0
		document.getElementById("final_evaluate_content").innerHTML = calculate_evaluation() + "</p>"
		document.getElementById("final_evaluate").style.display = "";
	} else if (result == false) {
		document.getElementById("event_untie_buttons").style.display = "none";
		document.getElementById("final_evaluate_content").innerHTML = "<p>恭喜逃脱失败！最终得分为：" + 
		calculate_evaluation() + "</p>";
		document.getElementById("final_evaluate").style.display = "";
	}
}


var untie_button_1 = document.getElementById("untie_button_1");
untie_button_1.onclick = function(){  
	result_judge(true, false, false, false, false)
	window_scroll()
}
var untie_button_2 = document.getElementById("untie_button_2");
untie_button_2.onclick = function(){  
	result_judge(false, true, false, false, false)
	window_scroll()
}
var untie_button_3 = document.getElementById("untie_button_3");
untie_button_3.onclick = function(){  
	result_judge(false, false, true, false, false)
	window_scroll()
}
var untie_button_4 = document.getElementById("untie_button_4");
untie_button_4.onclick = function(){  
	result_judge(false, false, false, true, false)
	window_scroll()
}
var untie_button_5 = document.getElementById("untie_button_5");
untie_button_5.onclick = function(){  
	result_judge(false, false, false, false, true)
	window_scroll()
}

/*
try {
		
	}
catch(err) {
	 window.alert(err)
}
*/




