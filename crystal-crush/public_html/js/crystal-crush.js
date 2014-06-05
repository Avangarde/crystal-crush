// Example by https://twitter.com/awapblog
// Modified by Avantgarde


var game = new Phaser.Game(canvasWidth, canvasHeight, Phaser.AUTO, 'phaser-example', {preload: preload, create: create, update: update, render: render});
var gamePanel = null;
var scorePanel = null;
var alchemyPanel = null;

var BUTTONWIDTH = 193;
var BUTTONHEIGHT = 71;

var crystals;

function preload() {
    
    game.load.image('background', 'assets/background.png');
    
    gamePanel = new GamePanel(game, xGamePanel, yGamePanel, widthGamePanel, heigthGamePanel);
    scorePanel = new ScorePanel(game, xScorePanel, yScorePanel, widthScorePanel, heigthScorePanel);
    alchemyPanel = new AlchemyPanel(game, xAlchemyPanel, yAlchemyPanel, widthAlchemyPanel, heightAlchemyPanel);

    gamePanel.preload();
    scorePanel.preload();
    alchemyPanel.preload();
    
    game.load.text('crystals', 'files/crystals.txt');
    
}

function create() {
    game.world.setBounds(-canvasWidth + scorePanel, 0, 2*canvasWidth - scorePanel, canvasHeight);
    var background = game.add.sprite(-canvasWidth + scorePanel.width, 0, 'background');
    background.width = canvasWidth*2 - scorePanel.width;
    background.height = canvasHeight;
    
    gamePanel.create();
    alchemyPanel.create();
    scorePanel.create();
    
    
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
