// ***************************************** 初始定义
var heroine_name = ""
var villain_name = ""

//脱缚能力值，敏感度
var untie_eye = 10
var untie_mouth = 10
var untie_arm = 20
var untie_finger = 10
var untie_leg = 15
var sensitivity = 1
var power_consume = 10  //每轮体力消耗
var power_consume_pleasure = 50

//该部位是否可以脱缚
var untie_eye_able = true
var untie_mouth_able = true
var untie_arm_able = true
var untie_finger_able = true
var untie_leg_able = true

//束缚值，特殊姿势增量，松紧程度
var tie_eye = 0
var tie_mouth = 0
var tie_arm = 0
var tie_finger = 0
var tie_leg = 0 //下身束缚值
var tie_post = 0 //特殊姿势增量

//难度值
var tie_difficulty = 0
var untie_difficulty = 0
var sensitivity_difficulty = 0
var final_difficulty = 0

//脱缚阶段
var epoch = 0
var epoch_max = 30
var power = 300
var power_recover = 30 // 每次休息时的体力恢复值
var pleasant = 0
var pleasant_augment = 10
var pleasant_max = 100
var pleasant_max_number = 0

var final_evaluation = 0

//捆绑过程的特殊事件
var event_no_clothes_prob = 5 // 脱衣
var event_no_clothes_able = true
function event_no_clothes_function() {
	sensitivity += 0.2; event_very_cute_able = false;
	document.getElementById("event_tie_content").innerHTML = "触发脱衣事件。"
}
var event_string_prob = 5  //收紧
var event_string_able = true
function event_string_function() {
	tie_eye *= 2; tie_mouth *= 2; tie_arm *= 2; tie_finger *= 2; tie_leg *= 2;
	document.getElementById("event_tie_content").innerHTML = "触发收紧事件。"
}
var event_careless_prob = 5 //粗心大意
var event_careless_able = true
function event_careless_function() {
	tie_eye *= 0.5; tie_mouth *= 0.5; tie_arm *= 0.5; tie_finger *= 0.5; tie_leg *= 0.5;
	document.getElementById("event_tie_content").innerHTML = "触发粗心大意事件。"
}

