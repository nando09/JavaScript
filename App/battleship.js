var view = {
	displayMessage: function(msg){
		var messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},

	displayHit: function(locations){
		var cell = document.getElementById(locations);
		cell.setAttribute("class", "hit");
	},
	displayMiss: function(locations){
		var cell = document.getElementById(locations);
		cell.setAttribute("class", "miss");
	}
}

var model = {
	boardSize: 7,
	numShips: 3,
	shipLength: 3,
	shipsSunk: 0,
	ships: [{locations: [0, 0, 0], hits: ["", "", ""]},
			{locations: [0, 0, 0], hits: ["", "", ""]},
			{locations: [0, 0, 0], hits: ["", "", ""]}],

	generateShipLocations: function(){
		var locations;
		for (var i = 0; i < this.numShips; i++){
			do{
				locations = this.generateShips();
			}while(this.collision(locations));
			this.ships[i].locations = locations;
		}
	},

	collision: function(locations){
		for(var i = 0; i < this.numShips; i++){
			var ship = model.ships[i];
			for(var j = 0; j < locations.length; j++){
				if(ship.locations.indexOf(locations[j]) >= 0){
					return true;
				}
			}
		}
	},

	generateShips: function(){
		var direction = Math.floor(Math.random() * 2);
		var row, col;
		if (direction === 1){
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
		}else{
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
			col = Math.floor(Math.random() * this.boardSize);
		}

		var newShipLocations = [];
		for (var i = 0; i < this.shipLength; i++){
			if(direction === 1){
				newShipLocations.push(row + "" + (col + i));
			}else{
				newShipLocations.push((row + i) + "" + col);
			}
		}
		return newShipLocations;
	},

	fire: function(guess){
		for (var i = 0; i < this.numShips; i++){
			var ship = this.ships[i];
			var index = ship.locations.indexOf(guess);
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
		var locations = parseGuess(guess);
		//Se o retorno de locations for verdadeiro entra no if
		if(locations){
			//acrecente mais 1 no guesses
			this.guesses++;
			//retorna true se o navio for atingido
			var hit = model.fire(locations);
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

function init(){
	var fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;
	var guessInput = document.getElementById("guessInput");
	guessInput.onkeypress = handleKeyPress;

	model.generateShipLocations();
}

function handleFireButton(){
	var guessInput = document.getElementById("guessInput");
	var guess = guessInput.value;
	controller.processGuess(guess);
	guessInput.value = "";
}

function handleKeyPress(e){
	var fireButton = document.getElementById("fireButton");
	if(e.keyCode === 13){
		fireButton.click();
		return false;
	}
}


window.onload = init;
