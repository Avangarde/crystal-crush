
CrystalCrush.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

CrystalCrush.Preloader.prototype = {

	preload: function () {
	},

	create: function () {
		this.state.start('home');

	},

	update: function () {
	}

};
