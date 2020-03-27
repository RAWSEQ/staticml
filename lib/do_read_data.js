const fs = require('fs');
const recursive = require('recursive-readdir');
const csv_parse = require("csv-parse");
const data = {};
let context = null;

module.exports = (_context, callback) => {
    context = _context;
    recursive("data", [], (err, rd) => {
        opr(rd, 0, callback);
    });
}
function opr(paths, idx, callback) {
    if (!paths[idx]) { context.data = data; callback(); return; }
    const path = paths[idx];
    context.ext = path.replace(/^.*\.(.+)/, '$1');
    const code = path.replace(/data[\/\\]/, '');
    if (context.ext == 'csv') {
        csv_parse(fs.readFileSync(path), {}, (err, csv_data) => {
            var head = [];
            var js_data = {};
            for (var i = 0; i < csv_data.length; i++) {
                for (var di = 0; di < csv_data[i].length; di++) {
                    if (i == 0) {
                        head.push(csv_data[i][di]);
                    } else {
                        if (!js_data[csv_data[i][0]]) js_data[csv_data[i][0]] = {};
                        js_data[csv_data[i][0]][head[di]] = csv_data[i][di];
                    }
                }
            }
            data[code] = js_data;
            idx += 1;
            opr(paths, idx, callback);
        });
    } else if (context.ext == 'json') {
        data[code] = JSON.parse(fs.readFileSync(path));
        idx += 1;
        opr(paths, idx, callback);
    }
}
