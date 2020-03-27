// pagination
module.exports = (context, callback) => {
    context.text_converted = context.text;
    // dom converter
    context.text_converted = require('./sml_conv')(context.text_converted, context);
    // filter
    if (context.data['settings.json'].filter) {
        for (let i in context.data['settings.json'].filter) {

            context.text_converted = context.text_converted.split(i).join(context.data['settings.json'].filter[i]);
        }
    }

    callback();
}
