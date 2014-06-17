var WIN_MENU_WIDTH = 1500;
var WIN_MENU_HEIGHT = 751;
var WIN_BUTTON_WIDTH = 593 / 2;
var WIN_BUTTON_HEIGHT = 81;
var SHAREFB_BUTTON_DIM = 100;


CrystalCrush.Win = function(game) {
    this.game = game;
    this.buttonPlayAgain;
    this.buttonShareFb;
    this.buttonNextLevel;
    this.buttonBackToMenu;
    this.winMenu;
    this.score_txt;
    this.highScore_txt;
};

CrystalCrush.Win.prototype = {
    create: function() {
        //BackGround
        this.winMenu = game.add.sprite(canvasWidth / 2, canvasHeight / 2, 'win');
        this.winMenu.anchor.setTo(0.5, 0.5);
        this.winMenu.width = canvasWidth;
//        this.winMenu.height = canvasWidth * WIN_MENU_HEIGHT / WIN_MENU_WIDTH;
        this.winMenu.height = canvasHeight;

        //Buttons
        var rowHeight = canvasHeight / 7;
        var buttonWidth = canvasWidth * 0.15;
        var buttonHeight = buttonWidth * WIN_BUTTON_HEIGHT / WIN_BUTTON_WIDTH;
        this.buttonPlayAgain = game.add.button(canvasWidth / 2 - buttonWidth / 2, 2 * rowHeight + margin, 'playAgain', this.playAgain, this, 1, 0, 0);
        this.buttonPlayAgain.anchor.setTo(0.5, 0.5);
        this.buttonPlayAgain.height = buttonHeight;
        this.buttonPlayAgain.width = buttonWidth;

        this.buttonNextLevel = game.add.button(canvasWidth / 2 + buttonWidth / 2 + margin, 2 * rowHeight + margin, 'nextLevel', this.nextLevel, this, 1, 0, 0);
        this.buttonNextLevel.anchor.setTo(0.5, 0.5);
        this.buttonNextLevel.height = buttonHeight;
        this.buttonNextLevel.width = buttonWidth;

        this.buttonBackToMenu = game.add.button(canvasWidth / 2, this.buttonPlayAgain.y + this.buttonPlayAgain.height + margin, 'backToMenu', this.backToMenu, this, 1, 0, 0);
        this.buttonBackToMenu.anchor.setTo(0.5, 0.5);
        this.buttonBackToMenu.height = buttonHeight;
        this.buttonBackToMenu.width = buttonWidth;

        var buttonDim = buttonHeight;
        this.buttonShareFb = game.add.button(canvasWidth / 2, this.buttonBackToMenu.y + this.buttonBackToMenu.height + margin, 'shareFb', this.shareFb, this, 1, 0, 0);
        this.buttonShareFb.anchor.setTo(0.5, 0.5);
        this.buttonShareFb.height = buttonDim;
        this.buttonShareFb.width = buttonDim;

        //Score
        this.score_txt = game.add.text(canvasWidth / 2, this.buttonShareFb.y + this.buttonShareFb.height + margin, 'Your Score : ' + scorePanel.score_general, style1);
        this.score_txt.anchor.setTo(0.5, 0.5);

        if (scorePanel.score_general === scorePanel.highScore) {
            this.highScore_txt = game.add.text(canvasWidth / 2, this.score_txt.y + this.score_txt.height + margin, 'New High Score !', style1);
            this.highScore_txt.anchor.setTo(0.5, 0.5);
        }
        localStorage.setItem("hs" + this.game.activeLevel, scorePanel.highScore);
    },
    update: function() {
    },
    playAgain: function() {
        this.game.state.start(this.game.activeLevel);
    },
    shareFb: function() {
        var message = scorePanel.score_general === scorePanel.highScore ?
                CrystalCrush.language.winMessageFBHighScore.replace("?", scorePanel.score_general) :
                CrystalCrush.language.winMessageFBScore.replace("?", scorePanel.score_general);
        FB.ui({
            method: 'feed',
            name: 'Crystal Crush',
            caption: 'Match-crystal puzzle video game for web and mobile devices',
            description: (
                    message
                    ),
            link: 'http://avangarde.github.io/crystal-crush/crystal-crush.html',
            picture: 'http://www.hartrao.ac.za/nccs/Esrf.gif'
        });
    },
    nextLevel: function() {
        this.game.state.start(this.game.nextLevel);
    },
    backToMenu: function() {
        this.game.state.start('home');
    }
};
