var LOST_MENU_WIDTH = 1500;
var LOST_MENU_HEIGHT = 751;
var LOST_BUTTON_WIDTH = 593;
var LOST_BUTTON_HEIGHT = 81;
var lostMenu;
var buttonPlayAgain;

LostPanel = function(game) {
    this.game = game;
};

LostPanel.prototype = {
    preload: function() {
        lostMenu = this.game.load.image('lost', 'assets/lost.png');
        game.load.spritesheet('playAgain', 'assets/buttons/play_again.png', LOST_BUTTON_WIDTH / 2, LOST_BUTTON_HEIGHT);
    },
    create: function() {

    },
    update: function() {
    },
    lost: function() {
        if (numMoves === 0 || (noPowers() && noMoves())) {
            drawBackground();
            drawButton();
            game.paused = true;
            game.input.onDown.add(unpause, self);
        }
    }
};

function drawBackground() {
    lostMenu = game.add.sprite(canvasWidth / 2, canvasHeight / 2, 'lost');
    lostMenu.anchor.setTo(0.5, 0.5);
    lostMenu.width = canvasWidth;
    lostMenu.height = canvasWidth * LOST_MENU_HEIGHT / LOST_MENU_WIDTH;
}

function drawButton() {
    //TODO make responsive
//    var buttonWidth = lostMenu.width - 2 * margin;
//    var buttonHeight = buttonWidth * LOST_BUTTON_HEIGHT / LOST_BUTTON_WIDTH;
    buttonPlayAgain = game.add.button(canvasWidth / 2, canvasHeight / 2, 'playAgain', actionOnClick(), this, 1, 0, 0);
    buttonPlayAgain.anchor.setTo(0.5, 0.5);
//    buttonPlayAgain.height = buttonHeight;
//    buttonPlayAgain.width = buttonWidth;
}

function actionOnClick() {
    window.location.reload();
}

function unpause(event) {
        // Calculate the corners of the menu
        var x1 = buttonPlayAgain.x - buttonPlayAgain.width / 2;
        var x2 = buttonPlayAgain.x + buttonPlayAgain.width / 2;
        var y1 = buttonPlayAgain.y - buttonPlayAgain.height / 2;
        var y2 = buttonPlayAgain.y + buttonPlayAgain.height / 2;

        if (event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2) {
            window.location.reload();
        }
}