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
    }
}
