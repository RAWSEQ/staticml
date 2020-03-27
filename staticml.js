const fs = require('fs');
let context = {};

//settings
context.settings = {};

//controller
require('./lib/do_read_data')(context, () => {
    require('./lib/do_read_template')(context, () => {
        require('./lib/do_pagination')(context, () => {
            require('./lib/do_convert')(context, () => {
                require('./lib/do_publish')(context);
            });
        });
    });
});

/*
console.log('Press any key to exit');
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on('data', process.exit.bind(process, 0));
*/
