const move_speed = 1.3;
const timer_intervall = 1;
const scrollDistance = 250;

var lastTimerCall;
var jsFarmer;
var jsGameWindow;
var gameWindowSize;
var farmer_styles;
var timer_down_var;
var timer_up_var;
var timer_left_var;
var timer_right_var;
var go_down = false;
var go_up = false;
var go_left = false;
var go_right = false;

function onStartMovements() {
	jsFarmer = document.getElementById('myFarmer');
	farmer_styles = window.getComputedStyle(jsFarmer);
	jsGameWindow = document.getElementById('gameWindow');
	gameWindowSize = jsGameWindow.getBoundingClientRect();
}

function placeFarmer(x_pos, y_pos) {
 
	var temp=farmer_styles.left;
	temp=temp.substr(0,temp.indexOf("px"));
	temp=Number(temp);
	x_pos = x_pos + temp;
	
	temp=farmer_styles.top;
	temp=temp.substr(0,temp.indexOf("px"));
	temp=Number(temp);
	y_pos = y_pos + temp;

	jsFarmer.style.left = x_pos + 'px';
	jsFarmer.style.top = y_pos + 'px';
}

function timer_down() {
	jsFarmer.src = farmer_down.src;
	var myDate=new Date();
	var time_diff = myDate.getTime() - lastTimerCall;	
	placeFarmer(0, time_diff*move_speed);
	setActualField();
	
	if (jsFarmer.y > gameWindowSize.bottom - scrollDistance){
		jsGameWindow.scrollTop += time_diff*move_speed;
	}
	
	myDate=new Date();
	lastTimerCall = myDate.getTime(); 
}

function timer_up() {
	jsFarmer.src = farmer_up.src;
	var myDate=new Date();
	var time_diff = myDate.getTime() - lastTimerCall;	
	placeFarmer(0, -move_speed*time_diff);
	setActualField();

	if (jsFarmer.y < scrollDistance + gameWindowSize.top){
		jsGameWindow.scrollTop -= move_speed*time_diff;
	}
	myDate=new Date();
	lastTimerCall = myDate.getTime(); 
}

function timer_left() {
	jsFarmer.src = farmer_left.src;
	var myDate=new Date();
	var time_diff = myDate.getTime() - lastTimerCall;	
	placeFarmer(-move_speed*time_diff, 0);
	setActualField();
	
	if (jsFarmer.x < gameWindowSize.left + scrollDistance){
		jsGameWindow.scrollLeft -= move_speed*time_diff;
	}
	myDate=new Date();
	lastTimerCall = myDate.getTime(); 
}

function timer_right() {
	jsFarmer.src = farmer_right.src;
	var myDate=new Date();
	var time_diff = myDate.getTime() - lastTimerCall;	
	placeFarmer(move_speed*time_diff, 0);
	setActualField();
	
	if (jsFarmer.x > gameWindowSize.right - scrollDistance){
		jsGameWindow.scrollLeft += move_speed*time_diff;
	}
	myDate=new Date();
	lastTimerCall = myDate.getTime(); 
}

document.onkeydown = function(event) {

	if (event.keyCode == 40) {//down_arrow
		if (getData("mode").match("plant")) {
			if (go_down == false) {
				var myDate=new Date();
				lastTimerCall = myDate.getTime(); 
				timer_down_var = setInterval(timer_down, timer_intervall);
				go_down = true;
			}
		} else {
			menuMove("Down");
		}

	}

	//--------------------------------------------

	if (event.keyCode == 38) {//up_arrow
		if (getData("mode").match("plant")) {
			if (go_up == false) {
				var myDate=new Date();
				lastTimerCall = myDate.getTime(); 
				timer_up_var = setInterval(timer_up, timer_intervall);
				go_up = true;
			}
		} else {
			menuMove("Up");
		}
	}

	//--------------------------------------------

	if (event.keyCode == 37) {//left_arrow
		if (getData("mode").match("plant")) {
			if (go_left == false) {
				var myDate=new Date();
				lastTimerCall = myDate.getTime(); 
				timer_left_var = setInterval(timer_left, timer_intervall);
				go_left = true;
			}
		} else {
			menuMove("Left");
		}
	}

	//--------------------------------------------

	if (event.keyCode == 39) {//right_arrow
		if (getData("mode").match("plant")) {
			if (go_right == false) {
				var myDate=new Date();
				lastTimerCall = myDate.getTime(); 
				timer_right_var = setInterval(timer_right, timer_intervall);
				go_right = true;
			}
		} else {
			menuMove("Right");
		}
	}

	//--------------------------------------------

	if (event.keyCode == 88) {//x-letter

		if (getData("mode").match("plant")) {

			var myField = document.getElementById(getData("actualFieldId"));
			if (myField.getAttribute("data-fieldMode") == "emptyAcre") {
				if (myField.getAttribute("data-plantType") == "null") {
					plantAt(getData("actualFieldId"));
				}
			}
			
			if (myField.getAttribute("data-fieldMode") == "planting") {
				actionOnPlant();
			}
			
			if (myField.getAttribute("data-fieldMode") == "broken") {
				if (getData("actualItemName") == "hoe") {
					plow(getData("actualFieldId"));
				}
			}
			
		} else {
			buttonSelected(); 
		}
	}
	if (event.keyCode == 89) {//y-letter
		if (getData("mode").match("plant")) {
			showMenu();
		}
		else{
			hideMenu();
		}
	}
	
	if (event.keyCode ==83) {//s-letter
		saveAll();
		alert("Gespeichert");
	}
	
	if (event.keyCode ==82) {//r-letter
		localStorage.clear();
		alert("Reset - Bitte neu laden");
	}
	
	if (event.keyCode ==65) {//a-letter
		manageCount("wheat",1);
		manageCount("carrot",1);
		manageCount("pumpkin",1);
		manageCount("tomato",1);
		manageCount("artichoke",1);
		manageCount("cucumber",1);
		manageCount("corn",1);
		manageCount("paprika",1);
		alert("Du hast 1 Item von jeder Sorte erhalten - Cheater!!!"); 
	}
	
	
	if (event.keyCode ==66) {//b-letter
		alert(gameWindowSize.top);
	}

	event.cancelBubble = true;
	event.returnValue = false;
	return event.returnValue;
};

document.onkeyup = function(event) {

	if (event.keyCode == 40) {//down_arrow
		clearInterval(timer_down_var);
		go_down = false;
	}
	if (event.keyCode == 38) {//up_arrow
		clearInterval(timer_up_var);
		go_up = false;
	}
	if (event.keyCode == 37) {//left_arrow
		clearInterval(timer_left_var);
		go_left = false;
	}
	if (event.keyCode == 39) {//right_arrow
		clearInterval(timer_right_var);
		go_right = false;
	}
	event.cancelBubble = true;
	event.returnValue = false;
	return event.returnValue;
};

