const fs = require('fs');
const recursive = require('recursive-readdir');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

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

                // define
                const dom = new JSDOM(context.text);
                const sml = `${context.settings.sml_prefix}-define`;
                const sml_val = `${context.settings.sml_prefix}-define-value`;
                dom.window.document.querySelectorAll(`[${sml}]`).forEach((d) => {
                    const d_sml = d.getAttribute(sml);
                    const d_sml_val = d.getAttribute(sml_val);
                    if(!d_sml_val) return;
                    context.data[d_sml] = require('./data_conv')(d_sml_val, context);
                });

                if (context.settings.target_extension.indexOf(context.ext) >= 0) {
                    callback();
                } else {
                    try { fs.mkdirSync(context.path_target_dir, { "recursive": true }) } catch (e) { }
                    fs.copyFileSync(context.path, context.path_target);
                }
            }
        }
    });
}
