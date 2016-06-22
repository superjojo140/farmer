

var plantSound = new Audio("snd/plant.mp3");

function onStartPlanting(){
	jsFarmer = document.getElementById('myFarmer');
	toolCountBadge = document.getElementById('numberBadge');
}

function plantAt(id){
	var myField=document.getElementById(getData("actualFieldId"));
	var item=getData("actualItemName");
	var path=getData(item+"Path");
	
	if((getData(item+"ItemCount")>0)){ 
		myField.setAttribute("src","pics/"+path+"1.png"); 
		myField.setAttribute("data-growState","1");
		myField.setAttribute("data-intervall",getData(item+"Duration"));
		myField.setAttribute("data-plantType",item);
		myField.setAttribute("data-fieldMode","planting");
		plantSound.play();
		manageCount(item,-1);
		updateActualItemCount();
	}
}

function setSavedPlant(id,plantType,growState,fieldMode,seconds){
	var myField=document.getElementById(id);
	var path=getData(plantType+"Path");
	
	myField.setAttribute("src","pics/"+path+growState+".png"); 
	myField.setAttribute("data-growState",growState);
	myField.setAttribute("data-seconds",seconds);
	myField.setAttribute("data-intervall",getData(plantType+"Duration"));
	myField.setAttribute("data-plantType",plantType);
	myField.setAttribute("data-fieldMode",fieldMode);

}

function actionOnPlant(){ //is called if you press x and fieldMode is planting
	var field=document.getElementById(getData("actualFieldId"));
	
	if (field.getAttribute("data-growState") == 4){
		if (getData("actualItemName") == "hook") {
			harvest(getData("actualFieldId"));			
		}
	}	
}

function harvest(id){
	var field = document.getElementById(id);
	var plant=field.getAttribute("data-plantType");
	plantSound.play();
	
	field.setAttribute("data-fieldMode","broken");
	field.setAttribute("src","pics/brokenAcre.png"); 
	field.setAttribute("data-growState","0");
	field.setAttribute("data-intervall",0);
	field.setAttribute("data-plantType","null");

	var output = getData(plant+"Output");
	output = output.split("*");  //output is for example "2*pumpkin"
	manageCount(output[1],output[0]);
}

function plow(id){
	var field=document.getElementById(getData("actualFieldId"));
	
	plantSound.play();
	
	field.setAttribute("data-fieldMode","emptyAcre");
	field.setAttribute("src","pics/field1.png"); 
	field.setAttribute("data-growState","0");
	field.setAttribute("data-intervall",0);
	field.setAttribute("data-plantType","null");
}





