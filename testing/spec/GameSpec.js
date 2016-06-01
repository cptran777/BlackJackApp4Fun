describe("Dealer", function() {

  beforeEach(function() {
    dealer = new Dealer();
  });

  it("should be able to change player items at the game table", function() {
    createPlayers("Charlie");
    gameTable.players.forEach(function(player){
      for(var x = 0; x < 2; x++){
        player.placeHit();
      }
    });
    dealer.blackjack();
    var testVariable;
    expect(gameTable.players[0].checkStack() < 21 ? "lose" : "draw").toEqual(gameTable.players[0].condition);

    //demonstrates use of custom matcher
    //expect(player).toBePlaying(song);
  });
/*
  describe("when song has been paused", function() {
    beforeEach(function() {
      player.play(song);
      player.pause();
    });

    it("should indicate that the song is currently paused", function() {
      expect(player.isPlaying).toBeFalsy();

      // demonstrates use of 'not' with a custom matcher
      expect(player).not.toBePlaying(song);
    });

    it("should be possible to resume", function() {
      player.resume();
      expect(player.isPlaying).toBeTruthy();
      expect(player.currentlyPlayingSong).toEqual(song);
    });
  });

  // demonstrates use of spies to intercept and test method calls
  it("tells the current song if the user has made it a favorite", function() {
    spyOn(song, 'persistFavoriteStatus');

    player.play(song);
    player.makeFavorite();

    expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  });

  //demonstrates use of expected exceptions
  describe("#resume", function() {
    it("should throw an exception if song is already playing", function() {
      player.play(song);

      expect(function() {
        player.resume();
      }).toThrowError("song is already playing");
    });
  });
*/
});

