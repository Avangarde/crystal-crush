var LOST_MENU_WIDTH = 1500;
var LOST_MENU_HEIGHT = 751;
var lostMenu;

LostPanel = function(game) {
    this.game = game;
};

LostPanel.prototype = {
    preload: function() {
        lostMenu = this.game.load.image('lost', 'assets/lost.png');
    },
    create: function() {
    },
    update: function() {
    }, 
    lost: function() {
        if (numMoves === 0 || (noPowers() && noMoves())) {
            lostMenu = game.add.sprite(canvasWidth / 2, canvasHeight / 2, 'lost');
            lostMenu.anchor.setTo(0.5, 0.5);
            lostMenu.width = canvasWidth;
            lostMenu.height = canvasWidth * LOST_MENU_HEIGHT / LOST_MENU_WIDTH;
            game.paused = true;
        }
    }
};
