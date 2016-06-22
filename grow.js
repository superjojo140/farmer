function manageGrowing() {
	
	if (getData("mode")=="plant"){
		setInfoBox(getData("actualFieldId"),"fieldState");
	}
	
	for (var i = 0; i < getData("fieldCount"); i++) {
		for (var j = 0; j < getData("fieldCount"); j++) {

			var id = "f" + addZeros(i) + "-" + addZeros(j);
			var field = document.getElementById(id);
			var mode = field.getAttribute("data-fieldMode");
			var plant = field.getAttribute("data-plantType");

			if (mode == "planting") {
				var intervall = field.getAttribute("data-intervall");
				var seconds = field.getAttribute("data-seconds");
				var growState = field.getAttribute("data-growState");
				var path=getData(plant+"Path");
				
				
				if ((Number(seconds) >= Number(intervall)) && (growState<4)) {
					
					field.setAttribute("data-seconds", 0);
					field.setAttribute("data-growState", ++growState);
					field.setAttribute("src", "pics/"+path+growState+".png");

				} else {
					field.setAttribute("data-seconds", ++seconds);
				}
			}
		}
	}
}
