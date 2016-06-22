<?php
include ('generate.php');
?>

<!DOCTYPE html>
<html lang="de">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" type="text/css" href="style.css">
		<link rel="stylesheet" type="text/css" href="infoBox.css">
		<link rel="stylesheet" type="text/css" href="market.css">
		<link href='https://fonts.googleapis.com/css?family=Chewy' rel='stylesheet' type='text/css'>
		<title>Farmer</title>

		<script language="javascript" type="text/javascript" src="main.js"></script>
		<script language="javascript" type="text/javascript" src="movements.js"></script>
		<script language="javascript" type="text/javascript" src="collisions.js"></script>
		<script language="javascript" type="text/javascript" src="planting.js"></script>
		<script language="javascript" type="text/javascript" src="menu.js"></script>
		<script language="javascript" type="text/javascript" src="dataArray.js"></script>
		<script language="javascript" type="text/javascript" src="grow.js"></script>
	</head>
	<body onload="WaitForPageLoad()" style="background: black;">

		
		<div class="gameWindow" id="gameWindow"> 
		
		<?php
		generateFields();
		?>
		
		<img src="pics/boy_down.png" id="myFarmer" class="farmer">
		<div id="marked" class="marked"></div>
		
		</div> <!-- Game Window -->

		<div class="menuBar">

			<!-- Actual selected Tool inclusive number badge -->
			<div class="toolWindow">
				<img src="" id="toolImage" >
				<div class="numberBadge" id="numberBadge">
					0
				</div>
			</div>

			<?php
			generateTopMenu();
			generateSubMenu();
			generateInfoBox();
			generateMarket();
			?>
			
			
			
		</div>
		<!-- MenuBar -->

	</body>
</html>