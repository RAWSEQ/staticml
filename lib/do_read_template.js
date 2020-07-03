const fs = require('fs');
const recursive = require('recursive-readdir');

//do_read_template
module.exports = (context, callback, callback_none) => {
    recursive("template", [], (err, r) => {
        if (!r.length) {
            if(callback_none) callback_none();
        } else {
            for (var i = 0; i < r.length; i++) {
                context.path = r[i];
                context.text = fs.readFileSync(r[i], { 'encoding': context.settings.encoding.template || context.settings.encoding });
                context.ext = context.path.replace(/^.*\.(.+)/, '$1');
                context.path_target_base = context.path.replace(/^template([\/\\])/, 'public$1');
                context.path_target = context.path_target_base;
                context.path_target_dir = context.path_target.replace(/[\\\/][^\\\/]+$/, '');
                if (context.settings.target_extension.indexOf(context.ext) >= 0) {
                    callback();
                } else {
                    try { fs.mkdirSync(context.path_target_dir, { "recursive": true }) } catch (e) { }
                    fs.copyFileSync(context.path, context.path_target_dir);
                }
            }
        }
    });
}