//脱缚过程的特殊事件
var event_call_for_help_prob = 10 // 呼救
var event_call_for_help_able = false
var event_call_for_help_success_prob = 30  // 呼救出帮手或绑架者的概率
function event_call_for_help_function() {
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
var event_sudden_string_prob = 5 // 突发收紧
var event_sudden_string_able = true
function event_sudden_string_function() {
	document.getElementById("event_untie_content").innerHTML += "<p>触发特殊事件——突发收紧。" + heroine_name +
	"挣扎的样子让监控中观察的" + villain_name + "控制不住，她不顾承诺强行将" + heroine_name + "全身的束缚收紧了。</p>";
	tie_eye *= 1.2; tie_mouth *= 1.2; tie_arm *= 1.2; tie_finger *= 1.2; tie_leg *= 1.2;
	return "none";
}
var event_very_cute_prob = 1 // 萌化
var event_very_cute_able = true
function event_very_cute_function() {
	document.getElementById("event_untie_content").innerHTML += "<p>触发特殊事件——萌化。" + 
	"由于" + heroine_name + "挣扎的样子太萌了，让" + villain_name + "忍不住与" + heroine_name + "贴贴，" + heroine_name + "达到了巅峰。</p>" 
	power -= power_consume_pleasure; pleasant = 0;
	return "none"
}
var event_persuade_prob = 1 // 说服
var event_persuade_able = false
function event_persuade_function() {
	document.getElementById("event_untie_content").innerHTML += "<p>触发特殊事件——说服。" + 
	"由于" + heroine_name + "晓之以理动之以情，" + villain_name + "被" + heroine_name + "成功说动了，最终决定放了" + heroine_name + "。</p>" 
	return true
}
var event_tk_prob = 5 //挠痒
var event_tk_able = true
function event_tk_function() {
	document.getElementById("event_untie_content").innerHTML += "<p>触发特殊事件——挠痒。" + 
	villain_name + "忍不住将手伸向" + heroine_name + "的脚丫，" + heroine_name + "被阵阵钻心的痒感刺激的无力挣扎。</p>" 
	pleasant += 20; power -= 10;
	if (n_gift_19_judge == true) {
		n_gift_19_function()
	}
	return "none"
}

// 探索事件
// 探索过程中的解锁事件
var event_unlock_eye_able = false
var event_unlock_eye_prob = 30
function event_unlock_eye_function() {
	console.log(unlock_clothes_5, unlock_tie_eye_3, unlock_string_1, untie_eye_able)
	event_unlock_eye_able = false; unlock_string_1 = true;
	console.log(unlock_clothes_5, unlock_tie_eye_3, unlock_string_1, untie_eye_able)
	document.getElementById("event_untie_content").innerHTML += "<p>" + heroine_name + "在探索的过程中找到了眼罩钥匙。</p>"
	return "none"
}
var event_unlock_mouth_able = false
var event_unlock_mouth_prob = 30
function event_unlock_mouth_function() {
	event_unlock_mouth_able = false; unlock_string_2 = true;
	document.getElementById("event_untie_content").innerHTML += "<p>" + heroine_name + "在探索的过程中找到了口球钥匙。</p>"
	return "none"
}
var event_unlock_arm_able = false
var event_unlock_arm_prob = 30
function event_unlock_arm_function() {
	event_unlock_arm_able = false; unlock_string_3 = true;
	document.getElementById("event_untie_content").innerHTML += "<p>" + heroine_name + "在探索的过程中找到了手腕上手铐的钥匙。</p>"
	return "none"
}
var event_unlock_finger_able = false
var event_unlock_finger_prob = 30
function event_unlock_finger_function() {
	event_unlock_finger_able = false; unlock_string_4 = true;
	document.getElementById("event_untie_content").innerHTML += "<p>" + heroine_name + "在探索的过程中找到了手指上指铐的钥匙。</p>"
	return "none"
}
var event_unlock_leg_able = false
var event_unlock_leg_prob = 30
function event_unlock_leg_function() {
	event_unlock_leg_able = false; unlock_string_5 = true;
	document.getElementById("event_untie_content").innerHTML += "<p>" + heroine_name + "在探索的过程中找到了双腿上镣铐的钥匙。</p>"
	return "none"
}
// 其他探索事件
var event_knife_prob = 30 //找到小刀
var event_knife_able = true
function event_knife_function() {
	document.getElementById("event_untie_content").innerHTML += "<p>触发特殊事件——发现小刀。" + 
	heroine_name + "在探索过程中找到了小刀，更容易脱缚了。"
	untie_arm += 20; untie_finger += 20; untie_leg += 20; event_knife_able = false;
	if (p_gift_18_judge == true) {
		p_gift_18_function()
	}
	if (n_gift_18_judge == true) {
		n_gift_18_function()
	}
	return "none"
}
var event_expose_prob = 30 //暴露行踪
var event_expose_able = true
function event_expose_function() {
	document.getElementById("event_untie_content").innerHTML += "<p>触发特殊事件——暴露行踪。" + 
	heroine_name + "在探索过程中被" + villain_name + "发现了，她继续加固了" + heroine_name + "身上的束缚。"
	untie_arm += 20; untie_finger += 20; untie_leg += 20; event_knife = true;
	tie_eye *= 1.2; tie_mouth *= 1.2; tie_arm *= 1.2; tie_finger *= 1.2; tie_leg *= 1.2; event_expose = true;
	return "none"
}
var event_glass_prob = 10 // 玻璃碴
var event_glass_able = true
function event_glass_function() {
	document.getElementById("event_untie_content").innerHTML += "<p>触发特殊事件——玻璃碴。" + heroine_name + 
	"在探索过程中被玻璃碴划伤了手指。"
	untie_finger -= 3; untie_arm -= 3; power_consume += 5;
	return "none"
}


// 条件事件
var event_eye_free = false // 是否能够看见
var event_mouth_free = false //嘴部是否自由
var event_arm_free = false // 手臂是否自由
var event_finger_free = false //手指是否自由
var event_leg_free = false // 双腿是否自由

function event_eye_free_function() {
	document.getElementById("struggle_button_1").style.display = "none";
	document.getElementById("event_untie_content").innerHTML += "<p>" + heroine_name + "已获得光明</p>"
	event_eye_free = true;
}
function event_mouth_free_function() {
	document.getElementById("struggle_button_2").style.display = "none";
	document.getElementById("event_untie_content").innerHTML += "<p>" + heroine_name + "已成功挣脱嘴部束缚</p>"
	event_mouth_free = true; event_call_for_help_able = true; event_persuade_able = true;
}
function event_arm_free_function() {
	document.getElementById("struggle_button_3").style.display = "none";
	document.getElementById("event_untie_content").innerHTML += "<p>" + heroine_name + "已成功挣脱手臂束缚，开始解开其他束缚</p>"
	event_arm_free = true; untie_eye *= 3;
	untie_finger *= 3; untie_finger_able = true; untie_leg *= 3; untie_leg_able = true;
	unlock_clothes_5 = true; unlock_tie_eye_3 = true; unlock_tie_finger_3 = true;
}
function event_finger_free_function() {
	document.getElementById("struggle_button_4").style.display = "none";
	document.getElementById("event_untie_content").innerHTML += "<p>" + heroine_name + "已成功挣脱手指束缚</p>"
	event_finger_free = true; untie_leg *= 3; untie_arm *= 3;
}
function event_leg_free_function() {
	document.getElementById("struggle_button_5").style.display = "none";
	document.getElementById("event_untie_content").innerHTML += "<p>" + heroine_name + "已成功挣脱双腿束缚</p>"
	event_leg_free = true;
}
function event_pleasure_max_function() {
	document.getElementById("event_untie_content").innerHTML += "快感到达极限，" + heroine_name + "忍不住达到高潮，体力大幅度下降。";
	power -= power_consume_pleasure; pleasant = 0; pleasant_max_number += 1;
	if (p_gift_15_judge == true) {
		p_gift_15_fucntion()
	}
	if (n_gift_15_judge == true) {
		n_gift_15_function()
	}
	if (pleasant_max_number >= event_clothes_8_condition_pleasure_number && event_clothes_8_able == true &&
		random(1, 100) <= event_clothes_8_prob) {
		event_clothes_8_function()
	}
}


// ***************************************** 角色创建
var character_array = ["角色创建完毕"]
var all_heroine_characters = ["", "璃落-", "魅魔喵-", "花梦-"]
function sklill_liluo_1() { //白给
	document.getElementById("event_untie_content").innerHTML += "<p>" + heroine_name + "启用被动技能：白给</p>"
	tie_id = random(0, 4); tie_degree = random(30, 100);
	if (tie_id == 0) {
		tie_eye += tie_degree
	} else if (tie_id == 1) {
		tie_mouth += tie_degree
	} else if (tie_id == 2) {
		tie_arm += tie_degree
	} else if (tie_id == 3) {
		tie_finger += tie_degree
	} else if (tie_id == 4) {
		tie_leg += tie_degree
	}
	return "none"
}

function skill_meimomiao_1() { //魅惑
	document.getElementById("event_untie_content").innerHTML += "<p>" + heroine_name + "启用主动技能：魅惑</p>"
	tie_part_index = get_tie_part()
	if (tie_part_index.length == 1) {
		document.getElementById("event_untie_content").innerHTML += "<p>" + heroine_name + "当前只有一个部位被绑，技能失效。</p>"
		return "none"
	}
	tie_part_index = delete_value(tie_part_index, 2) //技能不能针对手部束缚使用
	tie_id = random_sample(tie_part_index)
	if (tie_id == 0) {
		tie_eye = 0;
	} else if (tie_id == 1) {
		tie_mouth = 0;
	} else if (tie_id == 2) {
		tie_arm = tie_arm;
	} else if (tie_id == 3) {
		tie_finger = 0;
	} else if (tie_id == 4) {
		tie_leg = 0;
	}
	power -= 100; pleasant += 50;
	return "none"
}

function skill_huameng_1() { //打桩姬
	if (event_arm_free == false) {
		document.getElementById("event_untie_content").innerHTML += "<p>" + heroine_name + "手臂尚未自由，无法发动此技能。</p>"
		return "none"
	}
	document.getElementById("event_untie_content").innerHTML += "<p>" + heroine_name + "启用主动技能：打桩。手拿1000T充气锤向" + villain_name + "脑袋砸去。</p>"
	if (random(1, 100) <= 10) {
		document.getElementById("event_untie_content").innerHTML += "<p>" + heroine_name + "砸晕了" + villain_name + "，成功逃脱。</p>"
		return true
	} else {
		document.getElementById("event_untie_content").innerHTML += "<p>" + heroine_name + "没有对" + villain_name + 
		"造成任何伤害，反而触怒了她。恼羞成怒的" + villain_name + "加固了" + heroine_name + "全身的束缚。</p>"
		tie_eye += 50
		tie_mouth += 50
		tie_arm += 100
		tie_finger += 50
		tie_leg += 200
		return "none"
	}
}

var all_villain_characters = ["", "逗鲨-", "亡灵-"]

function skill_dousha_1() { //机械化规格
	event_string_prob = 100; event_sudden_string_prob += 10;
}

function skill_wangling_1() { //双面人格
	prob = random(1, 100)
	if(prob <= 31) {
		document.getElementById("event_untie_content").innerHTML += "<p>" + villain_name + 
		"发动技能：双面人格。当前为白人格，为" + heroine_name + "松开了部分束缚。</p>"
		if(untie_eye_able == true) {
			tie_eye *= 0.7
		}
		if(untie_mouth_able == true) {
			tie_mouth *= 0.7
		}
		if(untie_arm_able == true) {
			tie_arm *= 0.7
		}
		if(untie_finger_able == true) {
			tie_finger *= 0.7
		}
		if(untie_leg_able == true) {
			tie_leg *= 0.7
		}
	} else if(prob > 31 && prob <= 33) {
		document.getElementById("event_untie_content").innerHTML += "<p>" + villain_name + 
		"发动技能：双面人格。当前为白人格。" + villain_name + "触发特殊事件：大慈大悲，为" + heroine_name + "松开了绝大部分束缚。</p>"
		if(untie_eye_able == true) {
			tie_eye *= 0.01
		}
		if(untie_mouth_able == true) {
			tie_mouth *= 0.01
		}
		if(untie_arm_able == true) {
			tie_arm *= 0.01
		}
		if(untie_finger_able == true) {
			tie_finger *= 0.01
		}
		if(untie_leg_able == true) {
			tie_leg *= 0.01
		}
	} else if(prob > 33 && prob <= 64) {
		document.getElementById("event_untie_content").innerHTML += "<p>" + villain_name + 
		"发动技能：双面人格。当前为黑人格。为" + heroine_name + "收紧了束缚。</p>"
		if(untie_eye_able == true) {
			tie_eye *= 1.3
		}
		if(untie_mouth_able == true) {
			tie_mouth *= 1.3
		}
		if(untie_arm_able == true) {
			tie_arm *= 1.3
		}
		if(untie_finger_able == true) {
			tie_finger *= 1.3
		}
		if(untie_leg_able == true) {
			tie_leg *= 1.3
		}
	} else if(prob > 64 && prob <= 69) {
		document.getElementById("event_untie_content").innerHTML += "<p>" + villain_name + 
		"发动技能：双面人格。当前为黑人格。" + villain_name + "触发特殊事件：无耻之徒，极大地收紧了" + heroine_name + "身上的束缚。</p>"
		if(untie_eye_able == true) {
			tie_eye *= 2
		}
		if(untie_mouth_able == true) {
			tie_mouth *= 2
		}
		if(untie_arm_able == true) {
			tie_arm *= 2
		}
		if(untie_finger_able == true) {
			tie_finger *= 2
		}
		if(untie_leg_able == true) {
			tie_leg *= 2
		}
	}
}

// ***************************************** 全随机开局
all_gift_random_numbers = range(1, 10)
all_reinforce_random_numbers = range(0, 11)


// ***************************************** 天赋选择
var gift_point = 0
var all_positive_gifts = ["灵活的舌头", "灵活的手指", "舞蹈演员", "外表柔弱", "天生傲骨", "冷静头脑", "御姐脸", "口才出众", 
                          "抖S", "强健体魄", "倔强难屈服", "冷静镇定", "性经验丰富", "快感忍耐", "意志坚韧", "恢复迅速", 
                          "幸运儿", "刀具精通", "不怕痒"]
var all_positive_gifts_function = [
	function p_gift_function1() {untie_mouth += 3;}, //灵活的舌头
	function p_gift_function2() {untie_finger += 3; untie_arm += 2;}, //灵活的手指
	function p_gift_function3() {untie_finger += 3; untie_arm += 3; untie_leg += 3;}, //舞蹈演员
	function p_gift_function4() {event_sudden_string_prob -= 5;}, //外表柔弱
	function p_gift_function5() {event_no_clothes_prob -= 5;}, //天生傲骨
	function p_gift_function6() {sensitivity -= 0.3; p_gift_6_judge = true;}, //冷静头脑
	function p_gift_function7() {event_very_cute_prob -= 5;}, //御姐脸
	function p_gift_function8() {event_persuade_prob += 3;}, //口才出众
	function p_gift_function9() {untie_eye += 2; untie_mouth += 2; untie_finger += 2; untie_arm += 2; untie_leg += 2;}, //抖S
	function p_gift_function10() {power += 50; power_consume_pleasure -= 10;}, //强健体魄
	function p_gift_function11() {pleasant_max += 30; power_consume_pleasure -= 20;}, //倔强难屈服
	function p_gift_function12() {event_no_clothes_prob -= 3; event_string_prob -= 3; sensitivity -= 0.1; pleasant_max += 20;}, //冷静镇定
	function p_gift_function13() {power_consume_pleasure -= 20;}, //性经验丰富
	function p_gift_function14() {pleasant_augment /= 2; power_consume_pleasure *= 1.5;}, //快感忍耐
	function p_gift_function15() {p_gift_15_judge = true;}, //意志坚韧
	function p_gift_function16() {power_recover += 10;}, //恢复迅速
	function p_gift_function17() {event_knife_prob += 3; event_expose_prob -= 3;}, //幸运儿
	function p_gift_function18() {p_gift_18_judge = true;}, //刀具精通
	function p_gift_function19() {event_tk_prob -= 5;}, //不怕痒
]
var p_gift_6_judge = false
function p_gift_6_function() {pleasant -= sensitivity * 5}
var p_gift_15_judge = false
function p_gift_15_fucntion() {pleasant_max += 10; sensitivity -= 0.2;}
var p_gift_18_judge = false
function p_gift_18_function() {untie_arm += 5; untie_leg += 5;}
var all_positive_gifts_point = [
	function p_gift_point1() {gift_point -= 1},
	function p_gift_point2() {gift_point -= 1},
	function p_gift_point3() {gift_point -= 1},
	function p_gift_point4() {gift_point -= 1},
	function p_gift_point5() {gift_point -= 1},
	function p_gift_point6() {gift_point -= 1},
	function p_gift_point7() {gift_point -= 1},
	function p_gift_point8() {gift_point -= 1},
	function p_gift_point9() {gift_point -= 1},
	function p_gift_point10() {gift_point -= 1},
	function p_gift_point11() {gift_point -= 1},
	function p_gift_point12() {gift_point -= 1},
	function p_gift_point13() {gift_point -= 1},
	function p_gift_point14() {gift_point -= 1},
	function p_gift_point15() {gift_point -= 1},
	function p_gift_point16() {gift_point -= 1},
	function p_gift_point17() {gift_point -= 1},
	function p_gift_point18() {gift_point -= 1},
	function p_gift_point19() {gift_point -= 1},
]
var all_negative_gifts = ["笨拙的舌头", "笨拙的手指", "身体僵硬", "天生丽质", "天生媚骨", "敏感身体", "娃娃脸", "笨嘴拙舌", 
						  "抖M", "宅女体质", "娇柔易推倒", "饥渴难耐", "性生活懵懂", "快感放纵", "意志薄弱", "恢复缓慢", 
						  "倒霉蛋", "惧怕刀具", "怕痒"]
var all_negative_gifts_function = [
	function n_gift_function1() {untie_mouth -= 3;}, //笨拙的舌头
	function n_gift_function2() {untie_finger -= 3; untie_arm -= 2;}, //笨拙的手指
	function n_gift_function3() {untie_finger -= 3; untie_arm -= 3; untie_leg -= 3;}, //身体僵硬
	function n_gift_function4() {event_sudden_string_prob += 5;}, //天生丽质
	function n_gift_function5() {event_no_clothes_prob += 5;}, //天生媚骨
	function n_gift_function6() {sensitivity += 0.3; n_gift_6_judge = true;}, //敏感身体
	function n_gift_function7() {event_very_cute_prob += 5;}, //娃娃脸
	function n_gift_function8() {event_persuade_prob += 3;}, //笨嘴拙舌
	function n_gift_function9() {untie_eye -= 2; untie_mouth -= 2; untie_finger -= 2; untie_arm -= 2; untie_leg -= 2;}, //抖M
	function n_gift_function10() {power -= 50; power_consume_pleasure += 10;}, //宅女体质
	function n_gift_function11() {pleasant_max -= 30; power_consume_pleasure += 20;}, //娇柔易推倒
	function n_gift_function12() {event_no_clothes_prob += 3; event_string_prob += 3; sensitivity += 0.1; pleasant_max -= 20;}, //饥渴难耐
	function n_gift_function13() {power_consume_pleasure += 20;}, //性生活懵懂
	function n_gift_function14() {pleasant_augment *= 2; power_consume_pleasure /= 1.5;}, //快感放纵
	function n_gift_function15() {n_gift_15_judge = true;}, //意志薄弱
	function n_gift_function16() {power_recover -= 10;}, //恢复缓慢
	function n_gift_function17() {event_knife_prob -= 3; event_expose_prob += 3;}, //倒霉蛋
	function n_gift_function18() {n_gift_18_judge = true;}, //惧怕刀具
	function n_gift_function19() {n_gift_19_judge = true;}, //怕痒
]
var all_negative_gifts_point = [
	function n_gift_function1() {gift_point += 1},
	function n_gift_function2() {gift_point += 1},
	function n_gift_function3() {gift_point += 1},
	function n_gift_function4() {gift_point += 1},
	function n_gift_function5() {gift_point += 1},
	function n_gift_function6() {gift_point += 1},
	function n_gift_function7() {gift_point += 1},
	function n_gift_function8() {gift_point += 1},
	function n_gift_function9() {gift_point += 1},
	function n_gift_function10() {gift_point += 1},
	function n_gift_function11() {gift_point += 1},
	function n_gift_function12() {gift_point += 1},
	function n_gift_function13() {gift_point += 1},
	function n_gift_function14() {gift_point += 1},
	function n_gift_function15() {gift_point += 1},
	function n_gift_function16() {gift_point += 1},
	function n_gift_function17() {gift_point += 1},
	function n_gift_function18() {gift_point += 1},
	function n_gift_function19() {gift_point += 1},
]
var n_gift_6_judge = false
function n_gift_6_function() {pleasant += sensitivity * 5}
var n_gift_15_judge = false
function n_gift_15_fucntion() {pleasant_max -= 10; sensitivity += 0.2;}
var n_gift_18_judge = false
function n_gift_18_function() {untie_arm -= 5; untie_leg -= 5;}
var n_gift_19_judge = false
function n_gift_19_function() {pleasant += 10; power -= 5}

// ***************************************** 衣着选择
var all_clothes = ["可爱的jk制服", "保守的女仆装", "普通的休闲装", "创可贴", "全包乳胶衣", "单薄的泳装", "性感的旗袍", 
				   "被诅咒的乳胶衣"]
var all_clothes_display = [
	function clothes_display1() { //可爱的jk制服 
		document.getElementById("clothes_introduction").innerHTML = display_array([
			"可爱的学院风制服。",
			"<img src='./my_images/clothes1.png' width='200' height='250'",
			"图片来自百度"
			])
	},
	function clothes_dislpay2() { //保守的女仆装
		document.getElementById("clothes_introduction").innerHTML = display_array([
			"女仆装原本只是从事女仆职业的女性所穿的服装。而随着女仆这种职业成为一种萌属性，女仆装这种服饰也成为一种萌属性，除了女仆穿着之外，部分非女仆的人物也常穿着女仆装，有的是出于个人着装喜好，有的是为了cosplay，有的是为了卖萌等。(萌娘百科)",
			"<img src='./my_images/clothes2.png' width='200' height='250'",
			"图片来自百度"
			])
	},
	function clothes_display3() { //普通的休闲装
		document.getElementById("clothes_introduction").innerHTML = display_array([
			"草绿色的连衣裙，搭配洁白的长筒袜，在风中稍显凌乱，更显清纯。",
			"<img src='./my_images/clothes3.png' width='200' height='300'",
			"图片来自百度"
			])
	},
	function clothes_display4() { //创可贴
		document.getElementById("clothes_introduction").innerHTML = display_array([
			"乳贴有舒适、安全、时尚、便捷、美观、防走光等作用，搭配上各式束缚，更能衬托得" + heroine_name + "愈发性感。",
			"<img src='./my_images/clothes4.png' width='200' height='250'",
			"图片来自百度"
			])
	},
	function clothes_display5() { //全包乳胶衣
		document.getElementById("clothes_introduction").innerHTML = display_array([
			"包裹着" + heroine_name + "全身的黑色性感乳胶衣，只在鼻子处留有小小的开口。",
			])
	},
	function clothes_display6() { //单薄的泳装
		document.getElementById("clothes_introduction").innerHTML = display_array([
			"性感的泳衣，完美展示着" + villain_name + "绝美性感的身材。",
			])
	},
	function clothes_display7() { //性感的旗袍
		document.getElementById("clothes_introduction").innerHTML = display_array([
			"性感的旗袍，能够完美体现女孩的身材优势。"
			])
	},
	function clothes_display8() { //被诅咒的乳胶衣
		document.getElementById("clothes_introduction").innerHTML = display_array([
			"被诅咒的乳胶衣，外观上看起来就像一件普通的黑色紧身衣，但它也许有着某些特殊的效果"
			])
	},
]
var unlock_clothes_5 = true;
var all_clothes_function = [
	function clothes_function1() {event_very_cute_prob += 5; event_no_clothes_prob += 10},
	function clothes_fucntion2() {event_sudden_string_prob += 5; sensitivity -= 0.2},
	function clothes_function3() {sensitivity -= 0.2},
	function clothes_function4() {sensitivity += 0.5; event_very_cute_able = false},
	function clothes_function5() {untie_eye_able = false; tie_eye += 30; power_consume += 5; unlock_clothes_5 = false;},
	function clothes_function6() {event_sudden_string_prob += 5; event_very_cute_prob -= 10; sensitivity += 0.3},
	function clothes_function7() {event_no_clothes_prob += 5; event_string_prob += 5; event_sudden_string_prob += 5; event_very_cute_prob -= 5},
	function clothes_function8() {sensitivity += 0.3; event_sudden_string_prob += 10; event_tk_prob += 10; event_clothes_8_able = true;},
]
event_clothes_8_able = false
event_clothes_8_prob = 100
event_clothes_8_condition_pleasure_number = 3
function event_clothes_8_function() {
	event_clothes_8_able = false; event_tk_prob += 50; pleasant_augment *= 2;
	untie_eye -= 10; untie_mouth -= 10; untie_arm -= 15; untie_finger -= 10; untie_leg -= 20;
	document.getElementById("event_untie_content").innerHTML += "<p>" + heroine_name + "触发被诅咒的乳胶衣专属事件：诅咒升级。"
	"被诅咒的乳胶衣吸收了足够多的淫液后发生了变化，内面钻出了光滑柔软的触手，升级成了被诅咒的触手服，无时无刻不在抚摸" + heroine_name + 
	"的全身</p>";
}

// ***************************************** 束缚选择
var all_tie_post = ["直立后手缚", "海老缚", "驷马缚"]
var all_tie_post_display = [
	function tie_post_display1() { //直立后手缚
		document.getElementById("tie_introduction").innerHTML = "直立后手缚。"
	},
	function tie_post_display2() { //海老缚
		document.getElementById("tie_introduction").innerHTML = "海老缚。"
	},
	function tie_post_display3() { //驷马缚
		document.getElementById("tie_introduction").innerHTML = "驷马缚。"
	}
]
var unlock_tie_eye_3 = true;
var unlock_tie_finger_3 = true;
var all_tie_post_function = [
	function tie_post_function1() {
		tie_post += 0;
		tie_string += villain_name + "准备使用直立后手缚捆绑" + heroine_name + ";"
	},
	function tie_post_function2() {
		untie_arm -= 2; untie_leg -= 2; sensitivity += 0.1; tie_post += 70;
		tie_string += villain_name + "准备使用桃缚捆绑" + heroine_name + ";"
	},
	function tie_post_function3() {
		untie_arm -= 3; untie_leg -= 3; tie_post += 100;
		tie_string += villain_name + "准备使用驷马缚捆绑" + heroine_name + ";"
	},
]
var all_tie_eye = ["", "眼罩", "暗淡的美瞳"]
var all_tie_eye_display = [
	function tie_eye_display1() {},
	function tie_eye_display2() { //眼罩
		document.getElementById("tie_introduction").innerHTML = "不透光的黑色眼罩，保证眼前一片黑暗。"
	},
	function tie_eye_display3() { //暗淡的美瞳
		document.getElementById("tie_introduction").innerHTML = "暗淡的美瞳，不透光，手臂自由前无法取下。"
	},
]
var all_tie_eye_function = [
	function tie_eye_function1() {event_eye_free = true;},
	function tie_eye_function2() {
		tie_eye += 20;
		tie_string += villain_name + "给" + heroine_name + "戴上了眼罩;";
	},
	function tie_eye_funciton3() {
		untie_eye_able = false; tie_eye += 10; unlock_tie_eye_3 = false;
		tie_string += villain_name + "给" + heroine_name + "戴上了难以取下的不透光隐形眼镜;";
	},
]
var all_tie_mouth = ["普通口球", "马具型口球", "深喉口球"]
var all_tie_mouth_display = [
	function tie_mouth_display1() { //普通口球
		document.getElementById("tie_introduction").innerHTML = "普通的带孔口球。"
	},
	function tie_mouth_display2() { //马具型口球
		document.getElementById("tie_introduction").innerHTML = "马具型口球，多重皮带加固，更牢固更紧致。"
	},
	function tie_mouth_display3() { //深喉口球
		document.getElementById("tie_introduction").innerHTML = "深喉口球，直插入咽喉，带来极大刺激。"
	},
]
var all_tie_mouth_function = [
	function tie_mouth_function1() {
		tie_mouth += 30;
		tie_string += villain_name + "给" + heroine_name + "戴上了口球;";
	},
	function tie_mouth_function2() {
		tie_mouth += 50; event_call_for_help_prob += 5;
		tie_string += villain_name + "给" + heroine_name + "戴上了马具型口球;";
	},
	function tie_mouth_function3() {
		tie_mouth += 30; event_call_for_help_prob -= 5; sensitivity -= 0.1;
		tie_string += villain_name + "给" + heroine_name + "戴上了深喉口球;";
	},
]
var all_tie_arm = ["日式紧缚", "五花大绑", "欧式紧缚", "后手观音"]
var all_tie_arm_display = [
	function tie_arm_display1() { //日式紧缚
		document.getElementById("tie_introduction").innerHTML = "相对舒适但依然牢固的捆缚方法。"
	},
	function tie_arm_display2() { //五花大绑
		document.getElementById("tie_introduction").innerHTML = "传统的绑犯人的方法，确保紧缚在背后的双手纹丝不动。"
	},
	function tie_arm_display3() { //欧式紧缚
		document.getElementById("tie_introduction").innerHTML = "后手直臂缚，从手腕到手肘直到大臂的牢固紧缚。"
	},
	function tie_arm_display4() { //后手观音
		document.getElementById("tie_introduction").innerHTML = "手肘并拢的极限后手观音缚，最为严厉的手臂绑法。"
	}
]
var all_tie_arm_function = [
	function tie_arm_function1() {
		tie_arm += 80; sensitivity += 0.1;
		tie_string += villain_name + "将" + heroine_name + "的双手用日式紧缚的方法捆了起来;";
	},
	function tie_arm_function2() {
		tie_arm += 100; untie_finger -= 1;
		tie_string += villain_name + "将" + heroine_name + "的双手五花大绑;";
	},
	function tie_arm_function3() {
		tie_arm += 100; untie_arm -= 2;
		tie_string += villain_name + "用欧式紧缚的方式将" + heroine_name + "的双手捆绑了起来;";
	},
	function tie_arm_function4() {
		tie_arm += 200; untie_arm -= 3; untie_finger -= 1;
		tie_string += villain_name + "将" + heroine_name + "捆成了极限的后手观音姿势;";
	},
]
var all_tie_finger = ["袜子", "胶带", "皮革无指手套"]
var all_tie_finger_display = [
	function tie_finger_display1() { //袜子
		document.getElementById("tie_introduction").innerHTML = "用袜子套在手指上，简单的限制手指自由的方法。"
	},
	function tie_finger_display2() { //胶带
		document.getElementById("tie_introduction").innerHTML = "用胶带将手指缠裹成两个小球，难以挣脱。"
	},
	function tie_finger_display3() { //皮革无指手套
		document.getElementById("tie_introduction").innerHTML = "彻底拘束手指的皮革无指手套"
	},
]
var all_tie_finger_function = [
	function tie_finger_function1() {
		tie_finger += 20;
		tie_string += villain_name + "给" + heroine_name + "的小手上分别套上几双棉袜;";
	},
	function tie_finger_function2() {
		tie_finger += 30;
		tie_string += villain_name + "用胶带将" + heroine_name + "的两只手分别握拳缠裹成两个小球;";
	},
	function tie_finger_function3() {
		untie_finger_able = false; tie_finger += 100; unlock_tie_finger_3 = false;
		tie_string += villain_name + "将" + heroine_name + "的双手锁入了一个皮革无指手套之中;";
	}
]
var all_tie_leg = ["捆绑脚踝", "捆绑脚踝和膝盖上下", "捆绑脚踝，膝盖上下和大腿"]
var all_tie_leg_display = [
	function tie_leg_display1() { //捆绑脚踝
		document.getElementById("tie_introduction").innerHTML = "用绳索将脚踝紧紧捆缚起来。"
	},
	function tie_leg_display2() { //捆绑脚踝和膝盖上下
		document.getElementById("tie_introduction").innerHTML = "除了脚踝之外，绳索继续捆绑至膝盖上下。"
	},
	function tie_leg_display3() { //捆绑脚踝，膝盖上下和大腿
		document.getElementById("tie_introduction").innerHTML = "绳索完全捆绑了脚踝，膝盖上下和大腿。"
	}
]
var all_tie_leg_function = [
	function tie_leg_function1() {
		tie_leg += 50;
		tie_string += villain_name + "将" + heroine_name + "的脚踝并拢捆了起来;";
	},
	function tie_leg_function2() {
		tie_leg += 90;
		tie_string += villain_name + "将" + heroine_name + "的脚踝和膝盖上下捆了起来;";
	},
	function tie_leg_function3() {
		tie_leg += 130;
		tie_string += villain_name + "将" + heroine_name + "的脚踝，膝盖上下，大腿分别捆缚了起来;";
	}
]
var all_tie_body = ["股绳", "龟甲缚"]
var all_tie_body_display = [
	function tie_body_display1() { //股绳
		document.getElementById("tie_introduction").innerHTML = "紧紧勒入下体的股绳，随着挣扎不断引起刺激。"
	},
	function tie_body_display2() { //龟甲缚
		document.getElementById("tie_introduction").innerHTML = "上面刺激胸部，下面刺激下体的龟甲缚。"
	},
]
var all_tie_body_function = [
	function tie_body_function1() {
		sensitivity += 0.2;
		tie_string += villain_name + "继续为" + heroine_name + "捆缚了股绳;";
	},
	function tie_body_function2() {
		sensitivity += 0.3;
		tie_string += villain_name + "在" + heroine_name + "的身上编织出了漂亮的龟甲缚;";
	}
]
var all_ties = []
var tie_string = ""


// ***************************************** 加固和收紧选择
var all_tight = ["不变", "继续收紧", "狠狠收紧"]
var all_tight_function = [
	function tight_function1() { //不变
		document.getElementById("string_grade").innerHTML = villain_name + "没有继续收紧" + heroine_name + "身上的束缚。";
	},
	function tight_function2() { //继续收紧
		tie_eye *= 1.5; tie_mouth *= 1.5; tie_arm *= 1.5; tie_finger *= 1.5; tie_leg *= 1.5;
		document.getElementById("string_grade").innerHTML = villain_name + "稍微收紧了" + heroine_name + "身上的束缚。";
	},
	function tight_function3() { //狠狠收紧
		tie_eye *= 2; tie_mouth *= 2; tie_arm *= 2; tie_finger *= 2; tie_leg *= 2;
		document.getElementById("string_grade").innerHTML = villain_name + "狠狠收紧了" + heroine_name + "身上的束缚。";
	},
]

var all_tie_reinforce = ["带锁眼罩", "带锁口球", "手铐", "拇指铐", "脚镣", "多层丝袜包裹", "加粗麻绳", "真空袋", 
						 "腿部皮带加固", "腿部扎带加固", "水泥鞋"]
var unlock_string_1 = true;
var unlock_string_2 = true;
var unlock_string_3 = true;
var unlock_string_4 = true;
var unlock_string_5 = true;
var all_tie_reinforce_display = [
	function tie_reinforce_display1() { //带锁眼罩
		document.getElementById("string_introduction").innerHTML = "带锁的眼罩，需要找到钥匙才能打开。"
	},
	function tie_reinforce_display2() { //带锁口球
		document.getElementById("string_introduction").innerHTML = "带锁的口球，需要找到钥匙才能打开。"
	},
	function tie_reinforce_display3() { //手铐
		document.getElementById("string_introduction").innerHTML = "铐在手腕上的手铐，需要找到钥匙才能打开。"
	},
	function tie_reinforce_display4() { //拇指铐
		document.getElementById("string_introduction").innerHTML = "可以铐住大拇指的指铐，需要找到钥匙才能打开。"
	},
	function tie_reinforce_display5() { //脚镣
		document.getElementById("string_introduction").innerHTML = "铐在脚踝上的脚镣，需要找到钥匙才能打开。"
	},
	function tie_reinforce_display6() { //多层丝袜包裹
		document.getElementById("string_introduction").innerHTML = "多重丝袜包裹，从外部继续加固束缚。"
	},
	function tie_reinforce_display7() { //加粗麻绳
		document.getElementById("string_introduction").innerHTML = "将束缚的绳索换为加粗麻绳，比普通麻绳更加坚固，让" + 
		heroine_name + "更难挣脱。"
	},
	function tie_reinforce_display8() { //真空袋
		document.getElementById("string_introduction").innerHTML = "一种听起来就无法脱缚的东西，绑缚者将拘束好的被缚者放到真空袋里，"
		"用抽气机抽到了里面的空气，" + heroine_name + "觉得浑身没有一个地方能动弹。"
	},
	function tie_reinforce_display9() { //腿部皮带加固
		document.getElementById("string_introduction").innerHTML = "使用1-5条皮带继续加固腿部束缚。"
	},
	function tie_reinforce_display10() { //腿部扎带加固
		document.getElementById("string_introduction").innerHTML = "使用6-10条扎带继续加固腿部束缚。"
	},
	function tie_reinforce_display11() { //水泥鞋
		document.getElementById("string_introduction").innerHTML = "一种听起来就无法脱缚的东西，" + villain_name + 
		"会将" + heroine_name + "的双脚埋入水泥中，" + heroine_name + "必须在水泥彻底定型之前逃离。"
	},
]
var all_tie_reinforce_function = [
	function tie_reinforce_function1() {
		tie_eye += 30; untie_eye_able = false; unlock_string_1 = false; event_unlock_eye_able = true;
		document.getElementById("string_grade").innerHTML += villain_name + "给" + heroine_name + "戴上眼罩并上了锁，并且将钥匙扔到了附近;";
	},
	function tie_reinforce_function2() {
		tie_mouth += 30; untie_mouth_able = false; unlock_string_2 = false; event_unlock_mouth_able = true;
		document.getElementById("string_grade").innerHTML += villain_name + "给" + heroine_name + "的口球上挂了锁，并且将钥匙扔到了附近;";
	},
	function tie_reinforce_function3() {
		tie_arm += 50; untie_arm_able = false; unlock_string_3 = false; event_unlock_arm_able = true;
		document.getElementById("string_grade").innerHTML += villain_name + "给" + heroine_name + "的手腕戴上手铐，并且将钥匙扔到了附近;";
	},
	function tie_reinforce_function4() {
		tie_finger += 30; untie_finger_able = false; unlock_string_4 = false; event_unlock_finger_able = true;
		document.getElementById("string_grade").innerHTML += villain_name + "将" + heroine_name + "的双手拇指锁到了指铐之中，并且将钥匙扔到了附近;";
	},
	function tie_reinforce_function5() {
		tie_leg += 100; untie_leg_able = false; unlock_string_5 = false; event_unlock_leg_able = true;
		document.getElementById("string_grade").innerHTML += villain_name + "给" + heroine_name + "的的脚踝锁上脚镣，并且将钥匙扔到了附近;";
	},
	function tie_reinforce_function6() {
		tie_eye *= 1.5; tie_mouth *= 1.5; tie_arm *= 1.5; tie_finger *= 1.5; tie_leg *= 1.5;
		document.getElementById("string_grade").innerHTML += villain_name + "用多层丝袜将" + heroine_name + "包裹成了一个丝袜茧子;";
	},
	function tie_reinforce_function7() {
		tie_arm *= 2; tie_leg *= 2;
		document.getElementById("string_grade").innerHTML += villain_name + "将捆绑" + heroine_name + "手脚的绳索换成了更难逃脱的加粗绳索;";
	},
	function tie_reinforce_function8() {
		power_consume += 30; sensitivity += 0.2;
		tie_arm += 500; tie_finger += 500; tie_leg += 500;
		untie_arm -= 50; tie_finger -= 50; tie_leg -= 50;
		document.getElementById("string_grade").innerHTML += villain_name + "将" + heroine_name + "的脖子以下包裹进了真空袋中，并抽干了真空袋中的空气;";
	},
	function tie_reinforce_function9() {
		tie_number = random(1, 5)
		tie_leg += tie_number * 30;
		document.getElementById("string_grade").innerHTML += villain_name + "使用" + tie_number + "根皮带继续加固了" + 
		heroine_name + "腿部的束缚;";
	},
	function tie_reinforce_function10() {
		tie_number = random(6, 10);
		tie_leg += tie_number * 20;
		document.getElementById("string_grade").innerHTML += villain_name + "使用" + tie_number + "根扎带继续加固了" + 
		heroine_name + "腿部的束缚;";
	},
	function tie_reinforce_function11() {
		tie_leg += 200; tie_reinforce_11_judge = true;
		document.getElementById("string_grade").innerHTML += villain_name + "将" + heroine_name + "的双脚埋入了水泥中。";
	}
]
var tie_reinforce_11_judge = false
var tie_reinforce_11_condition_epoch = 10
function tie_reinforce_11_function() {
	if (event_leg_free == true) {
		return
	}
	tie_leg += 50; untie_leg -= 5;
	document.getElementById("event_untie_content").innerHTML = "<p>腿部的水泥逐渐定型了……</p>"
	if (epoch >= tie_reinforce_11_condition_epoch) {
		event_tie_reinforce_11_able = true;
	}
}
var event_tie_reinforce_11_able = false;
var event_tie_reinforce_11_prob = 100;
function event_tie_reinforce_11_function() {
	event_tie_reinforce_11_able = false;
	document.getElementById("event_untie_content").innerHTML += 
	"水泥定型时间已过，" + heroine_name + "腿部的水泥彻底定型，已经没有了逃离的机会，从此安心做" + villain_name + "的收藏品吧。";
	return false
}


// ***************************************** 挣扎过程
// 挣扎效果
function struggle_function(struggle_index) {
	if (struggle_index == 1) {
		tie_eye -= untie_eye
	} else if (struggle_index == 2) {
		tie_mouth -= untie_mouth
	} else if (struggle_index == 3) {
		tie_arm -= untie_arm
	} else if (struggle_index == 4) {
		tie_finger -= untie_finger
	} else if (struggle_index == 5) {
		tie_leg -= untie_leg
	}
	pleasant += sensitivity*pleasant_augment; power -= power_consume;
	return "none"
}


// ***************************************** 休息过程
function rest_function() {
	document.getElementById("event_untie_content").innerHTML += "<p>本回合休息，体力值获得了少量恢复。</p>"
	power += power_recover;
	if (p_gift_6_judge == true) {
		p_gift_6_function()
	}
	if (n_gift_6_judge == true) {
		n_gift_6_function()
	}
	return "none"
}

// ***************************************** 探索过程
function explore_function() {
	power -= 20; pleasant += sensitivity * pleasant_augment;
	return "none"
}



