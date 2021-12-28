window.onload=function(){
var story = document.getElementById('word');
var s = document.getElementById('show');
var i = 0;
timer=setInterval(function(){
    s.innerHTML=story.innerHTML.substring(0,i);
    i++;
    if(s.innerHTML==story.innerHTML){
        clearInterval(timer);
    }
},200);
}