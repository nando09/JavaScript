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
		for (var i = 0; i < this.numShips; i++){
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
	//Palpites
	guesses: 0,

	//function para pegar informação do tiro
	processGuess: function(guess){
		//verificando na funcao se o guess esta conforme o tabuleiro
		var location = parseGuess(guess);
		//Se o retorno de location for verdadeiro entra no if
		if(location){
			//acrecente mais 1 no guesses
			this.guesses++;
			//retorna true se o navio for atingido
			var hit = model.fire(location);
			//Se o navio for atingido e foi todos eles entra no if
			if(hit && model.shipsSunk === model.numShips){
				//Manda uma mensagem para o usuario
				view.displayMessage("Você derrubou todos os navios, in "+ this.guess +" guesses");
			}
		}
	}
}

function parseGuess(guess){
	var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
	if(guess === null || guess.length !== 2){
		alert("Oops, Por favor, entre com uma letra e um numero.");
	}else{
		//Pega o primeiro caracter do guess
		var firsChar = guess.charAt(0);
		//Tras do firsChar o primeiro caracter, e procura no alphabet a letra correspondente
		//Quando achara letra no firsChar, retorna o numero do indice
		var row = alphabet.indexOf(firsChar);
		//Pega o segundo caracter do guess
		var column = guess.charAt(1);
		//row e column não é numero?
		if(isNaN(row) || isNaN(column)){
			alert("Oops, that isn't on the board.");
			//row é meno que zero ou maior que model.boardSize "(7)"
			//column e meno que zero ou maior que model.boardSize "(7)"
		}else if(row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize){
			alert("Oops, Não existe essa opção!");
		}else{
			//Retorna as entradas de valores convertendo para numeros
			return row + column;
		}
	}
	//Caso tenho algum erro localizado ele retorna null
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
