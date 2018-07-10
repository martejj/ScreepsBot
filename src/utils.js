module.exports = {

    contains(list, thing) {

        for(var object in list){
            if(object == thing){
                return true;
            }
        }
        return false;
    },

    updateMemoryModule(from, to){

        for(var memoryObject in to){
            if(!this.contains(from, memoryObject)){
                delete to[memoryObject];
            }
        }

        for(var memoryObject in from){
            if(!this.contains(to, memoryObject)){
                to[memoryObject] = {};
            }
        }
    }
}