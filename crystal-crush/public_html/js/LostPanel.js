var LOST_MENU_WIDTH = 1500;
var LOST_MENU_HEIGHT = 751;
var LOST_BUTTON_WIDTH = 593 / 2;
var LOST_BUTTON_HEIGHT = 81;


LostPanel = function(game) {
    this.game = game;
    this.buttonPlayAgain;
    this.lostMenu;
    this.score_txt;
    this.highScore_txt;
};

LostPanel.prototype = {
    preload: function() {
        lostMenu = this.game.load.image('lost', 'assets/lost.png');
        game.load.spritesheet('playAgain', 'assets/buttons/play_again.png', LOST_BUTTON_WIDTH, LOST_BUTTON_HEIGHT);
    },
    create: function() {
    },
    update: function() {
    },
    lost: function() {
        if (numMoves === 0 || (noPowers() && noMoves())) {
            drawBackground();
            drawButton();
            drawScore();
            drawHighScore();
            localStorage.setItem("highScore", scorePanel.highScore);
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
    var buttonWidth = canvasWidth * 0.15;
    var buttonHeight = buttonWidth * LOST_BUTTON_HEIGHT / LOST_BUTTON_WIDTH;
    buttonPlayAgain = game.add.button(canvasWidth / 2, canvasHeight / 2, 'playAgain', actionOnClick(), this, 1, 0, 0);
    buttonPlayAgain.anchor.setTo(0.5, 0.5);
    buttonPlayAgain.height = buttonHeight;
    buttonPlayAgain.width = buttonWidth;
}

function drawScore() {
    this.score_txt = game.add.text(canvasWidth / 2, buttonPlayAgain.y + buttonPlayAgain.height + margin, 'Your Score : ' + scorePanel.score_general, style1);
    this.score_txt.anchor.setTo(0.5, 0.5);

}
function drawHighScore() {
    if (scorePanel.score_general === scorePanel.highScore) {
        this.highScore_txt = game.add.text(canvasWidth / 2, this.score_txt.y + this.score_txt.height + margin, 'New High Score !', style1);
        this.highScore_txt.anchor.setTo(0.5, 0.5);
    }
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
