<?php
include('dbconnect.php');


function generateTopMenu(){
	global $db;
	
	echo '<div class="selectBox" id="topMenuSelectBox" style="left: 20%;">';
	
	$befehl = "SELECT * FROM farmer WHERE type='topMenu';";
				$ergebnis = mysqli_query($db, $befehl);
				$zaehler = 0;
				$top = -30;
				while ($row = mysqli_fetch_object($ergebnis)) {
					$name = $row -> name;
					$path = $row -> path;
					$duration = $row -> duration;
					$zaehler++;
					$top += 40;
					$goLeft = $zaehler - 1;
					$goRight = $zaehler + 1;

					echo <<<TOPMENU
					
				<img class="menuButton" id="topMenu$zaehler" data-goLeft="topMenu$goLeft" data-goRight="topMenu$goRight"  data-actionValue="subMenu$zaehler" src="pics/$path.png">
TOPMENU;

				}
				
				echo '<script> setData("subMenuCount","' . $zaehler . '"); </script>'; //DATA subMenuCount - count how many subMenus we have
				
				echo '</div> <!-- topMenuSelectBox -->';
}

function generateSubMenu(){
	global $db;

				$befehl = "SELECT * FROM farmer WHERE type='topMenu';";
				$ergebnis = mysqli_query($db, $befehl);
				$zaehler = 0;
				while ($row = mysqli_fetch_object($ergebnis)) {
					$name = $row -> name;
					$path = $row -> path;
					$duration = $row -> duration;
					$zaehler++;
					$goUp = $zaehler - 1;
					$goDown = $zaehler + 1;

					echo '<div class="selectBox" id="subMenu' . $zaehler . '" style="left:40%; right: 21%;"><table><tr>';

					// subMenuItems
					$befehl = "SELECT * FROM farmer WHERE type='subMenu$zaehler';";
					$ergebnis2 = mysqli_query($db, $befehl);
					$zaehler2 = 0;
					$left = -10;
					while ($row = mysqli_fetch_object($ergebnis2)) {
						$name2 = $row -> name;
						$path2 = $row -> path;
						$duration2 = $row -> duration;
						$output = $row -> output;
						$zaehler2++;
						$left += 20;
						$goLeft = $zaehler2 - 1;
						$goRight = $zaehler2 + 1;

						echo <<<SUBMENU
	
					
					<td><img class="menuButton" id="subMenu$zaehler-$zaehler2" data-goRight="subMenu$zaehler-$goRight" data-goLeft="subMenu$zaehler-$goLeft"  data-actionValue="$name2"					
SUBMENU;
  					echo ' src="pics/' . $path2 . '0.png">';
					echo '<div class="numberBadge" id="numberBadge'.$name2.'">0</div></td>';
						
						//DATA <itemName>Path  - Path to the picture. (<path><number>.png) number=0 -> Item, number 1-4 -> grow State
						echo '<script> setData("' . $name2 . 'Path","' . $path2 . '"); </script>';
						 
						//DATA <itemName>Duration  - The duration to the next growing step
						echo '<script> setData("'.$name2.'Duration","'.$duration2.'"); </script>'; 
						
						//DATA <itemName>Output  - The duration to the next growing step
						echo '<script> setData("'.$name2.'Output","'.$output.'"); </script>'; 
						
						//Inventar speichern  DATA <itemName>ItemCount  - Count how many instances of this item we have in the inventory
						echo '<script> setData("'.$name2.'ItemCount",0); </script>'; 
						
						//OPTIMIZE We need more Attributes for Tools

					}//end of inner while

					echo "</tr></table></div>";
					//end Tag of subMenuContainer

				} //end of outer while 
}

function generateInfoBox(){
	echo <<< INFOBOX
	
	<div class="infoBox">
		<img class="infoImage" id="infoImage" src="pics/info1.png">
		<div id="infoHeader" class="infoHeader">Information</div>
		<div id="infoContent">Here we can put some interesting Messages in!</div>
		<div id="infoBarContainer" class="infoBarContainer"><div id="infoBar" class="infoBar"></div></div>
	</div>
	
INFOBOX;

}

function generateFields(){
	
	define("BREITE", 64);
	$countFields=20;
	echo '<script> setData("fieldCount","' . $countFields . '"); </script>'; //DATA fieldCount - count how many fields we have in one row!

		for ($zeile = 0; $zeile < $countFields; $zeile++) {
			for ($spalte = 0; $spalte < $countFields; $spalte++) {
				$zahl1 = str_pad($zeile, 3, 0, STR_PAD_LEFT);
				$zahl2 = str_pad($spalte, 3, 0, STR_PAD_LEFT);
				echo '<img src="pics/field1.png" id="f' . $zahl1 . '-' . $zahl2 . '" class="field" style="top: ' . $zeile * BREITE . 'px; left: ' . $spalte * BREITE . 'px;"';
				echo 'data-growState="0" data-intervall="0" data-plantType="null" data-fieldMode="emptyAcre" data-seconds="0">';
			}
		}	
}



?>