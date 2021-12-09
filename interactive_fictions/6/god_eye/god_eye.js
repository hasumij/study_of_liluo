function god_eye_content_insert() {
    god_eye_array = [
    "被绑者角色名:" + heroine_name + " 绑架者角色名:" + villain_name,
    "脱缚能力值:",
    "眼部脱缚能力——" + untie_eye,
    "嘴部脱缚能力——" + untie_mouth,
    "手臂脱缚能力——" + untie_arm,
    "手指脱缚能力——" + untie_finger,
    "腿部脱缚能力——" + untie_leg,
    "特殊姿势增量——" + tie_post,
    "敏感度:" + sensitivity,
    "当前快感值:" + pleasant,
    "当前体力值:" + power,
    "当前束缚值:",
    "眼部束缚值——" + tie_eye,
    "嘴部束缚值——" + tie_mouth,
    "手臂束缚值——" + tie_arm,
    "手指束缚值——" + tie_finger,
    "腿部束缚值——" + tie_leg,
    "特殊事件概率:",
    "脱衣事件概率——" + event_no_clothes_prob + "%",
    "收紧事件概率——" + event_string_prob + "%",
    "呼救事件概率——" + event_call_for_help_prob + "%",
    "突发收紧事件概率——" + event_sudden_lose_prob + "%",
    "萌化事件概率——" + event_very_cute_prob + "%",
    "说服事件概率——" + event_persuade_prob + "%"
    ]
    document.getElementById("god_eye_content").innerHTML = display_array(god_eye_array);
}

var god_eye = document.getElementById('god_eye');
god_eye.onclick=function() {
    god_eye_content_insert()
    god_eye_window.style.display = "block";
}

var god_eye_window=document.getElementById('god_eye_window');
var god_eye_close_button=document.getElementById('god_eye_close_button');
god_eye_close_button.onclick=function(){
    god_eye_window.style.display="none";
    return false;
}

// 鼠标拖拽功能
var god_eye_window_title=document.getElementById('god_eye_title');
god_eye_window_title.onmousedown=function(e){
    e = e || window.event;
    var x=e.pageX || e.clientX +(document.body.scrollLeft || document.documentElement.scrollLeft);
    var y=e.pageY || e.clientY +(document.body.scrollTop || document.documentElement.scrollTop);

    var boxX=god_eye_window.offsetLeft;
    var boxY=god_eye_window.offsetTop;

    var mouse_in_boxX=x-boxX;
    var mouse_in_boxY=y-boxY;

    document.onmousemove=function(e){
        var x=e.pageX || e.clientX +(document.body.scrollLeft || document.documentElement.scrollLeft);
        var y=e.pageY || e.clientY +(document.body.scrollTop || document.documentElement.scrollTop);

        god_eye_window.style.left=x-mouse_in_boxX+256+'px';
        god_eye_window.style.top=y-mouse_in_boxY-142+'px';
    }
}

god_eye_window_title.onmouseup = function(){
    document.onmousemove=null;
}