

const X=0; //For getCoordinate
const Y=1;




function addZeros(v) {
	v = v < 100 ? '0' + v : v;
	v = v < 10 ? '0' + v : v;
	return v;
}

function getCoordinate(fieldId,xORy){
	fieldId = fieldId.slice(1, 8);
	var felder = fieldId.split('-', 2);
	if (xORy==X) return felder[1];
	else return felder[0];
}

function setFieldId(fieldId) { 
	setData("actualFieldId",fieldId);
	jsMarked.style.top = getCoordinate(fieldId,Y) * 64 + "px"; 
	jsMarked.style.left = getCoordinate(fieldId,X) * 64 + "px";
	setInfoBox(fieldId,"fieldState");
}

function onStartCollisions() {
	jsFarmer = document.getElementById('myFarmer');
	jsMarked = document.getElementById('marked');
	var fieldId="f004-004";
	setFieldId(fieldId);
	placeFarmer(getCoordinate(fieldId,X) * 64, getCoordinate(fieldId,Y) * 64);
}

function getTouchedArea(fieldId) {
	var obj1 = jsFarmer;
	var obj2 = document.getElementById(fieldId);
	if (obj2 == null) {
		return 0;
	} else {
		if (isCollision(obj1, obj2) == true) {

			if ((obj2.x + obj2.width >= obj1.x) && (obj2.x <= obj1.x)) {
				var touchWidth = obj2.x + obj2.width - obj1.x;
			} else {
				var touchWidth = obj1.x + obj1.width - obj2.x;
			}

			if ((obj2.y + obj2.height >= obj1.y) && (obj2.y <= obj1.y)) {
				var touchHeight = obj2.y + obj2.height - obj1.y;
			} else {
				var touchHeight = obj1.y + obj1.height - obj2.y;
			}

			return touchWidth * touchHeight;
		} else {
			return 0;
		}
	}
}

function isCollision(obj1, obj2) {
	if ((obj2.y + obj2.height >= obj1.y) && (obj2.y <= obj1.y + obj1.height) && (obj2.x + obj2.width >= obj1.x) && (obj2.x <= obj1.x + obj1.width))
		return true;
	else
		return false;
}

function setActualField() { 
//Marks the most touched field as Actual Field
	var touchedArea = 0;
	var tempFieldId = 0;
	var actId=getData("actualFieldId");

	for (var i = getCoordinate(actId,Y) - 1; i <= getCoordinate(actId,Y) + 1; i++) {
		for (var j = getCoordinate(actId,X) - 1; j <= getCoordinate(actId,X) + 1; j++) { //Number(nummer)
			id = "f" + addZeros(i) + '-' + addZeros(j);
			if (getTouchedArea(id) > touchedArea) {
				touchedArea = getTouchedArea(id);
				tempFieldId = id;
			}
		}
	}
	if ((tempFieldId != 0) && (tempFieldId != actId)){
		setFieldId(tempFieldId);
	}
}