CrystalCrush.Home = function(){//game){
    //this.game = game;
}

CrystalCrush.Home.prototype = {
create : function () {

	     var background = game.add.sprite(0,0, 'backgroundHome');
	     background.width = canvasWidth;
             background.height = canvasHeight;

             var title = game.add.sprite(canvasWidth/4,canvasHeight/4, 'title');
             title.width = 1.5*canvasWidth/3;
             title.height = 1.5*canvasHeight/9;

             var b1 = game.add.button(canvasWidth/3,canvasHeight/3 + canvasHeight*0.24, 'play', this.actionToLvl1, this,0,0,0);
             b1.width = canvasWidth/3;
             b1.height = canvasHeight/9;
/*

             var b2 = game.add.button(canvasWidth/3,canvasHeight/3 + canvasHeight*0.24, 'lvl2', this.actionToLvl2, this,0,0,0);
             b2.width = canvasWidth/3;
             b2.height = canvasHeight/9;

             var b3 = game.add.button(canvasWidth/3,canvasHeight/3 + canvasHeight*0.36, 'lvl3', this.actionToLvl3, this,0,0,0);
             b3.width = canvasWidth/3;
             b3.height = canvasHeight/9;

            */
             var b4 = game.add.button(canvasWidth/3,canvasHeight/3 + canvasHeight*0.36, 'highscore_img', this.actionToHighScore, this,0,0,0);
             b4.width = canvasWidth/3;
             b4.height = canvasHeight/9;

	     var b5 = game.add.button(canvasWidth/3,canvasHeight/3 + canvasHeight*0.48, 'about', this.actionToAbout, this,0,0,0);
             b5.width = canvasWidth/3;
             b5.height = canvasHeight/9;
             
             var enB = game.add.button(canvasWidth * 0.9,margin, 'en', this.toEnglish, this,0,0,0);
             enB.width = canvasHeight * 0.05;
             enB.height = canvasHeight * 0.05;
             
             var frB = game.add.button(canvasWidth * 0.95,margin, 'fr', this.toFrench, this,0,0,0);
             frB.width = canvasHeight * 0.05;
             frB.height = canvasHeight * 0.05;

         },
update : function () {},
actionToLvl1 : function(){
    this.game.state.start('lvl1', CrystalCrush.Lvl1);
},
actionToLvl2 : function(){
    //this.game.state.start('lvl2', CrystalCrush.Lvl2);
},
actionToLvl3 : function(){
    //this.game.state.start('lvl3', CrystalCrush.Lvl3);
},
actionToAbout : function(){
    //Show about page?
},
actionToHighScore : function(){
    this.game.state.start('highscore');  //, CrystalCrush.HighScore);
},
    toEnglish: function() {
        CrystalCrush.language = new Language.English();
        this.game.state.start('preloader');
    },
    toFrench: function() {
        CrystalCrush.language = new Language.French();
        this.game.state.start('preloader');
    }
}

