// A global object for the game; everything will be stored inside
var Candy = {};

Candy.Boot = function(game){};

// Define the contents of Candy.Boot
Candy.Boot.prototype = {

	preload: function (){
		// Preload the loading indicator	
		this.load.image('preloaderBar', 'assets/images/loading-bar.png');	
		this.load.image('scrolling-background', 'assets/images/scrolling-background.png');
	},

	create: function(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;		

		// Start with the Preloader state
		this.game.state.start("Preloader");
	}
}

