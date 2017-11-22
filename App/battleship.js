var view = {
	displayMessage: function(msg){
		var messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},

	displayHit: function(location){
		var cell = document.getElementById(location);
		cell.setAttribute("class", "hit");
	},
	displayMiss: function(location){
		var cell = document.getElementById(location);
		cell.setAttribute("class", "miss");
	}
}

var model = {
	boardSize: 7,
	numShips: 3,
	shipLength: 3,
	shipsSunk: 0,
	ships: [{location: ["06", "16", "26"], hits: ["", "", ""]},
			{location: ["24", "34", "44"], hits: ["", "", ""]},
			{location: ["10", "11", "12"], hits: ["", "", ""]}],

	fire: function(guess){
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			var index = ship.location.indexOf(guess);
			if(index >= 0){
				ship.hits[index] = "hit";
				view.displayHit(guess);
				view.displayMessage("HIT!");
				if (this.isSunk(ship)) {
					view.displayMessage("Você afundou o navio...");
					this.shipsSunk++;
				}
				return true;
			}
		}
		view.displayMiss(guess);
		view.displayMessage("Você Missed!");
		return false;
	},

	isSunk: function(ship){
		for (var i = 0; i < this.shipLength; i++) {
			if(ship.hits[i] !== "hit"){
				return false;
			}
		}
		return true;
	}
}

var controller = {
	guesses: 0,

	processGuess: function(guess){
		var location = parseGuess(guess);
		if(location){
			this.guesses++;
			var hit = model.fire(location);
			if(hit && model.shipsSunk === model.numShips){
				view.displayMessage("Você derrubou todos os navios, in "+ this.guess +" guesses");
			}
		}
	}
}

function parseGuess(guess){
	var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
	if(guess === null || guess.length !== 2){
		alert("Oops, please enter a letter and a number on the board.");
	}else{
		var firsChar = guess.charAt(0);
		var row = alphabet.indexOf(firsChar);
		var column = guess.charAt(1);

		if(isNaN(row) || isNaN(column)){
			alert("Oops, that isn't on the board.");
		}else if(row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize){
			alert("Oops, that's off the board!");
		}else{
			return row+column;
		}
	}
	return null;
}


controller.processGuess("A0");

controller.processGuess("A6");
controller.processGuess("B6");
controller.processGuess("C6");

controller.processGuess("C4");
controller.processGuess("D4");
controller.processGuess("E4");

controller.processGuess("B0");
controller.processGuess("B1");
controller.processGuess("B2");

/*var ships1 = [{location: ["10", "20", "30"], hits: ["", "", ""]},
			  {location: ["32", "33", "34"], hits: ["", "", ""]},
			  {location: ["63", "64", "65"], hits: ["", "", "hit"]}];

view.displayMiss("00");
view.displayMiss("55");
view.displayMiss("25");
view.displayHit("34");
view.displayHit("12");
view.displayHit("26");

view.displayMessage("Tap tap, is this thing on?");
*/
