module.exports = class Proto extends (require('./smloabs')) {
    conv() {
        const sml_attr = `${this.context.settings.sml_prefix}-attr`;
        this.context.dom.window.document.querySelectorAll(`[${sml_attr}]`).forEach((d) => {
            if (!this.check_target(d)) return;
            const d_attr = d.getAttribute(sml_attr);
            if (!d_attr) return;
            for (let attr_skv of d_attr.split(';')) {
                if (attr_skv.split(':').length <= 1) continue;
                const key_name = attr_skv.split(':')[0].split('/')[0];
                const src_val = d.getAttribute(key_name);
                var pattern = null;
                if (attr_skv.split(':')[0].split('/').length > 1) {
                    pattern = attr_skv.split(':')[0].split('/')[1];
                }
                var val = require('../data_conv')(attr_skv.split(':')[1], this.context);
                if (pattern) {
                    val = src_val.replace(pattern, val);
                }
                d.setAttribute(key_name, val);
            }
        });
    }
}
