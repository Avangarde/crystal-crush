// Example by https://twitter.com/awapblog
// Modified by Avantgarde


var game = new Phaser.Game(canvasWidth, canvasHeight, Phaser.AUTO, 'phaser-example', {preload: preload, create: create, update: update, render: render});
var gamePanel = null;
var scorePanel = null;
var alchemyPanel = null;

function preload() {
    
    game.load.image('background', 'assets/background.png');
    
    gamePanel = new GamePanel(game);
    scorePanel = new ScorePanel(game);
    alchemyPanel = new AlchemyPanel(game);

    gamePanel.preload();
    scorePanel.preload();
    alchemyPanel.preload();
}

function create() {
    game.world.setBounds(-canvasWidth, 0, canvasWidth*2, canvasHeight);
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
    game.camera.x = canvasWidth;
}

function actionOnClick2() {
    game.camera.x = 0;
}
