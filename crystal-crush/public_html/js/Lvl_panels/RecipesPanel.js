RecipesPanel = function(game, x, y, width, height, lvl) {

    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.lvl = lvl;
    this.background;
};
RecipesPanel.prototype = {
    create: function() {
        this.background = game.add.sprite(this.x, this.y, 'recipesPanel');
        this.background.width = this.width;
        this.background.height = this.height;
    },
    update: function() {
    }
}
