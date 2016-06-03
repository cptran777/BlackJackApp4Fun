/*Filename: game.js
* Created by: Charlie Tran
* Description: This file uses javascript concepts to build a blackjack in browser
* game. 
*/

/*----- Helper functions ------ */

// Functions to assist with inheritance:

function inherit(proto){
	function F(){}
	F.prototype = proto;
	return new F;
}

function extend(Child, Parent){
	Child.prototype = inherit(Parent.prototype);
	Child.prototype.constructor = Child;
	Child.parent = Parent.prototype;
}

// Random selector for an array: 

function randomGenerator(array){
	return array[Math.floor(Math.random() * array.length)];
}

function compare(itemA, itemB){
	if(itemA < itemB){
		return -1;
	} else if(itemA === itemB){
		return 0;
	} else if(itemA > itemB){
		return 1;
	} else {
		return 2;
	}
}

/*------ End Helper Functions ------ */

// Deck class defined in deck.js
var deck = new Deck();

/*------ Establishing classes that will interact during game ------ */

function Player(name, funds){
	this.playerName = name;
	this.funds = funds;
	this.ante = 0;
	this.cardStack = [];
	this.condition;
}

Player.prototype = {
	placeBet: function(amount){
		this.funds -= amount;
		this.ante += amount;
	},
	placeHit: function(){
		this.cardStack.push(deck.drawCard());
		//this.checkStack();
	},
	clearStack: function(){
		this.cardStack = [];
	},
	blackjack: function(){
		this.funds += 2.5 * this.ante;
		this.ante = 0;
	},
	win: function(){
		this.funds += ante * 2;
		this.ante = 0;
	},
	lose: function(){
		this.ante = 0;
	},
	bust: function(){
		// this.ante = 0;
	},
	breakEven: function(){
		this.funds += ante;
		this.ante = 0;
	},
	checkStack: function(){
		var stackValue = 0;
		this.cardStack.forEach(function(card){
			stackValue += card.value;
		});
		return stackValue;
		/* with some updates in the dealer function/class, this code snippet
		* may not be needed. keeping as comment for now
		* switch(compare(stackValue, 21)){
			case -1: break; // Need to continue what ever loop this is
			case 0: this.blackjack(); break;
			case 1: this.bust(); break;
			default: break; // Need default case
		}*/
	}, 
	setCondition: function(condition){
		if(!this.condition){
			this.condition = condition;
		}
	},
	resolve: function(){
		switch(this.condition){
			case "blackjack": this.blackjack(); break;
			case "draw": this.breakEven(); break;
			case "win": this.win(); break;
			case "lose": this.lose(); break;
		}
	},
	// A script to allow for NPC controlled players to count
	// cards and pick the best possible solution for victory
	autoPlay: function(){
		var self = this;
		var dealerValue = dealer.shownCard.value;
		var checkDeck = function(){
			var numCardsLeft = 0;
			var totalVal = deck.cardsInDeck.reduce(function(total, currentCard){
				if(currentCard.exists){
					numCardsLeft++;
					return total + currentCard.value;
				} else { return total; }
			}, 0);
			return totalVal/numCardsLeft;
		};
		var predictedDealerVal = Math.round(dealerValue + checkDeck());
		// Adjustment if the player thinks the dealer will have to play an additional card
		predictedDealerVal += predictedDealerVal >= 17 ? 0 : Math.round(checkDeck());
		var satisfied = false;
		// This function will control the NPC's logic loop
		var playCards = function(currentStack){
			if(satisfied === true){
				return;
			}
			if(currentStack > predictedDealerVal || currentStack >= 21){
				satisfied = true;
				return;
			} else if(currentStack + checkDeck() > 21){
				if(currentStack >= 17){
					satisfied = true;
					return;
				}
			}
			self.placeHit();
			return playCards(self.checkStack());
		};
		playCards(this.checkStack());
	}
};

function Dealer(){
	Player.apply(this, arguments);
	this.shownCard;
	this.shuffle = function(){
		deck.reShuffle();
		gameTable.players.forEach(function(player){
			player.clearStack();
		});
		this.cardStack = [];
	};
	this.dealCards = function(){
		gameTable.players.forEach(function(player){
			for(var x = 0; x < 2; x++){
				player.cardStack.push(deck.drawCard());
			}
		});
		for(var y = 0; y < 2; y++){
			this.cardStack.push(deck.drawCard());
		}
		this.shownCard = this.cardStack[0];
	};
	this.blackjack = function(){
		gameTable.players.forEach(function(player){
			switch(compare(player.checkStack(), 21)){
				case -1: player.setCondition("lose");
				case 0: player.setCondition("draw");
			}
		});
	};
}

