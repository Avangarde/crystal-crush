var WIN_MENU_WIDTH = 1500;
var WIN_MENU_HEIGHT = 751;
var WIN_BUTTON_WIDTH = 593 / 2;
var WIN_BUTTON_HEIGHT = 81;
var SHAREFB_BUTTON_DIM = 256;


WinPanel = function(game) {
    this.game = game;
    this.buttonPlayAgain;
    this.buttonShareFb;
    this.buttonNextLevel;
    this.winMenu;
    this.score_txt;
    this.highScore_txt;
};

WinPanel.prototype = {
    create: function() {
    },
    update: function() {
    },
    win: function() {
        if (scorePanel.score_general >= this.game.targetScore) {
            //BackGround
            this.winMenu = game.add.sprite(canvasWidth / 2, canvasHeight / 2, 'win');
            this.winMenu.anchor.setTo(0.5, 0.5);
            this.winMenu.width = canvasWidth;
            this.winMenu.height = canvasWidth * WIN_MENU_HEIGHT / WIN_MENU_WIDTH;

            //Buttons
            var buttonWidth = canvasWidth * 0.15;
            var buttonHeight = buttonWidth * WIN_BUTTON_HEIGHT / WIN_BUTTON_WIDTH;
            this.buttonPlayAgain = game.add.button(canvasWidth / 2 - buttonWidth /2, canvasHeight / 2, 'playAgain', this.playAgain, this, 1, 0, 0);
            this.buttonPlayAgain.anchor.setTo(0.5, 0.5);
            this.buttonPlayAgain.height = buttonHeight;
            this.buttonPlayAgain.width = buttonWidth;
            
            this.buttonNextLevel = game.add.button(canvasWidth / 2 + buttonWidth /2, canvasHeight / 2, 'nextLevel', this.nextLevel, this, 1, 0, 0);
            this.buttonNextLevel.anchor.setTo(0.5, 0.5);
            this.buttonNextLevel.height = buttonHeight;
            this.buttonNextLevel.width = buttonWidth;


            var buttonDim = canvasWidth * 0.05;
            this.buttonShareFb = game.add.button(canvasWidth / 2, canvasHeight / 2 + margin + this.buttonPlayAgain.height, 'shareFb', this.shareFb, this, 1, 0, 0);
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
            localStorage.setItem("highScore", scorePanel.highScore);
        }
    },        
    playAgain: function() {
        this.game.state.start(this.game.activeLevel);
    },
    shareFb: function() {
        var message = scorePanel.score_general === scorePanel.highScore ?
            "I got" + scorePanel.score_general + ", a new high score in #CandyCrush, try to beat me !" :
            "I got " + scorePanel.score_general
            + " points in #CandyCrush, try to beat me!";
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
    }
};