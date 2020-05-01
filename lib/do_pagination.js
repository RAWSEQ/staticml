// pagination
module.exports = (context, callback) => {

    var sml_pagination_src = `${context.settings.sml_prefix}-pagination-src`;
    var sml_pagination_page_cnt = `${context.settings.sml_prefix}-pagination-page-cnt`;

    if (context.dom.window.document.querySelector(`[${sml_pagination_src}]`)) {
        const data_source = require('../data_conv')(context.dom.window.document.querySelector(`[${sml_pagination_src}]`).getAttribute(sml_pagination_src), context, true);
        context.pagination = {};
        context.pagination.page_size = data_source.length;
        context.pagination.page_cnt = context.dom.window.document.querySelector(`[${sml_pagination_page_cnt}]`).getAttribute(sml_pagination_page_cnt);
        


    } else {
        callback();
    }
}
