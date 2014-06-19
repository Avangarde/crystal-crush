AtomicCrush.Lvl3 = function() {
};

AtomicCrush.Lvl3.prototype = {
    preload: function() {
        this.game.numMoves = 30;
        this.game.targetScore = 3500;
        this.game.activeLevel = "lvl3";
        this.game.nextLevel = "home";
        this.game.backGround = "backgroundLvl3";
        this.game.welcomeImg = "welcomeLvl3";

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
