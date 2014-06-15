CrystalCrush.Lvl3 = function() {
};

CrystalCrush.Lvl3.prototype = {
    preload: function() {
        this.game.numMoves = 30;
        this.game.targetScore = 2500;
        this.game.numLevel = 3;
        this.game.activeLevel = "lvl3";
        this.game.nextLevel = "home";

        elemNames = [CU, ZN, FE, C, AU, AL];
        powerNames = [BRASS, STEEL, GOLD, ALUMINIUM];
        powerA = BRASS;
        powerB = STEEL;
        powerC = GOLD;
        powerD = ALUMINIUM;
        level.preload();
    },
    create: function() {
        level.create();
    },
    update: function() {
        level.update();
    }
};
