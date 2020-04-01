const fs = require('fs');

// publish
module.exports = (context, callback) => {
    // mkdir
    try { fs.mkdirSync(context.path_target_dir, { "recursive": true }) } catch (e) { }
    // publish
    fs.writeFileSync(
        context.path_target,
        context.text_converted
    );
    if (callback) callback();
}
