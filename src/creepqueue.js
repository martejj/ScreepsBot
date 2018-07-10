
var utils = require('utils');

// creepQueue : { name: { body : [PART, PART, PART], role: "", Mem:, name: ""  }, name : ... }

module.exports = {

    /**
     * @param {*} spawnName The spawn to add the creep to
     * @param {*} respawnObj The respawn object to add
     */
    addToQueue(spawnName, respawnObj){
        if(!Memory.spawns[spawnName].creepQueue){
            Memory.spawns[spawnName].creepQueue = {};
        }
        Memory.spawns[spawnName].creepQueue[respawnObj.name] = respawnObj;
    },

    //TODO attempt to spawn whenever spawner is given energy, time = time after natural regen
    /**
     * 
     * @param {*} spawn spawn to spawn at
     */
    spawnNextInQueue(spawn){

        for(let name in Memory.spawns[spawn].creepQueue){
            let respawnObj = Memory.spawns[spawn].creepQueue[name];

            if(!respawnObj){
                console.log(spawn + " has an empty creepQueue");
                break;
            }

            if(Game.spawns[spawn].spawnCreep(respawnObj.body, respawnObj.name, {memory : respawnObj.memory, dryRun : true} )){
                //Game.spawns[spawn].spawnCreep(respawnObj.body, respawnObj.name, {memory : respawnObj.memory} )
                console.log("Spawning " + respawnObj.name + " at " + spawn);
                delete Memory.spawns[spawn].creepQueue[name];
                Memory.spawns[spawn].nextSpawnTime = Game.spawns[spawn].needTime + Game.time;
                break;
            }
            console.log("Unable to spawn " + respawnObj.name + " at " + spawn);
            break;
        }

    },

    /**
     * To be called on tick to do updates pertinent to creepqueue
     */
    onTick(){
        for(let spawn in Memory.spawns){
            if(this.queueExists(spawn)){
                if(Game.time >= Memory.spawns[spawn].nextSpawnTime || spawn.spawning == null){
                    this.spawnNextInQueue(spawn);
                }else{
                    console.log(spawn + " is too busy to spawn");
                }
            }else{
                console.log(spawn + " has no creeps in queue")
            }
        }
    },

    getNextInQueue(spawnName) {

        let respawnObj;

        for (let name in Memory.spawns[spawnName].creepQueue) {
            respawnObj = Memory.spawns[spawnName].creepQueue[name];
            break;
        }

        return respawnObj;
    },

    queueExists(spawnName){
        for (let name in Memory.spawns[spawnName].creepQueue) {
            console.log(name);
            return true
            break;
        }
        return false;
    }
}