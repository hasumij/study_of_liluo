// ***************************************** 变量定义
var gift_number = 2
var all_gifts = ["灵活的舌头", "灵活的手指", "舞蹈演员", 
			"天生丽质", "天生媚骨", "冷静头脑", "敏感身体", 
			"娃娃脸", "口才", "抖M"]
var gifts = []
var clothes_id = 1
var all_clothes = ["可爱的jk制服", "保守的女仆装", "普通的休闲装", "创可贴"]

var all_ties = []
var tie_string = ""

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