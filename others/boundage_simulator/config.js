// ***************************************** 初始定义
var heroine_name = ""
var villain_name = ""

//脱缚能力值，敏感度
var untie_mouth = 15
var untie_eye = 15
var untie_arm = 15
var untie_finger = 15
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
var tie_tightness = 1 //0-较松；1-正常；2-较紧；4-最紧

//难度值
var tie_difficulty = 0
var untie_difficulty = 0
var sensitivity_difficulty = 0
var final_difficulty = 0

//脱缚阶段
var epoch = 0
var epoch_max = 30
var power = 300
var pleasant = 0
var pleasant_augment = 10
var pleasant_max = 100
var final_evaluation = 0

//特殊事件概率及状态
var all_event_tie = ["脱衣", "继续狠狠收紧"]
var event_tie_array = []
var event_no_clothes_prob = 5 // 脱衣
var event_no_clothes_able = true
var event_no_clothes = false
function event_no_clothes_function() {
	event_no_clothes = true; sensitivity += 0.2; event_very_cute_able = false; event_tie_array.push(all_event_tie[0]);
}
var event_no_clothes = false
var event_string_prob = 5  //收紧
var event_string_able = true
var event_string = false
function event_string_function() {
	tie_eye *= 2; tie_mouth *= 2; tie_arm *= 2; tie_finger *= 2; tie_leg *= 2; event_tie_array.push(all_event_tie[1]);
	event_string = true;
}

var event_eye_free = false // 是否能够看见
var event_mouth_free = false //嘴部是否自由
var event_arm_free = false // 手臂是否自由
var event_finger_free = false //手指是否自由
var event_leg_free = false // 双腿是否自由

var event_call_for_help_prob = 10 // 呼救
var event_call_for_help_able = false
var event_call_for_help = false
var event_call_for_help_success_prob = 30  // 呼救出帮手或绑架者的概率
var event_sudden_lose_prob = 5 // 突发收紧
var event_sudden_lose_able = true
var event_sudden_lose = false
var event_very_cute_prob = 1 // 萌化
var event_very_cute_able = true
var event_very_cute = false
var event_persuade_prob = 1 // 说服
var event_persuade_able = false
var event_persuade = false
var event_tk_prob = 5 //挠痒
var event_tk_able = true

// ***************************************** 角色创建
character_array = ["角色创建完毕"]
all_characters = ["", "沐沐绑璃落", "安宁绑香月", "言兮绑花梦"]


// ***************************************** 天赋选择
var gift_number = 2
var all_gifts = ["灵活的舌头", "灵活的手指", "舞蹈演员", "天生丽质", "天生媚骨", "冷静头脑", "敏感身体", "娃娃脸", "口才", "抖M", 
				"强健体魄", "宅女", "娇柔易推倒", "饥渴难耐", "高潮经验丰富", "性冷淡", "快感忍耐", "意志薄弱"]
var all_gifts_function = [
	function gift_function1() {untie_mouth += 5},
	function gift_function2() {untie_finger += 5; untie_arm += 5},
	function gift_function3() {untie_finger += 5; untie_arm += 5; untie_leg += 5},
	function gift_function4() {event_sudden_lose_prob += 5},
	function gift_function5() {event_no_clothes_prob += 10},
	function gift_function6() {sensitivity -= 0.3},
	function gift_function7() {sensitivity += 0.3},
	function gift_function8() {event_very_cute_prob += 5},
	function gift_function9() {event_persuade_prob += 5},
	function gift_function10() {untie_eye -= 2; untie_mouth -= 2; untie_finger -= 2; untie_arm -= 2; untie_leg -= 2},
	function gift_function11() {power += 100},
	function gift_function12() {power -= 50},
	function gift_function13() {pleasant_max -= 30; power_consume_pleasure += 20},
	function gift_function14() {event_no_clothes_prob += 5; event_string_prob += 5; sensitivity += 0.1},
	function gift_function15() {power_consume_pleasure /= 2},
	function gift_function16() {sensitivity -= 0.1; pleasant_max += 30},
	function gift_function17() {pleasant_augment /= 2; power_consume_pleasure *= 1.5},
	function gitf_function18() {gift_18_judge = true;},
	]
var gifts = []
var gift_18_judge = false
function gift_18_fucntion() {pleasant_max -= 10; sensitivity += 0.1}


// ***************************************** 衣着选择
var all_clothes = ["可爱的jk制服", "保守的女仆装", "普通的休闲装", "创可贴", "全包乳胶衣", "单薄的泳装", "性感的旗袍", 
				   "被诅咒的乳胶衣"]
