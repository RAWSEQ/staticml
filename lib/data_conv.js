module.exports = (text, context) => {
    var current = text;
    for (var c = 100; c > 0; c--) {
        if (!isString(current)) {
            break;
        } else if (current.match(/^data\//)) {
            current = current.replace(/^data\//, '');
            current = opr(current, context.data);
            if (!isString(current)) {
                break;
            }
        } else {
            break;
        }
    }
    return current;
}

function opr(opr, a) {
    aopr = opr.split('/');
    var cur = a;
    for (var i = 0; i < aopr.length; i++) {
        cur = cur[aopr[i]];
    }
    return cur;
}
function isString(obj) {
    return typeof (obj) == "string" || obj instanceof String;
}