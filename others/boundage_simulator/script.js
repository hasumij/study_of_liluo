// ***************************************** 右上角函数
var restart = document.getElementById("restart");
restart.onclick = function() {
	window.history.back(-1);
	window.location.reload();
}

// ***************************************** 初始化
function all_init() {
	character_init()
	random_y_init()
	gift_init()
	clothes_init()
	tie_select_init()
	string_init()
}
all_init()

// ***************************************** 角色创建
function character_init() {
	heroine_select_button = document.getElementById("heroine_select_button");
	options_init(heroine_select_button, all_heroine_characters)
	villain_select_button = document.getElementById("villain_select_button");
	options_init(villain_select_button, all_villain_characters)
}

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

character_submit_button_function = function() {
	heroine_name = document.getElementById("heroine_name").value
	villain_name = document.getElementById("villain_name").value
	if (heroine_name == "" || villain_name == "") {
		window.alert("主角名或绑匪名为空。")
		return
	}
	character_array.push("被绑者角色名为" + heroine_name)
	character_array.push("绑架者角色名为" + villain_name)

	if (villain_name == "逗鲨-") {
		skill_dousha_1()
	}

	document.getElementById("character").innerHTML = display_array(character_array);
	document.getElementById("character_buttons").style.display = "none";
	document.getElementById("random_select").style.display = ""
	window_scroll()
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

	if (villain_name == "逗鲨-") {
		skill_dousha_1()
	}

	document.getElementById("character").innerHTML = display_array(character_array);
	document.getElementById("character_buttons").style.display = "none";
	document.getElementById("random_select").style.display = ""
	window_scroll()
}


// ***************************************** 全随机开局
function random_buttons_action() {
	document.getElementById("random_select").style.display = "none"
	document.getElementById("gift_select").style.display = ""
	window_scroll()
}

var random_n_button = document.getElementById("random_n_button");
random_n_button.onclick = function() {
	random_buttons_action()
}

function random_y_init() {
	gifts_random_select_button = document.getElementById("gifts_random_select_button");
	options_init(gifts_random_select_button, all_gift_random_numbers)
	reinforce_random_select_button = document.getElementById("reinforce_random_select_button");
	options_init(reinforce_random_select_button, all_reinforce_random_numbers)
}

var random_y_button = document.getElementById("random_y_button")
random_y_button.onclick = function() {
	document.getElementById("random_main_buttons").style.display = "none"
	document.getElementById("random_y_buttons").style.display = ""
	window_scroll()
}

var random_n_confirm_button = document.getElementById("random_n_confirm_button");
random_n_confirm_button.onclick = function() {
	gift_random_select_index = document.getElementById("gifts_random_select_button").selectedIndex
	gift_number = all_gift_random_numbers[gift_random_select_index]
	gifts_random_action(all_positive_gifts, gift_number, true);
	gifts_random_action(all_negative_gifts, gift_number, false);
	gifts_confirm_button.click();
	document.getElementById("clothes_select_button").selectedIndex = random(0, all_clothes.length - 1)
	clothes_confirm_button.click();
	tie_random_button.click();
	tie_confirm_button.click();
	reinforce_random_select_number = all_reinforce_random_numbers[document.getElementById("reinforce_random_select_button").selectedIndex];
	string_random_action(reinforce_random_select_number)
	string_confirm_button.click();
	event_tie_button_1.click();
	random_buttons_action()
}


// ***************************************** 天赋选择
function gift_init() {
	positive_gifts_select_button = document.getElementById("positive_gifts_select_button");
	options_init(positive_gifts_select_button, all_positive_gifts)
	$("#positive_gifts_select_button").select2();
	$('#positive_gifts_select_button').select2({closeOnSelect: false});
	negative_gifts_select_button = document.getElementById("negative_gifts_select_button");
	options_init(negative_gifts_select_button, all_negative_gifts)
	$("#negative_gifts_select_button").select2();
	$('#negative_gifts_select_button').select2({closeOnSelect: false});
	document.getElementById("gifts_introduction").innerHTML = "当前天赋点数：" + gift_point;
}

function gift_point_action() {
	gift_point = 0;
	positive_gifts = $("#positive_gifts_select_button").val();
	negative_gifts = $("#negative_gifts_select_button").val();
	if (positive_gifts != null) {
		positive_index = from_array_extract_index(positive_gifts, all_positive_gifts)
		list_function_action(positive_index, all_positive_gifts_point)
	}
	if (negative_gifts != null) {
		negative_index = from_array_extract_index(negative_gifts, all_negative_gifts)
		list_function_action(negative_index, all_negative_gifts_point)
	}
	document.getElementById("gifts_introduction").innerHTML = "当前天赋点数：" + gift_point;
}

