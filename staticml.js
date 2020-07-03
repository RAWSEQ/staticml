const fs = require('fs');
let context = {};

//settings (default)
//overrides by ./data/settings.json
context.settings = {
    encoding: 'utf-8',
    //encoding.data
    //encoding.data.[extension]
    //encoding.template
    sml_prefix: 'sml',
    target_extension: ['html', 'htm'],
};

//controller

//pre convert
require('./lib/do_read_settings')(context, () => {
    require('./lib/do_read_data')(context, () => {
        require('./lib/do_read_template')(context, () => {
            require('./lib/do_pagination')(context, () => {
                require('./lib/do_pre_convert')(context, () => {
                    require('./lib/do_publish')(context, () => {
                        done();
                    });
                });
            });
        });
    });
});

//publish
require('./lib/do_read_settings')(context, () => {
    require('./lib/do_read_data')(context, () => {
        require('./lib/do_read_template')(context, () => {
            require('./lib/do_pagination')(context, () => {
                require('./lib/do_convert')(context, () => {
                    require('./lib/do_publish')(context, () => {
                        done();
                    });
                });
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
