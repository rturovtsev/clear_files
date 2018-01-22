const fs = require('fs');
const config = require('./config');
const async = require('async');
const path = config.path;
const fileExt = config.files;

async.waterfall([
    function readData(callback) {
        fs.readdir(path, 'utf-8', (err, files) => {
            callback(err, files);
        });
    },
    function loopFile(files, callback) {
        files.forEach((file) => {
            callback(null, file);
        });
    },
    function checkFile(file, callback) {
        let pathfile = path + file;

        fs.stat(pathfile, function (err, stats) {
            callback(err, stats, file, pathfile);
        });
    },
    function readData(stats, file, pathfile, callback) {
        if (stats.isFile()) {
            let regex = new RegExp(`\.${fileExt}$`);

            if (regex.test(file)) {
                fs.unlink(pathfile, (err) => {
                    callback(err,`Remove ${pathfile}`);
                })
            } else {
                callback(null, "Files not found");
            }
        }
    }
], (err, result) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log(result);
    }
});
