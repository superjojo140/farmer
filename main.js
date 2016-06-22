
//Bilder vorladen
farmer_up = new Image();
farmer_up.src = "pics/boy_up.png";
farmer_down = new Image();
farmer_down.src = "pics/boy_down.png";
farmer_left = new Image();
farmer_left.src = "pics/boy_left.png";
farmer_right = new Image();
farmer_right.src = "pics/boy_right.png";
grass1 = new Image();
grass1.src = "pics/grass2.png";
wheat1 = new Image();
wheat1.src= "pics/wheat1.png";



function WaitForPageLoad() {
      if(document.readyState != "complete") {
        window.setTimeout(WaitForPageLoad, 100);
        return false;
      }
      onStartDataArray();
      onStartMovements();
	  onStartCollisions();
	  onStartPlanting();
	  setInterval(manageGrowing, 1000); //Start the timer
    }
