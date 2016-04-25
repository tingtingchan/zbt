Candy.Preloader = function(game){
	// Define width and height of the world
	Candy.worldWidth = 640;
	Candy.worldHeight = 960;
};

Candy.Preloader.prototype = {

	preload: function(){
		// Set background color and preload image
		this.stage.backgroundColor = '#B4D9E7';
		this.preloadBar = this.add.sprite((Candy.worldWidth-474)/2, (Candy.worldHeight-79)/2, 'preloaderBar');
		this.time.advancedTiming = true;
		this.load.setPreloadSprite(this.preloadBar);

		// Load images
		this.load.image('highscore', 'assets/images/highscore.png');
		this.load.image('floor', 'assets/images/floor.png');
		this.load.image('background', 'assets/images/background.png');
		this.load.image('zombie', 'assets/images/zombie.png');
		this.load.image('logo', 'assets/images/logo.png');
		this.load.image('story', 'assets/images/story.png');
		this.load.image('tutorial', 'assets/images/tutorial.png');
		this.load.image('game-over', 'assets/images/gameover.png');
		this.load.image('score-bg', 'assets/images/score-bg.png');
		this.load.image('brain-ice-cream', 'assets/images/brain-ice-cream.png');
		this.load.image('overlay', 'assets/images/overlay.png');
		this.load.image('pause-text', 'assets/images/pause-text.png');
		this.load.image('hearts-box', 'assets/images/hearts-box.png');
		this.load.image('three-hearts', 'assets/images/three-hearts.png');
		this.load.image('two-hearts', 'assets/images/two-hearts.png');
		this.load.image('one-heart', 'assets/images/one-heart.png');
		this.load.image('new-best-score', 'assets/images/new-best-score.png');

		// Load spritesheets
		this.load.spritesheet('candy', 'assets/images/candy.png', 82, 98);
		this.load.spritesheet('zombie-idle', 'assets/images/zombie-left-right.png', 828, 905);
		this.load.spritesheet('brain-explosion', 'assets/images/brain-explosion.png', 198, 148);
		this.load.spritesheet('button-start', 'assets/images/button-start.png', 401, 143);
		this.load.spritesheet('button-play', 'assets/images/button-play.png', 227, 122);
		this.load.spritesheet('button-sound', 'assets/images/button-sound.png', 73, 66);
		this.load.spritesheet('button-pause', 'assets/images/button-pause.png', 96, 98);
		this.load.spritesheet('button-tutorial', 'assets/images/button-tutorial.png', 402, 149);
		this.load.spritesheet('button-back-to-main', 'assets/images/button-back-to-main.png', 400, 153);
		this.load.spritesheet('button-try-again', 'assets/images/button-try-again.png', 400, 149);

		// Load audio
		this.game.load.audio('theme-music', 'assets/audio/theme-music.mp3');
		this.game.load.audio('game-over', 'assets/audio/game-over.mp3');
		this.game.load.audio('nom', 'assets/audio/nom.mp3');
		this.game.load.audio('is-it-cookie', 'assets/audio/is-it-cookie.mp3');
		this.game.load.audio('me-want-cookie', 'assets/audio/me-want-cookie.mp3');
		this.game.load.audio('is-it-an-orange', 'assets/audio/is-it-an-orange.mp3');
		this.game.load.audio('no', 'assets/audio/no.mp3');
		this.game.load.audio('click', 'assets/audio/click.mp3');

	},
	
	create: function(){
		// Start the MainMenu state
		this.state.start('MainMenu');
		this.game.muteStatus = false;
	}
};