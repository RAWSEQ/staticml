module.exports = (text, context, ret_object) => {
    var current = text;
    for (var c = 100; c > 0; c--) {
        if (current == undefined) {
            console.log('WARN No parameter ' + text + ' on ' + context.path);
            return '';
        } else if (!isString(current)) {
            break;
        } else if (current.match(/^data\//)) {
            current = current.replace(/^data\//, '');
            current = opr(current, context.data);
            if (current == undefined) {
                console.log('WARN No parameter ' + text + ' on ' + context.path);
                return '';
            } else if (!isString(current)) {
                break;
            }
        } else {
            break;
        }
    }
    if (!ret_object && (!isString(current))) {
        console.log('WARN No parameter ' + text + ' on ' + context.path);
        return '';
    }
    return current;
}

function opr(opr, a) {
    aopr = opr.split('/');
    var cur = a;
    for (var i = 0; i < aopr.length; i++) {
        if (!cur || !cur[aopr[i]]) continue;
        cur = cur[aopr[i]];
    }
    return cur;
}
function isString(obj) {
    return typeof (obj) == "string" || obj instanceof String;
}