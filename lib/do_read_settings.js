const fs = require('fs');

//read_settings
module.exports = (context, callback) => {
    if (!fs.existsSync('data/settings.json')) { if (callback) callback(); return; }
    Object.assign(context.settings, JSON.parse(fs.readFileSync('data/settings.json')));
    if (callback) callback();
}
