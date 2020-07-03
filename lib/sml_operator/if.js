module.exports = class Proto extends (require('./smloabs')) {
    conv() {
        const sml_if = `${this.context.settings.sml_prefix}-if`;
        this.context.dom.window.document.querySelectorAll(`[${sml_if}]`).forEach((d) => {
            if (!this.check_target(d)) return;
            if (!require('../data_conv')(d.getAttribute(sml_if), this.context)) {
                d.remove();
            }
        });
    }
}