var all_clothes_display = [
	function clothes_display1() {
		document.getElementById("clothes_introduction").innerHTML = display_array([
			"可爱的学院风制服。",
			"<img src='./my_images/clothes1.png' width='200' height='250'",
			"图片来自百度"
			])
	},
	function clothes_dislpay2() {
		document.getElementById("clothes_introduction").innerHTML = display_array([
			"女仆装原本只是从事女仆职业的女性所穿的服装。而随着女仆这种职业成为一种萌属性，女仆装这种服饰也成为一种萌属性，除了女仆穿着之外，部分非女仆的人物也常穿着女仆装，有的是出于个人着装喜好，有的是为了cosplay，有的是为了卖萌等。(萌娘百科)",
			"<img src='./my_images/clothes2.png' width='200' height='250'",
			"图片来自百度"
			])
	},
	function clothes_display3() {
		document.getElementById("clothes_introduction").innerHTML = display_array([
			"草绿色的连衣裙，搭配洁白的长筒袜，在风中稍显凌乱，更显清纯。",
			"<img src='./my_images/clothes3.png' width='200' height='300'",
			"图片来自百度"
			])
	},
	function clothes_display4() {
		document.getElementById("clothes_introduction").innerHTML = display_array([
			"乳贴有舒适、安全、时尚、便捷、美观、防走光等作用，搭配上各式束缚，更能衬托得" + heroine_name + "愈发性感。",
			"<img src='./my_images/clothes4.png' width='200' height='250'",
			"图片来自百度"
			])
	},
	function clothes_display5() {
		document.getElementById("clothes_introduction").innerHTML = display_array([
			"包裹着" + heroine_name + "全身的黑色性感乳胶衣，只在鼻子处留有小小的开口。",
			])
	},
	function clothes_display6() {
		document.getElementById("clothes_introduction").innerHTML = display_array([
			"性感的泳衣，完美展示着" + villain_name + "绝美性感的身材。",
			])
	},
	function clothes_display7() {
		document.getElementById("clothes_introduction").innerHTML = display_array([
			"性感的旗袍，能够完美体现女孩的身材优势。"
			])
	},
	function clothes_display8() {
		document.getElementById("clothes_introduction").innerHTML = display_array([
			"被诅咒的乳胶衣，外观上看起来就像一件普通的黑色紧身衣，但它也许有着某些特殊的效果"
			])
	},
]
var all_clothes_function = [
	function clothes_function1() {event_very_cute_prob += 5; event_no_clothes_prob += 10},
	function clothes_fucntion2() {event_sudden_lose_prob += 5; sensitivity -= 0.2},
	function clothes_function3() {sensitivity -= 0.2},
	function clothes_function4() {sensitivity += 0.5; event_very_cute_able = false},
	function clothes_function5() {untie_eye_able = false; tie_eye += 30; power_consume += 5},
	function clothes_function6() {event_sudden_lose_prob += 5; event_very_cute_prob -= 10; sensitivity += 0.3},
	function clothes_function7() {event_no_clothes_prob += 5; event_string_prob += 5; event_sudden_lose_prob += 5; event_very_cute_prob -= 5},
	function clothes_function8() {sensitivity += 0.3; event_sudden_lose_prob += 10; event_tk_prob += 10},
]

