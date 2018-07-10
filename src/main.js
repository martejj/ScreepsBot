
var script = require('script');

main = function () {
    console.log("---------------------------" + Game.time + "-----------------------------------------------------------------------------");
    script.run();
}

module.exports.loop = function () { main(); }