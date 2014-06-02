var BUTTONWIDTH = 193;
var BUTTONHEIGHT = 71;

ScorePanel = function(game) {

    this.game = game;
    this.xgamePanel;
    this.ygamePanel;
    this.background;
    this.abc0;
    this.abc1;
    this.abc2;
    this.abc3;
    this.abc4;
    this.abc5;
    this.abc6;

};

ScorePanel.prototype = {
    preload: function() {
        game.load.image('scorePanel', 'assets/scorePanel.png');
        game.load.spritesheet('createButton', 'assets/buttons/button_sprite_sheet.png', BUTTONWIDTH, BUTTONHEIGHT);
    },
    create: function() {
        this.background = game.add.sprite(margin, margin, 'scorePanel');
        this.background.width = scorePanelWidth;
        this.background.height = scorePanelHeight;

        var buttonGame = game.add.button(2 * margin, scorePanelHeight - margin - BUTTONHEIGHT, 'createButton', actionOnClick, this, 2, 1, 0);
        var buttonWidth = scorePanelWidth - 2 * margin;
        var scalingFactor = scorePanelWidth / buttonWidth;
        buttonGame.width = buttonWidth;
        buttonGame.height = scalingFactor * buttonGame.height;

        var decal = 17;
        this.abc0 = game.add.text(10, 10, 'Score: ' + score_general, style1);
        game.add.text(10, 10 + 1 * decal, count_cu_text, style2);
        game.add.text(10, 10 + 2 * decal, count_zn_text, style2);
        game.add.text(10, 10 + 3 * decal, count_na_text, style2);
        game.add.text(10, 10 + 4 * decal, count_cl_text, style2);
        game.add.text(10, 10 + 5 * decal, count_a_text, style2);
        game.add.text(10, 10 + 6 * decal, count_b_text, style2);
    },
    update: function() {
        this.abc0.text = 'Score: ' + score_general;
    }
};