// ***************************************** 束缚选择
var all_tie_post = ["直立后手缚", "海老缚", "驷马"]
var all_tie_post_display = []
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
var all_tie_eye = ["眼罩", "暗淡的美瞳"]
var all_tie_eye_display = [
	function tie_eye_display1() {
		document.getElementById("tie_introduction").innerHTML = "不透光的黑色眼罩，保证眼前一片黑暗。"
	},
	function tie_eye_display2() {
		document.getElementById("tie_introduction").innerHTML = "暗淡的美瞳，不透光，手臂自由前无法取下。"
	},
]
var all_tie_eye_function = [
	function tie_eye_function1() {
		tie_eye += 20;
		tie_string += villain_name + "给" + heroine_name + "戴上了眼罩;";
	},
	function tie_eye_funciton2() {
		untie_eye_able = false; tie_eye += 10;
		tie_string += villain_name + "给" + heroine_name + "戴上了难以取下的不透光隐形眼镜;";
	},
]
var all_tie_mouth = ["普通口球", "马具型口球", "深喉口球"]
var all_tie_mouth_display = [
	function tie_mouth_display1() {
		document.getElementById("tie_introduction").innerHTML = "普通的带孔口球。"
	},
	function tie_mouth_display2() {
		document.getElementById("tie_introduction").innerHTML = "马具型口球，多重皮带加固，更牢固更紧致。"
	},
	function tie_mouth_display3() {
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
	function tie_arm_display1() {
		document.getElementById("tie_introduction").innerHTML = "相对舒适但依然牢固的捆缚方法。"
	},
	function tie_arm_display2() {
		document.getElementById("tie_introduction").innerHTML = "传统的绑犯人的方法，确保紧缚在背后的双手纹丝不动。"
	},
	function tie_arm_display3() {
		document.getElementById("tie_introduction").innerHTML = "后手直臂缚，从手腕到手肘直到大臂的牢固紧缚。"
	},
	function tie_arm_display4() {
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
var all_tie_finger = ["袜子", "胶带", "拇指铐", "皮革无指手套"]
var all_tie_finger_display = [
	function tie_finger_display1() {
		document.getElementById("tie_introduction").innerHTML = "用袜子套在手指上，简单的限制手指自由的方法。"
	},
	function tie_finger_display2() {
		document.getElementById("tie_introduction").innerHTML = "用胶带将手指缠裹成两个小球，难以挣脱。"
	},
	function tie_finger_display3() {
		document.getElementById("tie_introduction").innerHTML = "可以铐住大拇指的拇指铐。"
	},
	function tie_finger_display4() {
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
		tie_finger += 30; untie_finger -= 2;
		tie_string += villain_name + "给" + heroine_name + "的双手拇指锁到了指铐之中，并且将钥匙扔到了附近;";
	},
	function tie_finger_function4() {
		untie_finger_able = false; tie_finger += 100;
		tie_string += villain_name + "将" + heroine_name + "的双手锁入了一个皮革无指手套之中;";
	}
]
var all_tie_leg = ["捆绑脚踝", "捆绑脚踝和膝盖上下", "捆绑脚踝，膝盖上下和大腿"]
var all_tie_leg_display = [
	function tie_leg_display1() {
		document.getElementById("tie_introduction").innerHTML = "用绳索将脚踝紧紧捆缚起来。"
	},
	function tie_leg_display2() {
		document.getElementById("tie_introduction").innerHTML = "除了脚踝之外，绳索继续捆绑至膝盖上下。"
	},
	function tie_leg_display3() {
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
	function tie_body_display1() {
		document.getElementById("tie_introduction").innerHTML = "紧紧勒入下体的股绳，随着挣扎不断引起刺激。"
	},
	function tie_body_display2() {
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
var all_tie_reinforce = ["", "多层丝袜包裹", "加粗麻绳"]
var all_tie_reinforce_display = [
	function tie_reinforce_display1() {
		document.getElementById("tie_introduction").innerHTML = ""
	},
	function tie_reinforce_display2() {
		document.getElementById("tie_introduction").innerHTML = "多重丝袜包裹，从外部继续加固束缚。"
	},
	function tie_reinforce_display3() {
		document.getElementById("tie_introduction").innerHTML = "将束缚的绳索换为加粗麻绳，比普通麻绳更加坚固，让" + heroine_name + "更难挣脱。"
	},
]
var all_tie_reinforce_function = [
	function tie_reinforce_function1() {},
	function tie_reinforce_function2() {
		tie_eye *= 1.5; tie_mouth *= 1.5; tie_arm *= 1.5; tie_finger *= 1.5; tie_leg *= 1.5;
		tie_string += villain_name + "用多层丝袜将" + heroine_name + "包裹成了一个丝袜茧子;";
	},
	function tie_reinforce_function3() {
		tie_arm *= 2;
		tie_leg *= 2;
	}
]
var all_ties = []
var tie_string = ""


// ***************************************** 加固和收紧选择
var tight_id = 1
var all_tight = ["不变", "继续收紧", "狠狠收紧"]
var all_tight_function = [
	function tight_function1() {},
	function tight_function2() {tie_eye *= 1.5; tie_mouth *= 1.5; tie_arm *= 1.5; tie_finger *= 1.5; tie_leg *= 1.5;},
	function tight_function3() {tie_eye *= 2; tie_mouth *= 2; tie_arm *= 2; tie_finger *= 2; tie_leg *= 2;},
]

// ***************************************** 脱缚过程的条件事件
function event_untie_eye_function() {
	document.getElementById("untie_button_1").style.display = "none";
	document.getElementById("event_untie_content").innerHTML += "<p>" + heroine_name + "已获得光明</p>"
	event_eye_free = true; tie_eye = 0;
}
function event_untie_mouth_function() {
	document.getElementById("untie_button_2").style.display = "none";
	document.getElementById("event_untie_content").innerHTML += "<p>" + heroine_name + "已成功挣脱嘴部束缚</p>"
	event_mouth_free = true; tie_mouth = 0; event_call_for_help_able = true; event_persuade_able = true;
}
function event_untie_arm_function() {
	document.getElementById("untie_button_3").style.display = "none";
	document.getElementById("event_untie_content").innerHTML += "<p>" + heroine_name + "已成功挣脱手臂束缚，开始解开其他束缚</p>"
	event_arm_free = true; tie_arm = 0; untie_eye *= 3; untie_eye_able = true; untie_mouth *= 3; untie_mouth_able = true;
	untie_finger *= 3; untie_finger_able = true; untie_leg *= 3; untie_leg_able = true;
}
function event_untie_finger_function() {
	document.getElementById("untie_button_4").style.display = "none";
	document.getElementById("event_untie_content").innerHTML += "<p>" + heroine_name + "已成功挣脱手指束缚</p>"
	event_finger_free = true; untie_leg += 10; untie_arm += 10; tie_finger = 0;
}
function event_untie_leg_function() {
	document.getElementById("untie_button_5").style.display = "none";
	document.getElementById("event_untie_content").innerHTML += "<p>" + heroine_name + "已成功挣脱双腿束缚</p>"
	event_leg_free = true; tie_leg = 0;
}


