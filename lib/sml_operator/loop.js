module.exports = class Proto extends (require('./smloabs')) {
    conv() {
        const sml_loop = `${this.context.settings.sml_prefix}-loop`;
        const sml_loop_item = `${this.context.settings.sml_prefix}-loop-item`;
        const sml_loop_ref_key = `${this.context.settings.sml_prefix}-loop-ref-key`;
        const sml_loop_ref_src = `${this.context.settings.sml_prefix}-loop-ref-src`;
        const sml_loop_mode_key = `${this.context.settings.sml_prefix}-loop-mode-key`;
        this.context.dom.window.document.querySelectorAll(`[${sml_loop}]`).forEach((d) => {
            const data_source = require('../data_conv')(d.getAttribute(sml_loop), this.context, true);
            var item_html = {};
            d.querySelectorAll(`:scope > [${sml_loop_item}]`).forEach((di) => {
                item_html[di.getAttribute(`${sml_loop_item}`)] = di.outerHTML;
            });
            const ref_key = d.getAttribute(sml_loop_ref_key);
            const ref_src = d.getAttribute(sml_loop_ref_src) ? d.getAttribute(sml_loop_ref_src) + '/' : '';
            var output = '';
            for (var i of Object.keys(data_source)) {
                if (ref_key) {
                    if (!data_source[i][ref_key]) continue;
                    Object.assign(this.context.data, require('../data_conv')(ref_src + data_source[i][ref_key], this.context, true));
                } else {
                    Object.assign(this.context.data, data_source[i]);
                }
                var sml_loop_mode_val = require('../data_conv')(sml_loop_mode_key, this.context);
                output += require('../sml_conv')((item_html[sml_loop_mode_val]) ? item_html[sml_loop_mode_val] : item_html[''], this.context);
            }
            d.innerHTML = output;
        });
    }
}
