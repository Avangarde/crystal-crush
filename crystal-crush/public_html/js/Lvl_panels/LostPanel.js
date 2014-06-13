var LOST_MENU_WIDTH = 1500;
var LOST_MENU_HEIGHT = 751;
var LOST_BUTTON_WIDTH = 593 / 2;
var LOST_BUTTON_HEIGHT = 81;
var SHAREFB_BUTTON_DIM = 256;


CrystalCrush.Lost = function(game) {
    this.game = game;
    this.buttonPlayAgain;
    this.buttonShareFb;
    this.score_txt;
    this.highScore_txt;
    this.messageFBHiScore = "I got ?, a new high score in #CrystalCrush, try to beat me !";
    this.messageFBScore = "I got ? points in #CrystalCrush, try to beat me!";
};

CrystalCrush.Lost.prototype = {
    create: function() {
        //BackGround
        lostMenu = this.game.add.sprite(canvasWidth / 2, canvasHeight / 2, 'lost');
        lostMenu.anchor.setTo(0.5, 0.5);
        lostMenu.width = canvasWidth;
        lostMenu.height = canvasWidth * LOST_MENU_HEIGHT / LOST_MENU_WIDTH;
        
        //Buttons
        var buttonWidth = canvasWidth * 0.15;
        var buttonHeight = buttonWidth * LOST_BUTTON_HEIGHT / LOST_BUTTON_WIDTH;
        this.buttonPlayAgain = this.game.add.button(canvasWidth / 2, canvasHeight / 2, 'playAgain', this.playAgain, this, 1, 0, 0);
        this.buttonPlayAgain.anchor.setTo(0.5, 0.5);
        this.buttonPlayAgain.height = buttonHeight;
        this.buttonPlayAgain.width = buttonWidth;
        
        var buttonDim = canvasWidth * 0.05;
        this.buttonShareFb = this.game.add.button(canvasWidth / 2, canvasHeight / 2 + margin + this.buttonPlayAgain.height, 'shareFb', this.shareFb, this, 1, 0, 0);
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
        localStorage.setItem("hs"+this.game.activeLevel, scorePanel.highScore);
    },
    update: function() {
    },
    playAgain: function() {
        this.game.state.start(this.game.activeLevel);
    },
    shareFb: function() {
        var message = scorePanel.score_general === scorePanel.highScore ?
                CrystalCrush.language.lostMessageFBHighScore.replace("?", scorePanel.score_general) :
                CrystalCrush.language.lostMessageFBScore.replace("?", scorePanel.score_general);
        console.log(message);
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
    }
};
