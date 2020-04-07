module.exports = class Smloabs {
    constructor(context) {
        this.context = context;
    }
    conv() {

    }
    check_target(el) {
        const target = `[${this.context.settings.sml_prefix}-loop-item]`;

        const result = [];
        const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

        el = el.parentElement;
        while (el) {
            if (matchesSelector.call(el, target)) {
                if (el && matchesSelector.call(el.parentElement, '[sml-loop]')) return false;
            }
            el = el.parentElement;
        }
        return true;
    }
}
