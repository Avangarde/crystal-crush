
ScorePanel = function(game, x ,y, width, height) {

    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
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
             game.load.image('scorePanelBackground', 'assets/scorePanel.png');
             game.load.spritesheet('createButton', 'assets/buttons/button_sprite_sheet.png', 193, 71);
         },

create: function() {
            this.background = game.add.sprite(this.x, this.y, 'scorePanelBackground');
            this.background.width = this.width;
            this.background.height = this.height;

            game.add.button(this.width/2-193/2 + this.x, this.height/2 + this.y, 'createButton', actionOnClick, this, 2, 1, 0);
            game.add.button(this.width/2-193/2 + this.x, this.height/2 + this.y,'createButton', actionOnClick2, this, 2, 1, 0);


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
        },

addMatch: function(countHoriz, countVert, elem_name) {
    if(countHoriz < MATCH_MIN){
        score_general = score_general + countVert;
    }else if (countVert < MATCH_MIN){
        score_general = score_general + countHoriz;
    }else{
        score_general = score_general + (countHoriz + countVert)*3;
    }
    }
};
