// Example by https://twitter.com/awapblog
// Modified by Avantgarde


var game = new Phaser.Game(canvasWidth, canvasHeight, Phaser.AUTO, 'phaser-example', {preload: preload, create: create, update: update, render: render});
var gamePanel = null;
var scorePanel = null;

function preload() {
    
    game.load.image('background', 'assets/background.png');
    
    gamePanel = new GamePanel(game);
    scorePanel = new ScorePanel(game);

    gamePanel.preload();
    scorePanel.preload();
}

function create() {
    game.world.setBounds(0, 0, canvasWidth * 2, canvasHeight);
    var background = game.add.sprite(0, 0, 'background');
    background.width = canvasWidth;
    background.height = canvasHeight;
    
    gamePanel.create();
    scorePanel.create();

}

function update() {
    gamePanel.update();
    scorePanel.update();
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
