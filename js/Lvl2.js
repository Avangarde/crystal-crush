CrystalCrush.Lvl2 = function(game) {
    this.game = game;
    this.game.numMoves = 30;    
    this.game.targetScore = 1000;
};

var gamePanel = null;
var scorePanel = null;
var alchemyPanel = null;
var lostPanel = null;
var winPanel = null;

var crystals;

CrystalCrush.Lvl2.prototype = {
    preload: function() {
        
        elemNames = [AL, O, CR, SI, TI, ZN];
        powerNames = [CORUNDUM, SAPPHIRE, RUBY, QUARTZ];

        gamePanel = new GamePanel(game, xGamePanel, yGamePanel, widthGamePanel, heigthGamePanel);
        scorePanel = new ScorePanel(game, xScorePanel, yScorePanel, widthScorePanel, heigthScorePanel, 0);
        alchemyPanel = new AlchemyPanel(game, xAlchemyPanel, yAlchemyPanel, widthAlchemyPanel, heightAlchemyPanel);
        lostPanel = new LostPanel(game);
        winPanel = new WinPanel(game);

    },
    create: function() {
        game.world.setBounds(-canvasWidth + scorePanel, 0, 2 * canvasWidth - scorePanel, canvasHeight);
        this.background = game.add.sprite(-canvasWidth + scorePanel.width, 0, 'backgroundLvl2');
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
