Candy.Story = function(game){};

Candy.Story.prototype = {

	create: function(){
		this.add.sprite(0, 0, 'background');
		this.add.sprite(0, 0, 'overlay').alpha = 0.5;
		this.add.sprite(0, 0, 'story');
		this.add.button(Candy.worldWidth-227-30, Candy.worldHeight-244+80, 'button-play', this.clickPlay, this, 1, 0);
	},

	clickPlay: function(){
		if (this.game.muteStatus == false){
			click = this.game.add.audio('click');
        	click.play(null, 0, 0.4, false);
        };
		// Start the Play state
		this.state.start('Play');	
	}
};