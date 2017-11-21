const fs = require('fs');
const path = require('path');

module.exports.getConfig = function () {
    const config = JSON.parse(fs.readFileSync(path.join(__dirname, './db.json')));
    return config;
}

module.exports.storeConfig = function(config){
    fs.writeFileSync(path.join(__dirname, './db.json'), JSON.stringify(config));
}

module.exports.resetConfig = function(){
    const config = {};
    module.exports.storeConfig(config);
}