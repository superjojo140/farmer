
var a= new Array();

function onStartDataArray(){
	a["jsFarmer"]=document.getElementById("myFarmer"); //DATA jsFarmer - The farmer object
	a["mode"]="plant"; //DATA mode - The actual gamemode i.E. plant-topMenu-subMenu
	a["focusedObject"]; //DATA focusedObject - The actual focused menuButton
	a["actualItemName"]; //DATA actualItemName - The name of the actual selected Item/Tool 
	a["actualFieldId"]; //DATA actualFieldId - Id of the actual slected field
	a["actualFieldX"]; //DATA actualFieldX - x-coordinate of the actual field 
	
	readAll();
}

function getData(index){
	return a[index];
}

function setData(index,value){
	a[index]=value;
}

function saveItemCounts() {
	for (var key in a){
		if (key.indexOf("ItemCount") != -1){
			localStorage.setItem(key,a[key]);
		}
	}
}

function readItemCounts() {
	
	for (var key in localStorage){
		if (key.indexOf("ItemCount") != -1){
			var count=Number(localStorage.getItem(key));
			var itemName=key.substring(0,key.indexOf("ItemCount"));  // wheatItemcount;
			manageCount(itemName,count);
		}
	}
	
	
}

function saveOther(){
	key="actualItemName";
	localStorage.setItem(key,getData(key));
}

function readOther(){
	key="actualItemName";
	selectItem(localStorage.getItem(key));
	if (getData(key) == null){ //OPTIMIZE Testen mit leeren Storage
		setData(key,"wheat");
		selectItem("wheat");
		alert("Kein Ausgewähltes Item: Setze Weizen.");
	}
}

function saveFields(){
	
	for (var i = 0; i < getData("fieldCount"); i++) {
		for (var j = 0; j < getData("fieldCount"); j++) {
			
			var id = "f" + addZeros(i) + "-" + addZeros(j);
			var field = document.getElementById(id);
			
			localStorage.setItem(id+"GrowState",field.getAttribute("data-growState"));
			localStorage.setItem(id+"Seconds",field.getAttribute("data-seconds"));
			localStorage.setItem(id+"PlantType",field.getAttribute("data-plantType"));
			localStorage.setItem(id+"FieldMode",field.getAttribute("data-fieldMode"));
			
		}
	}
	
}

function readFields(){
	
	var growState;
	var seconds;
	var plantType;
	var fieldMode;
	
	for (var i = 0; i < getData("fieldCount"); i++) {
		for (var j = 0; j < getData("fieldCount"); j++) {
			
			var id = "f" + addZeros(i) + "-" + addZeros(j);
			var field = document.getElementById(id);
			
			growState = localStorage.getItem(id+"GrowState");
			seconds = localStorage.getItem(id+"Seconds");
			plantType = localStorage.getItem(id+"PlantType");
			fieldMode = localStorage.getItem(id+"FieldMode");
	
			
			
			if(fieldMode == "planting"){
				setSavedPlant(id,plantType,growState,fieldMode,seconds);
			}
			if(fieldMode == "broken"){
				field.setAttribute("data-fieldMode","broken");
				field.src="pics/brokenAcre.png";
			}
			
		}
	}
	
}

function saveAll(){
	saveFields();
	saveItemCounts();
	saveOther();
}

function readAll(){
	readFields();
	readItemCounts();
	readOther();
}




