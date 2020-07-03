const fs = require('fs');
module.exports = (context, callback) => {
    context.text_converted = context.text;
    // pre_filter

    // ** /\/\/ include /\/\/ **

    context.text_converted = include_rep(context.text_converted, read_text, context);

    /*
        if (context.settings.filter) {
            for (let i in context.settings.filter) {
                context.text_converted = context.text_converted.split(i).join(context.settings.filter[i]);
            }
        }
    */

    context.path_target_base = context.path;
    context.path_target = context.path_target_base;
    context.path_target_dir = context.path_target.replace(/[\\\/][^\\\/]+$/, '');

    callback();
}

function include_rep(s, cb_replace, context) {
    const tn_head = '<!-- #' + context.settings.sml_prefix + '-include-';
    const tn_term = '<!-- #/' + context.settings.sml_prefix + '-include-';
    pl = conv_rn2code(s);
    m = pl.match(new RegExp('' + tn_head + '[^ ]+', 'g'));
    if (!m) return s;
    for (var i = 0; i < m.length; i++) {
        const code = m[i].replace(tn_head, '');
        pl = pl.replace(new RegExp(tn_head + code + ' -->(.*?)' + tn_term + code + ' -->', 'g'), tn_head + code + ' -->' + cb_replace(code, context) + tn_term + code + ' -->');
    }
    pl = conv_code2rn(pl);
    return pl;
}

function read_text(code, context) {
    const tn_head = '<!-- #' + context.settings.sml_prefix + '-include-';
    const tn_term = '<!-- #/' + context.settings.sml_prefix + '-include-';
    if (!code) return '$1';
    if (conv_path('template/' + code).indexOf(conv_path(context.path)) >= 0) return '$1';
    const path = code.replace(/\.html.*$/, '.html');
    if (!fs.existsSync('template/' + path)) return '$1';
    docs = fs.readFileSync('template/' + path, { 'encoding': context.settings.encoding.template || context.settings.encoding });
    docs = conv_rn2code(docs);
    docs = docs.replace(new RegExp('^.*' + tn_head + code + ' -->(.*?)' + tn_term + code + ' -->.*$', 'g'), '$1');
    return escape_regexp(docs);
}

function escape_regexp(text) {
    text = text.replace(/([\$])/g, "\\$1");
    return text;
}

function conv_path(s) {
    return s.replace("\\", "/");
}

function conv_rn2code(s) {
    return s.replace(/\r/g, '<##BR##>').replace(/\n/g, '<##BN##>');
}

function conv_code2rn(s) {
    return s.replace(/<##BR##>/g, '\r').replace(/<##BN##>/g, '\n');
}