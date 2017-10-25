const fs = require('fs');

module.exports.getConfig = function () {
    const config = JSON.parse(fs.readFileSync('./db.json'));
    return config;
}

module.exports.storeConfig = function(config){
    fs.writeFileSync('./db.json', JSON.stringify(config));
}

module.exports.resetConfig = function(){
    const config = {};
    module.exports.storeConfig(config);
}