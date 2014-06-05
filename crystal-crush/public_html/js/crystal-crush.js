// Example by https://twitter.com/awapblog
// Modified by Avantgarde


var game = new Phaser.Game(canvasWidth, canvasHeight, Phaser.AUTO, 'phaser-example', {preload: preload, create: create, update: update, render: render});
var gamePanel = null;
var scorePanel = null;
var alchemyPanel = null;

var crystals;

function preload() {

    game.load.image('background', 'assets/background.png');
    game.load.text('crystals', 'files/crystals.txt');
    game.load.text('highScore', 'files/highScore');

    gamePanel = new GamePanel(game, xGamePanel, yGamePanel, widthGamePanel, heigthGamePanel);
    scorePanel = new ScorePanel(game, xScorePanel, yScorePanel, widthScorePanel, heigthScorePanel, 0);
    alchemyPanel = new AlchemyPanel(game, xAlchemyPanel, yAlchemyPanel, widthAlchemyPanel, heightAlchemyPanel);

    gamePanel.preload();
    scorePanel.preload();
    alchemyPanel.preload();

}

function create() {
    game.world.setBounds(-canvasWidth + scorePanel, 0, 2 * canvasWidth - scorePanel, canvasHeight);
    var background = game.add.sprite(-canvasWidth + scorePanel.width, 0, 'background');
    background.width = canvasWidth * 2 - scorePanel.width;
    background.height = canvasHeight;

    gamePanel.create();
    alchemyPanel.create();
    scorePanel.create();
    scorePanel.setHighScore(parseInt(game.cache.getText('highScore')));

    var t = game.cache.getText('crystals');
    crystals = t.split('\n');

}

function update() {
    gamePanel.update();
    scorePanel.update();
    alchemyPanel.update();
}

function render() {
//    game.debug.cameraInfo(game.camera, 32, 32);
}

function actionOnClick() {
    animationScreen = true;
}

function animationCamera() {
    if (!inAlchemyPanel) {
        if (game.camera.x >= -canvasWidth + scorePanel.width + 2 * margin)
            game.camera.x -= margin;
        else {
            animationScreen = false;
            inAlchemyPanel = true;
        }
    } else {
        if (game.camera.x < 0)
            game.camera.x += margin;
        else {
            animationScreen = false;
            inAlchemyPanel = false;
        }
    }
}
