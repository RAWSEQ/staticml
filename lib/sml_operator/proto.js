module.exports = class Proto extends (require('./smloabs')) {
    conv() {
        const sml_hello = `${this.context.settings.sml_prefix}-hello`;
        this.context.dom.window.document.querySelectorAll(`[${sml_hello}]`).forEach((d) => {
            d.innerHTML = 'Hello, World';
        });
    }
}
