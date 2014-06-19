AtomicCrush = {
    audio: null,
    language: null
};

AtomicCrush.Boot = function (game) {
    this.game = game;
};

AtomicCrush.Boot.prototype = {

    preload: function () {
        this.game.load.image('preloaderBar', 'assets/preload.png');
        this.game.load.image('backG', 'assets/backgrounds/splash.png');
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
        AtomicCrush.language = new Language.English();
        AtomicCrush.audio = new Audio();
        game.state.start('preloader');
    },

    gameResized: function (width, height) {
    },

    enterIncorrectOrientation: function () {
    },

    leaveIncorrectOrientation: function () {
    }

};
