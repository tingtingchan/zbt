Candy.Play = function(game){

	// Define variables for Candy.Game
	this._player = null;
	this._candyGroup = null;
	this._brainIceCreamGroup = null;
	this._spawnItemsTimer = 0;
	this._fontStyle = null;
	this._cursors = null;
	this._floor = null;
	this._increasedGravity = 200;
	this._mute = null;

	// Define Candy variables to reuse them in Candy.item functions
	Candy._scoreText = null;
	Candy._score = 0;
	Candy._health = 3;
	Candy.muteStatus = null;
	Candy._increasedSpeed = 0;

};

Candy.Play.prototype = {

	create: function(){

		if (this.game.muteStatus == false){
			this._mute = false;
		} else{
			this._mute = true;
		}

		// Start the physics engine
		this.physics.startSystem(Phaser.Physics.ARCADE);

		// Set the global gravity
		this.physics.arcade.gravity.y = 200;

		// Display images: background, floor and score
		this._scrolling_background = this.add.tileSprite(0, 0, 640, 960, 'scrolling-background');
		this._floor = this.add.sprite(0, Candy.worldHeight-80, 'floor');
		this.add.sprite(10, 5, 'score-bg');
		this._hearts_box = this.add.sprite(250, 5, 'hearts-box');
		this._hearts_box.scale.setTo(1.2, 1.2);
		this._one_heart = this.add.sprite(250, 5, 'one-heart');
		this._one_heart.scale.setTo(1.2, 1.2);
		this._two_hearts = this.add.sprite(250, 5, 'two-hearts');
		this._two_hearts.scale.setTo(1.2, 1.2);
		this._three_hearts = this.add.sprite(250, 5, 'three-hearts');
		this._three_hearts.scale.setTo(1.2, 1.2);

		// Add a pause button
		this.add.button(Candy.worldWidth-96-10, 5, 'button-pause', this.managePause, this, 1, 0);

		// Create the player; add animations
		this._player = this.add.sprite(30, 745, 'zombie-idle');
		this._player.scale.setTo(0.15, 0.15);
		this._player.animations.add('idle', [0,1], 3, true);
		this._player.animations.add('goLeft', [2,3], 3, true);
		this._player.animations.play('idle');

		// Check for collisions
		this.physics.arcade.enable([this._player, this._floor]);

		// Set no gravity applies to the floor
		this._floor.body.allowGravity = false;
		this._floor.body.immovable = true;

		// Add some controls to the player		
		this._player.body.collideWorldBounds = true;
		this._player.body.maxVelocity.setTo(400);
		this._cursors = this.input.keyboard.createCursorKeys();
		this._jump = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		this._fontStyle = { font: "36px Sinking Ship", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" };
		// initialize the spawn timer
		this._spawnItemsTimer = 0;
		// initialize the score text with 0
		Candy._scoreText = this.add.text(112, 20, "0", this._fontStyle);
		// set health of the player
		// Candy._health = 10;

		// Create a new group for candy
		this._candyGroup = this.add.group();
		// Spawn the first candy
		Candy.item.spawnCandy(this);

		// Create a new group for brain ice cream
		this._brainIceCreamGroup = this.add.group();
		// Spawn the first brain ice cream
		Candy.item.spawnBrainIceCream(this);

	},

	managePause: function(){
		// Pause the game
		this.game.paused = true;
		var overlay = this.add.sprite(0, 0, 'overlay')
		overlay.alpha = 0.8;
		var pausedText = this.add.sprite(60, 250, 'pause-text');
		pausedText.scale.setTo(0.5, 0.5);
		
		// Set event listener for the user's click/tap the screen
		this.input.onDown.add(function(){
			// remove the pause text and the overlay
			overlay.destroy();
			pausedText.destroy();
			// unpause the game
			this.game.paused = false;
		}, this);
	},

	update: function(){

		this._scrolling_background.tilePosition.x += 0.2;

		this.physics.arcade.collide(this._player, this._floor);
		this.physics.arcade.overlap(this._player, this._candyGroup, this.addPoints, null, this);
		this.physics.arcade.overlap(this._player, this._brainIceCreamGroup, this.gameOver, null, this);

		// Contorl the player's movement by right/left/up arrow keys and the spacebar
		this._player.body.velocity.x = 0;
		if (this._cursors.left.isDown){
			this._player.animations.play('goLeft');
			this._player.body.velocity.x = -1000;
		} else if (this._cursors.right.isDown){
			this._player.animations.play('idle');
			this._player.body.velocity.x = 1000;
		} else if(this._jump.isDown || this._cursors.up.isDown){
			this._player.body.velocity.y = -1000;
		} else{
			this._player.body.gravity.y = 3000;
		};

		//  Stop at screen edges
		if (this._player.x > Candy.worldWidth - 140){
	    	this._player.x = Candy.worldWidth - 140;
	    	this._player.body.acceleration.x = 0;
		};
		if (this._player.x < 20){
			this._player.x = 20;
			this._player.body.acceleration.x = 0;
		};

		// Update timer every frame
		this._spawnItemsTimer += this.time.elapsed;

		// If spawn timer reach 1 second (1000 miliseconds)
		if (this._spawnItemsTimer > 1000 ){
			// Spawn a new candy
			Candy.item.spawnCandy(this);
		} else if (this.game.rnd.integerInRange(500, this._spawnItemsTimer) % 200 == 0 ){
			// Spawn a new brain ice cream
			Candy.item.spawnBrainIceCream(this);
		};

		//***********************************************************************
		// Mode 1: (Candies from Top)
		// Increases difficulty of the game - increase gravity over gameplay time
		// this._increasedGravity += this.time.elapsed / 10;

		//***********************************************************************
		// Mode 2: (Candies from right/left) 
		// Increases difficulty of the game - increase speed over gameplay time

		//this._increasedSpeed += this.game.time.elapsed / 100;
		
		//this._increasedSpeed += this.time.totalElapsedSeconds();
		Candy._increasedSpeed += 0.3;
		console.log(Candy._increasedSpeed);

		//***********************************************************************

		// Loop through every single candy on the screen
		this._candyGroup.forEach(function(candy){
			// to have a self-rotation behavior
			candy.angle += candy.rotating;
		});

		// Loop through every single brain ice cream on the screen
		this._brainIceCreamGroup.forEach(function(brainIceCream){
			// to have a self-rotation behavior
			brainIceCream.angle += brainIceCream.rotating;
		});

		// Lose one health when missing one candy; game over when health drops to zero

		if (Candy._health == 2){
			this._three_hearts.destroy();
		}else if (Candy._health == 1){
			this._two_hearts.destroy();
		}else if (!Candy._health){
			this._one_heart.destroy();
			this.game.state.start('Over');
		};
	},

	addPoints: function(player, candy){
		if (this.game.muteStatus == false){
			// Add some sound effects while getting points
	        nom = this.game.add.audio('nom');
	        isItCookie = this.game.add.audio('is-it-cookie');
	        meWantCookie = this.game.add.audio('me-want-cookie');
	        isItAnOrange = this.game.add.audio('is-it-an-orange');

	        // Generate weighed random music
	        sounds = [nom, isItCookie, meWantCookie, isItAnOrange];
	        soundsWeight= [7, 1, 1, 1]; 
	        weighedsounds = new Array();
	        currentSound = 0;

	        while ( currentSound < sounds.length ){
	    		for ( i = 0; i < soundsWeight[currentSound]; i++ )
	        	weighedsounds[weighedsounds.length] = sounds[currentSound]
	    		currentSound++
			}

			var randomnumber = Math.floor(Math.random()*10);
			weighedsounds[randomnumber].play(null, 0, 0.4, false);
		};

		// Kill the candy when it's clicked/caught
		candy.kill();
		// Add one point to the score
		Candy._score += 10;
		// Update score text
		Candy._scoreText.setText(Candy._score);	

		// Display points on the screen
		var randX = this.rnd.integerInRange(candy.x - 100, candy.x + 100);
		var randY = this.rnd.integerInRange(candy.y -100, candy.y + 100);
		var pointsAdded = this.add.text(randX, randY, '+10',{ font: "40px Sinking Ship", fill: "#FFCC00", stroke: "#333", strokeThickness: 5 });

		pointsAdded.anchor.set(0.5, 0.5);
		this.add.tween(pointsAdded).to({ alpha: 0, y: randY-50 }, 1000, Phaser.Easing.Linear.None, true);
	},

	gameOver: function(player, brainIceCream){

		brainIceCream.kill();
		if (this.game.muteStatus == false){
			no = this.game.add.audio('no');
			// play and set volume
			no.play(null, 0, 0.4, false);
		};

		// Add brain explosion animation
		this._brainIceCream = this.add.sprite(brainIceCream.x-120, brainIceCream.y-100, 'brain-explosion');
		this._brainIceCream.scale.setTo(1.5, 1.5);
		this._brainIceCream.animations.add('brain-explosion', [0,1,2,3,4,5,6], 10, false);
		this._brainIceCream.animations.play('brain-explosion');
		this._brainIceCream.events.onAnimationComplete.add(function(){			
			// Reset health level
			Candy._health = 0;		
		}, this);
	}
};

Candy.item = {

	spawnCandy: function(game){
		// console.log(game._increasedGravity);
		//console.log(game._increasedSpeed);

		game._spawnItemsTimer = 0;

		//***********************************************************************
		// <-- Mode 1: Candies come from top of the world -->
		// Calculate drop position (from 0 to game width) on the x axis
		// var dropPos = Math.floor(Math.random()*Candy.worldWidth);
		// define the offset for every candy
		// var dropOffset = [-27,-36,-36,-38,-48];
		// Randomize candy type
		var candyType = Math.floor(Math.random()*5);
		// Create a new candy
		// var candy = game.add.sprite(dropPos, dropOffset[candyType], 'candy');

		//***********************************************************************
		// <-- Mode 2: Projectile Motion - Candies coming from right/left -->
		var dropPosX = [50, Candy.worldWidth];
		var randomDropPosX = dropPosX[Math.floor(Math.random() * dropPosX.length)];
	    var randomDropPosY = Math.floor((Math.random()*Candy.worldHeight/3)+60);

		var candy = game.add.sprite(randomDropPosX, randomDropPosY, 'candy');

		game.physics.enable(candy, Phaser.Physics.ARCADE);

		if (randomDropPosX == 50){
			candy.body.velocity.x = (500 / (Math.sqrt(700 / 500))) + Candy._increasedSpeed;
		} 
		else{
			candy.body.velocity.x = -((500 / (Math.sqrt(700 / 500))) + Candy._increasedSpeed);
		}

		//***********************************************************************		
		candy.scale.setTo(2, 2);
		candy.animations.add('anim', [candyType], 10, true);
		candy.animations.play('anim');
		candy.inputEnabled = true;
		candy.events.onInputDown.add(this.clickCandy, this);
		candy.events.onInputDown.add(function(){

			var randX = game.rnd.integerInRange(candy.x - 100, candy.x + 100);
			var randY = game.rnd.integerInRange(candy.y -100, candy.y + 100);
			var pointsAdded = game.add.text(randX, randY, '+10',{ font: "40px Sinking Ship", fill: "#FFCC00", stroke: "#333", strokeThickness: 5 });
			pointsAdded.anchor.set(0.5, 0.5);
			game.add.tween(pointsAdded).to({ alpha: 0, y: randY-50 }, 1000, Phaser.Easing.Linear.None, true);

			if (game._mute == false){
				// Add some sound effects while getting points
			    nom = game.add.audio('nom');
	        	isItCookie = game.add.audio('is-it-cookie');
	        	meWantCookie = game.add.audio('me-want-cookie');
	        	isItAnOrange = game.add.audio('is-it-an-orange');

	        	// Generate weighed random music
		        var sounds = [nom, isItCookie, meWantCookie, isItAnOrange];
		        var soundsWeight= [7, 1, 1, 1]; 
		        var weighedsounds = new Array();
		        var currentSound = 0;

		        while ( currentSound < sounds.length ){
		    		for ( i = 0; i < soundsWeight[currentSound]; i++ )
		        	weighedsounds[weighedsounds.length] = sounds[currentSound]
		    		currentSound++
				}

				var randomnumber = Math.floor(Math.random()*10);
				weighedsounds[randomnumber].play(null, 0, 0.4, false);
			};

		}, this);
		candy.checkWorldBounds = true;
		candy.events.onOutOfBounds.add(this.removeCandy, this);
		candy.anchor.setTo(0.5, 0.5);
		candy.rotating = (Math.random()*4)-2;

		//***********************************************************************
		// Mode 1:
		// candy.body.gravity.y = game._increasedGravity;

		//***********************************************************************

		// Add candy to the group
		game._candyGroup.add(candy);
	},

	spawnBrainIceCream: function(game){

		var dropPosX = [50, Candy.worldWidth];
		var randomDropPosX = dropPosX[Math.floor(Math.random() * dropPosX.length)];
	    var randomDropPosY = Math.floor((Math.random()*Candy.worldHeight/3)+60);

		var brainIceCream = game.add.sprite(randomDropPosX, randomDropPosY, 'brain-ice-cream');

		game.physics.enable(brainIceCream, Phaser.Physics.ARCADE);

		if (randomDropPosX == 50){
			brainIceCream.body.velocity.x = (500 / (Math.sqrt(700 / 500))) + Candy._increasedSpeed;
		} 
		else{
			brainIceCream.body.velocity.x = -((500 / (Math.sqrt(700 / 500))) + Candy._increasedSpeed);
		}

		brainIceCream.scale.setTo(1.8, 1.8);
		brainIceCream.checkWorldBounds = true;
		brainIceCream.events.onOutOfBounds.add(this.removeBrainIceCream, this);
		brainIceCream.anchor.setTo(0.5, 0.5);
		brainIceCream.rotating = (Math.random()*4)-2;
		brainIceCream.inputEnabled = true;
		brainIceCream.events.onInputDown.add(this.clickBrainIceCream, this);
		brainIceCream.events.onInputDown.add(function(){
			if (game._mute == false){
				var no = game.add.audio('no');
				// play and set volume
				no.play(null, 0, 0.4, false);
			};
			// Add brain explosion animation
			var explodingBrainIceCream = game.add.sprite(brainIceCream.x-120, brainIceCream.y-100, 'brain-explosion');
			explodingBrainIceCream.scale.setTo(1.5, 1.5);
			explodingBrainIceCream.animations.add('brain-explosion', [0,1,2,3,4,5,6], 10, false);
			explodingBrainIceCream.animations.play('brain-explosion');
			explodingBrainIceCream.events.onAnimationComplete.add(function(){			
				// Reset health level
				Candy._health = 0;		
			}, this);
		}, this);

		// Add brain ice cream to the group
		game._brainIceCreamGroup.add(brainIceCream);
	},

	clickCandy: function(candy){
		// kill the candy when it's clicked
		candy.kill();
		// add points to the score
		Candy._score += 10;
		// Update score text
		Candy._scoreText.setText(Candy._score);
	},

	clickBrainIceCream: function(brainIceCream){
		brainIceCream.kill();
	},

	removeCandy: function(candy){
		// Kill the candy
		candy.kill();
		// Deduct player's health
		Candy._health -= 1;
	},

	removeBrainIceCream: function(brainIceCream){
		brainIceCream.kill();
	}
};