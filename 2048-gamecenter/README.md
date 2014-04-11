Assignment 4 2048-gamecenter:

1. I think I have implemented all the requirements for this assignment.

2. Person(s) with whom I have collaborated or discussed the assignment with: none.

3. Hours spent on this assignment: 15

4. Score and grid:
The data fields of this game are stored in gameManager, an object with consists of many
other objects and functions, such as actuator or grid. gameManager is in "game_manager.js",
actuator is in "html_actuator.js" and grid is in "grid.js". Also, bestScore and
previousGameState is stored in the computer's local storage (or fake storage) and reloaded
when the file index.html is loaded so user can continue the game where they left off.


5. Modifications I made:
I modified in two places:

In index.html, line 88, before declaring and other js file, I declared jquery:
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>

In game_manager.js, line 90, I added in:
var name = prompt("What's your name?");
$.post( "http://warm-citadel-4529.herokuapp.com/submit.json", 
    	{ username: name, score: this.score, grid: this.grid.serialize() } );

