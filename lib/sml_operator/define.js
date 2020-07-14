module.exports = class Proto extends (require('./smloabs')) {
    conv() {
        const sml = `${this.context.settings.sml_prefix}-define`;
        const sml_val = `${this.context.settings.sml_prefix}-define-value`;
        this.context.dom.window.document.querySelectorAll(`[${sml}]`).forEach((d) => {
            if (!this.check_target(d)) return;
            const d_sml = d.getAttribute(sml);
            const d_sml_val = d.getAttribute(sml_val);
            if(!d_sml_val) return;
            this.context.data[d_sml] = require('../data_conv')(d_sml_val, this.context);
        });
    }
}
