// Example by https://twitter.com/awapblog
// Modified by Avantgarde

var Main = {};
function boot() {
    var game = new Phaser.Game(480, 320);
    game.state.add('preloader', CrystalCrush.Preloader, true);
    game.state.add('boot', CrystalCrush.Boot, true);
    game.state.add('home', CrystalCrush.Home, true);
    game.state.add('lvl1', CrystalCrush.Lvl1);
    game.state.add('lvl2', CrystalCrush.Lvl2);
    game.state.add('lvl3', CrystalCrush.Lvl3);
    game.state.add('highScore', CrystalCrush.HighScore);
}





//var game = new Phaser.Game(canvasWidth, canvasHeight, Phaser.AUTO, 'phaser-example', {preload: preload, create: create, update: update, render: render});



