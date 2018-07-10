
var utils = require('utils');
var memorymanager = require('memorymanager');

module.exports = {

    run() {
        console.log("Hello");

        memorymanager.onTick();

    }
}