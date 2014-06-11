CrystalCrush.Lvl1 = function(game) {
    this.game = game;
    this.game.numMoves = 21;
};

var gamePanel = null;
var scorePanel = null;
var alchemyPanel = null;
var lostPanel = null;

var crystals;

CrystalCrush.Lvl1.prototype = {
    preload: function() {

        gamePanel = new GamePanel(game, xGamePanel, yGamePanel, widthGamePanel, heigthGamePanel);
        scorePanel = new ScorePanel(game, xScorePanel, yScorePanel, widthScorePanel, heigthScorePanel, 0);
        alchemyPanel = new AlchemyPanel(game, xAlchemyPanel, yAlchemyPanel, widthAlchemyPanel, heightAlchemyPanel);
        lostPanel = new LostPanel(game);

    },
    create: function() {
        game.world.setBounds(-canvasWidth + scorePanel, 0, 2 * canvasWidth - scorePanel, canvasHeight);
        this.background = game.add.sprite(-canvasWidth + scorePanel.width, 0, 'background');
        this.background.width = canvasWidth * 2 - scorePanel.width;
        this.background.height = canvasHeight;

        gamePanel.create();
        alchemyPanel.create();
        scorePanel.create();
        scorePanel.highScore = localStorage.getItem("highScore") === null ?
                0 : localStorage.getItem("highScore");

        var t = game.cache.getText('crystals');
        crystals = t.split('\n');

    },
    update: function() {
        gamePanel.update();
        scorePanel.update();
        alchemyPanel.update();
        lostPanel.update();
    }
}
