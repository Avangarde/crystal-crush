
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

         },
create : function () {
             var title = game.add.sprite(0,0, 'title');
             title.width = canvasWidth;
             title.height = canvasHeight*0.2;

             var b1 = game.add.button(0,canvasHeight*0.2, 'lvl1', this.actionToLvl1, this,0,0,0);
             b1.width = canvasWidth;
             b1.height = canvasHeight*0.2;

             var b2 = game.add.button(0,canvasHeight*0.4, 'lvl2', this.actionToLvl2, this,0,0,0);
             b2.width = canvasWidth;
             b2.height = canvasHeight*0.2;

             var b3 = game.add.button(0,canvasHeight*0.6, 'lvl3', this.actionToLvl3, this,0,0,0);
             b3.width = canvasWidth;
             b3.height = canvasHeight*0.2;

             var b4 = game.add.button(0,canvasHeight*0.8, 'highscore', this.actionToHighScore, this,0,0,0);
             b4.width = canvasWidth;
             b4.height = canvasHeight*0.2;
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