extend(Dealer, Player);

/*Note: Steps for blackjack
* 1) Determine value of each player stack
* 2) set condition for each player
* 3) Dealer initiates a "resolution" step that calls on resolution based on 
* the condition set in step 2
*/

Dealer.prototype.checkDealStack = function(){
	var stackValue = this.checkStack();
	switch(compare(stackValue,21)){
		case -1: /*Continue scipt; */break;
		case 0: this.blackjack(); break;
		default: /*Should not exist, throw error*/break;
	}
};

Dealer.prototype.checkStack = function(){
	var stackValue = 0;
	this.cardStack.forEach(function(card){
		stackValue += card.value;
	});
	return stackValue;
};

// A function that auto plays for the dealer and then determines the winnings of
// each player
Dealer.prototype.play = function(players){
	while(this.checkStack() < 17){
		this.placeHit();
	}
	var stackValue = this.checkStack();
	if(stackValue > 21){
		players.forEach(function(player){
			if(player.checkStack() > 21){
				player.setCondition("lose");
			} else { player.setCondition("win"); }
		});
	} else {
		players.forEach(function(player){
			if(player.checkStack() > 21){
				player.setCondition("lose");
			} else {
				switch( compare(stackValue, player.checkStack()) ){
					case -1: player.setCondition("win"); break;
					case 0: player.setCondition("draw"); break;
					case 1: player.setCondition("lose"); break;
					default: break; // Should never reach default
				}
			}
		});
	}
}

var dealer = new Dealer("Dealer");

/*------ Game Setup ------ */

var gameTable = {
	players: [],
	/*Gamestates:
	* 0 - Not Started: Game not started
	* 1 - Started: Game has passed welcome screen
	* 2 - Ready: Ready to deal cards
	* 3 - In Play: Currently going through a round
	* 4 - Results: The round is over and the results are being decided. 
	*/
	gameState: 0
};

function createPlayers(username){
	var randomNames = ["Steve", "Clint", "Martha", "John", "Matt",
	"Justin", "Kevin", "Andrew", "Sarah", "Paul", "Gracie"];
	// To be created/customized using a function: 
	gameTable.userPlayer = new Player(username, 5000);
	gameTable.npcPlayer01 = new Player(randomGenerator(randomNames), 5000);
	gameTable.npcPlayer02 = new Player(randomGenerator(randomNames), 5000);
	gameTable.npcPlayer03 = new Player(randomGenerator(randomNames), 5000);
	gameTable.players = [gameTable.userPlayer, gameTable.npcPlayer01, 
		gameTable.npcPlayer02, gameTable.npcPlayer03];
}

function clearWelcome(){
	$('#WelcomeWindow').remove();
}

/*------ Game Interface ------ */

$(document).ready(function(){

	// Upon player entering their name, starts the game and 
	$('#startGame').click(function(){
		createPlayers($('#WelcomeForm :input').val());
		$('#WelcomeWindow').remove();
		$('.gameWindow').append('<div id="menubox"></div>');
		$('#menubox').append('<button type="button" class="menubutton" id="hitbox">Hit</button>');
		$('#menubox').append('<button type="button" class="menubutton" id="doubleButton">Double Down</button>');
		$('#menubox').append('<button type="button" class="menubutton" id="betButton">Place Bet</button>');
		$('#menubox').append('<button type="button" class="menubutton" id="standButton">Stand</button>');
		$('.gameWindow').append('<div id="dealerwindow"></div>');
		$('.gameWindow').append('<div id="cardwindow"></div>');
		gameTable.gameState = "Started";
	});

	$('.gameWindow').on("click", "#betButton", function(){
		if(gameTable.gameState === 1 || gameTable.gameState === 2){
			dealer.dealCards();
		}
	});

	$('.gameWindow').on("click", "#hitbox", function(){
		if(gameTable.gameState === 3){
			gameTable.userPlayer.placeHit();
		}
	});
});

// Testing area (to be deleted before completion):

console.log(dealer.playerName);

dealer.dealCards();
createPlayers("Charlie");
gameTable.players.forEach(function(player){
	player.autoPlay();
});
console.log()
gameTable.players.forEach(function(player){
	console.log(player.cardStack);
});

dealer.play(gameTable.players);

gameTable.players.forEach(function(player){
	console.log(player.condition);
});

gameTable.userPlayer.testFunc = function(){
	console.log("Updating prototype works");
}

gameTable.userPlayer.testFunc();

console.log("game.js is okay");

