module.exports = class Proto extends (require('./smloabs')) {
    conv() {
        const sml_attr = `${this.context.settings.sml_prefix}-attr`;
        this.context.dom.window.document.querySelectorAll(`[${sml_attr}]`).forEach((d) => {
            const d_attr = d.getAttribute(sml_attr);
            if (!d_attr) return;
            for (let attr_skv of d_attr.split(';')) {
                if (attr_skv.split(':').length <= 1) continue;
                d.setAttribute(attr_skv.split(':')[0], require('../data_conv')(attr_skv.split(':')[1], this.context));
            }
        });
    }
}
