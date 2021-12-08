var heroine_name = ""
var villain_name = ""
character_array = ["角色创建完毕"]

all_characters = ["", "沐沐绑璃落", "安宁绑香月"]


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

