CrystalCrush.Lvl2 = function(game) {
    this.game = game;
    this.game.numMoves;
    this.game.targetScore;
    this.game.activeLevel;
    this.game.nextLevel;
};

var gamePanel = null;
var scorePanel = null;
var welcomePopUp = null;
var popUpPanel = null;
var popUpName = null;

var crystals;

CrystalCrush.Lvl2.prototype = {
    preload: function() {
        
        this.game.numMoves = 30;
        this.game.targetScore = 2000;
        this.game.activeLevel = "lvl2";
        this.game.nextLevel = "lvl1";
        
        elemNames = [AL, O, CR, SI, TI, ZN];
        powerNames = [CORUNDUM, SAPPHIRE, RUBY, QUARTZ];
        
        allowInput = true;
        elements = null;
        selectedElement = null;
        selectedElementStartPos = null;
        selectedElemTween = null;
        tempShiftedElem = null;
        matched = false;
        selection = null;
        stillGame = false;

        gamePanel = new GamePanel(game, xGamePanel, yGamePanel, widthGamePanel, heightGamePanel);
        scorePanel = new ScorePanel(game, xScorePanel, yScorePanel, widthScorePanel, heightScorePanel, 0);
        alchemyPanel = new AlchemyPanel(game, xAlchemyPanel, yAlchemyPanel, widthAlchemyPanel, heightAlchemyPanel);
        welcomePopUp = new WelcomePopUp(game);
        recipesPanel = new RecipesPanel(game, xRecipesPanel, yRecipesPanel, widthRecipesPanel, heightRecipesPanel, 2);

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
        welcomePopUp.create();
        recipesPanel.create();

    },
    update: function() {
        gamePanel.update();
        scorePanel.update();
        alchemyPanel.update();
    }
};
