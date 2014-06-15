CrystalCrush.Lvl3 = function(game) {
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
var recipesPanel = null;

var crystals;

CrystalCrush.Lvl3.prototype = {
    preload: function() {
        this.game.numMoves = 30;
        this.game.targetScore = 15;
        this.game.activeLevel = "lvl3";
        this.game.nextLevel = "lvl1";

        elemNames = [CU, ZN, FE, C, AU, AL];
        powerNames = [BRASS, STEEL, GOLD, ALUMINIUM];
        allowInput = true;
        elements = null;
        selectedElement = null;
        selectedElementStartPos = null;
        selectedElemTween = null;
        tempShiftedElem = null;
        matched = false;
        selection = null;
        hintSelect = null;
        stillGame = false;

        gamePanel = new GamePanel(game, xGamePanel, yGamePanel, widthGamePanel, heightGamePanel);
        scorePanel = new ScorePanel(game, xScorePanel, yScorePanel, widthScorePanel, heightScorePanel, 0);
        alchemyPanel = new AlchemyPanel(game, xAlchemyPanel, yAlchemyPanel, widthAlchemyPanel, heightAlchemyPanel);
        welcomePopUp = new WelcomePopUp(game);
        recipesPanel = new RecipesPanel(game, xRecipesPanel, yRecipesPanel, widthRecipesPanel, heightRecipesPanel, 3);
    },
    create: function() {
        game.world.setBounds(-canvasWidth + scorePanel, 0, 2 * canvasWidth - scorePanel, canvasHeight);
        this.background = game.add.sprite(-canvasWidth + scorePanel.width, 0, 'backgroundLvl3');
        this.background.width = canvasWidth * 2 - scorePanel.width;
        this.background.height = canvasHeight;

        gamePanel.create();
        alchemyPanel.create();
        scorePanel.create();
        var hs = localStorage.getItem("hs" + this.game.activeLevel);
        hs = (hs === null ? scorePanel.score_general : hs);
        scorePanel.highScore = hs;
        var t = game.cache.getText('crystals');
        crystals = t.split('\n');
        welcomePopUp.create();
        recipesPanel.create();

    },
    update: function() {
        gamePanel.update();
        scorePanel.update();
        alchemyPanel.update();
    }
};
