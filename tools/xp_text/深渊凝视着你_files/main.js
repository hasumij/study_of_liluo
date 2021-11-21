(function(storyContent){var story=new inkjs.Story(storyContent);var savePoint="";let savedTheme;let globalTagTheme;var globalTags=story.globalTags;if(globalTags){for(var i=0;i<story.globalTags.length;i++){var globalTag=story.globalTags[i];var splitTag=splitPropertyTag(globalTag);if(splitTag&&splitTag.property=="theme"){globalTagTheme=splitTag.val;}
else if(splitTag&&splitTag.property=="author"){var byline=document.querySelector('.byline');byline.innerHTML="by "+splitTag.val;}}}
var storyContainer=document.querySelector('#story');var outerScrollContainer=document.querySelector('.outerContainer');setupTheme(globalTagTheme);var hasSave=loadSavePoint();setupButtons(hasSave);savePoint=story.state.toJson();continueStory(true);function continueStory(firstTime){var paragraphIndex=0;var delay=0.0;var previousBottomEdge=firstTime?0:contentBottomEdgeY();while(story.canContinue){var paragraphText=story.Continue();var tags=story.currentTags;var customClasses=[];for(var i=0;i<tags.length;i++){var tag=tags[i];var splitTag=splitPropertyTag(tag);if(splitTag&&splitTag.property=="AUDIO"){if('audio'in this){this.audio.pause();this.audio.removeAttribute('src');this.audio.load();}
this.audio=new Audio(splitTag.val);this.audio.play();}
else if(splitTag&&splitTag.property=="AUDIOLOOP"){if('audioLoop'in this){this.audioLoop.pause();this.audioLoop.removeAttribute('src');this.audioLoop.load();}
this.audioLoop=new Audio(splitTag.val);this.audioLoop.play();this.audioLoop.loop=true;}
if(splitTag&&splitTag.property=="IMAGE"){var imageElement=document.createElement('img');imageElement.src=splitTag.val;storyContainer.appendChild(imageElement);showAfter(delay,imageElement);delay+=200.0;}
else if(splitTag&&splitTag.property=="LINK"){window.location.href=splitTag.val;}
else if(splitTag&&splitTag.property=="LINKOPEN"){window.open(splitTag.val);}
else if(splitTag&&splitTag.property=="BACKGROUND"){outerScrollContainer.style.backgroundImage='url('+splitTag.val+')';}
else if(splitTag&&splitTag.property=="CLASS"){customClasses.push(splitTag.val);}
else if(tag=="CLEAR"||tag=="RESTART"){removeAll("p");removeAll("img");setVisible(".header",false);if(tag=="RESTART"){restart();return;}}}
var paragraphElement=document.createElement('p');paragraphElement.innerHTML=paragraphText;storyContainer.appendChild(paragraphElement);for(var i=0;i<customClasses.length;i++)
paragraphElement.classList.add(customClasses[i]);showAfter(delay,paragraphElement);delay+=200.0;}
story.currentChoices.forEach(function(choice){var choiceParagraphElement=document.createElement('p');choiceParagraphElement.classList.add("choice");choiceParagraphElement.innerHTML=`<a href='#'>${choice.text}</a>`
storyContainer.appendChild(choiceParagraphElement);showAfter(delay,choiceParagraphElement);delay+=200.0;var choiceAnchorEl=choiceParagraphElement.querySelectorAll("a")[0];choiceAnchorEl.addEventListener("click",function(event){event.preventDefault();removeAll(".choice");story.ChooseChoiceIndex(choice.index);savePoint=story.state.toJson();continueStory();});});storyContainer.style.height=contentBottomEdgeY()+"px";if(!firstTime)
scrollDown(previousBottomEdge);}
function restart(){story.ResetState();setVisible(".header",true);savePoint=story.state.toJson();continueStory(true);outerScrollContainer.scrollTo(0,0);}
function showAfter(delay,el){el.classList.add("hide");setTimeout(function(){el.classList.remove("hide")},delay);}
function scrollDown(previousBottomEdge){var target=previousBottomEdge;var limit=outerScrollContainer.scrollHeight-outerScrollContainer.clientHeight;if(target>limit)target=limit;var start=outerScrollContainer.scrollTop;var dist=target-start;var duration=300+300*dist/100;var startTime=null;function step(time){if(startTime==null)startTime=time;var t=(time-startTime)/duration;var lerp=3*t*t-2*t*t*t;outerScrollContainer.scrollTo(0,(1.0-lerp)*start+lerp*target);if(t<1)requestAnimationFrame(step);}
requestAnimationFrame(step);}
function contentBottomEdgeY(){var bottomElement=storyContainer.lastElementChild;return bottomElement?bottomElement.offsetTop+bottomElement.offsetHeight:0;}
function removeAll(selector)
{var allElements=storyContainer.querySelectorAll(selector);for(var i=0;i<allElements.length;i++){var el=allElements[i];el.parentNode.removeChild(el);}}
function setVisible(selector,visible)
{var allElements=storyContainer.querySelectorAll(selector);for(var i=0;i<allElements.length;i++){var el=allElements[i];if(!visible)
el.classList.add("invisible");else
el.classList.remove("invisible");}}
function splitPropertyTag(tag){var propertySplitIdx=tag.indexOf(":");if(propertySplitIdx!=null){var property=tag.substr(0,propertySplitIdx).trim();var val=tag.substr(propertySplitIdx+1).trim();return{property:property,val:val};}
return null;}
function loadSavePoint(){try{let savedState=window.localStorage.getItem('save-state');if(savedState){story.state.LoadJson(savedState);return true;}}catch(e){console.debug("Couldn't load save state");}
return false;}
function setupTheme(globalTagTheme){var savedTheme;try{savedTheme=window.localStorage.getItem('theme');}catch(e){console.debug("Couldn't load saved theme");}
var browserDark=window.matchMedia("(prefers-color-scheme: dark)").matches;if(savedTheme==="dark"||(savedTheme==undefined&&globalTagTheme==="dark")||(savedTheme==undefined&&globalTagTheme==undefined&&browserDark))
document.body.classList.add("dark");}
function setupButtons(hasSave){let rewindEl=document.getElementById("rewind");if(rewindEl)rewindEl.addEventListener("click",function(event){removeAll("p");removeAll("img");setVisible(".header",false);restart();});let saveEl=document.getElementById("save");if(saveEl)saveEl.addEventListener("click",function(event){try{window.localStorage.setItem('save-state',savePoint);document.getElementById("reload").removeAttribute("disabled");window.localStorage.setItem('theme',document.body.classList.contains("dark")?"dark":"");}catch(e){console.warn("Couldn't save state");}});let reloadEl=document.getElementById("reload");if(!hasSave){reloadEl.setAttribute("disabled","disabled");}
reloadEl.addEventListener("click",function(event){if(reloadEl.getAttribute("disabled"))
return;removeAll("p");removeAll("img");try{let savedState=window.localStorage.getItem('save-state');if(savedState)story.state.LoadJson(savedState);}catch(e){console.debug("Couldn't load save state");}
continueStory(true);});let themeSwitchEl=document.getElementById("theme-switch");if(themeSwitchEl)themeSwitchEl.addEventListener("click",function(event){document.body.classList.add("switched");document.body.classList.toggle("dark");});}})(storyContent);