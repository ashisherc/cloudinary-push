#!/usr/bin/env node
const request = require('request');
const fs = require('fs');
const program = require('commander');
const ProgressBar = require('progress');

const db = require('./db');


program
    .command('config')
    .option('-p, --preset <preset>', 'Set preset name with config option.')
    .option('-c, --cloudname <cloudname>', 'Set cloud name with config option.')
    .action(function (command) {
        if (!(command.cloudname && command.preset)) {
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
    .action(function (command) {
        db.resetConfig();
        console.log("Credentials are removed.");
    })

program
    .command('*')
    .arguments('<file>')
    .action(function (file) {
        const config = db.getConfig();
        const cloudName = config.cloudName;
        const preset = config.preset;
        if (!(cloudName && preset)) {
            console.log('Please set cloud name and preset with config command.');
            return;
        }
        const formData = {
            upload_preset: preset,
            file: fs.createReadStream(file)
        }
        const fileSize = fs.statSync(file).size;
        const fileStream = formData.file;
        const barOpts = {
            width: 50,
            total: fileSize,
            clear: true
        };
        const bar = new ProgressBar(' uploading [:bar] :percent :etas', barOpts);
        fileStream.on('data', function (chunk) {
            bar.tick(chunk.length);
        });

        const url = "https://api.cloudinary.com/v1_1/" + cloudName + "/image/upload";
        request.post({ url: url, formData: formData }, function optionalCallback(err, httpResponse, body) {
            if (err) {
                return console.error('upload failed:', err);
            }
            console.log('Upload successful!');
            var data = JSON.parse(body);
            console.log(data.url);
            console.log(data.secure_url);
        });
    })

program.parse(process.argv);