$("#positive_gifts_select_button").on("change", function(e) {gift_point_action()})
$("#negative_gifts_select_button").on("change", function(e) {gift_point_action()})

function gifts_random_action(all_gifts, gift_number, if_positive) {
	all_gifts_mode = all_gifts
	gifts_select = []
	for(i = 0; i < gift_number; i++) {
		gift = random_sample(all_gifts_mode)
		all_gifts_mode = delete_value(all_gifts_mode, gift)
		gifts_select.push(gift)
	}
	if(if_positive == true) {
		$("#positive_gifts_select_button").val(gifts_select).trigger("change");
	} else {
		$("#negative_gifts_select_button").val(gifts_select).trigger("change");
	}
}

var gifts_random_button = document.getElementById("gifts_random_button");
gifts_random_button.onclick = function() {
	gifts_random_action(all_positive_gifts, 5, true);
	gifts_random_action(all_negative_gifts, 5, false);
	window_scroll()
}

var gifts_confirm_button = document.getElementById("gifts_confirm_button");
gifts_confirm_button.onclick = function() {
	if (gift_point < 0) {
		window.alert("最终天赋点需要大于0！")
		gift_point = 0
		return
	}
	positive_gifts = $("#positive_gifts_select_button").val();
	negative_gifts = $("#negative_gifts_select_button").val();
	if (negative_gifts == null) {
		window.alert("天赋不能为空！")
		gift_point = 0
		return
	}
	if (positive_gifts != null) {
		positive_index = from_array_extract_index(positive_gifts, all_positive_gifts)
		list_function_action(positive_index, all_positive_gifts_function)
		gifts = positive_gifts.concat(negative_gifts)
	} else {
		gifts = negative_gifts
	}
	negative_index = from_array_extract_index(negative_gifts, all_negative_gifts)
	list_function_action(negative_index, all_negative_gifts_function)
	document.getElementById("gift_buttons").style.display = "none";
	document.getElementById("gifts").innerHTML = heroine_name + "的天赋为：" + gifts;
	document.getElementById("clothes_select").style.display = "";
	window_scroll()
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
}


// ***************************************** 束缚选择
function tie_select_init() {
	post_select_button = document.getElementById("post_select_button");
	options_init(post_select_button, all_tie_post)

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

	tie_select_display(0, 0);
}

function tie_select_display(tie_id, tie_select_id) {
	if (tie_id == 0) {
		all_tie_post_display[tie_select_id]()
	} else if (tie_id == 1) {
		all_tie_eye_display[tie_select_id]()
	} else if (tie_id == 2) {
		all_tie_mouth_display[tie_select_id]()
	} else if (tie_id == 3) {
		all_tie_arm_display[tie_select_id]()
	} else if (tie_id == 4) {
		all_tie_finger_display[tie_select_id]()
	} else if (tie_id == 5) {
		all_tie_leg_display[tie_select_id]()
	} else if (tie_id == 6) {
		all_tie_body_display[tie_select_id]()
	}
}

function tie_select(tie_id, tie_select_id) {
	if (tie_id == 0) {
		all_tie_post_function[tie_select_id]()
	} else if (tie_id == 1) {
		all_tie_eye_function[tie_select_id]()
	} else if (tie_id == 2) {
		all_tie_mouth_function[tie_select_id]()
	} else if (tie_id == 3) {
		all_tie_arm_function[tie_select_id]()
	} else if (tie_id == 4) {
		all_tie_finger_function[tie_select_id]()
	} else if (tie_id == 5) {
		all_tie_leg_function[tie_select_id]()
	} else if (tie_id == 6) {
		all_tie_body_function[tie_select_id]()
	}
}

var post_select_button = document.getElementById("post_select_button")
post_select_button.onchange = function() {
	post_select_index = document.getElementById("post_select_button").selectedIndex
	tie_select_display(0, post_select_index)
	window_scroll()
}
var eye_select_button = document.getElementById("eye_select_button")
eye_select_button.onchange = function() {
	eye_select_index = document.getElementById("eye_select_button").selectedIndex
	tie_select_display(1, eye_select_index)
	window_scroll()
}
var mouth_select_button = document.getElementById("mouth_select_button")
mouth_select_button.onchange = function() {
	mouth_select_index = document.getElementById("mouth_select_button").selectedIndex
	tie_select_display(2, mouth_select_index)
	window_scroll()
}
var arm_select_button = document.getElementById("arm_select_button")
arm_select_button.onchange = function() {
	arm_select_index = document.getElementById("arm_select_button").selectedIndex
	tie_select_display(3, arm_select_index)
	window_scroll()
}
var finger_select_button = document.getElementById("finger_select_button")
finger_select_button.onchange = function() {
	finger_select_index = document.getElementById("finger_select_button").selectedIndex
	tie_select_display(4, finger_select_index)
	window_scroll()
}
var leg_select_button = document.getElementById("leg_select_button")
leg_select_button.onchange = function() {
	leg_select_index = document.getElementById("leg_select_button").selectedIndex
	tie_select_display(5, leg_select_index)
	window_scroll()
}
var body_select_button = document.getElementById("body_select_button")
body_select_button.onchange = function() {
	body_select_index = document.getElementById("body_select_button").selectedIndex
	tie_select_display(6, body_select_index)
	window_scroll()
}


