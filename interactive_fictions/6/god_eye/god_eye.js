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