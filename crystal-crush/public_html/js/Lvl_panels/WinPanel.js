AtomicCrush.Win = function(game) {
    this.game = game;
    this.buttonPlayAgain;
    this.buttonShareFb;
    this.buttonNextLevel;
    this.buttonBackToMenu;
    this.winMenu;
    this.score_txt;
    this.highScore_txt;
};

AtomicCrush.Win.prototype = {
    create: function() {
        //BackGround
        this.winMenu = game.add.sprite(canvasWidth / 2, canvasHeight / 2, 'win');
        this.winMenu.anchor.setTo(0.5, 0.5);
        this.winMenu.width = canvasWidth;
        this.winMenu.height = canvasHeight;

        //Buttons
        var rowHeight = canvasHeight / 7;
        var buttonWidth = canvasWidth * 0.15;
        this.buttonPlayAgain = game.add.button(canvasWidth / 2 - buttonWidth / 2, 2 * rowHeight + margin, 'playAgain', this.playAgain, this, 1, 0, 0);
        this.buttonPlayAgain.anchor.setTo(0.5, 0.5);
        var buttonHeight = buttonWidth * this.buttonPlayAgain.height / this.buttonPlayAgain.width;
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
                AtomicCrush.language.winMessageFBHighScore.replace("?", scorePanel.score_general) :
                AtomicCrush.language.winMessageFBScore.replace("?", scorePanel.score_general);
        FB.ui({
            method: 'feed',
            name: 'Atomic Crush',
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
