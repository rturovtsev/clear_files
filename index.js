const fs = require('fs');
const config = require('./config');
const path = config.path;
const fileExt = config.files;
let files = [];

async function makeCleaner() {
    const files = await readData();
    await loopFile(files);
    return result();
}

makeCleaner().catch(err => console.log(err)).then(resp => console.log(`Removed ${resp} files`));

function readData() {
    return new Promise((resolve, reject) => {
        fs.readdir(path, 'utf-8', (err, files) => {
            if (err) reject(new Error(err.message));
            resolve(files);
        });
    });
}

function loopFile(arr = []) {
    let iteration = 0;

    return new Promise((resolve, reject) => {
        if (arr.length > 0) {
            arr.forEach((file) => {
                let pathfile = path + file;

                fs.stat(pathfile, (err, stats) => {
                    iteration++;

                    if (err) reject(new Error(err.message));

                    if (stats.isFile()) {
                        let regex = new RegExp(`\.${fileExt}$`);

                        if (regex.test(file)) {
                            files.push(file);

                            if (iteration === arr.length) {
                                resolve();
                            }
                        }
                    } else {
                        if (iteration === arr.length) {
                            resolve();
                        }
                    }
                });
            });
        } else {
            resolve();
        }
    });
}

function result() {
    return new Promise((resolve, reject) => {
        if (files.length > 0) {
            let iteration = 0;

            console.log(files.length + " file(s) will be deleted.");

            files.forEach(file => {
                let pathfile = path + file;

                fs.unlink(pathfile, (err) => {
                    if (err) reject(new Error(err.message));
                    iteration++;

                    if (iteration === files.length) {
                        resolve(files.length);
                    }
                })
            });
        } else {
            resolve(0);
        }
    });
}
