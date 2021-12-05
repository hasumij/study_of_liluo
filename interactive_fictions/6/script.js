// ***************************************** 变量定义
var gift_number = 2
var all_gifts = ["灵活的舌头(嘴部脱缚能力+2)", "灵活的手指(手臂，手指脱缚能力+2)", "舞蹈演员(手臂，手指，腿部脱缚能力+2)", 
			"天生丽质(突发失败事件概率+10%)", "天生媚骨(脱衣事件概率+10%)", "冷静头脑(敏感程度-0.5)", "敏感身体(敏感程度+0.5)", 
			"娃娃脸(萌化事件概率+10%)", "口才(说服事件概率+5%)", "抖M(全部脱缚能力值-1)"]
var gifts = []
var clothes_id = 1
var all_clothes = ["可爱的jk制服(萌化事件概率+10%，脱衣事件概率+50%)", "保守的女仆装(突发失败概率+10%，敏感程度-0.2)", 
				   "普通的休闲装(敏感程度-0.2)"]

var all_ties = []

var tight_id = 1
var all_tight = ["不变", "继续收紧", "狠狠收紧"]

var all_event_tie = ["脱衣", "继续狠狠收紧"]
var event_tie_array = []

//脱缚能力值，敏感度
var untie_mouth = 2
var untie_eye = 5
var untie_arm = 10
var untie_finger = 1
var untie_leg = 10
var sensitivity = 1

//束缚值，特殊姿势增量，松紧程度
var tie_eye = 0
var tie_mouth = 0
var tie_arm = 0
var tie_finger = 0
var tie_leg = 0 //下身束缚值
var tie_post = 0 //特殊姿势增量
var tie_tightness = 1 //0-较松；1-正常；2-较紧；4-最紧

//难度值
var tie_difficulty = 0
var untie_difficulty = 0
var sensitivity_difficulty = 0
var final_difficulty = 0

//脱缚阶段
var epoch = 0
var epoch_max = 20
var pleasant = 0
var pleasant_max = epoch_max*10
var final_evaluation = 0

//特殊事件概率及状态
var event_no_clothes_prob = 0 // 脱衣
var event_no_clothes_able = true
var event_no_clothes = false
var event_string_prob = 0  //收紧
var event_string_able = true
var event_string = false

var event_eye_free = true // 是否能够看见
var event_mouth_free = false //嘴部是否自由
var event_arm_free = false // 手臂是否自由
var event_finger_free = false //手指是否自由
var event_leg_free = false // 双腿是否自由

var event_call_for_help_prob = 10 // 呼救
var event_call_for_help_able = false
var event_call_for_help = false
var event_call_for_help_success_prob = 30  // 呼救出帮手或绑架者的概率
var event_sudden_lose_prob = 5 // 突发失败
var event_sudden_lose_able = true
var event_sudden_lose = false
var event_very_cute_prob = 1 // 萌化
var event_very_cute_able = true
var event_very_cute = false
var event_persuade_prob = 1 // 说服
var event_persuade_able = false
var event_persuade = false


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

