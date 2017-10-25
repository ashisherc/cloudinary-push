#!/usr/bin/env node
const request = require('request');
const fs = require('fs');
const program = require('commander');

const db = require('./db');


program
    .command('config')
    .option('-p, --preset <preset>', 'Set preset name with config option.')
    .option('-c, --cloudname <cloudname>', 'Set cloud name with config option.')
    .action(function (command) {
        if(!(command.cloudname && command.preset)){
            console.log("Provide preset name with -p option and cloud name with -c.");
            return;
        }
        var config = {
            cloudName: command.cloudname,
            preset: command.preset
        }
        console.log("Credentials are set.");
        db.storeConfig(config);
    })

program
    .command('reset')
    .action(function(command){
        db.resetConfig();
        console.log("Credentials are removed.");
    })

program.parse(process.argv);