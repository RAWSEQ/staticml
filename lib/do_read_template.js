const fs = require('fs');
const recursive = require('recursive-readdir');

//do_read_template
module.exports = (context, callback) => {
    recursive("template", [], (err, r) => {
        for (var i = 0; i < r.length; i++) {
            context.path = r[i];
            context.text = fs.readFileSync(r[i]);

            callback();
        }
    });
}
