// ***************************************** 变量定义
var heroine_name = ""
var villain_name = ""
character_array = ["角色创建完毕"]

all_characters = ["", "沐沐绑璃落", "安宁绑香月"]

var gift_number = 2
var all_gifts = ["灵活的舌头", "灵活的手指", "舞蹈演员", 
			"天生丽质", "天生媚骨", "冷静头脑", "敏感身体", 
			"娃娃脸", "口才", "抖M", "强健体魄", "宅女"]
var gifts = []
var all_clothes = ["可爱的jk制服", "保守的女仆装", "普通的休闲装", "创可贴", "全包乳胶衣", "单薄的泳装"]

var tie_post_array = ["直立缚", "海老缚", "驷马"]
var tie_eye_array = ["眼罩", "暗淡的美瞳"]
var tie_mouth_array = ["普通口球", "马具型口球", "深喉口球"]
var tie_arm_array = ["日式紧缚", "五花大绑", "欧式紧缚", "后手观音"]
var tie_finger_array = ["袜子", "胶带", "拇指铐", "皮革无指手套"]
var tie_leg_array = ["捆绑脚踝", "捆绑脚踝和膝盖上下", "捆绑脚踝，膝盖上下和大腿"]
var tie_body_array = ["股绳", "龟甲缚"]
var tie_reinforce_array = ["", "多层丝袜包裹"]
var all_ties = []
var tie_string = ""

var tight_id = 1
var all_tight = ["不变", "继续收紧", "狠狠收紧"]

var all_event_tie = ["脱衣", "继续狠狠收紧"]
var event_tie_array = []

//脱缚能力值，敏感度
var untie_mouth = 10
var untie_eye = 10
var untie_arm = 10
var untie_finger = 10
var untie_leg = 10
var sensitivity = 1
var power_consume = 10

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
var pleasant_max = 100
var final_evaluation = 0

//特殊事件概率及状态
var event_no_clothes_prob = 5 // 脱衣
var event_no_clothes_able = true
var event_no_clothes = false
var event_string_prob = 5  //收紧
var event_string_able = true
var event_string = false

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


// ***************************************** 右上角函数
var restart = document.getElementById("restart");
restart.onclick = function() {
	window.history.back(-1);
	window.location.reload();
}


