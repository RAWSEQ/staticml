const fs = require('fs');
const YAML = require('yaml');
const XLSX = require('xlsx');
const recursive = require('recursive-readdir');
const csv_parse = require("csv-parse");
const strip_bom = require("strip-bom");
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
    data.true = true;
    data.false = false;
    if (context.ext == 'csv') {
        csv_parse(strip_bom(fs.readFileSync(path, { 'encoding': ((context.settings.encoding.data ? context.settings.encoding.data[context.ext] : null) || context.settings.encoding.data || context.settings.encoding) })), {}, (err, csv_data) => {
            var head = [];
            var js_data = {};
            for (var i = 0; i < csv_data.length; i++) {
                if (!csv_data[i][0]) continue;
                for (var di = 0; di < csv_data[i].length; di++) {
                    if (i == 0) {
                        head.push(csv_data[i][di]);
                    } else {
                        if (!head[di]) continue;
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
        data[code] = JSON.parse(fs.readFileSync(path, { 'encoding': (context.settings.encoding.data ? context.settings.encoding.data[context.ext] : null) || context.settings.encoding.data || context.settings.encoding }));
        idx += 1;
        opr(paths, idx, callback);
    } else if (context.ext == 'yml') {
        data[code] = YAML.parse(fs.readFileSync(path, { 'encoding': (context.settings.encoding.data ? context.settings.encoding.data[context.ext] : null) || context.settings.encoding.data || context.settings.encoding }));
        idx += 1;
        opr(paths, idx, callback);
    } else if (context.ext == 'xlsx' || context.ext == 'xls') {
        if (path.indexOf('~$') >= 0) {
            idx += 1;
            opr(paths, idx, callback);
        } else {
            const workbook = XLSX.readFile(path);

            var book_data = {};

            for (var b = 0; b < workbook.SheetNames.length; b++) {
                sheet = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[b]]);
                js_data = {};
                
                if (Object.keys(sheet[0])[0] == 'key' && Object.keys(sheet[0])[1] == 'value') {
                    // is kv
                    book_data[workbook.SheetNames[b]] = {};
                    for (var i = 0; i < sheet.length; i++) {
                        book_data[workbook.SheetNames[b]][sheet[i]['key']] = sheet[i]['value'];
                    }
                } else {
                    // is table
                    let key_idx = [];
                    for (var i = 0; i < sheet.length; i++) {
                        let head_keys = Object.keys(sheet[i]);
                        let row = sheet[i];
                        if (!row[head_keys[0]]) break;

                        key_idx = key_idx.concat(head_keys);
                        for (var j = 0; j < key_idx.length; j++) {
                            if (head_keys.indexOf(key_idx[j]) < 0) {
                                row[key_idx[j]] = '';
                            }
                        }
                        
                        js_data[row[head_keys[0]]] = row;
                    }
                    book_data[workbook.SheetNames[b]] = js_data;
                }
            }

            data[code] = book_data;

            idx += 1;
            opr(paths, idx, callback);
        }
    } else {
        idx += 1;
        opr(paths, idx, callback);
    }
}