// ***************************************** 天赋选择
function gift_select(gift_bumber){
	document.getElementById("gift_buttons").style.display = "none"; // ""/"none"
	var all_gifts_mode = all_gifts
	for (i = 0; i < gift_number; i++) { 
    	var gift_index = Math.floor((Math.random()*all_gifts_mode.length));
    	gifts.push(all_gifts_mode[gift_index]);
    	if (gift_index == 0) {
    		untie_mouth += 2
    	} else if (gift_index == 1) {
    		untie_finger += 2
    		untie_arm += 2
    	} else if (gift_index == 2) {
    		untie_finger += 2
    		untie_arm += 2
    		untie_leg += 2
    	} else if (gift_index == 3) {
    		event_sudden_lose_prob += 10
    	} else if (gift_index == 4) {
    		event_no_clothes_prob += 10
    	} else if (gift_index == 5) {
    		sensitivity -= 0.2
    	} else if (gift_index == 6) {
    		sensitivity += 0.2
    	} else if (gift_index == 7) {
    		event_very_cute_prob += 10
    	} else if (gift_index == 8) {
    		event_persuade_prob += 5
    	} else if (gift_index == 9) {
    		untie_eye -= 1
    		untie_mouth -= 1
    		untie_finger -= 1
    		untie_arm -= 1
    		untie_leg -= 1
    	}
    	all_gifts_mode = all_gifts_mode.filter(function(item) {
		    return item != all_gifts_mode[gift_index];
		});
	}
	document.getElementById("gifts").innerHTML = "你的天赋为：" + display_array(gifts);
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
function clothes_select(clothes_id){
	document.getElementById("clothes_buttons").style.display = "none";
	if (clothes_id == 0) {
		event_very_cute_prob += 2
		event_no_clothes_prob += 50
	} else if (clothes_id == 1) {
		event_sudden_lose_prob += 2
		sensitivity -= 0.2
	} else if (clothes_id == 2) {
		sensitivity -= 0.2
	}
	document.getElementById("clothes").innerHTML = "你的服装为：" + all_clothes[clothes_id];
	document.getElementById("tie_select").style.display = "";
	window_scroll()
}


var clothes_button_1 = document.getElementById("clothes_button_1");
clothes_button_1.onclick = function(){  
	clothes_id = 0
    clothes_select(clothes_id);
}
var clothes_button_2 = document.getElementById("clothes_button_2");
clothes_button_2.onclick = function(){  
	clothes_id = 1
    clothes_select(clothes_id);
}
var clothes_button_3 = document.getElementById("clothes_button_3");
clothes_button_3.onclick = function(){  
	clothes_id = 2
    clothes_select(clothes_id);
}


// ***************************************** 束缚选择
function tie_eye_select() {
	eye = document.getElementsByName("eye");
	if (eye[0].checked == true) {
		tie_eye += 10
		event_eye_free = false
	}
}

function tie_mouth_select() {
	mouth = document.getElementsByName("mouth");
	if (mouth[0].checked == true) {
		tie_mouth += 10;
	} else if (mouth[1].checked == true) {
		tie_mouth += 30;
		event_call_for_help_prob += 5;
	} else if (mouth[2].checked == true) {
		tie_mouth += 20;
		event_call_for_help_prob -= 5
		sensitivity -= 0.1
	}
}

function tie_finger_select() {
	finger = document.getElementsByName("finger");
	if (finger[0].checked == true) {
		tie_finger += 1
	}
	if (finger[1].checked == true) {
		tie_finger += 2
	}
}

function tie_arm_select() {
	arm = document.getElementsByName("arm");
	if (arm[0].checked == true) {
		tie_arm += 80
		sensitivity += 0.1
	} else if (arm[1].checked == true) {
		tie_arm += 100
		untie_finger -= 1
	} else if (arm[2].checked == true) {
		tie_arm += 100
		untie_arm -= 2
	}
}

function tie_leg_select() {
	tie_leg += 50 //捆脚踝
	leg = document.getElementsByName("leg");
	if (leg[0].checked == true) {
		tie_leg += 40
	}
	if (leg[1].checked == true) {
		tie_leg += 40
	}
}

function tie_body_select() {
	body = document.getElementsByName("body");
	if (body[0].checked ==  true) {
		sensitivity += 0.2
	} else if (body[1].checked == true) {
		sensitivity += 0.3
	}
}

function tie_post_select() {
	post = document.getElementsByName("post");
	// document.getElementById("tie_functions").innerHTML = post[0].checked;
	if (post[0].checked == true) {
		tie_post += 0
	} else if (post[1].checked == true) {
		tie_arm -= 1
		tie_leg -= 2
		event_sudden_lose_prob += 10
		tie_post += 50
	} else if (post[2].checked == true) {
		tie_arm -= 4
		tie_leg -= 4
		tie_post += 80
	}
}

var tie_confirm_button = document.getElementById("tie_confirm_button");
tie_confirm_button.onclick = function() {  
	document.getElementById("tie_buttons").style.display = "none";

	tie_eye_select();
	tie_mouth_select();
	tie_arm_select();
	tie_finger_select();
	tie_leg_select();
	tie_body_select();
	tie_post_select();

	document.getElementById("tie_functions").innerHTML = "你的捆绑方式为：" + document.getElementsByName("arm")[0].checked;
	document.getElementById("tight_select").style.display = "";

	window_scroll()
}


// ***************************************** 收紧程度
function tight_select(tight_id){
	document.getElementById("tight_buttons").style.display = "none";
	if (tight_id == 0) {
		tie_arm += 0
	} else if (tight_id == 1) {
		tie_eye *= 1.2
		tie_mouth *= 1.2
		tie_arm *= 1.2
		tie_finger *= 1.2
		tie_leg *= 1.2
	} else if (tight_id == 2) {
		tie_eye *= 2
		tie_mouth *= 2
		tie_arm *= 2
		tie_finger *= 2
		tie_leg *= 2
	}
	document.getElementById("tight_grade").innerHTML = "你的束缚收紧程度为：" + all_tight[tight_id];
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
		event_no_clothes = true
		sensitivity += 0.2
		event_very_cute_able = false
		event_tie_array.push(all_event_tie[0])
	}
	if (event_string_able == true && random(1, 100) <= event_string_prob) {
		tie_eye *= 2
		tie_mouth *= 2
		tie_arm *= 2
		tie_finger *= 2
		tie_leg *= 2
		event_tie_array.push(all_event_tie[1])
	}
	if (event_no_clothes == false && event_string == false) {
		event_tie_array.push("无特殊事件")
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
	"当前束缚值:",
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
	]
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
function untie_eye_action() {
	if (event_eye_free == false) {
		document.getElementById("untie_button_1").style.display = "none";
		document.getElementById("event_untie_content").innerHTML += "<p>你已重获光明</p>"
		event_eye_free = true
		tie_eye = 0
	} else {
		document.getElementById("untie_button_1").style.display = "none";
		tie_eye = 0
	}
}

function untie_mouth_action() {
	if (event_eye_free == false) {
		document.getElementById("untie_button_2").style.display = "none";
		document.getElementById("event_untie_content").innerHTML += "<p>你已成功挣脱嘴部束缚</p>"
		event_mouth_free = true
		tie_mouth = 0
		event_call_for_help_able = true
		event_persuade_able = true
	} else {
		document.getElementById("untie_button_2").style.display = "none";
		tie_mouth = 0
		event_call_for_help_able = true
		event_persuade_able = true
	}
}

function untie_arm_action() {
	if (event_eye_free == false) {
		document.getElementById("untie_button_3").style.display = "none";
		document.getElementById("event_untie_content").innerHTML += "<p>你已成功挣脱手臂束缚</p>"
		event_arm_free = true
		tie_arm = 0
	} else {
		document.getElementById("untie_button_3").style.display = "none";
		tie_arm = 0
	}
}

function untie_finger_action() {
	if (event_finger_free == false) {
		document.getElementById("untie_button_4").style.display = "none";
		document.getElementById("event_untie_content").innerHTML += "<p>你已成功挣脱手指束缚</p>"
		event_finger_free = true
		tie_finger = 0
		untie_leg += 2
		untie_arm += 2
	} else {
		document.getElementById("untie_button_4").style.display = "none";
		tie_finger = 0
		untie_leg += 2
		untie_arm += 2
	}
}

function untie_leg_action() {
	if (event_leg_free == false) {
		document.getElementById("untie_button_5").style.display = "none";
		document.getElementById("event_untie_content").innerHTML += "<p>你已成功挣脱双腿束缚</p>"
		event_leg_free = true
		tie_leg = 0
	} else {
		document.getElementById("untie_button_5").style.display = "none";
		tie_leg = 0
	}
}


function start_to_untie_judge () {
	if (tie_eye <= 0) {
		untie_eye_action()
	}
	if (tie_mouth <= 0) {
		untie_mouth_action()
	}
	if (tie_arm <= 0) {
		untie_arm_action()
	}
	if (tie_finger <= 0) {
		untie_finger_action()
	}
	if (tie_leg <= 0) {
		untie_leg_action()
	}
}


var start_to_untie_button = document.getElementById("start_to_untie_button");
start_to_untie_button.onclick = function(){  
	document.getElementById("start_to_untie_buttons").style.display = "none";
	document.getElementById("event_tie_content").innerHTML += display_array(display_attributes_values());
	document.getElementById("event_untie").style.display = "";
	start_to_untie_judge()
	window_scroll()
}


function untie_judge() {
	if (pleasant > pleasant_max) {
		document.getElementById("event_untie_content").innerHTML += "快感到达极限，你忍不住达到高潮，逃脱失败。";
		return false
	}

	if (tie_eye <= 0 && tie_mouth <= 0 && tie_arm <= 0 && tie_finger <= 0 && tie_leg <= 0) {
		document.getElementById("event_untie_content").innerHTML += "所有部位解缚成功，成功逃脱。";
		return true
	}

	if (tie_eye <= 0) {
		untie_eye_action()
	}
	if (tie_mouth <= 0) {
		untie_mouth_action()
	}
	if (tie_arm <= 0) {
		untie_arm_action()
	}
	if (tie_finger <= 0) {
		untie_finger_action()
	}
	if (tie_leg <= 0) {
		untie_leg_action()
	}

	return "none"
}


function untie_event_judge() {
	if (event_call_for_help_able == true && random(1, 100) <= event_call_for_help_prob) {
		document.getElementById("event_untie_content").innerHTML += "<p>触发特殊事件——呼救。"
		if (random(1, 100) <= event_call_for_help_success_prob <= 30) {
			document.getElementById("event_untie_content").innerHTML += "你的呼救引来了绑架者，逃脱失败。</p>"
			return false
		} else if (random(1, 100) >= (100 - event_call_for_help_success_prob)) {
			document.getElementById("event_untie_content").innerHTML += "你的呼救引来了帮手，她帮助你成功逃脱。</p>"
			return true
		} else {
			document.getElementById("event_untie_content").innerHTML += "你的呼救没有引来任何人，请继续逃脱。</p>"
			untie_action(eye_struggle, mouth_struggle, arm_struggle, finger_struggle, leg_struggle)
			return "none"
		}
	}
	if (event_sudden_lose_able == true && random(1, 100) <= event_sudden_lose_prob) {
		document.getElementById("event_untie_content").innerHTML += "<p>触发特殊事件——突发失败。" + 
		"你挣扎的样子让监控中观察的绑架者控制不住，她不顾承诺强行将你带走了。</p>";
		return false
	}
	if (event_very_cute_able == true && random(1, 100) <= event_very_cute_prob) {
		document.getElementById("event_untie_content").innerHTML += "<p>触发特殊事件——萌化。" + 
		"由于你挣扎的样子太萌了，让绑架者产生了羞愧的感觉，绑架者最终决定放了你。</p>" 
		return true
	}
	if (event_persuade_able == true && random(1, 100) <= event_persuade_prob) {
		document.getElementById("event_untie_content").innerHTML += "<p>触发特殊事件——说服。" + 
		"由于你晓之以理动之以情，绑架者被你成功说动了，最终决定放了你。</p>" 
		return true
	}

	if (event_arm_free == true) {
		document.getElementById("event_untie_content").innerHTML += "<p>你成功解开了其他拘束，逃离了这里。</p>"
		return true
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
	} else if (mouth_struggle == true) {
		tie_mouth -= untie_mouth
	} else if (arm_struggle == true) {
		tie_arm -= untie_arm
	} else if (finger_struggle == true) {
		tie_finger -= untie_finger
	} else if (leg_struggle == true) {
		tie_leg -= untie_leg
	}
	pleasant += sensitivity*10
	current_attribute_array = [
	"眼部束缚值——" + tie_eye,
	"嘴部束缚值——" + tie_mouth,
	"手臂束缚值——" + tie_arm,
	"手指束缚值——" + tie_finger,
	"腿部束缚值——" + tie_leg,
	"当前快感值——" + pleasant + "(" + pleasant_max + ")"
	];
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
	if (epoch > epoch_max) {
		document.getElementById("event_untie_content").innerHTML = "<p>脱缚时间到，你尚未挣脱束缚。</p>"
		return false
	}

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




