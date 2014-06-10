
//////////////
//////////HOME
//////////////

CrystalCrush.Home = function(){//game){
    //this.game = game;
}

CrystalCrush.Home.prototype = {

preload: function () {
             game.load.image('title','assets/Home/Title.png');
             game.load.image('lvl1','assets/Home/lvl1.png');
             game.load.image('lvl2','assets/Home/lvl2.png');
             game.load.image('lvl3','assets/Home/lvl3.png');
             game.load.image('highscore','assets/Home/highscore.png');
	     game.load.image('background', 'assets/Home/backgroundTitleScreen.png');

         },
create : function () {

	     var background = game.add.sprite(0,0, 'background');
	     background.width = canvasWidth;
             background.height = canvasHeight;

             var title = game.add.sprite(canvasWidth/4,canvasHeight/4, 'title');
             title.width = 1.5*canvasWidth/3;
             title.height = 1.5*canvasHeight/9;

             var b1 = game.add.button(canvasWidth/3,canvasHeight/3 + canvasHeight*0.12, 'lvl1', this.actionToLvl1, this,0,0,0);
             b1.width = canvasWidth/3;
             b1.height = canvasHeight/9;

             var b2 = game.add.button(canvasWidth/3,canvasHeight/3 + canvasHeight*0.24, 'lvl2', this.actionToLvl2, this,0,0,0);
             b2.width = canvasWidth/3;
             b2.height = canvasHeight/9;

             var b3 = game.add.button(canvasWidth/3,canvasHeight/3 + canvasHeight*0.36, 'lvl3', this.actionToLvl3, this,0,0,0);
             b3.width = canvasWidth/3;
             b3.height = canvasHeight/9;

             var b4 = game.add.button(canvasWidth/3,canvasHeight/3 + canvasHeight*0.48, 'highscore', this.actionToHighScore, this,0,0,0);
             b4.width = canvasWidth/3;
             b4.height = canvasHeight/9;
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
actionToHighScore : function(){
    //this.game.state.start('highscore', CrystalCrush.HighScore);
}
}

