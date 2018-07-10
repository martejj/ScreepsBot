
//var utils = require('utils');

module.exports = {
    // Memory, Room, {sources : { id : { x: 0, y: 0, harvestSites: { 1: {x: 0, y: 0, taken: creepID} }, id { }, ... } }
    // Can then check if rate of farming == 3000/300 res/tick, if not create more creeps to farm
    updateSources(){
        for(let room in Memory.rooms){
            Memory.rooms[room].sources = {};
            let sourcesFound = Game.rooms[room].find(FIND_SOURCES);

            for(let source in sourcesFound) {

                let id = sourcesFound[source].id;

                Memory.rooms[room].sources[id] = {};

                let sourcePos = sourcesFound[source].pos;
                Memory.rooms[room].sources[id].pos = sourcePos;

                let objectsInArea = Game.rooms[room].lookAtArea(sourcePos.y-1, sourcePos.x-1, sourcePos.y+1, sourcePos.x+1, true);


                let plainsInArea = [];

                let swampsInArea = [];

                for(let objectInArea in objectsInArea){

                    if(objectsInArea[objectInArea].type == "terrain"){

                        if(objectsInArea[objectInArea].terrain == "plain"){
                            plainsInArea.push(objectsInArea[objectInArea]);
                        }else if(objectsInArea[objectInArea].terrain == "swamp"){
                            swampsInArea.push(objectsInArea[objectInArea]);
                        }
                    }
                }

                Memory.rooms[room].sources[id].harvestSites = {};

                let i = 0;
                for(let plain in plainsInArea){

                    Memory.rooms[room].sources[id].harvestSites[i] = {};
                    Memory.rooms[room].sources[id].harvestSites[i].pos = {};
                    Memory.rooms[room].sources[id].harvestSites[i] = {x: plainsInArea[plain].x, y:  plainsInArea[plain].y};

                    Memory.rooms[room].sources[id].harvestSites[i].occupied = false;

                    i++;
                }
                //TODO place in order of closeness
                for(let swamp in swampsInArea) {

                    Memory.rooms[room].sources[id].harvestSites[i] = {};
                    Memory.rooms[room].sources[id].harvestSites[i].pos = {};
                    Memory.rooms[room].sources[id].harvestSites[i].pos = {
                        x: plainsInArea[swamp].x,
                        y: plainsInArea[swamp].y
                    };

                    Memory.rooms[room].sources[id].harvestSites[i].occupied = false;

                    i++;
                }

                console.log("Created source memory for " + id);

            }
        }
    },

    updateMinerals(){
        for(let room in Memory.rooms){
            Memory.rooms[room].minerals = {};
            let mineralsFound = Game.rooms[room].find(FIND_MINERALS);

            for(let mineral in mineralsFound) {

                let id = mineralsFound[mineral].id;

                Memory.rooms[room].minerals[id] = {};

                let mineralPos = mineralsFound[mineral].pos;
                Memory.rooms[room].minerals[id].pos = mineralPos;

                let objectsInArea = Game.rooms[room].lookAtArea(mineralPos.y-1, mineralPos.x-1, mineralPos.y+1, mineralPos.x+1, true);


                let plainsInArea = [];

                let swampsInArea = [];

                for(let objectInArea in objectsInArea){

                    if(objectsInArea[objectInArea].type == "terrain"){

                        if(objectsInArea[objectInArea].terrain == "plain"){
                            plainsInArea.push(objectsInArea[objectInArea]);
                        }else if(objectsInArea[objectInArea].terrain == "swamp"){
                            swampsInArea.push(objectsInArea[objectInArea]);
                        }
                    }
                }

                Memory.rooms[room].minerals[id].harvestSites = {};

                let i = 0;
                for(let plain in plainsInArea){

                    Memory.rooms[room].minerals[id].harvestSites[i] = {};
                    Memory.rooms[room].minerals[id].harvestSites[i].pos = {};
                    Memory.rooms[room].minerals[id].harvestSites[i] = {x: plainsInArea[plain].x, y:  plainsInArea[plain].y};

                    Memory.rooms[room].minerals[id].harvestSites[i].occupied = false;

                    i++;
                }

                for(let swamp in swampsInArea) {

                    Memory.rooms[room].minerals[id].harvestSites[i] = {};
                    Memory.rooms[room].minerals[id].harvestSites[i].pos = {};
                    Memory.rooms[room].minerals[id].harvestSites[i].pos = {
                        x: plainsInArea[swamp].x,
                        y: plainsInArea[swamp].y
                    };

                    Memory.rooms[room].minerals[id].harvestSites[i].occupied = false;

                    i++;
                }

                console.log("Created mineral memory for " + id);

            }
        }
    }
}