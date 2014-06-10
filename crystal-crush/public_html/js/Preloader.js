
CrystalCrush.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;
	this.ready = false;

};

CrystalCrush.Preloader.prototype = {
    preload: function() {
        //Preloading
        this.background = this.game.add.sprite(0, 0, 'backG');
        this.background.width = canvasWidth;
        this.background.height = canvasHeight;        
        this.preloadBar = this.game.add.sprite(canvasWidth/2, canvasHeight/2, 'preloaderBar');        
        this.game.load.setPreloadSprite(this.preloadBar);
        
        //Menu
        this.game.load.image('title', 'assets/Home/Title.png');
        this.game.load.image('lvl1', 'assets/Home/lvl1.png');
        this.game.load.image('lvl2', 'assets/Home/lvl2.png');
        this.game.load.image('lvl3', 'assets/Home/lvl3.png');

        this.game.load.image('backgroundHome', 'assets/Home/backgroundTitleScreen.png');

        this.game.load.image('highscore_img', 'assets/Home/highscore.png');
        this.game.load.image('about', 'assets/Home/about.png');
        
        this.game.load.image('background', 'assets/background.png');
        this.game.load.text('crystals', 'files/crystals.txt');
        this.game.load.text('highScore', 'files/highScore');
        
        //GamePanel
        this.game.load.image(CU, 'assets/sprites/Cu.png');
        this.game.load.image(ZN, 'assets/sprites/Zn.png');
        this.game.load.image(NA, 'assets/sprites/Na.png');
        this.game.load.image(CL, 'assets/sprites/Cl.png');
        this.game.load.image(A, 'assets/sprites/A.png');
        this.game.load.image(B, 'assets/sprites/B.png');
        this.game.load.image(SELECT, 'assets/sprites/selection.png');        
        this.game.load.image('gamePanel', 'assets/gamePanel.png');
        
        //ScorePanel
        this.game.load.image('scorePanelBackground', 'assets/scorePanel.png');
        this.game.load.spritesheet('createElement', 'assets/buttons/button_create_element.png', BUTTONWIDTH, BUTTONHEIGHT);
        this.game.load.image('camera', 'assets/camera.png');
        this.game.load.image('PowerA', 'assets/sprites/BluePower.png');
        this.game.load.image('PowerB', 'assets/sprites/VioletPower.png');
        this.game.load.image('PowerC', 'assets/sprites/GreenPower.png');
        
        //AlchemyPanel
        this.game.load.image('alchemyPanel', 'assets/alchemyPanel.png');
        this.game.load.image('grid', 'assets/sprites/Grille_2.png');
        this.game.load.spritesheet('createButton2', 'assets/buttons/button_create.png', CREATE_BUTTON_WIDTH, CREATE_BUTTON_HEIGHT);

        //LostPanel
        this.game.load.image('lost', 'assets/lost.png');
        this.game.load.spritesheet('playAgain', 'assets/buttons/play_again.png', LOST_BUTTON_WIDTH, LOST_BUTTON_HEIGHT);        
        
    },
    create: function() {
        this.state.start('home');
    },
    update: function() {
    }

};
