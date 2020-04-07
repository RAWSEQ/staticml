module.exports = class Proto extends (require('./smloabs')) {
    conv() {
        const sml_html = `${this.context.settings.sml_prefix}-html`;
        this.context.dom.window.document.querySelectorAll(`[${sml_html}]`).forEach((d) => {
            if (!this.check_target(d)) return;
            d.innerHTML = require('../data_conv')(d.getAttribute(sml_html), this.context);
        });
    }
}