var tie_random_button = document.getElementById("tie_random_button");
tie_random_button.onclick = function() {
	document.getElementById("post_select_button").selectedIndex = random(0, all_tie_post.length)
	document.getElementById("eye_select_button").selectedIndex = random(0, all_tie_eye.length)
	document.getElementById("mouth_select_button").selectedIndex = random(0, all_tie_mouth.length)
	document.getElementById("arm_select_button").selectedIndex = random(0, all_tie_arm.length)
	document.getElementById("finger_select_button").selectedIndex = random(0, all_tie_finger.length)
	document.getElementById("leg_select_button").selectedIndex = random(0, all_tie_leg.length)
	document.getElementById("body_select_button").selectedIndex = random(0, all_tie_body.length)
	window_scroll()
}

var tie_confirm_button = document.getElementById("tie_confirm_button");
tie_confirm_button.onclick = function() {  
	document.getElementById("tie_buttons").style.display = "none";
	post_select_index = document.getElementById("post_select_button").selectedIndex
	tie_select(0, post_select_index)
	eye_select_index = document.getElementById("eye_select_button").selectedIndex
	tie_select(1, eye_select_index)
	mouth_select_index = document.getElementById("mouth_select_button").selectedIndex
	tie_select(2, mouth_select_index)
	arm_select_index = document.getElementById("arm_select_button").selectedIndex
	tie_select(3, arm_select_index)
	finger_select_index = document.getElementById("finger_select_button").selectedIndex
	tie_select(4, finger_select_index)
	leg_select_index = document.getElementById("leg_select_button").selectedIndex
	tie_select(5, leg_select_index)
	body_select_index = document.getElementById("body_select_button").selectedIndex
	tie_select(6, body_select_index)
	document.getElementById("tie_functions").innerHTML = tie_string;
	document.getElementById("string_select").style.display = "";
	window_scroll()
}


// ***************************************** 收紧加固
function string_init() {
	tight_select_button = document.getElementById("tight_select_button")
	options_init(tight_select_button, all_tight)

	reinforce_select_button = document.getElementById("reinforce_select_button")
	options_init(reinforce_select_button, all_tie_reinforce)
	$("#reinforce_select_button").select2();
	$('#reinforce_select_button').select2({closeOnSelect: false});
	all_tie_reinforce_display[0]()
}

$("#reinforce_select_button").on("change", function(e) {
	reinforce_content = $("#reinforce_select_button").val();
	if (reinforce_content != null) {
		reinforce_index = from_array_extract_index(reinforce_content, all_tie_reinforce).slice(-1)[0]
		all_tie_reinforce_display[reinforce_index]()
	}
})

function string_random_action(reinforce_random_select_number=5) {
	document.getElementById("tight_select_button").selectedIndex = random(0, all_tight.length - 1)
	all_tie_reinforce_mode = all_tie_reinforce
	tie_reinforce_seletct = []
	for(i = 0; i < reinforce_random_select_number; i++) {
		tie_reinforce = random_sample(all_tie_reinforce_mode)
		all_tie_reinforce_mode = delete_value(all_tie_reinforce_mode, tie_reinforce)
		tie_reinforce_seletct.push(tie_reinforce)
	}
	$("#reinforce_select_button").val(tie_reinforce_seletct).trigger("change");
}

var string_random_button = document.getElementById("string_random_button");
string_random_button.onclick = function() {
	string_random_action()
	window_scroll()
}

var string_confirm_button = document.getElementById("string_confirm_button");
string_confirm_button.onclick = function(){
	tight_id = document.getElementById("tight_select_button").selectedIndex
	all_tight_function[tight_id]()
	reinforce_content = $("#reinforce_select_button").val();
	if (reinforce_content != null) {
		reinforce_index = from_array_extract_index(reinforce_content, all_tie_reinforce)
		list_function_action(reinforce_index, all_tie_reinforce_function)
	}
	document.getElementById("string_buttons").style.display = "none";
	document.getElementById("event_tie").style.display = "";
	window_scroll()
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
	document.getElementById("event_tie_content").innerHTML = "紧缚过程没有特殊事件。"
}

