function god_eye_content_insert() {
    god_eye_array = [
    "被绑者角色名：" + heroine_name + " 绑架者角色名：" + villain_name,
    "脱缚能力值：",
    "眼部脱缚能力——" + untie_eye,
    "嘴部脱缚能力——" + untie_mouth,
    "手臂脱缚能力——" + untie_arm,
    "手指脱缚能力——" + untie_finger,
    "腿部脱缚能力——" + untie_leg,
    "特殊姿势增量——" + tie_post,
    "其他属性：",
    "敏感度——" + sensitivity,
    "当前快感值——" + pleasant,
    "最大快感值——" + pleasant_max,
    "高潮次数——" + pleasant_max_number,
    "当前体力值——" + power,
    "每轮脱缚消耗体力值——" + power_consume,
    "每次高潮消耗体力值——" + power_consume_pleasure,
    "每次休息恢复体力值——" + power_recover,
    "当前束缚值：",
    "眼部束缚值——" + tie_eye,
    "嘴部束缚值——" + tie_mouth,
    "手臂束缚值——" + tie_arm,
    "手指束缚值——" + tie_finger,
    "腿部束缚值——" + tie_leg,
    "捆绑过程特殊事件：",
    "脱衣事件概率——" + event_no_clothes_prob + "%",
    "收紧事件概率——" + event_string_prob + "%",
    "粗心大意事件概率——" + event_careless_prob + "%",
    "挣扎过程特殊事件：",
    "呼救事件概率——" + event_call_for_help_prob + "%",
    "突发收紧事件概率——" + event_sudden_string_prob + "%",
    "萌化事件概率——" + event_very_cute_prob + "%",
    "说服事件概率——" + event_persuade_prob + "%",
    "挠痒事件概率——" + event_tk_prob + "%",
    "探索过程特殊事件：",
    "找到眼罩钥匙事件——" + event_unlock_eye_prob + "%",
    "找到口球钥匙事件——" + event_unlock_mouth_prob + "%",
    "找到手铐钥匙事件——" + event_unlock_arm_prob + "%",
    "找到指铐钥匙事件——" + event_unlock_finger_prob + "%",
    "找到脚镣钥匙事件——" + event_unlock_leg_prob + "%",
    "找到小刀事件——" + event_knife_prob + "%",
    "暴露行踪事件——" + event_expose_prob + "%",
    "玻璃碴事件——" + event_glass_prob + "%",
    ]
    document.getElementById("god_eye_content").innerHTML = display_array(god_eye_array);
}

var god_eye_window = document.getElementById('god_eye_window');

var god_eye = document.getElementById('god_eye');
god_eye.onclick = function() {
    god_eye_content_insert()
    god_eye_window.style.display = "";
    window_scroll()
}

var god_eye_close_button = document.getElementById('god_eye_close_button');
god_eye_close_button.onclick = function() {
    god_eye_window.style.display="none";
    window_scroll()
}
