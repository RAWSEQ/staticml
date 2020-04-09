module.exports = class Proto extends (require('./smloabs')) {
    conv() {
        const sml_attr = `${this.context.settings.sml_prefix}-class`;
        this.context.dom.window.document.querySelectorAll(`[${sml_attr}]`).forEach((d) => {
            const d_attr = d.getAttribute(sml_attr);
            if (!d_attr) return;
            for (let attr_skv of d_attr.split(';')) {
                if (attr_skv.split(':').length <= 1) continue;
                if (attr_skv.split(':')[0] == 'add') {
                    var adat = require('../data_conv')(attr_skv.split(':')[1], this.context).split(',');
                    for (var i = 0; i < adat.length; i++) {
                        d.classList.add(adat[i]);
                    }
                } else if (attr_skv.split(':')[0] == 'remove') {
                    var adat = require('../data_conv')(attr_skv.split(':')[1], this.context).split(',');
                    for (var i = 0; i < adat.length; i++) {
                        d.classList.remove(adat[i]);
                    }
                } else {
                    Console.log("sml-class format error. (add/remove):className;")
                }
            }
        });
    }
}
