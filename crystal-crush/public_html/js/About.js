var ABOUT_BUTTON_WIDTH = 593 / 2;
var ABOUT_BUTTON_HEIGHT = 81;
//var SHAREFB_BUTTON_DIM = 256;


AtomicCrush.About = function(game) {
    this.game = game;
    this.background;    
    this.buttonBackToHome;
};

AtomicCrush.About.prototype = {
    create: function() {
        //BackGround
        this.background = game.add.sprite(0, 0, 'aboutScreen');
        //this.winMenu.anchor.setTo(0.5, 0.5);
        this.background.width = canvasWidth;
        this.background.height = canvasHeight;
            
        //Buttons
              

	var buttonWidth = canvasWidth * 0.15;
	var buttonHeight = buttonWidth * ABOUT_BUTTON_HEIGHT / ABOUT_BUTTON_WIDTH;
        this.buttonBackToHome = game.add.button(canvasWidth/12, 4*canvasHeight/5, 'backToHomeButton', this.backToMenu, this, 1, 0, 0);
        //this.buttonBackToHome.anchor.setTo(0.5, 0.5);
        this.buttonBackToHome.height = ABOUT_BUTTON_HEIGHT;
        this.buttonBackToHome.width = ABOUT_BUTTON_WIDTH;
    },
    update: function() {
    },
    backToMenu: function() {
        this.game.state.start('home');
    }
};
