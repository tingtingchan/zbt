Candy.Over = function(game){};

Candy.Over.prototype = {
	create: function(){

		this.game.audio.theme_music.stop();
		if (this.game.audio.nom){
			this.game.audio.nom.stop();
		};
		if (this.game.muteStatus == false){
        	this.game.audio.game_over = this.game.add.audio('game-over');
        	this.game.audio.game_over.play();
    	};

		this.add.sprite(0, 0, 'background');
		this._hearts_box = this.add.sprite(250, 5, 'hearts-box');
		this._hearts_box.scale.setTo(1.2, 1.2);
		this.add.sprite(Candy.worldWidth-96-10, 5, 'button-pause');
		this.add.sprite(0, 0, 'overlay').alpha = 0.7;

		this._score = this.add.sprite(10, 5, 'score-bg');
        var fontCurrentScore = { font: "36px Sinking Ship", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" };
        this.add.text(112, 20, Candy._score, fontCurrentScore);

        // Store the highest score and show New High Score message when it exists
        //storageAPI.remove('ZBT-highscore');
        var highscore = storageAPI.get('ZBT-highscore') || 0;
		storageAPI.setHighscore('ZBT-highscore', Candy._score);
		if (Candy._score > highscore){
			this._new_best_score = this.add.sprite(30, 30, 'new-best-score');
  			this.add.tween(this._new_best_score.scale).to( { x: 1.5, y: 1.5 }, 800, Phaser.Easing.Bounce.Out, true);
		};

		this._game_over = this.add.sprite((Candy.worldWidth-504)/2-40, (Candy.worldHeight-311)/4+30, 'game-over');
		this._game_over.scale.setTo(1.18, 1.18);

		this._try_again = this.add.button((Candy.worldWidth-400)/2 +55, Candy.worldHeight-153-250, 'button-try-again', this.stateRestart, this, 1, 0);
		this._try_again.scale.setTo(0.65, 0.65);
		this._back_to_main = this.add.button((Candy.worldWidth-400)/2 +50, Candy.worldHeight-153-130, 'button-back-to-main', this.stateBack, this, 1, 0);
		this._back_to_main.scale.setTo(0.7, 0.7);

		// Reset health
		Candy._health = 3;
	},

	stateRestart: function(){
		if (this.game.muteStatus == false){
			click = this.game.add.audio('click');
	        click.play(null, 0, 0.4, false);
			this.game.audio.game_over.stop();
	        this.game.audio.theme_music = this.game.add.audio('theme-music');
	        this.game.audio.theme_music.play();
	    };
	    this.game.state.start("Play");
        Candy._score = 0;
        Candy._increasedSpeed = 0;
	},

	stateBack: function(){
		if (this.game.muteStatus == false){
			click = this.game.add.audio('click');
	        click.play(null, 0, 0.4, false);
			this.game.audio.game_over.stop();
		};
		this.game.state.start("MainMenu");
		Candy._score = 0;
		Candy._increasedSpeed = 0;
	}
}