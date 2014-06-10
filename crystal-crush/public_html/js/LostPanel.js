var LOST_MENU_WIDTH = 1500;
var LOST_MENU_HEIGHT = 751;
var LOST_BUTTON_WIDTH = 593 / 2;
var LOST_BUTTON_HEIGHT = 81;
var SHAREFB_BUTTON_DIM = 256;


LostPanel = function(game) {
    this.game = game;
    this.buttonPlayAgain;
    this.buttonShareFb;
    this.lostMenu;
    this.score_txt;
    this.highScore_txt;
};

LostPanel.prototype = {
    preload: function() {
        this.game.load.image('lost', 'assets/lost.png');
        game.load.spritesheet('playAgain', 'assets/buttons/play_again.png', LOST_BUTTON_WIDTH, LOST_BUTTON_HEIGHT);
        game.load.spritesheet('shareFb', 'assets/buttons/share_fb.png', SHAREFB_BUTTON_DIM, SHAREFB_BUTTON_DIM);
    },
    create: function() {
    },
    update: function() {
    },
    lost: function() {
        if (this.game.numMoves === 0) {
            drawBackground();
            drawButtonPlayAgain();
            drawButtonShare();
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

function drawButtonPlayAgain() {
    var buttonWidth = canvasWidth * 0.15;
    var buttonHeight = buttonWidth * LOST_BUTTON_HEIGHT / LOST_BUTTON_WIDTH;
    buttonPlayAgain = game.add.button(canvasWidth / 2, canvasHeight / 2, 'playAgain', null, this, 1, 0, 0);
    buttonPlayAgain.anchor.setTo(0.5, 0.5);
    buttonPlayAgain.height = buttonHeight;
    buttonPlayAgain.width = buttonWidth;
}

function drawButtonShare() {
    var buttonDim = canvasWidth * 0.05;
    buttonShareFb = game.add.button(canvasWidth / 2, canvasHeight / 2 + margin + buttonPlayAgain.height, 'shareFb', null, this, 1, 0, 0);
    buttonShareFb.anchor.setTo(0.5, 0.5);
    buttonShareFb.height = buttonDim;
    buttonShareFb.width = buttonDim;
}

function drawScore() {
    this.score_txt = game.add.text(canvasWidth / 2, buttonShareFb.y + buttonShareFb.height + margin, 'Your Score : ' + scorePanel.score_general, style1);
    this.score_txt.anchor.setTo(0.5, 0.5);

}
function drawHighScore() {
    if (scorePanel.score_general === scorePanel.highScore) {
        this.highScore_txt = game.add.text(canvasWidth / 2, this.score_txt.y + this.score_txt.height + margin, 'New High Score !', style1);
        this.highScore_txt.anchor.setTo(0.5, 0.5);
    }
}

function unpause(event) {
    // Calculate the corners of the menus
    var bPlayBorders = getButtonBorders(buttonPlayAgain);
    var bShareBorders = getButtonBorders(buttonShareFb);

    var message = scorePanel.score_general === scorePanel.highScore ?
            "I got" + scorePanel.score_general + ", a new high score in #CandyCrush, try to beat me !" :
            "I got " + scorePanel.score_general
            + " points in #CandyCrush, try to beat me!"

    if (event.x > bPlayBorders[0] && event.x < bPlayBorders[1] && event.y > bPlayBorders[2] && event.y < bPlayBorders[3]) {
        //TODO Uncomment when global variables = 0
        //        game.paused = false;
        //        game.state.start('lvl1', CrystalCrush.Lvl1);
        //TODO Delete when global variables = 0
        window.location.reload();

    } else if (event.x > bShareBorders[0] && event.x < bShareBorders[1] && event.y > bShareBorders[2] && event.y < bShareBorders[3]) {
        FB.ui({
            method: 'feed',
            name: 'Crystal Crush',
            caption: 'Match-crystal puzzle video game for web and mobile devices',
            description: (
                    message
                    ),
            link: 'http://avangarde.github.io/crystal-crush/crystal-crush.html',
            picture: 'http://www.hartrao.ac.za/nccs/Esrf.gif'
        })
    }
}
/**
 * Calcule the top left (x1,y1) and bottom right (x2,y2) corners of a button
 * @param {type} button
 * @returns {Array} an array with values [x1,y1,x2,y2]
 */
function getButtonBorders(button) {
    return [button.x - button.width / 2,
        button.x + button.width / 2,
        button.y - button.height / 2,
        button.y + button.height / 2];
}