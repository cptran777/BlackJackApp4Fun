function Deck(){
	
	this.cardsInDeck = [{
		name: "Ace of Spades",
		value: 11,
		altValue: 1,
		exists: true,
		image: ""
	},
	{name: "Two of Spades", value: 2, exists: true, image: ""},
	{
		name: "Three of Spades",
		value: 3,
		exists: true,
		image: ""
	},
	{
		name: "Four of Spades",
		value: 4,
		exists: true,
		image: ""
	},
	{
		name: "Five of Spades",
		value: 5,
		exists: true,
		image: ""
	},
	{
		name: "Six of Spades",
		value: 6,
		exists: true,
		image: ""
	},
	{
		name: "Seven of Spades",
		value: 7,
		exists: true,
		image: ""
	},
	{
		name: "Eight of Spades",
		value: 8,
		exists: true,
		image: ""
	},
	{
		name: "Nine of Spades",
		value: 9,
		exists: true,
		image: ""
	},
	{
		name: "Ten of Spades",
		value: 10,
		exists: true,
		image: ""
	},
	{
		name: "Jack of Spades",
		value: 10,
		exists: true,
		image: ""
	},
	{
		name: "Queen of Spades",
		value: 10,
		exists: true,
		image: ""
	},
	{
		name: "King of Spades",
		value: 10,
		exists: true,
		image: ""
	},
	{
		name: "Ace of Hearts",
		value: 11,
		altValue: 1,
		exists: true,
		image: ""
	},
	{
		name: "Two of Hearts",
		value: 2,
		exists: true,
		image: ""
	},
	{
		name: "Three of Hearts",
		value: 3,
		exists: true,
		image: ""
	},
	{
		name: "Four of Hearts",
		value: 4,
		exists: true,
		image: ""
	},
	{
		name: "Five of Hearts",
		value: 5,
		exists: true,
		image: ""
	},
	{
		name: "Six of Hearts",
		value: 6,
		exists: true,
		image: ""
	},
	{
		name: "Seven of Hearts",
		value: 7,
		exists: true,
		image: ""
	},
	{
		name: "Eight of Hearts",
		value: 8,
		exists: true,
		image: ""
	},
	{
		name: "Nine of Hearts",
		value: 9,
		exists: true,
		image: ""
	},
	{
		name: "Ten of Hearts",
		value: 10,
		exists: true,
		image: ""
	},
	{
		name: "Jack of Hearts",
		value: 10,
		exists: true,
		image: ""
	},
	{
		name: "Queen of Hearts",
		value: 10,
		exists: true,
		image: ""
	},
	{
		name: "King of Hearts",
		value: 10,
		exists: true,
		image: ""
	},
	{
		name: "Ace of Clubs",
		value: 11,
		altValue: 1,
		exists: true,
		image: ""
	},
	{
		name: "Two of Clubs",
		value: 2,
		exists: true,
		image: ""
	},
	{
		name: "Three of Clubs",
		value: 3,
		exists: true,
		image: ""
	},
	{
		name: "Four of Clubs",
		value: 4,
		exists: true,
		image: ""
	},
	{
		name: "Five of Clubs",
		value: 5,
		exists: true,
		image: ""
	},
	{
		name: "Six of Clubs",
		value: 6,
		exists: true,
		image: ""
	},
	{
		name: "Seven of Clubs",
		value: 7,
		exists: true,
		image: ""
	},
	{
		name: "Eight of Clubs",
		value: 8,
		exists: true,
		image: ""
	},
	{
		name: "Nine of Clubs",
		value: 9,
		exists: true,
		image: ""
	},
	{
		name: "Ten of Clubs",
		value: 10,
		exists: true,
		image: ""
	},
	{
		name: "Jack of Clubs",
		value: 10,
		exists: true,
		image: ""
	},
	{
		name: "Queen of Clubs",
		value: 10,
		exists: true,
		image: ""
	},
	{
		name: "King of Clubs",
		value: 10,
		exists: true,
		image: ""
	},
	{
		name: "Ace of Diamonds",
		value: 11,
		altValue: 1,
		exists: true,
		image: ""
	},
	{
		name: "Two of Diamonds",
		value: 2,
		exists: true,
		image: ""
	},
	{
		name: "Three of Diamonds",
		value: 3,
		exists: true,
		image: ""
	},
	{
		name: "Four of Diamonds",
		value: 4,
		exists: true,
		image: ""
	},
	{
		name: "Five of Diamonds",
		value: 5,
		exists: true,
		image: ""
	},
	{
		name: "Six of Diamonds",
		value: 6,
		exists: true,
		image: ""
	},
	{
		name: "Seven of Diamonds",
		value: 7,
		exists: true,
		image: ""
	},
	{
		name: "Eight of Diamonds",
		value: 8,
		exists: true,
		image: ""
	},
	{
		name: "Nine of Diamonds",
		value: 9,
		exists: true,
		image: ""
	},
	{
		name: "Ten of Diamonds",
		value: 10,
		exists: true,
		image: ""
	},
	{
		name: "Jack of Diamonds",
		value: 10,
		exists: true,
		image: ""
	},
	{
		name: "Queen of Diamonds",
		value: 10,
		exists: true,
		image: ""
	},
	{
		name: "King of Diamonds",
		value: 10,
		exists: true,
		image: ""
	}
	];
}

Deck.prototype = {
	drawCard: function(){
		var cardIndex = Math.floor(Math.random() * 52);
		if(this.cardsInDeck[cardIndex].exists){
			this.cardsInDeck[cardIndex].exists = false;
			return this.cardsInDeck[cardIndex];
		} else {return DarkCard(); }
	},
	reShuffle: function(){
		this.cardsInDeck.forEach(function(card){
			card.exists = true;
		});
	}
};

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

/*------ Game Interface ------ */

$(document).ready();