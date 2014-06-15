
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
	this.preloadBar = this.game.add.sprite(canvasWidth/4, canvasHeight/2, 'preloaderBar');        
	//this.preloadBar.width = canvasWidth/2;
	//this.preloadBar.height = canvasHeight/20;       
                

	this.game.load.setPreloadSprite(this.preloadBar);

        
        //Menu
        this.game.load.image('title', 'assets/Home/Title.png');
        this.game.load.image('play', CrystalCrush.language.playButton);
        this.game.load.image('backgroundHome', 'assets/Home/backgroundTitleScreen.png');

        this.game.load.image('highscore_img', CrystalCrush.language.highScoreButton);
        this.game.load.image('about', CrystalCrush.language.aboutButton);
        
        this.game.load.image('backgroundLvl1', 'assets/kitchenLevel.png');
        this.game.load.image('backgroundLvl2', 'assets/beachLevel.png');
        this.game.load.text('crystals', 'files/crystals.txt');
        this.game.load.text('highScore', 'files/highScore');
        
        this.game.load.image('en', 'assets/Home/en.jpg');
        this.game.load.image('fr', 'assets/Home/fr.jpg');
        this.game.load.image('es', 'assets/Home/es.jpg');
        
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
	this.game.load.image(AU, 'assets/sprites/Au.png');
	this.game.load.image(FE, 'assets/sprites/Fe.png');
        this.game.load.image(SELECT, 'assets/sprites/selection.png');     
        this.game.load.image(SELECTHINT, 'assets/sprites/selectionHint.png');     
        this.game.load.image('gamePanel', 'assets/gamePanel.png');
        
        //ScorePanel
        this.game.load.image('scorePanelBackground', 'assets/scorePanel.png');
        this.game.load.spritesheet('createElement', CrystalCrush.language.createCrystalButton, BUTTONWIDTH, BUTTONHEIGHT);
        this.game.load.image('camera', 'assets/camera.png');
        this.game.load.image(SALT, 'assets/sprites/salt_crystal.png');
        this.game.load.image(ICE, 'assets/sprites/ice.png');
        this.game.load.image(SUGAR, 'assets/sprites/sugar_crystal.png');
        this.game.load.image(CORUNDUM, 'assets/sprites/VioletPower.png');
        this.game.load.image(SAPPHIRE, 'assets/sprites/sapphire.png');
        this.game.load.image(RUBY, 'assets/sprites/ruby.png');
        this.game.load.image(QUARTZ, 'assets/sprites/quartz_crystal.png');
	this.game.load.image(BRASS, 'assets/sprites/brass.png');
	this.game.load.image(STEEL, 'assets/sprites/steel.png');
	this.game.load.image(GOLD, 'assets/sprites/gold.png');
	this.game.load.image(ALUMINIUM, 'assets/sprites/aluminium.png');
                
        
        //popUpPanel
        this.game.load.image('PopUpBackground', 'assets/popUpPanel.png');
        this.game.load.image('xButton', 'assets/buttons/xButton.png');
        this.game.load.image('playButton', CrystalCrush.language.playButton);
        
        //AlchemyPanel
        this.game.load.image('alchemyPanel', 'assets/alchemyPanel.png');
        this.game.load.image('grid', 'assets/sprites/Grille_2.png');
        this.game.load.spritesheet('createButton2', CrystalCrush.language.createButton, CREATE_BUTTON_WIDTH, CREATE_BUTTON_HEIGHT);
	this.game.load.image('gridMistake','assets/sprites/Grille_Mistake.png');

        //LostPanel
        this.game.load.image('lost', 'assets/lost.png');
        this.game.load.spritesheet('playAgain', CrystalCrush.language.playAgainButton, LOST_BUTTON_WIDTH, LOST_BUTTON_HEIGHT);
        this.game.load.spritesheet('shareFb', 'assets/buttons/share_fb.png', SHAREFB_BUTTON_DIM, SHAREFB_BUTTON_DIM);
        
        //WinPanel
        this.game.load.image('win', 'assets/win.png');      
        //TODO Change for the right image
        this.game.load.spritesheet('backToMenu', 'assets/buttons/back_to_menu.png', LOST_BUTTON_WIDTH, LOST_BUTTON_HEIGHT);        
        this.game.load.spritesheet('nextLevel', CrystalCrush.language.nextLevelButton, LOST_BUTTON_WIDTH, LOST_BUTTON_HEIGHT);        
        
        // RecipesPanel
        this.game.load.image('recipesPanel', 'assets/recipesPanel.png');

        this.game.load.image('salt','assets/buttons/salt_crystal_button_en.png');
        this.game.load.image('ice','assets/buttons/ice_crystal_button_en.png');
        this.game.load.image('sugar','assets/buttons/sugar_crystal_button_en.png');

        this.game.load.image('sapphire','assets/buttons/sapphire_crystal_button_en.png');
        this.game.load.image('quartz','assets/buttons/quartz_crystal_button_en.png');
        this.game.load.image('ruby','assets/buttons/ruby_crystal_button_en.png');
        this.game.load.image('corondum','assets/buttons/corondum_crystal_button_en.png');

        this.game.load.image('aluminium','assets/buttons/aluminium_crystal_button_en.png');
        this.game.load.image('brass','assets/buttons/brass_crystal_button_en.png');
        this.game.load.image('steel','assets/buttons/steel_crystal_button_en.png');

    },
    create: function() {
        this.state.start('home');
    },
    update: function() {
    }

};
