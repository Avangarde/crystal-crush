// Example by https://twitter.com/awapblog
// Modified by Avantgarde


var game = new Phaser.Game(canvasWidth, canvasHeight, Phaser.AUTO, 'phaser-example', {preload: preload, create: create, update: update, render: render});
var gamePanel = null;

function preload() {
    
    game.load.image('background', 'assets/background.png');
    game.load.image('scorePanel', 'assets/scorePanel.png');
    
    gamePanel = new GamePanel(game);
    gamePanel.preload();
    
    game.load.spritesheet('createButton', 'assets/buttons/button_sprite_sheet.png', 193, 71);

}

function create() {
    game.world.setBounds(0, 0, canvasWidth * 2, canvasHeight);
    var background = game.add.sprite(0, 0, 'background');
    background.width = canvasWidth;
    background.height = canvasHeight;
    var scorePanel = game.add.sprite(margin, margin, 'scorePanel');
    scorePanel.width = scorePanelWidth;
    scorePanel.height = scorePanelHeight;
    
    gamePanel.create();
        
    game.add.button(scorePanelWidth/2-193/2, scorePanelHeight/2, 'createButton', actionOnClick, this, 2, 1, 0);
    game.add.button(canvasWidth+scorePanelWidth/2-193/2, scorePanelHeight/2, 'createButton', actionOnClick2, this, 2, 1, 0);
}

function update() {
    gamePanel.update();
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
