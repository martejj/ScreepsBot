
// Creep structures object
// Type : { parts : { PART1 : "2x+1", ...}, levelCosts: { 1 : 200, ... } }

module.exports = {

    /**
     * @param {creepStructure} creepStructure Type : { parts : { PART1 : "2x+1", ...}, levelCosts: { 1 : 200, ... } }
     * @param {spawn} spawn from Memory.spawn[]
     * @returns {currentLevel} The level at which spawn can spawn the creepStructure
     */
    resolveCreepLevel(creepStructure, spawn){
        var maxEnergy = spawn.energyCapacity;
        var currentLevel = 0;
        for(var level in creepStructure.levelCosts){
            if(creepStructure.levelCosts[level] <= maxEnergy){
                currentLevel = level;
            }else{
                return currentLevel;
            }
        }
        return currentLevel;
    },

    /**
     * 
     * @param {*} creepStructure object
     * @param {*} level Integer level
     */
    resolveCreepStructure(creepStructure, level){
        var body = [];
        for(var part in creepStructure.parts){
            var eq = creepStructure.parts[part].replace("x", level);
            var sum = eval(eq);
            for(var i = sum; i != 0; i--){
                body.push(part.toLowerCase());
            }
        }
        return body;
    },

    /**
     * Creates a creep body that can be spawned at the spawn given
     * @returns
     * @param {*} type 
     * @param {*} spawn 
     */
    createCreepBody(type, spawn){
        var creepStructure = Memory.creepStructures[type];
        return this.resolveCreepStructure(creepStructure, this.resolveCreepLevel(creepStructure, spawn));
    },
// Type : { parts : { PART1 : "2x+1", ...}, levelCosts: { 1 : 200, ... } }

    /**
     * Turns the equations in memory into costs
     * @param {*} creepStructure creepStructure to initialise
     */
    initializeCreepStructure(creepStructure){

        for(var x = 0; x < 20; x++){

            var levelCost = 0;

            for(var part in creepStructure.parts){
                var eq = creepStructure.parts[part];
                levelCost += eval(eq)*BODYPART_COST[part.toLowerCase()];
            }
            creepStructure.levelCosts[x] = levelCost;
        }
    },

    //Harvester: {parts : { move: "x", work: "2*x", carry: "1"}, levelCosts: {} };
    /**
     * Puts all data needed into Memory for initialiseCreepStructure to use
     * @param {*} type Name
     * @param {*} newParts e.g. { move: "x", work: "2*x", carry: "1"}
     */
    createCreepStructure(type, newParts){
        console.log("Updating creepStructure of " + type);
        if(!Memory.creepStructures){
            Memory.creepStructures = {};
        }

        Memory.creepStructures[type] = {};
        Memory.creepStructures[type].parts = {};
        Memory.creepStructures[type].levelCosts = {};
        Memory.creepStructures[type].parts = newParts;
        this.initializeCreepStructure(Memory.creepStructures[type])
    }
}