// ***************************************** 角色创建
function character_init() {
	character_select_button = document.getElementById("character_select_button");
	for (i = 0; i < all_characters.length; i++) {
		character_option = document.createElement("option")
		character_option.innerHTML = all_characters[i]
		character_option.value = all_characters[i]
		character_select_button.appendChild(character_option)
	}
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
	var all_gifts_mode = all_gifts
	for (i = 0; i < gift_number; i++) { 
    	var gift_index = Math.floor((Math.random()*all_gifts_mode.length));
    	gifts.push(all_gifts_mode[gift_index]);
    	if (gift_index == 0) {
    		untie_mouth += 5
    	} else if (gift_index == 1) {
    		untie_finger += 5
    		untie_arm += 5
    	} else if (gift_index == 2) {
    		untie_finger += 5
    		untie_arm += 5
    		untie_leg += 5
    	} else if (gift_index == 3) {
    		event_sudden_lose_prob += 5
    	} else if (gift_index == 4) {
    		event_no_clothes_prob += 10
    	} else if (gift_index == 5) {
    		sensitivity -= 0.2
    	} else if (gift_index == 6) {
    		sensitivity += 0.2
    	} else if (gift_index == 7) {
    		event_very_cute_prob += 5
    	} else if (gift_index == 8) {
    		event_persuade_prob += 5
    	} else if (gift_index == 9) {
    		untie_eye -= 2
    		untie_mouth -= 2
    		untie_finger -= 2
    		untie_arm -= 2
    		untie_leg -= 2
    	} else if (gift_index == 10) {
    		power += 100
    	} else if (gift_index == 11) {
    		power -= 50
    	}
    	all_gifts_mode = all_gifts_mode.filter(function(item) {
		    return item != all_gifts_mode[gift_index];
		});
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
function clothes_display(clothes_id) {
	if (clothes_id == 0) {
		document.getElementById("clothes_introduction").innerHTML = display_array([
			"可爱的学院风制服。",
			"<img src='./my_images/clothes1.png' width='200' height='250'",
			"图片来自百度"
			])
	} else if (clothes_id == 1) {
		document.getElementById("clothes_introduction").innerHTML = display_array([
			"女仆装原本只是从事女仆职业的女性所穿的服装。而随着女仆这种职业成为一种萌属性，女仆装这种服饰也成为一种萌属性，除了女仆穿着之外，部分非女仆的人物也常穿着女仆装，有的是出于个人着装喜好，有的是为了cosplay，有的是为了卖萌等。(萌娘百科)",
			"<img src='./my_images/clothes2.png' width='200' height='250'",
			"图片来自百度"
			])
	} else if (clothes_id == 2) {
		document.getElementById("clothes_introduction").innerHTML = display_array([
			"草绿色的连衣裙，搭配洁白的长筒袜，在风中稍显凌乱，更显清纯。",
			"<img src='./my_images/clothes3.png' width='200' height='300'",
			"图片来自百度"
			])
	} else if (clothes_id == 3) {
		document.getElementById("clothes_introduction").innerHTML = display_array([
			"乳贴有舒适、安全、时尚、便捷、美观、防走光等作用，搭配上各式束缚，更能衬托得" + heroine_name + "愈发性感。",
			"<img src='./my_images/clothes4.png' width='200' height='250'",
			"图片来自百度"
			])
	} else if (clothes_id == 4) {
		document.getElementById("clothes_introduction").innerHTML = display_array([
			"包裹着" + heroine_name + "全身的黑色性感乳胶衣，只在鼻子处留有小小的开口。",
			])
	} else if (clothes_id == 5) {
		document.getElementById("clothes_introduction").innerHTML = display_array([
			"性感的泳衣，完美展示着" + villain_name + "绝美性感的身材。",
			])
	}
}


function clothes_init() {
	clothes_select_button = document.getElementById("clothes_select_button");
	options_init(clothes_select_button, all_clothes)
	clothes_display(0)
}

var clothes_select_button = document.getElementById("clothes_select_button")
clothes_select_button.onchange = function() {
	character_select_index = document.getElementById("clothes_select_button").selectedIndex
	clothes_display(character_select_index)
	window_scroll()
}


function clothes_select(clothes_id) {
	document.getElementById("clothes_buttons").style.display = "none";
	if (clothes_id == 0) {
		event_very_cute_prob += 5
		event_no_clothes_prob += 10
	} else if (clothes_id == 1) {
		event_sudden_lose_prob += 5
		sensitivity -= 0.2
	} else if (clothes_id == 2) {
		sensitivity -= 0.2
	} else if (clothes_id == 3) {
		sensitivity += 0.5
		event_very_cute_able = false
	} else if (clothes_id == 4) {
		untie_eye_able = false
		tie_eye += 30
		power_consume += 5
	} else if (clothes_id == 5) {
		event_sudden_lose_prob += 5
		event_very_cute_prob -= 10
		sensitivity += 0.3
	}
	document.getElementById("clothes").innerHTML = heroine_name + "的服装为：" + all_clothes[clothes_id];
	document.getElementById("tie_select").style.display = "";
	window_scroll()
}


var clothes_confirm_button = document.getElementById("clothes_confirm_button");
clothes_confirm_button.onclick = function(){  
	clothes_id = document.getElementById("clothes_select_button").selectedIndex;
    clothes_select(clothes_id);
    tie_select_init();
}


// ***************************************** 束缚选择
function tie_post_select() {
	post = document.getElementsByName("post");
	if (post[0].checked == true) {
		tie_post += 0
		tie_string += villain_name + "准备使用直立后手缚捆绑" + heroine_name
	} else if (post[1].checked == true) {
		untie_arm -= 2
		untie_leg -= 2
		sensitivity += 0.1
		tie_post += 70
		tie_string += villain_name + "准备使用桃缚捆绑" + heroine_name
	} else if (post[2].checked == true) {
		untie_arm -= 3
		untie_leg -= 3
		tie_post += 100
		tie_string += villain_name + "准备使用驷马缚捆绑" + heroine_name
	}
}


function tie_select_init() {
	eye_select_button = document.getElementById("eye_select_button");
	options_init(eye_select_button, tie_eye_array)

	mouth_select_button = document.getElementById("mouth_select_button")
	options_init(mouth_select_button, tie_mouth_array)

	arm_select_button = document.getElementById("arm_select_button")
	options_init(arm_select_button, tie_arm_array)

	finger_select_button = document.getElementById("finger_select_button")
	options_init(finger_select_button, tie_finger_array)

	leg_select_button = document.getElementById("leg_select_button")
	options_init(leg_select_button, tie_leg_array)

	body_select_button = document.getElementById("body_select_button")
	options_init(body_select_button, tie_body_array)

	reinforce_select_button = document.getElementById("reinforce_select_button")
	options_init(reinforce_select_button, tie_reinforce_array)

	tie_select_display(0, 0);
}

function tie_select_display(tie_id, tie_select_id) {
	if (tie_id == 0) {
		if (tie_select_id == 0) {
			document.getElementById("tie_introduction").innerHTML = "不透光的黑色眼罩，保证眼前一片黑暗。"
		} else if (tie_select_id == 1) {
			document.getElementById("tie_introduction").innerHTML = "暗淡的美瞳，不透光，手臂自由前无法取下。"
		}
	} else if (tie_id == 1) {
		if (tie_select_id == 0) {
			document.getElementById("tie_introduction").innerHTML = "普通的带孔口球。"
		} else if (tie_select_id == 1) {
			document.getElementById("tie_introduction").innerHTML = "马具型口球，多重皮带加固，更牢固更紧致。"
		} else if (tie_select_id == 2) {
			document.getElementById("tie_introduction").innerHTML = "深喉口球，直插入咽喉，带来极大刺激。"
		}
	} else if (tie_id == 2) {
		if (tie_select_id == 0) {
			document.getElementById("tie_introduction").innerHTML = "相对舒适但依然牢固的捆缚方法。"
		} else if (tie_select_id == 1) {
			document.getElementById("tie_introduction").innerHTML = "传统的绑犯人的方法，确保紧缚在背后的双手纹丝不动。"
		} else if (tie_select_id == 2) {
			document.getElementById("tie_introduction").innerHTML = "后手直臂缚，从手腕到手肘直到大臂的牢固紧缚。"
		} else if (tie_select_id == 3) {
			document.getElementById("tie_introduction").innerHTML = "手肘并拢的极限后手观音缚，最为严厉的手臂绑法。"
		}
	} else if (tie_id == 3) {
		if (tie_select_id == 0) {
			document.getElementById("tie_introduction").innerHTML = "用袜子套在手指上，简单的限制手指自由的方法。"
		} else if (tie_select_id == 1) {
			document.getElementById("tie_introduction").innerHTML = "用胶带将手指缠裹成两个小球，难以挣脱。"
		} else if (tie_select_id == 2) {
			document.getElementById("tie_introduction").innerHTML = "可以铐住大拇指的拇指铐。"
		} else if (tie_select_id == 3) {
			document.getElementById("tie_introduction").innerHTML = "彻底拘束手指的皮革无指手套"
		}
	} else if (tie_id == 4) {
		if (tie_select_id == 0) {
			document.getElementById("tie_introduction").innerHTML = "用绳索将脚踝紧紧捆缚起来。"
		} else if (tie_select_id == 1) {
			document.getElementById("tie_introduction").innerHTML = "除了脚踝之外，绳索继续捆绑至膝盖上下。"
		} else if (tie_select_id == 2) {
			document.getElementById("tie_introduction").innerHTML = "绳索完全捆绑了脚踝，膝盖上下和大腿。"
		}
	} else if (tie_id == 5) {
		if (tie_select_id == 0) {
			document.getElementById("tie_introduction").innerHTML = "紧紧勒入下体的股绳，随着挣扎不断引起刺激。"
		} else if (tie_select_id == 1) {
			document.getElementById("tie_introduction").innerHTML = "上面刺激胸部，下面刺激下体的龟甲缚。"
		}
	} else if (tie_id == 6) {
		if (tie_select_id == 0) {
			document.getElementById("tie_introduction").innerHTML = ""
		} else if (tie_select_id == 1) {
			document.getElementById("tie_introduction").innerHTML = "多重丝袜包裹，从外部继续加固束缚。"
		}
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

function tie_select(tie_id, tie_select_id) {
	if (tie_id == 0) {
		if (tie_select_id == 0) {
			tie_eye += 20
			tie_string += villain_name + "给" + heroine_name + "戴上了眼罩，"
		} else if (tie_select_id == 1) {
			untie_eye_able = false
			tie_eye += 10
			tie_string += villain_name + "给" + heroine_name + "戴上了难以取下的不透光隐形眼镜，"
		}
	} else if (tie_id == 1) {
		if (tie_select_id == 0) {
			tie_mouth += 30;
			tie_string += villain_name + "给" + heroine_name + "戴上了口球，"
		} else if (tie_select_id == 1) {
			tie_mouth += 50;
			event_call_for_help_prob += 5;
			tie_string += villain_name + "给" + heroine_name + "戴上了马具型口球，"
		} else if (tie_select_id == 2) {
			tie_mouth += 30;
			event_call_for_help_prob -= 5
			sensitivity -= 0.1
			tie_string += villain_name + "给" + heroine_name + "戴上了深喉口球，"
		}
	} else if (tie_id == 2) {
		if (tie_select_id == 0) {
			tie_arm += 80
			sensitivity += 0.1
			tie_string += villain_name + "将" + heroine_name + "的双手用日式紧缚的方法捆了起来，"
		} else if (tie_select_id == 1) {
			tie_arm += 100
			untie_finger -= 1
			tie_string += villain_name + "将" + heroine_name + "的双手五花大绑，"
		} else if (tie_select_id == 2) {
			tie_arm += 100
			untie_arm -= 2
			tie_string += villain_name + "用欧式紧缚的方式将" + heroine_name + "的双手捆绑了起来，"
		} else if (tie_select_id == 3) {
			tie_arm += 200
			untie_arm -= 3
			untie_finger -= 1
			tie_string += villain_name + "将" + heroine_name + "捆成了极限的后手观音姿势，"
		}
	} else if (tie_id == 3) {
		if (tie_select_id == 0) {
			tie_finger += 20
			tie_string += villain_name + "给" + heroine_name + "的小手上分别套上几双棉袜，"
		} else if (tie_select_id == 1) {
			tie_finger += 30
			tie_string += villain_name + "用胶带将" + heroine_name + "的两只手分别握拳缠裹成两个小球，"
		} else if (tie_select_id == 2) {
			tie_finger += 30
			untie_finger -= 2
			tie_string += villain_name + "给" + heroine_name + "的双手拇指锁到了指铐之中，并且将钥匙扔到了附近，"
		} else if (tie_select_id == 3) {
			untie_finger_able = false
			tie_finger += 100
			tie_string += villain_name + "将" + heroine_name + "的双手锁入了一个皮革无指手套之中。"
		}
	} else if (tie_id == 4) {
		if (tie_select_id == 0) {
			tie_leg += 50
			tie_string += villain_name + "将" + heroine_name + "的脚踝并拢捆了起来，"
		} else if (tie_select_id == 1) {
			tie_leg += 90
			tie_string += villain_name + "将" + heroine_name + "的脚踝和膝盖上下捆了起来，"
		} else if (tie_select_id == 2) {
			tie_leg += 130
			tie_string += villain_name + "将" + heroine_name + "的脚踝，膝盖上下，大腿分别捆缚了起来，"
		}
	} else if (tie_id == 5) {
		if (tie_select_id == 0) {
			sensitivity += 0.2
			tie_string += villain_name + "继续为" + heroine_name + "捆缚了股绳，"
		} else if (tie_select_id == 1) {
			sensitivity += 0.3
			tie_string += villain_name + "在" + heroine_name + "的身上编织出了漂亮的龟甲缚，"
		}
	} else if (tie_id == 6) {
		if (tie_select_id == 1) {
			tie_eye *= 1.5
			tie_mouth *= 1.5
			tie_arm *= 1.5
			tie_finger *= 1.5
			tie_leg *= 1.5
			tie_string += villain_name + "用多层丝袜将" + heroine_name + "包裹成了一个丝袜茧子，"
		}
	}
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
	if (tight_id == 0) {
		tie_arm += 0
	} else if (tight_id == 1) {
		tie_eye *= 1.5
		tie_mouth *= 1.5
		tie_arm *= 1.5
		tie_finger *= 1.5
		tie_leg *= 1.5
	} else if (tight_id == 2) {
		tie_eye *= 2
		tie_mouth *= 2
		tie_arm *= 2
		tie_finger *= 2
		tie_leg *= 2
	}
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
function untie_eye_action() {
	if (event_eye_free == false) {
		document.getElementById("untie_button_1").style.display = "none";
		document.getElementById("event_untie_content").innerHTML += "<p>" + heroine_name + "已重获光明</p>"
		event_eye_free = true
		tie_eye = 0
	}
}

function untie_mouth_action() {
	if (event_eye_free == false) {
		document.getElementById("untie_button_2").style.display = "none";
		document.getElementById("event_untie_content").innerHTML += "<p>" + heroine_name + "已成功挣脱嘴部束缚</p>"
		event_mouth_free = true
		tie_mouth = 0
		event_call_for_help_able = true
		event_persuade_able = true
	}
}

function untie_arm_action() {
	if (event_eye_free == false) {
		document.getElementById("untie_button_3").style.display = "none";
		document.getElementById("event_untie_content").innerHTML += "<p>" + heroine_name + "已成功挣脱手臂束缚，开始解开其他束缚</p>"
		event_arm_free = true
		tie_arm = 0
		untie_eye *= 3
		untie_eye_able = true
		untie_mouth *= 3
		untie_mouth_able = true
		untie_finger *= 3
		untie_finger_able = true
		untie_leg *= 3
		untie_leg_able = true
	}
}

function untie_finger_action() {
	if (event_finger_free == false) {
		document.getElementById("untie_button_4").style.display = "none";
		document.getElementById("event_untie_content").innerHTML += "<p>" + heroine_name + "已成功挣脱手指束缚</p>"
		event_finger_free = true
		untie_leg += 10
		untie_arm += 10
		tie_finger = 0
	}
}

function untie_leg_action() {
	if (event_leg_free == false) {
		document.getElementById("untie_button_5").style.display = "none";
		document.getElementById("event_untie_content").innerHTML += "<p>" + heroine_name + "已成功挣脱双腿束缚</p>"
		event_leg_free = true
		tie_leg = 0
	}
}


function start_to_untie_judge() {
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

function able_to_untie_judge() {
	if (untie_eye_able == false) {
		document.getElementById("untie_button_1").style.display = "none";
	} else {
		document.getElementById("untie_button_1").style.display = "";
	}
	if (untie_mouth_able == false) {
		document.getElementById("untie_button_2").style.display = "none";
	} else {
		document.getElementById("untie_button_2").style.display = "";
	}
	if (untie_arm_able == false) {
		document.getElementById("untie_button_3").style.display = "none";
	} else {
		document.getElementById("untie_button_3").style.display = "";
	}
	if (untie_finger_able == false) {
		document.getElementById("untie_button_4").style.display = "none";
	} else {
		document.getElementById("untie_button_4").style.display = "";
	}
	if (untie_leg_able == false) {
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
	if (power <= 0) {
		document.getElementById("event_untie_content").innerHTML = "<p>体力值耗尽，" + heroine_name + "没有挣脱束缚。</p>"
		return false
	}

	if (event_eye_free == true && event_mouth_free == true && event_arm_free == true && event_finger_free == true && event_leg_free == true) {
		document.getElementById("event_untie_content").innerHTML += "所有部位解缚成功，成功逃脱。";
		return true
	}

	if (pleasant > pleasant_max) {
		document.getElementById("event_untie_content").innerHTML += "快感到达极限，" + heroine_name + "忍不住达到高潮，体力值减半。";
		power /= 2
		pleasant = 0
	}

	start_to_untie_judge()
	able_to_untie_judge()

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
		power /= 2
		pleasant = 0
		return "none"
	}
	if (event_persuade_able == true && random(1, 100) <= event_persuade_prob) {
		document.getElementById("event_untie_content").innerHTML += "<p>触发特殊事件——说服。" + 
		"由于" + heroine_name + "晓之以理动之以情，" + villain_name + "被" + heroine_name + "成功说动了，最终决定放了" + heroine_name + "。</p>" 
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

	pleasant += sensitivity*10
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




