
ScorePanel = function(game, x ,y, width, heigth) {

    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.heigth = heigth;
    this.background;

    this.score_general = 0;
    this.cu_count = 0;
    this.zn_count = 0;
    this.na_count = 0;
    this.cl_count = 0;
    this.a_count  = 0;
    this.b_count  = 0;

    this.score_txt;
    this.cu_txt;
    this.zn_txt;
    this.na_txt;
    this.cl_txt;
    this.a_txt;
    this.b_txt;
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
            this.score_txt = game.add.text(10,10,         'Score : ' + this.score_general , style1);
            this.cu_txt    = game.add.text(10,10+1*decal, 'Cu : '    + this.cu_count , style2);
            this.zn_txt    = game.add.text(10,10+2*decal, 'Zn : '    + this.zn_count , style2);
            this.na_txt    = game.add.text(10,10+3*decal, 'Na : '    + this.na_count , style2);
            this.cl_txt    = game.add.text(10,10+4*decal, 'Cl : '    + this.cl_count , style2);
            this.a_txt     = game.add.text(10,10+5*decal, 'A : '     + this.a_count  , style2);
            this.b_txt     = game.add.text(10,10+6*decal, 'B : '     + this.b_count  , style2);
        },

update: function() {
        this.score_txt.text = 'Score : ' + this.score_general;
        this.cu_txt.text    = 'Cu : '    + this.cu_count;
        this.zn_txt.text    = 'Zn : '    + this.zn_count;
        this.na_txt.text    = 'Na : '    + this.na_count; 
        this.cl_txt.text    = 'Cl : '    + this.cl_count; 
        this.a_txt.text     = 'A : '     + this.a_count ; 
        this.b_txt.text     = 'B : '     + this.b_count ; 
        },

addMatch2: function(elem_name, count) {
        if(elem_name=='CU'){
            this.cu_count = this.cu_count + count;
        }else if(elem_name=='ZN'){
            this.zn_count = this.zn_count + count;
        }else if(elem_name=='NA'){
            this.na_count = this.na_count + count;
        }else if(elem_name=='CL'){
            this.cl_count = this.cl_count + count;
        }else if(elem_name=='A'){
            this.a_count = this.a_count + count;
        }else if(elem_name=='B'){
            this.b_count = this.b_count + count;
        }
    },

addMatch: function(countHoriz, countVert, elem_name) {
    if(countHoriz < MATCH_MIN){
        this.score_general = this.score_general + countVert;
        this.addMatch2(elem_name, 1);
    }else if (countVert < MATCH_MIN){
        this.score_general = this.score_general + countHoriz;
        this.addMatch2(elem_name, 2);
    }else{
        this.score_general = this.score_general + (countHoriz + countVert)*3;
        this.addMatch2(elem_name, 3);
    }
    }
};
