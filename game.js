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

var deck = new Deck();

/*------ Establishing classes that will interact during game ------ */

function Player(name, funds){
	this.playerName = name;
	this.funds = funds;
	this.ante = 0;
	this.cardStack = [];
}

Player.prototype = {
	placeBet: function(amount){
		this.funds -= amount;
		this.ante += amount;
	},
	placeHit: function(){
		this.cardStack.push(deck.drawCard());
	},
	clearStack: function(){
		this.cardStack = [];
	},
	blackjack: function(){
		this.funds += 2.5 * this.ante;
		this.ante = 0;
	},
	bust: function(){
		this.ante = 0;
	},
	checkStack: function(){
		var stackValue = 0;
		this.cardStack.forEach(function(card){
			stackValue += card.value;
		});
		switch(compare(stackValue, 21)){
			case -1: break; // Need to continue what ever loop this is
			case 0: this.blackjack(); break;
			case 1: this.bust(); break;
			default: break; // Need default case
		}
	}
};

function Dealer(){
	Player.apply(this, arguments);
	this.shuffle = function(){
		deck.reShuffle();
		gameTable.players.forEach(function(player){
			player.clearStack();
		});
		this.cardStack = [];
	};
}

var dealer = new Dealer("Dealer");

/*------ Game Setup ------ */

var gameTable = {
	players: []
};

function createPlayers(){
	var randomNames = ["Steve", "Clint", "Martha", "John", "Matt",
	"Justin", "Kevin", "Andrew", "Sarah", "Paul", "Gracie"];
	// To be created/customized using a function: 
	var userPlayer = new Player(randomGenerator(randomNames), 5000);
	var npcPlayer01 = new Player(randomGenerator(randomNames), 5000);
	var npcPlayer02 = new Player(randomGenerator(randomNames), 5000);
	var npcPlayer03 = new Player(randomGenerator(randomNames), 5000);
	gameTable.players = [userPlayer, npcPlayer01, npcPlayer02, npcPlayer03];
}

createPlayers();

// Testing area (to be deleted before completion):

console.log(dealer.playerName);
console.log("game.js is okay");




