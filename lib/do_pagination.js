// pagination
module.exports = (context, callback) => {
    context.path_target = context.path.replace(/^template([\/\\])/, 'public$1');

    callback();
}
