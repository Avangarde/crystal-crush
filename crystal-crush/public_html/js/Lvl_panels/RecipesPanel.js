RecipesPanel = function(game, x, y, width, height, lvl) {

    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.lvl = lvl;
    this.background;

    this.buttons = [];
};
RecipesPanel.prototype = {
    create: function() {
        this.background = game.add.sprite(this.x, this.y, 'recipesPanel');
        this.background.width = this.width;
        this.background.height = this.height;

        var buttonX = [];
        var buttonY = [];
        for(var i = 0 ; i<4 ; i++){
           buttonX[i] = this.x;
           buttonY[i] = this.y + i* this.height/4;
        }

        for(var i = 0 ; i<4 ; i++){
            this.buttons[0] = game.add.button(buttonX[i], buttonY[i], 'recipe1', this.openPopUp, this, 0, 0, 0);
            this.buttons[0].height = this.height/4;
            
        }
        /*
    switch(this.lvl){
        case 1:
            button
            this.button1 = this.game.add.button( 
        case 2:
        case 3:
        default:
            break;
        }
        */
    },
    update: function() {
    },
    openPopUp: function(){
        console.log("open popup");
    }
}
