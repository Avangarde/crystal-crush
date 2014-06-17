CrystalCrush.About = function(){//game){
    //this.game = game;
}

CrystalCrush.About.prototype = {
create : function () {

	     var background = game.add.sprite(0,0, 'backgroundHome');
	     background.width = canvasWidth;
             background.height = canvasHeight;

             var title = game.add.sprite(canvasWidth/4,canvasHeight/4, 'title');
             title.width = 1.5*canvasWidth/3;
             title.height = 1.5*canvasHeight/9;

             var b1 = game.add.button(canvasWidth/3,canvasHeight/3 + canvasHeight*0.24, 'play', this.actionToHome, this,0,0,0);
             b1.width = canvasWidth/3;
             b1.height = canvasHeight/9;

         },
update : function () {},
actionToHome : function(){
    this.game.state.start('home', CrystalCrush.Home);
}
}

