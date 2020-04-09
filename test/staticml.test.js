var context = {};
context.settings = {
    encoding: 'utf-8',
    //encoding.data
    //encoding.data.[extension]
    //encoding.template
    sml_prefix: 'sml',
    target_extension: ['html', 'htm'],
};
// unit test

// binding test

// generate sample

test('do_read_settings', done => {
    require('../lib/do_read_settings')(context, () => {
        done();
    });
});

test('do_read_data', done => {
    require('../lib/do_read_data')(context, () => {
        done();
    });
});

test('do_read_template', done => {
    require('../lib/do_read_template')(context,
        () => {
            done();
        },
        () => {
            done();
        });
});

test('do_pagination', done => {
    require('../lib/do_pagination')(context, () => {
        done();
    });
});

test('do_convert', done => {
    require('../lib/do_convert')(context, () => {
        done();
    });
});

test('do_publish', done => {
    require('../lib/do_publish')(context, () => {
        done();
    });
});

// clean up
