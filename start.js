const fs = require('fs');
let config = {};

fs.readFile('./config.json', 'utf-8', (err, data) => {
    if (err) {
        new Error(err);
    }

    config = JSON.parse(data);
    console.log(config);
});