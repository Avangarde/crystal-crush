AtomicCrush.Lvl1 = function() {
};

AtomicCrush.Lvl1.prototype = {
    preload: function() {
        this.game.numMoves = 30;
        this.game.targetScore = 1500;
        this.game.activeLevel = "lvl1";
        this.game.nextLevel = "lvl2";
        this.game.backGround = "backgroundLvl1";
        this.game.welcomeImg = "welcomeLvl1";

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
