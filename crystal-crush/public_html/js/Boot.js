/* CrystalCrush = {
    score: 0,
    music: null,
    orientated: false
};
*/
CrystalCrush.Boot = function (game) {
    this.game = game;
};

CrystalCrush.Boot.prototype = {

    preload: function () {
    },

    create: function () {
    game.state.start('preloader');
    },

    gameResized: function (width, height) {
    },

    enterIncorrectOrientation: function () {
    },

    leaveIncorrectOrientation: function () {
    }

};
