
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
        
        this.game.load.image('backgroundLvl1', 'assets/kitchenLevel.png');
        this.game.load.image('backgroundLvl2', 'assets/beachLevel.png');
        this.game.load.text('crystals', 'files/crystals.txt');
        this.game.load.text('highScore', 'files/highScore');
        
        //GamePanel
        this.game.load.image(CU, 'assets/sprites/Cu.png');
        this.game.load.image(ZN, 'assets/sprites/Zn.png');
        this.game.load.image(NA, 'assets/sprites/Na.png');
        this.game.load.image(CL, 'assets/sprites/Cl.png');
        this.game.load.image(C, 'assets/sprites/C.png');
        this.game.load.image(H, 'assets/sprites/H.png');
        this.game.load.image(O, 'assets/sprites/O.png');
        this.game.load.image(AL, 'assets/sprites/Al.png');
        this.game.load.image(CR, 'assets/sprites/Cr.png');
        this.game.load.image(SI, 'assets/sprites/Si.png');
        this.game.load.image(TI, 'assets/sprites/Ti.png');
        this.game.load.image(SELECT, 'assets/sprites/selection.png');     
        this.game.load.image(SELECTHINT, 'assets/sprites/selectionHint.png');     
        this.game.load.image('gamePanel', 'assets/gamePanel.png');
        
        //ScorePanel
        this.game.load.image('scorePanelBackground', 'assets/scorePanel.png');
        this.game.load.spritesheet('createElement', 'assets/buttons/button_create_element.png', BUTTONWIDTH, BUTTONHEIGHT);
        this.game.load.image('camera', 'assets/camera.png');
        this.game.load.image(SALT, 'assets/sprites/salt_crystal.png');
        this.game.load.image(ICE, 'assets/sprites/ice.png');
        this.game.load.image(SUGAR, 'assets/sprites/sugar_crystal.png');
        this.game.load.image(CORUNDUM, 'assets/sprites/VioletPower.png');
        this.game.load.image(SAPPHIRE, 'assets/sprites/sapphire.png');
        this.game.load.image(RUBY, 'assets/sprites/ruby.png');
        this.game.load.image(QUARTZ, 'assets/sprites/quartz_crystal.png');        
        
        //popUpPanel
        this.game.load.image('PopUpBackground', 'assets/popUpPanel.png');
        this.game.load.image('xButton', 'assets/buttons/xButton.png');
        this.game.load.image('playButton', 'assets/Home/lvl1.png');
        
        //AlchemyPanel
        this.game.load.image('alchemyPanel', 'assets/alchemyPanel.png');
        this.game.load.image('grid', 'assets/sprites/Grille_2.png');
        this.game.load.spritesheet('createButton2', 'assets/buttons/button_create.png', CREATE_BUTTON_WIDTH, CREATE_BUTTON_HEIGHT);
	this.game.load.image('gridMistake','assets/sprites/Grille_Mistake.png');

        //LostPanel
        this.game.load.image('lost', 'assets/lost.png');
        this.game.load.spritesheet('playAgain', 'assets/buttons/play_again.png', LOST_BUTTON_WIDTH, LOST_BUTTON_HEIGHT);
        this.game.load.spritesheet('shareFb', 'assets/buttons/share_fb.png', SHAREFB_BUTTON_DIM, SHAREFB_BUTTON_DIM);
        
        //WinPanel
        this.game.load.image('win', 'assets/win.png');
        this.game.load.spritesheet('nextLevel', 'assets/buttons/next_level.png', LOST_BUTTON_WIDTH, LOST_BUTTON_HEIGHT);        
        
    },
    create: function() {
        this.state.start('home');
    },
    update: function() {
    }

};
