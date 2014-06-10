CrystalCrush.HighScore = function(game){
this.game = game;
}

CrystalCrush.HighScore.prototype = {

preload: function(){
    game.load.image('title','assets/Home/Title.png');
},

create: function(){
    var b1 = game.add.button(0,canvasHeight*0.2, 'title', this.actionToHome, this,0,0,0);
},

update : function () {},

actionToHome: function () {
    this.game.state.start('home', CrystalCrush.Home);
    }
    }
    
