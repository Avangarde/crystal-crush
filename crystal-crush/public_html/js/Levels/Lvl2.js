AtomicCrush.Lvl2 = function() {
};

AtomicCrush.Lvl2.prototype = {
    preload: function() {
        this.game.numMoves = 30;
        this.game.targetScore = 2000;
        this.game.activeLevel = "lvl2";
        this.game.nextLevel = "lvl3";
        this.game.backGround = "backgroundLvl2";
        this.game.welcomeImg = "welcomeLvl2";

        elemNames = [AL, O, CR, SI, TI, ZN];
        powerNames = [CORUNDUM, SAPPHIRE, RUBY, QUARTZ];
        powerA = CORUNDUM;
        powerB = SAPPHIRE;
        powerC = RUBY;
        powerD = QUARTZ;
        level.preload();
    },
    create: function() {
        level.create();
    },
    update: function() {
        level.update();
    }
};
