var BUTTONWIDTH = 408;
var BUTTONHEIGHT = 80;
var buttonGame;

ScorePanel = function(game, x, y, width, height) {

    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.background;

    this.score_general = 0;
    this.cu_count = 0;
    this.zn_count = 0;
    this.na_count = 0;
    this.cl_count = 0;
    this.a_count = 0;
    this.b_count = 0;

    this.score_txt;
    this.cu_txt;
    this.zn_txt;
    this.na_txt;
    this.cl_txt;
    this.a_txt;
    this.b_txt;

    this.img_group;

    this.cu_img;
    this.zn_img;
    this.na_img;
    this.cl_img;
    this.a_img;
    this.b_img;

};

ScorePanel.prototype = {
    preload: function() {
        game.load.image('scorePanelBackground', 'assets/scorePanel.png');
        game.load.spritesheet('createElement', 'assets/buttons/button_create_element.png', BUTTONWIDTH, BUTTONHEIGHT);
        game.load.image('scoreLabel', 'assets/labels/scoreLabel.png');
    },
    create: function() {
        // Background
        this.background = game.add.sprite(this.x, this.y, 'scorePanelBackground');
        this.background.width = this.width;
        this.background.height = this.height;

        var buttonWidth = scorePanel.width - 2 * margin;
        var buttonHeight = buttonWidth * BUTTONHEIGHT / BUTTONWIDTH;
        buttonGame = game.add.button(2 * margin, scorePanel.height - margin - buttonHeight, 'createElement', actionOnClick, this, 2, 1, 0);
        buttonGame.height = buttonHeight;
        buttonGame.width = buttonWidth;

        // ScoreLabel
        this.scoreLabel = game.add.sprite(this.x + margin, this.y + margin, 'scoreLabel');
        var tmp = this.scoreLabel.width;
        this.scoreLabel.width = this.width - 2 * margin;
        this.scoreLabel.height = this.scoreLabel.height / tmp * this.scoreLabel.width;


        //Score
        this.score_txt = game.add.text(this.x + this.width * 0.4, this.y + 2 * margin, '' + this.score_general, style1);
        var tmp = this.score_txt.height;
        this.score_txt.height = this.scoreLabel.height - 2 * margin;
        this.score_txt.width = this.score_txt.width / tmp * this.score_txt.height;


        //Elems_img
        var img_size = this.width * 0.20;

        var X1 = this.x + this.width * 0.15;
        var X2 = this.x + this.width * 0.55;
        var inter_img = this.width * 0.2;
        var startY = this.y + this.scoreLabel.height + margin;// + inter_img;

        this.img_group = game.add.group();

        this.cu_img = this.img_group.create(X1, startY, CU);
        this.cu_img.width = img_size;
        this.cu_img.height = img_size;
        this.cu_img.name = CU;
        this.cu_img.inputEnabled = true;
        this.cu_img.events.onInputDown.add(this.sendElementToAlchemy);

        this.zn_img = this.img_group.create(X2, startY, ZN);
        this.zn_img.width = img_size;
        this.zn_img.height = img_size;
        this.zn_img.name = ZN;
        this.zn_img.inputEnabled = true;
        this.zn_img.events.onInputDown.add(this.sendElementToAlchemy);

        this.na_img = this.img_group.create(X1, startY + inter_img, NA);
        this.na_img.width = img_size;
        this.na_img.height = img_size;
        this.na_img.name = NA;
        this.na_img.inputEnabled = true;
        this.na_img.events.onInputDown.add(this.sendElementToAlchemy);

        this.cl_img = this.img_group.create(X2, startY + inter_img, CL);
        this.cl_img.width = img_size;
        this.cl_img.height = img_size;
        this.cl_img.name = CL;
        this.cl_img.inputEnabled = true;
        this.cl_img.events.onInputDown.add(this.sendElementToAlchemy);

        this.a_img = this.img_group.create(X1, startY + 2 * inter_img, A);
        this.a_img.width = img_size;
        this.a_img.height = img_size;
        this.a_img.name = A;
        this.a_img.inputEnabled = true;
        this.a_img.events.onInputDown.add(this.sendElementToAlchemy);

        this.b_img = this.img_group.create(X2, startY + 2 * inter_img, B);
        this.b_img.width = img_size;
        this.b_img.height = img_size;
        this.b_img.name = B;
        this.b_img.inputEnabled = true;
        this.b_img.events.onInputDown.add(this.sendElementToAlchemy);


        //Elems_count
        this.cu_txt = game.add.text(X1 + img_size, startY + img_size / 2, '' + this.cu_count, style1);
        var tmp = this.cu_txt.height;
        this.cu_txt.height = img_size / 2;
        this.cu_txt.width = this.cu_txt.width / tmp * this.cu_txt.height;

        this.zn_txt = game.add.text(X2 + img_size, startY + img_size / 2, '' + this.zn_count, style1);
        var tmp = this.zn_txt.height;
        this.zn_txt.height = img_size / 2;
        this.zn_txt.width = this.zn_txt.width / tmp * this.zn_txt.height;

        this.na_txt = game.add.text(X1 + img_size, startY + inter_img + img_size / 2, '' + this.na_count, style1);
        var tmp = this.na_txt.height;
        this.na_txt.height = img_size / 2;
        this.na_txt.width = this.na_txt.width / tmp * this.na_txt.height;

        this.cl_txt = game.add.text(X2 + img_size, startY + inter_img + img_size / 2, '' + this.cl_count, style1);
        var tmp = this.cl_txt.height;
        this.cl_txt.height = img_size / 2;
        this.cl_txt.width = this.cl_txt.width / tmp * this.cl_txt.height;

        this.a_txt = game.add.text(X1 + img_size, startY + 2 * inter_img + img_size / 2, '' + this.a_count, style1);
        var tmp = this.a_txt.height;
        this.a_txt.height = img_size / 2;
        this.a_txt.width = this.a_txt.width / tmp * this.a_txt.height;

        this.b_txt = game.add.text(X2 + img_size, startY + 2 * inter_img + img_size / 2, '' + this.b_count, style1);
        var tmp = this.b_txt.height;
        this.b_txt.height = img_size / 2;
        this.b_txt.width = this.b_txt.width / tmp * this.b_txt.height;

    },
    update: function() {
        this.score_txt.text = this.score_general;
        this.cu_txt.text = this.cu_count;
        this.zn_txt.text = this.zn_count;
        this.na_txt.text = this.na_count;
        this.cl_txt.text = this.cl_count;
        this.a_txt.text = this.a_count;
        this.b_txt.text = this.b_count;
        this.setButtonFrame();
    },
    addMatch2: function(elem_name, count) {
        if (elem_name === 'CU') {
            this.cu_count = this.cu_count + count;
        } else if (elem_name === 'ZN') {
            this.zn_count = this.zn_count + count;
        } else if (elem_name === 'NA') {
            this.na_count = this.na_count + count;
        } else if (elem_name === 'CL') {
            this.cl_count = this.cl_count + count;
        } else if (elem_name === 'A') {
            this.a_count = this.a_count + count;
        } else if (elem_name === 'B') {
            this.b_count = this.b_count + count;
        }
    },
    addMatch: function(countHoriz, countVert, elem_name) {
        if (countHoriz < MATCH_MIN) {
            this.score_general = this.score_general + countVert;
            this.addMatch2(elem_name, 1);
        } else if (countVert < MATCH_MIN) {
            this.score_general = this.score_general + countHoriz;
            this.addMatch2(elem_name, 1);
        } else {
            this.score_general = this.score_general + (countHoriz + countVert) * 3;
            this.addMatch2(elem_name, 1);
        }
    },
    sendElementToAlchemy: function(element) {
        alchemyPanel.receiveElement(element.name);
    },
    decreaseElement: function(elem_name) {
        //TODO
        return true;
    },
    setButtonFrame: function() {
        if (inAlchemyPanel) {
            buttonGame.setFrames(0,0,0,0);
        } else {
            buttonGame.setFrames(2,1,1,1);
        }
    }
};
