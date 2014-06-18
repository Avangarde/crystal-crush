AtomicCrush.Lost = function(game) {
    this.game = game;
    this.buttonPlayAgain;
    this.buttonShareFb;
    this.buttonBackToMenu;
    this.score_txt;
    this.highScore_txt;
    this.messageFBHiScore = "I got ?, a new high score in #AtomicCrush, try to beat me !";
    this.messageFBScore = "I got ? points in #AtomicCrush, try to beat me!";
};

AtomicCrush.Lost.prototype = {
    create: function() {
        //BackGround
        lostMenu = this.game.add.sprite(canvasWidth / 2, canvasHeight / 2, 'lost');
        lostMenu.anchor.setTo(0.5, 0.5);
        var tempLostMenuWidth = lostMenu.width;
        lostMenu.width = canvasWidth;
        lostMenu.height = canvasWidth * lostMenu.height / tempLostMenuWidth;

        //Buttons
        var buttonWidth = canvasWidth * 0.15;
        var rowHeight = canvasHeight / 6;
        this.buttonPlayAgain = game.add.button(canvasWidth / 2 - buttonWidth / 2, 2 * rowHeight + margin, 'playAgain', this.playAgain, this, 1, 0, 0);
        this.buttonPlayAgain.anchor.setTo(0.5, 0.5);
        var buttonHeight = buttonWidth * this.buttonPlayAgain.height / this.buttonPlayAgain.width;
        this.buttonPlayAgain.height = buttonHeight;
        this.buttonPlayAgain.width = buttonWidth;

        this.buttonBackToMenu = game.add.button(canvasWidth / 2 + buttonWidth / 2 + margin, 2 * rowHeight + margin, 'backToMenu', this.backToMenu, this, 1, 0, 0);
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
        localStorage.setItem("hs"+this.game.activeLevel, scorePanel.highScore);
    },
    update: function() {
    },
    playAgain: function() {
        this.game.state.start(this.game.activeLevel);
    },
    shareFb: function() {
        var message = scorePanel.score_general === scorePanel.highScore ?
                AtomicCrush.language.lostMessageFBHighScore.replace("?", scorePanel.score_general) :
                AtomicCrush.language.lostMessageFBScore.replace("?", scorePanel.score_general);
        console.log(message);
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
    backToMenu: function() {
        this.game.state.start('home');
    }
};
