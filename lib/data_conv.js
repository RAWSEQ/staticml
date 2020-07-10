module.exports = (text, context, ret_object) => {
    var current = text;
    for (var c = 100; c > 0; c--) {
        if (current == undefined) {
            console.log('WARN No parameter ' + text + ' on ' + context.path);
            return '';
        } else if (!isRaw(current)) {
            break;
        } else if (String(current).match(/\{data\/[^\{\}]+\}/)) {
            opstr = String(current).match(/\{data\/[^\{\}]+\}/)[0];
            replacement = opr(opstr.replace(/\{data\/(.*)\}/, '$1'), context.data);
            if (replacement == undefined || !isRaw(current)) {
                console.log('WARN No parameter ' + text + ' on ' + context.path);
                replacement = '';
            }
            current = String(current).replace(opstr, replacement);
            continue;
        } else if (String(current).match(/^data\//)) {
            current = String(current).replace(/^data\//, '');
            current = opr(current, context.data);
            if (current == undefined) {
                console.log('WARN No parameter ' + text + ' on ' + context.path);
                return '';
            } else if (!isRaw(current)) {
                break;
            }
        } else {
            break;
        }
    }
    if (!ret_object && (!isRaw(current))) {
        console.log('WARN No parameter ' + text + ' on ' + context.path);
        return '';
    }
    return current;
}

function opr(opr, a) {
    aopr = opr.split('/');
    var cur = a;
    for (var i = 0; i < aopr.length; i++) {
        if (!cur || (cur[aopr[i]]==undefined)) continue;
        cur = cur[aopr[i]];
    }
    return cur;
}
function isRaw(obj) {
    return typeof (obj) == "string" || obj instanceof String || !isNaN(obj) || obj == 0;
}
