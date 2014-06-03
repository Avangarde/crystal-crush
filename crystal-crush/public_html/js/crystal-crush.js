// Example by https://twitter.com/awapblog
// Modified by Avantgarde


var game = new Phaser.Game(canvasWidth, canvasHeight, Phaser.AUTO, 'phaser-example', {preload: preload, create: create, update: update, render: render});
var gamePanel = null;
var scorePanel = null;
var alchemyPanel = null;

var BUTTONWIDTH = 193;
var BUTTONHEIGHT = 71;

function preload() {
    
    game.load.image('background', 'assets/background.png');
    
    gamePanel = new GamePanel(game, xGamePanel, yGamePanel, widthGamePanel, heigthGamePanel);
    scorePanel = new ScorePanel(game, xScorePanel, yScorePanel, widthScorePanel, heigthScorePanel);
    alchemyPanel = new AlchemyPanel(game, xAlchemyPanel, yAlchemyPanel, widthAlchemyPanel, heightAlchemyPanel);

    gamePanel.preload();
    scorePanel.preload();
    alchemyPanel.preload();
}

function create() {
    game.world.setBounds(-canvasWidth + scorePanel, 0, canvasWidth * 2, canvasHeight);
    var background = game.add.sprite(0, 0, 'background');
    background.width = canvasWidth;
    background.height = canvasHeight;
    
    gamePanel.create();
    scorePanel.create();
    alchemyPanel.create();

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
