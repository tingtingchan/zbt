Candy.MainMenu = function(game){

    this._scrolling_background = null;
    this._zombie = null;
    this._start_button = null;
    this._title = null;
    
};

Candy.MainMenu.prototype = {

    create: function(){

        // Display images
        this._scrolling_background = this.add.tileSprite(0, 0, 640, 960, 'scrolling-background');
        this._zombie = this.add.sprite(-100, Candy.worldHeight-400, 'zombie');
        this._zombie.scale.setTo(0.45, 0.45);
        this._highscore = this.add.sprite(10, 0, 'highscore');
        this._highscore.scale.setTo(0.5, 0.5);

        // Play theme music
        this.game.audio = {};
        this.game.audio.theme_music = this.game.add.audio('theme-music');
        this.game.audio.theme_music.loopFull(0.6);

        // Add click sound
        if (this.game.muteStatus == false){ 
            this._sound_button = this.add.button(Candy.worldWidth-73-50, 66-40, 'button-sound', this.mute, this, 1, 0, 2);
            this._sound_button.scale.setTo(1.3, 1.3);
        } else{
            this.game.audio.theme_music.mute = true;
            this._sound_button = this.add.button(Candy.worldWidth-73-50, 66-40, 'button-sound', this.mute, this, 1, 0, 2);
            this._sound_button.scale.setTo(1.3, 1.3);
            this._mute_button = this.add.button(Candy.worldWidth-73-50, 66-40, 'button-sound', this.unmute, this, 2, 2, 0);
            this._mute_button.scale.setTo(1.3, 1.3);
        };

        // Add logo
        this._logo = this.add.sprite((Candy.worldWidth-395)/2+100, 160, 'logo');
        this._logo.scale.setTo(1.3, 1.3);

        // Start the game by clicking the button
        this._start_button = this.add.button(Candy.worldWidth-401+60, Candy.worldHeight-160, 'button-start', this.startGame, this, 1, 0, 2);
        this._start_button.scale.setTo(0.75, 0.75);

        // Using HTML Local Storage to get highscore record
        storageAPI.initUnset('ZBT-highscore', 0);
        var highscore = storageAPI.get('ZBT-highscore') || 0;
        var fontHighscore = { font: "36px Arial", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" };
        this.add.text(130, 85, highscore, fontHighscore);
        
        // Click the button to HowToPlay state
        this._tutorial_button = this.add.button(Candy.worldWidth-401+80, Candy.worldHeight-280, 'button-tutorial', this.howToPlay, this, 1, 0);
        this._tutorial_button.scale.setTo(0.625, 0.625);
    },

    mute: function(){
        this.game.muteStatus = true;
        if (this.game.muteStatus == true){
            this.game.audio.theme_music.mute = true;
            this._mute_button = this.add.button(Candy.worldWidth-73-50, 66-40, 'button-sound', this.unmute, this, 2, 2, 0);
            this._mute_button.scale.setTo(1.3, 1.3);
        };
    },

    unmute: function(){
        this._mute_button.destroy();
        this.game.audio.theme_music.mute = false;
        this.game.muteStatus = false;
        if (this.game.muteStatus == false){
            this._sound_button = this.add.button(Candy.worldWidth-73-50, 66-40, 'button-sound', this.mute, this, 1, 0, 2);
            this._sound_button.scale.setTo(1.3, 1.3);
        };
    },

    howToPlay: function(){
        if (this.game.muteStatus == false){
            click = this.game.add.audio('click');
            click.play(null, 0, 0.4, false);
        }
        this.state.start('HowToPlay');   
    },

    startGame: function(){
        if (this.game.muteStatus == false){
            click = this.game.add.audio('click');
            click.play(null, 0, 0.4, false);
        }
        this.state.start('Story');
    },

    update: function(){
        //  Scroll the background
        this._scrolling_background.tilePosition.x += 0.2;
    }
};
