module.exports = class Proto extends (require('./smloabs')) {
    conv() {
        this.context.dom.window.document.querySelectorAll('[sml-hello]').forEach((d) => {
            d.innerHTML = 'Hello, World';
        });
    }
}
