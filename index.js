const fs = require('fs');
const config = require('./config');
const path = config.path;
const fileExt = config.files;

async function makeCleaner() {
    const files = await readData();
    return await loopFile(files);
}

makeCleaner().catch(err => console.log(err)).then(resp => console.log(`Removed file: ${resp}`));

function readData() {
    return new Promise((resolve, reject) => {
        fs.readdir(path, 'utf-8', (err, files) => {
            if (err) reject(new Error(err.message));
            resolve(files);
        });
    });
}

function loopFile(arr = []) {
    return new Promise((resolve, reject) => {
        arr.forEach((file) => {
            let pathfile = path + file;

            fs.stat(pathfile, (err, stats) => {
                if (err) reject(new Error(err.message));

                if (stats.isFile()) {
                    let regex = new RegExp(`\.${fileExt}$`);

                    if (regex.test(file)) {
                        fs.unlink(pathfile, (err) => {
                            if (err) reject(new Error(err.message));
                            resolve(pathfile);
                        })
                    }
                }
            });
        });
    });
}
