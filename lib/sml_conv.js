const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = (text, context) => {
    const dom = new JSDOM(text);
    context.dom = dom;
    (require('./sml_operator_init'))(context);
    if (String(text).match(/<body[^<>]*>/)) {
        return dom.serialize();
    } else {
        return dom.window.document.querySelector("body").innerHTML;
    }
}
