
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
             game.load.spritesheet('createButton', 'assets/buttons/button_sprite_sheet.png', 193, 71);
         },

create: function() {
            this.background = game.add.sprite(margin, margin, 'scorePanel');
            this.background.width = scorePanelWidth;
            this.background.height = scorePanelHeight;

            game.add.button(scorePanelWidth/2-193/2, scorePanelHeight/2, 'createButton', actionOnClick, this, 2, 1, 0);
            game.add.button(canvasWidth+scorePanelWidth/2-193/2, scorePanelHeight/2, 'createButton', actionOnClick2, this, 2, 1, 0);


            var decal = 17;
            this.abc0 = game.add.text(10,10,'Score: '+score_general,style1);
            game.add.text(10,10+1*decal,count_cu_text,style2);
            game.add.text(10,10+2*decal,count_zn_text,style2);
            game.add.text(10,10+3*decal,count_na_text,style2);
            game.add.text(10,10+4*decal,count_cl_text,style2);
            game.add.text(10,10+5*decal,count_a_text,style2);
            game.add.text(10,10+6*decal,count_b_text,style2);
        },

update: function() {
        this.abc0.text = 'Score: ' + score_general;
        }
};