var event_tie_button_1 = document.getElementById("event_tie_button_1");
event_tie_button_1.onclick = function(){  
    event_tie_action();
	document.getElementById("start_to_untie_buttons").style.display = "";
	window_scroll()
}


// ***************************************** 脱缚过程和最终评价

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

var start_to_untie_button = document.getElementById("start_to_untie_button");
start_to_untie_button.onclick = function(){  
	document.getElementById("start_to_untie_buttons").style.display = "none";
	document.getElementById("event_tie_content").innerHTML += display_array(display_attributes_values());
	document.getElementById("event_untie").style.display = "";
	result_judge()
	window_scroll()
}

var untie_main_button_1 = document.getElementById("untie_main_button_1");
untie_main_button_1.onclick = function(){
	document.getElementById("struggle_buttons").style.display = "";
	document.getElementById("event_untie_main_buttons").style.display = "none";
	window_scroll()
}

function struggle_judge() {
	// 突发事件判定
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
	return "none"
}

function struggle_action(struggle_index) {
	result_judge(general_action())
	result_judge(struggle_judge())
	result_judge(struggle_function(struggle_index))
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
	document.getElementById("struggle_buttons").style.display = "none";
	document.getElementById("event_untie_main_buttons").style.display = "";
	window_scroll()
}

var untie_main_button_2 = document.getElementById("untie_main_button_2");
untie_main_button_2.onclick = function() {
	result_judge(general_action())
	result_judge(rest_function())
	window_scroll()
}

function explore_judge() {
	if (event_unlock_eye_able == true && random(1, 100) <= event_unlock_eye_prob) {
		return event_unlock_eye_function()
	}
	if (event_unlock_mouth_able == true && random(1, 100) <= event_unlock_mouth_prob) {
		return event_unlock_mouth_function()
	}
	if (event_unlock_arm_able == true && random(1, 100) <= event_unlock_arm_prob) {
		return event_unlock_arm_function()
	}
	if (event_unlock_finger_able == true && random(1, 100) <= event_unlock_finger_prob) {
		return event_unlock_finger_function()
	}
	if (event_unlock_leg_able == true && random(1, 100) <= event_unlock_leg_prob) {
		return event_unlock_leg_function()
	}
	if (event_knife_able == true && random(1, 100) <= event_knife_prob) {
		return event_knife_function()
	}
	if (event_expose_able == true && random(1, 100) <= event_expose_prob) {
		return event_expose_function()
	}
	document.getElementById("event_untie_content").innerHTML += "<p>没有找到什么东西。</p>"
	return "none"
}

var untie_main_button_3 = document.getElementById("untie_main_button_3");
untie_main_button_3.onclick = function() {
	result_judge(general_action())
	document.getElementById("event_untie_content").innerHTML += "<p>" + heroine_name + "对自己周围进行了探索。</p>"
	result_judge(explore_judge())
	result_judge(explore_function())
	window_scroll()
}

var untie_main_button_4 = document.getElementById("untie_main_button_4");
untie_main_button_4.onclick = function() {
	function skill_return_action() {
		skill_buttons.innerHTML += "<p><input id='skill_return_button' type='button' value='返回' class='button'></p>";
		skill_return_button = document.getElementById("skill_return_button")
		skill_return_button.onclick = function() {
			document.getElementById("skill_buttons").style.display = "none";
			document.getElementById("event_untie_main_buttons").style.display = "";
			window_scroll()
		}
	}

	document.getElementById("skill_buttons").style.display = "";
	document.getElementById("event_untie_main_buttons").style.display = "none";

	skill_buttons = document.getElementById("skill_buttons")
	if (heroine_name == "魅魔喵-") {
		skill_buttons.innerHTML = "<p><input id='skill_button_1' type='button' value='魅惑' class='button'></p>";
		skill_return_action()
		skill_button_1 = document.getElementById("skill_button_1")
		skill_button_1.onclick = function() {
			result_judge(general_action())
			result_judge(skill_meimomiao_1())
			window_scroll()
		}
	} else if (heroine_name == "花梦-") {
		skill_buttons.innerHTML = "<p><input id='skill_button_1' type='button' value='打桩' class='button'></p>";
		skill_return_action()
		skill_button_1 = document.getElementById("skill_button_1")
		skill_button_1.onclick = function() {
			result_judge(general_action())
			result_judge(skill_huameng_1())
			window_scroll()
		}
	}
	if(skill_buttons.innerHTML.length == 0) {
		skill_return_action()
	}
	window_scroll()
}

/*
try {
		
	}
catch(err) {
	 window.alert(err)
}
*/




