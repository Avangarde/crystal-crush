CrystalCrush.Lvl1 = function(game) {
    this.game = game;
    this.game.numMoves;    
    this.game.targetScore;
    this.game.activeLevel;
    this.game.nextLevel;
};

var gamePanel = null;
var scorePanel = null;
var alchemyPanel = null;
var welcomePopUp = null;
var popUpPanel = null;
var popUpName = null;

var crystals;

CrystalCrush.Lvl1.prototype = {
    preload: function() {
        this.game.numMoves = 30;
        this.game.targetScore = 1500;
        this.game.activeLevel = "lvl1";
        this.game.nextLevel = "lvl2";
        
        elemNames = [NA, CL, C, H, O, CU];
        powerNames = [SALT, ICE, SUGAR];
        allowInput = true;
        elements = null;
        selectedElement = null;
        selectedElementStartPos = null;
        selectedElemTween = null;
        tempShiftedElem = null;
        matched = false;
        selection = null;
        stillGame = false;

        gamePanel = new GamePanel(game, xGamePanel, yGamePanel, widthGamePanel, heigthGamePanel);
        scorePanel = new ScorePanel(game, xScorePanel, yScorePanel, widthScorePanel, heigthScorePanel, 0);
        alchemyPanel = new AlchemyPanel(game, xAlchemyPanel, yAlchemyPanel, widthAlchemyPanel, heightAlchemyPanel);
        welcomePopUp = new WelcomePopUp(game);
        //recipesPanel = new RecipesPanel(game);
    },
    create: function() {
        game.world.setBounds(-canvasWidth + scorePanel, 0, 2 * canvasWidth - scorePanel, canvasHeight);
        this.background = game.add.sprite(-canvasWidth + scorePanel.width, 0, 'backgroundLvl1');
        this.background.width = canvasWidth * 2 - scorePanel.width;
        this.background.height = canvasHeight;

        gamePanel.create();
        alchemyPanel.create();
        scorePanel.create();
        scorePanel.highScore = localStorage.getItem("highScore") === null ?
                0 : localStorage.getItem("highScore");

        var t = game.cache.getText('crystals');
        crystals = t.split('\n');
        welcomePopUp.create();

    },
    update: function() {
        gamePanel.update();
        scorePanel.update();
        alchemyPanel.update();
    }
};
