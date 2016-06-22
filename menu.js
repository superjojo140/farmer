var menuMoveSound = new Audio("snd/menuMove.mp3");
var menuSelectSound = new Audio("snd/menuSelect.mp3");


function setFocus(id) {
	var oldFocus = document.getElementById(getData("focusedObject"));
	var nextObject = document.getElementById(id);
	setData("focusedObject", nextObject.id);
	if (oldFocus != null) {
		oldFocus.style.borderColor = "#4D1F10";
	}
	nextObject.style.borderColor = "orange";
	
	var plant=nextObject.getAttribute("data-actionValue");
	setInfoBox(plant,"itemInfo");
}

function showMenu() { 
	setData("mode", "topMenu");
	var topMenuBox = document.getElementById('topMenuSelectBox');
	topMenuBox.style.visibility = "visible";
	setFocus("topMenu1");
	menuSelectSound.play();
}

function menuMove(direction) {
	var focusedObject = document.getElementById(getData("focusedObject"));
	var nextObject = document.getElementById(focusedObject.getAttribute("data-go" + direction));
	if (nextObject != null) {
		setFocus(nextObject.id);
		if (direction == "Right"){ var scrolling = 75;}
		if (direction == "Left") {var scrolling = -75;}
		if (focusedObject.id.indexOf("subMenu1") > -1){ document.getElementById('subMenu1').scrollLeft += scrolling;}
		menuMoveSound.play();
	}
	else alert("Cant Focus this Object");
}

function buttonSelected() {
	var focusedObject = document.getElementById(getData("focusedObject"));
	var onAction = focusedObject.getAttribute("data-actionValue");

	if (getData("mode").match("topMenu")) {

		
		var container = document.getElementById(onAction);
		container.style.visibility = "visible";
		if (onAction == "subMenu3")
			setData("mode","market");
		else
				setData("mode", "subMenu");
		setFocus(onAction + "-1");
		document.getElementById(onAction).scrollLeft=0;

	} else if (getData("mode").match("subMenu")) {
			selectItem(onAction);
	}
	
	menuSelectSound.play();
}

function selectItem(itemName) {
	setData("actualItemName", itemName);
	document.getElementById("toolImage").src = "pics/" + getData(itemName + "Path") + "0.png";
	//eg. pics/wheat0.png is the preview image of wheat
	updateActualItemCount();
	hideMenu();

	//OPTIMIZE  bei Tools evtl noch mode ändern
}


function hideMenu(){
	menuSelectSound.play();
	setData("mode","plant");
	var toHide=document.getElementById("topMenuSelectBox");
	toHide.style.visibility = "hidden";
	
	for(var i=1;i<=getData("subMenuCount");i++){
		var toHide=document.getElementById("subMenu"+i);
		toHide.style.visibility = "hidden";
	}
}

function manageCount(itemName,add){
	var count=Number(getData(itemName+"ItemCount"));
	count+=Number(add);
	setData(itemName+"ItemCount",count);
	document.getElementById("numberBadge"+itemName).innerHTML=count;
	updateActualItemCount();
}


function updateActualItemCount(){
	var count = getData(getData("actualItemName")+"ItemCount");
	document.getElementById('numberBadge').innerHTML=count;
}

function setInfoBox(data,mode){
	var imageSrc; var header; var content; var bar;
	
	if (mode=="fieldState"){ //data -> fieldId
		var field = document.getElementById(data);
		var fieldMode = field.getAttribute("data-fieldMode"); 
		
		if (fieldMode=="emptyAcre"){
			imageSrc = "pics/seeds.png";
			header = "Empty Acre";
			content = "You can plant sth. on this acre. Hit 'y'-Key and select a seed.";
			bar = "hidden";
		}
		
			else if (fieldMode == "broken"){
				imageSrc = "pics/hoe0.png";
				header = "Broken Acre";
				content = "This acre is broken. You have to plow it. Hit 'y'-Key and select the hoe.";
				bar = "hidden";
			}
		
				else if (fieldMode == "planting"){		
					var plant = field.getAttribute("data-plantType");
					var growState = field.getAttribute("data-growState");
					var seconds = field.getAttribute("data-seconds");
					var duration= getData(plant+"Duration");
					var path=getData(plant+"Path");
					var output=getData(plant+"Output");
					var timeGrown=((growState-1)*duration) + Number(seconds);
					var timeLeft = 3*duration - Number(timeGrown); 
					if (timeLeft < 0) {timeLeft=0;}
					imageSrc = "pics/" + path + "0.png";
					header = plant;
					content = "Time: " + timeLeft + " s./"+3*duration+"s."; // *3 because of 4 growing states
					content+= "<br>Output: " + output;
					bar = (timeGrown / (3*duration))*100;
					if (bar > 100){ bar=100;}
					//alert("Grown: "+timeGrown+" - Left: "+timeLeft+" - Gesamt: "+4*duration+ " - Bar: "+bar);
				}
		
	}
	
	else if(mode=="itemInfo"){ //data -> itemName
		var duration= getData(data+"Duration");
		var path=getData(data+"Path");
		var output=getData(data+"Output");
		imageSrc = "pics/" + path + "0.png"; 
		header = data;
		content = "Time: " + 3*duration + " s."; // *3 because of 4 growing states
		content+= "<br>Output: " + output;
		bar = "hidden";
	}
	
	document.getElementById('infoImage').src=imageSrc;
	document.getElementById('infoHeader').innerHTML=header;
	document.getElementById('infoContent').innerHTML=content;
	if (bar == "hidden"){
		document.getElementById('infoBarContainer').style.visibility="hidden";
	}
	else{
		document.getElementById('infoBarContainer').style.visibility="visible";
		document.getElementById('infoBar').style.width=bar+"%";
	}
	
}







