AtomicCrush.Preloader = function(game) {

    this.background = null;
    this.preloadBar = null;
    this.ready = false;

};

AtomicCrush.Preloader.prototype = {
    preload: function() {
        //Preloading
        this.background = this.game.add.sprite(0, 0, 'backG');
        this.background.width = canvasWidth;
        this.background.height = canvasHeight;
        this.preloadBar = this.game.add.sprite(canvasWidth / 4, canvasHeight / 2, 'preloaderBar');

        //Add the sprite images sizes
        this.CREATE_BUTTON_WIDTH = 394;
        this.CREATE_BUTTON_HEIGHT = 80;
        this.LOST_BUTTON_WIDTH = 593 / 2;
        this.LOST_BUTTON_HEIGHT = 81;

        this.game.load.setPreloadSprite(this.preloadBar);


        //Menu
        this.game.load.image('title', 'assets/Home/Title.png');
        this.game.load.image('play', AtomicCrush.language.playButton);
        this.game.load.image('backgroundHome', 'assets/Home/backgroundTitleScreen.png');

        this.game.load.image('highscore_img', AtomicCrush.language.highScoreButton);
        this.game.load.image('about', AtomicCrush.language.aboutButton);
        this.game.load.image('aboutScreen', AtomicCrush.language.aboutScreen);
        this.game.load.spritesheet('backToHomeButton', AtomicCrush.language.backToMenuButton, ABOUT_BUTTON_WIDTH, ABOUT_BUTTON_HEIGHT);
        
        this.game.load.image('en', 'assets/Home/en.jpg');
        this.game.load.image('fr', 'assets/Home/fr.jpg');
        this.game.load.image('es', 'assets/Home/es.jpg');

        //Levels
        this.game.load.image('backgroundLvl1', 'assets/backgrounds/kitchenLevel.png');
        this.game.load.image('backgroundLvl2', 'assets/backgrounds/beachLevel.png');
        this.game.load.image('backgroundLvl3', 'assets/backgrounds/forgeLevel.png');

        this.game.load.image('welcomeLvl1', AtomicCrush.language.welcomeLvl1);
        this.game.load.image('welcomeLvl2', AtomicCrush.language.welcomeLvl2);
        this.game.load.image('welcomeLvl3', AtomicCrush.language.welcomeLvl3);
        this.game.load.text('crystals', 'files/crystals.txt');

        

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
        this.game.load.image('gamePanel', 'assets/panels/gamePanel.png');
        this.game.load.spritesheet('explosion', 'assets/sprites/BlueExplosion.png', 120, 120, 12);
        this.game.load.spritesheet('powerExplosion', 'assets/sprites/RedExplosion.png', 120, 120, 12);

        //ScorePanel
        this.game.load.image('scorePanelBackground', 'assets/panels/scorePanel.png');
        this.game.load.spritesheet('createElement', AtomicCrush.language.createCrystalButton, BUTTONWIDTH, BUTTONHEIGHT);
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
        this.game.load.image('bar', 'assets/bar.png');


        //popUpPanel
        this.game.load.image('PopUpBackground', 'assets/panels/popUpPanel.png');
        this.game.load.image('xButton', 'assets/buttons/xButton.png');
        this.game.load.image('playButton', AtomicCrush.language.playButton);
        
        //Tutorial images
        this.game.load.image('TUTO1', AtomicCrush.language.tuto1);
        this.game.load.image('TUTO2', AtomicCrush.language.tuto2);
        this.game.load.image('TUTO3', AtomicCrush.language.tuto3);
        this.game.load.image('TUTO4', AtomicCrush.language.tuto4);
        this.game.load.image('TUTO5', AtomicCrush.language.tuto5);
        this.game.load.image('TUTO6', AtomicCrush.language.tuto6);
        this.game.load.image('TUTO7', AtomicCrush.language.tuto7);
        this.game.load.image('TUTO8', AtomicCrush.language.tuto8);
        this.game.load.image('TUTO9', AtomicCrush.language.tuto9);
        this.game.load.image('TUTO10', AtomicCrush.language.tuto10);
        this.game.load.image('TUTO11', AtomicCrush.language.tuto11);

        //AlchemyPanel
        this.game.load.image('alchemyPanel', 'assets/panels/alchemyPanel.png');
        this.game.load.image('grid', 'assets/sprites/Grille_2.png');
        this.game.load.spritesheet('createButton2', AtomicCrush.language.createButton, this.CREATE_BUTTON_WIDTH, this.CREATE_BUTTON_HEIGHT);
        this.game.load.image('gridMistake', 'assets/sprites/Grille_Mistake.png');

        //LostPanel
        this.game.load.image('lost', 'assets/backgrounds/lost.png');
        this.game.load.spritesheet('playAgain', AtomicCrush.language.playAgainButton, this.LOST_BUTTON_WIDTH, this.LOST_BUTTON_HEIGHT);
        this.game.load.image('backToMenuIcon', 'assets/buttons/home.png');

        this.game.load.spritesheet('muteIcon', 'assets/buttons/sound.png', 100, 100);

        this.game.load.image('shareFb', 'assets/buttons/share_fb.png');

        //WinPanel
        this.game.load.image('win', 'assets/backgrounds/win.png');
        //TODO Change for the right image
        this.game.load.spritesheet('backToMenu', AtomicCrush.language.backToMenuButton, this.LOST_BUTTON_WIDTH, this.LOST_BUTTON_HEIGHT);
        this.game.load.spritesheet('backToMenu', AtomicCrush.language.backToMenuButton, this.LOST_BUTTON_WIDTH, this.LOST_BUTTON_HEIGHT);
        this.game.load.spritesheet('nextLevel', AtomicCrush.language.nextLevelButton, this.LOST_BUTTON_WIDTH, this.LOST_BUTTON_HEIGHT);

        // RecipesPanel
        this.game.load.image('recipesPanel', 'assets/panels/recipesPanel.png');

        this.game.load.image(SALT + RECIPE, AtomicCrush.language.saltRecipe);
        this.game.load.image(ICE + RECIPE, AtomicCrush.language.iceRecipe);
        this.game.load.image(SUGAR + RECIPE, AtomicCrush.language.sugarRecipe);

        this.game.load.image(SAPPHIRE + RECIPE, AtomicCrush.language.sapphireRecipe);
        this.game.load.image(QUARTZ + RECIPE, AtomicCrush.language.quartzRecipe);
        this.game.load.image(RUBY + RECIPE, AtomicCrush.language.rubyRecipe);
        this.game.load.image(CORUNDUM + RECIPE, AtomicCrush.language.corondumRecipe);

        this.game.load.image(ALUMINIUM + RECIPE, AtomicCrush.language.aluminiumRecipe);
        this.game.load.image(BRASS + RECIPE, AtomicCrush.language.brassRecipe);
        this.game.load.image(STEEL + RECIPE, AtomicCrush.language.steelRecipe);
        this.game.load.image(GOLD + RECIPE, AtomicCrush.language.goldRecipe);

        this.game.load.image(SALT + INFO, AtomicCrush.language.saltInfo);
        this.game.load.image(ICE + INFO, AtomicCrush.language.iceInfo);
        this.game.load.image(SUGAR + INFO, AtomicCrush.language.sugarInfo);

        this.game.load.image(SAPPHIRE + INFO, AtomicCrush.language.sapphireInfo);
        this.game.load.image(QUARTZ + INFO, AtomicCrush.language.quartzInfo);
        this.game.load.image(RUBY + INFO, AtomicCrush.language.rubyInfo);
        this.game.load.image(CORUNDUM + INFO, AtomicCrush.language.corondumInfo);

        this.game.load.image(ALUMINIUM + INFO, AtomicCrush.language.aluminiumInfo);
        this.game.load.image(BRASS + INFO, AtomicCrush.language.brassInfo);
        this.game.load.image(STEEL + INFO, AtomicCrush.language.steelInfo);
        this.game.load.image(GOLD + INFO, AtomicCrush.language.goldInfo);

        //Audio
        this.game.load.audio('ambientMusic', AtomicCrush.audio.ambientMusic);
        this.game.load.audio('matchSound', AtomicCrush.audio.matchSound);
        this.game.load.audio('elementCreatedSound', AtomicCrush.audio.elementCreatedSound);
        this.game.load.audio('createMistakeSound', AtomicCrush.audio.createMistakeSound);
        this.game.load.audio('winSound', AtomicCrush.audio.winSound);
        this.game.load.audio('lostSound', AtomicCrush.audio.lostSound);
        this.game.load.audio('powerASound', AtomicCrush.audio.powerASound);
        this.game.load.audio('powerBSound', AtomicCrush.audio.powerBSound);
        this.game.load.audio('powerCSound', AtomicCrush.audio.powerCSound);
        this.game.load.audio('powerDSound', AtomicCrush.audio.powerDSound);

    },
    create: function() {
        this.state.start('home');
    },
    update: function() {
    }

};
