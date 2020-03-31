module.exports = (context, callback) => {
    context.text_converted = context.text;
    // dom converter
    context.text_converted = require('./sml_conv')(context.text_converted, context);
    // filter
    if (context.settings.filter) {
        for (let i in context.settings.filter) {
            context.text_converted = context.text_converted.split(i).join(context.settings.filter[i]);
        }
    }

    callback();
}
