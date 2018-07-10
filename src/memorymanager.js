
var utils = require('utils');

var creepfactory = require('creepfactory')

var resourcemanager = require('resourceManager')

var creepqueue = require('creepqueue')

module.exports = {

    onTick() {

        if(Memory.test == true){
            Memory.test = false;

            //name: { body : [PART, PART, PART], role: "", Mem:  }
            //{ body : [PART, PART, PART], role: "", Mem:, name: ""  }
            creepqueue.addToQueue("Spawn_", { body : creepfactory.createCreepBody("Harvester", "Spawn1"), role: "Harvester", Mem:{}, name: "Harold"});

        }


        if(Memory.updateFlag == true){
            Memory.updateFlag = false;

            this.updateMemory();
            this.updateCreepStructures();
            this.updateResources();
        }

        creepqueue.onTick()
    },

    updateMemory() {
        console.log("Updating Memory");
        //utils.updateMemoryModule(Game.rooms, Memory.rooms);
        //utils.updateMemoryModule(Game.creeps, Memory.creeps);
        //utils.updateMemoryModule(Game.spawns, Memory.spawns);

    },

    updateCreepStructures(){
        console.log("Updating creepStructures")
        creepfactory.createCreepStructure("Harvester", { move: "x", work: "2*x", carry: "1"});
        creepfactory.createCreepStructure("Mover", { move: "x", carry: "x"});
    },

    updateResources(){
        console.log("Updating resources")
        resourcemanager.updateSources();
        resourcemanager.updateMinerals();
    }
}