CrystalCrush.Lvl1 = function() {
};

CrystalCrush.Lvl1.prototype = {
    preload: function() {
        this.game.numMoves = 30;
        this.game.targetScore = 1500;
        this.game.numLevel = 1;
        this.game.activeLevel = "lvl1";
        this.game.nextLevel = "lvl2";
        this.game.backGround = "backgroundLvl1";

        elemNames = [NA, CL, C, H, O, CU];
        powerNames = [SALT, ICE, SUGAR];
        powerA = SALT;
        powerB = ICE;
        powerC = SUGAR;
        level.preload();
    },
    create: function() {
        level.create();
    },
    update: function() {
        level.update();
    }
};
