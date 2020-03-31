const fs = require('fs');

//read_settings
module.exports = (context, callback) => {
    Object.assign(context.settings, JSON.parse(fs.readFileSync('data/settings.json')));
    if (callback) callback();
}
