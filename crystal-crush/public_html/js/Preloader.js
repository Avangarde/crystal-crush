CrystalCrush.Preloader = function(game) {

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
        this.preloadBar = this.game.add.sprite(canvasWidth / 4, canvasHeight / 2, 'preloaderBar');

        //Add the sprite images sizes
        this.CREATE_BUTTON_WIDTH = 394;
        this.CREATE_BUTTON_HEIGHT = 80;
        this.LOST_BUTTON_WIDTH = 593 / 2;
        this.LOST_BUTTON_HEIGHT = 81;

        this.game.load.setPreloadSprite(this.preloadBar);


        //Menu
        this.game.load.image('title', 'assets/Home/Title.png');
        this.game.load.image('play', CrystalCrush.language.playButton);
        this.game.load.image('backgroundHome', 'assets/Home/backgroundTitleScreen.png');

        this.game.load.image('highscore_img', CrystalCrush.language.highScoreButton);
        this.game.load.image('about', CrystalCrush.language.aboutButton);
        this.game.load.image('aboutScreen', CrystalCrush.language.aboutScreen);
        this.game.load.spritesheet('backToHomeButton', CrystalCrush.language.backToMenuButton, ABOUT_BUTTON_WIDTH, ABOUT_BUTTON_HEIGHT);

        this.game.load.image('backgroundLvl1', 'assets/backgrounds/kitchenLevel.png');
        this.game.load.image('backgroundLvl2', 'assets/backgrounds/beachLevel.png');
        this.game.load.image('backgroundLvl3', 'assets/backgrounds/forgeLevel.png');

        this.game.load.image('welcomeLvl1', CrystalCrush.language.welcomeLvl1);
        this.game.load.image('welcomeLvl2', CrystalCrush.language.welcomeLvl2);
        this.game.load.image('welcomeLvl3', CrystalCrush.language.welcomeLvl3);
        this.game.load.text('crystals', 'files/crystals.txt');

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
        this.game.load.image('gamePanel', 'assets/panels/gamePanel.png');
        this.game.load.spritesheet('explosion', 'assets/sprites/BlueExplosion.png', 120, 120, 12);
        this.game.load.spritesheet('powerExplosion', 'assets/sprites/RedExplosion.png', 120, 120, 12);

        //ScorePanel
        this.game.load.image('scorePanelBackground', 'assets/panels/scorePanel.png');
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
        this.game.load.image('bar', 'assets/bar.png');


        //popUpPanel
        this.game.load.image('PopUpBackground', 'assets/panels/popUpPanel.png');
        this.game.load.image('xButton', 'assets/buttons/xButton.png');
        this.game.load.image('playButton', CrystalCrush.language.playButton);
        
        //Tutorial images
        this.game.load.image('TUTO1', CrystalCrush.language.tuto1);
        this.game.load.image('TUTO2', CrystalCrush.language.tuto2);
        this.game.load.image('TUTO3', CrystalCrush.language.tuto3);
        this.game.load.image('TUTO4', CrystalCrush.language.tuto4);
        this.game.load.image('TUTO5', CrystalCrush.language.tuto5);
        this.game.load.image('TUTO6', CrystalCrush.language.tuto6);
        this.game.load.image('TUTO7', CrystalCrush.language.tuto7);
        this.game.load.image('TUTO8', CrystalCrush.language.tuto8);
        this.game.load.image('TUTO9', CrystalCrush.language.tuto9);
        this.game.load.image('TUTO10', CrystalCrush.language.tuto10);
        this.game.load.image('TUTO11', CrystalCrush.language.tuto11);

        //AlchemyPanel
        this.game.load.image('alchemyPanel', 'assets/panels/alchemyPanel.png');
        this.game.load.image('grid', 'assets/sprites/Grille_2.png');
        this.game.load.spritesheet('createButton2', CrystalCrush.language.createButton, this.CREATE_BUTTON_WIDTH, this.CREATE_BUTTON_HEIGHT);
        this.game.load.image('gridMistake', 'assets/sprites/Grille_Mistake.png');

        //LostPanel
        this.game.load.image('lost', 'assets/backgrounds/lost.png');
        this.game.load.spritesheet('playAgain', CrystalCrush.language.playAgainButton, this.LOST_BUTTON_WIDTH, this.LOST_BUTTON_HEIGHT);
        this.game.load.image('backToMenuIcon', 'assets/buttons/home.png');

        this.game.load.spritesheet('muteIcon', 'assets/buttons/sound.png', 100, 100);

        this.game.load.image('shareFb', 'assets/buttons/share_fb.png');

        //WinPanel
        this.game.load.image('win', 'assets/backgrounds/win.png');
        //TODO Change for the right image
        this.game.load.spritesheet('backToMenu', CrystalCrush.language.backToMenuButton, this.LOST_BUTTON_WIDTH, this.LOST_BUTTON_HEIGHT);
        this.game.load.spritesheet('backToMenu', CrystalCrush.language.backToMenuButton, this.LOST_BUTTON_WIDTH, this.LOST_BUTTON_HEIGHT);
        this.game.load.spritesheet('nextLevel', CrystalCrush.language.nextLevelButton, this.LOST_BUTTON_WIDTH, this.LOST_BUTTON_HEIGHT);

        // RecipesPanel
        this.game.load.image('recipesPanel', 'assets/panels/recipesPanel.png');

        this.game.load.image(SALT + RECIPE, CrystalCrush.language.saltRecipe);
        this.game.load.image(ICE + RECIPE, CrystalCrush.language.iceRecipe);
        this.game.load.image(SUGAR + RECIPE, CrystalCrush.language.sugarRecipe);

        this.game.load.image(SAPPHIRE + RECIPE, CrystalCrush.language.sapphireRecipe);
        this.game.load.image(QUARTZ + RECIPE, CrystalCrush.language.quartzRecipe);
        this.game.load.image(RUBY + RECIPE, CrystalCrush.language.rubyRecipe);
        this.game.load.image(CORUNDUM + RECIPE, CrystalCrush.language.corondumRecipe);

        this.game.load.image(ALUMINIUM + RECIPE, CrystalCrush.language.aluminiumRecipe);
        this.game.load.image(BRASS + RECIPE, CrystalCrush.language.brassRecipe);
        this.game.load.image(STEEL + RECIPE, CrystalCrush.language.steelRecipe);
        this.game.load.image(GOLD + RECIPE, CrystalCrush.language.goldRecipe);

        this.game.load.image(SALT + INFO, CrystalCrush.language.saltInfo);
        this.game.load.image(ICE + INFO, CrystalCrush.language.iceInfo);
        this.game.load.image(SUGAR + INFO, CrystalCrush.language.sugarInfo);

        this.game.load.image(SAPPHIRE + INFO, CrystalCrush.language.sapphireInfo);
        this.game.load.image(QUARTZ + INFO, CrystalCrush.language.quartzInfo);
        this.game.load.image(RUBY + INFO, CrystalCrush.language.rubyInfo);
        this.game.load.image(CORUNDUM + INFO, CrystalCrush.language.corondumInfo);

        this.game.load.image(ALUMINIUM + INFO, CrystalCrush.language.aluminiumInfo);
        this.game.load.image(BRASS + INFO, CrystalCrush.language.brassInfo);
        this.game.load.image(STEEL + INFO, CrystalCrush.language.steelInfo);
        this.game.load.image(GOLD + INFO, CrystalCrush.language.goldInfo);

        //Audio
        this.game.load.audio('ambientMusic', CrystalCrush.audio.ambientMusic);
        this.game.load.audio('matchSound', CrystalCrush.audio.matchSound);
        this.game.load.audio('elementCreatedSound', CrystalCrush.audio.elementCreatedSound);
        this.game.load.audio('createMistakeSound', CrystalCrush.audio.createMistakeSound);
        this.game.load.audio('winSound', CrystalCrush.audio.winSound);
        this.game.load.audio('lostSound', CrystalCrush.audio.lostSound);
        this.game.load.audio('powerASound', CrystalCrush.audio.powerASound);
        this.game.load.audio('powerBSound', CrystalCrush.audio.powerBSound);
        this.game.load.audio('powerCSound', CrystalCrush.audio.powerCSound);
        this.game.load.audio('powerDSound', CrystalCrush.audio.powerDSound);

    },
    create: function() {
        this.state.start('home');
    },
    update: function() {
    }

};
