CrystalCrush.Level = function() {
};

var gamePanel = null;
var scorePanel = null;
var alchemyPanel = null;
var welcomePopUp = null;
var popUpPanel = null;
var popUpName = null;
var recipesPanel = null;

var crystals;

CrystalCrush.Level.prototype = {
    preload: function() {

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

        scorePanel = new ScorePanel(game, xScorePanel, yScorePanel, widthScorePanel, heightScorePanel, 0);
        gamePanel = new GamePanel(game, xGamePanel, yGamePanel, widthGamePanel, heightGamePanel);        
        alchemyPanel = new AlchemyPanel(game, xAlchemyPanel, yAlchemyPanel, widthAlchemyPanel, heightAlchemyPanel);
        welcomePopUp = new WelcomePopUp(game);
        recipesPanel = new RecipesPanel(game, xRecipesPanel, yRecipesPanel, widthRecipesPanel, heightRecipesPanel, game.numLevel);
    },
    create: function() {
        game.world.setBounds(-canvasWidth + scorePanel, 0, 2 * canvasWidth - scorePanel, canvasHeight);
        var background = game.add.sprite(-canvasWidth + scorePanel.width, 0, game.backGround);
        background.width = canvasWidth * 2 - scorePanel.width;
        background.height = canvasHeight;
        
        gamePanel.create();
        alchemyPanel.create();        
        scorePanel.create();
        var hs = localStorage.getItem("hs" + game.activeLevel);
        hs = (hs === null ? scorePanel.score_general : hs);
        scorePanel.highScore = hs;
        var t = game.cache.getText('crystals');
        crystals = t.split('\n');
        welcomePopUp.create();
        recipesPanel.create();

    },
    update: function() {
        scorePanel.update();
        gamePanel.update();        
        alchemyPanel.update();
    }
};

var level = new CrystalCrush.Level();