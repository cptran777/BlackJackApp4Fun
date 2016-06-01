/* Filename: deck.js
* Created by: Charlie Tran
* Description: This javascript file holds the function related to the deck
* in order to keep the main game file uncluttered. */

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
		var remainingDeck = this.cardsInDeck.filter(function(card){
			return card.exists;
		});
		console.log("Remaining deck length: " + remainingDeck.length);
		if(remainingDeck.length === 0){
			console.log("Deck empty");
		}
		var cardIndex = Math.floor(Math.random() * remainingDeck.length);
		for(var x = 0; x < this.cardsInDeck.length; x++){
			if(this.cardsInDeck[x].name === remainingDeck[cardIndex].name){
				this.cardsInDeck[x].exists = false;
				break;
			}
		}
		return remainingDeck[cardIndex];
		/* Old code: 
		if(remainingDeck[cardIndex].exists){
			this.cardsInDeck[cardIndex].exists = false;
			return this.cardsInDeck[cardIndex];
		} else {console.log("does not exist"); return this.drawCard();}
		*/
	},
	reShuffle: function(){
		for(var x = 0; x < this.cardsInDeck.length; x++){
			this.cardsInDeck[x].exists = true;
		}
	}
};

//Testing area (to be deleted before completion):
console.log("Test: Deck.js is okay.")