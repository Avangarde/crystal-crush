CrystalCrush = {
//    score: 0,
//    music: null,
//    orientated: false
    language: null
};

CrystalCrush.Boot = function (game) {
    this.game = game;
};

CrystalCrush.Boot.prototype = {

    preload: function () {
        this.game.load.image('preloaderBar', 'assets/preload.png');
        this.game.load.image('backG', 'assets/splash.png');
    },

    create: function () {
        this.game.input.maxPointers = 1;

        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.minWidth = 320;
        this.game.scale.minHeight = 200;
        this.game.scale.maxWidth = canvasWidth;
        this.game.scale.maxHeight = canvasHeight;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.setScreenSize(true);
        if (!this.game.device.desktop) {
            this.game.scale.forceOrientation(true, false);
        }
        CrystalCrush.language = new Language.English();
        game.state.start('preloader');
    },

    gameResized: function (width, height) {
    },

    enterIncorrectOrientation: function () {
    },

    leaveIncorrectOrientation: function () {
    }

};
