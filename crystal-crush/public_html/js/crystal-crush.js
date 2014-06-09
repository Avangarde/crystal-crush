// Example by https://twitter.com/awapblog
// Modified by Avantgarde


var game = new Phaser.Game(canvasWidth, canvasHeight, Phaser.AUTO, 'phaser-example', {preload: preload, create: create, update: update, render: render});
var gamePanel = null;
var scorePanel = null;
var alchemyPanel = null;
var lostPanel = null;

var crystals;

function preload() {

    game.load.image('background', 'assets/background.png');
    game.load.text('crystals', 'files/crystals.txt');

    gamePanel = new GamePanel(game, xGamePanel, yGamePanel, widthGamePanel, heigthGamePanel);
    scorePanel = new ScorePanel(game, xScorePanel, yScorePanel, widthScorePanel, heigthScorePanel, 0);
    alchemyPanel = new AlchemyPanel(game, xAlchemyPanel, yAlchemyPanel, widthAlchemyPanel, heightAlchemyPanel);
    lostPanel = new LostPanel(game);

    gamePanel.preload();
    scorePanel.preload();
    alchemyPanel.preload();
    lostPanel.preload();
}






