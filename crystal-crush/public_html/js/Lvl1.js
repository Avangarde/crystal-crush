CrystalCrush.Lvl1 = function(game){
    this.game = game;
    this.game.moves=21;
};



var gamePanel = null;
var scorePanel = null;
var alchemyPanel = null;
var lostPanel = null;

var crystals;

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
CrystalCrush.Lvl1.prototype = {

preload: function () {
    game.load.image('background', 'assets/kitchenLevel.png');
    game.load.text('crystals', 'files/crystals.txt');
    game.load.text('highScore', 'files/highScore');

    gamePanel = new GamePanel(game, xGamePanel, yGamePanel, widthGamePanel, heigthGamePanel);
    scorePanel = new ScorePanel(game, xScorePanel, yScorePanel, widthScorePanel, heigthScorePanel, 0);
    alchemyPanel = new AlchemyPanel(game, xAlchemyPanel, yAlchemyPanel, widthAlchemyPanel, heightAlchemyPanel);
    lostPanel = new LostPanel(game);

    gamePanel.preload();
    scorePanel.preload();
    alchemyPanel.preload();
    lostPanel.preload();
         },
create : function () {
    game.world.setBounds(-canvasWidth + scorePanel, 0, 2 * canvasWidth - scorePanel, canvasHeight);
    var background = game.add.sprite(-canvasWidth + scorePanel.width, 0, 'background');
    background.width = canvasWidth * 2 - scorePanel.width;
    background.height = canvasHeight;

    gamePanel.create();
    alchemyPanel.create();
    scorePanel.create();
    scorePanel.highScore = localStorage.getItem("highScore") === null ? 
    0 : localStorage.getItem("highScore");

    var t = game.cache.getText('crystals');
    crystals = t.split('\n');

         },
update : function () {
    gamePanel.update();
    scorePanel.update();
    alchemyPanel.update();
    lostPanel.update();
}
}
