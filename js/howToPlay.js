Candy.HowToPlay = function(game){};

Candy.HowToPlay.prototype = {

	create: function(){
		this.add.sprite(0, 0, 'background');
		this.add.sprite(0, 0, 'tutorial');
		this.add.button(Candy.worldWidth-227-30, Candy.worldHeight-244+80, 'button-play', this.clickPlay, this, 1, 0);
	},

	clickPlay: function(){
		if (this.game.muteStatus == false){
			click = this.game.add.audio('click');
        	click.play(null, 0, 0.4, false);
        };
		// Start the MainMenu state
		this.state.start('Play');	
	}
};