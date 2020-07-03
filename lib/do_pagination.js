const jsdom = require("jsdom");
const { JSDOM } = jsdom;
// pagination
module.exports = (context, callback) => {

    const sml_pagination_src = `${context.settings.sml_prefix}-pagination-src`;
    const sml_pagination_page_cnt = `${context.settings.sml_prefix}-pagination-page-cnt`;
    const dom = new JSDOM(context.text);
    if (dom.window.document.querySelector(`[${sml_pagination_src}]`)) {
        const src_name = dom.window.document.querySelector(`[${sml_pagination_src}]`).getAttribute(sml_pagination_src);
        const data_source = require('./data_conv')(src_name, context, true);
        const keys = Object.keys(data_source);
        context.data.pagination = {};
        context.data.pagination.src_length = keys.length;
        context.data.pagination.page_cnt = dom.window.document.querySelector(`[${sml_pagination_page_cnt}]`).getAttribute(sml_pagination_page_cnt);
        context.data.pagination.src_name = src_name;
        const src_length = context.data.pagination.src_length;
        const page_cnt = parseInt(context.data.pagination.page_cnt);
        const page_max = Math.ceil(src_length / page_cnt);
        for (var page = 1; page <= page_max; page++) {
            context.data.pagination.page = page;
            context.data.pagination.next = Math.min(page + 1, page_max);
            context.data.pagination.prev = Math.max(page - 1, 0);
            context.data.pagination.is_next = (context.data.pagination.page < page_max);
            context.data.pagination.is_prev = (context.data.pagination.prev);
            context.data.pagination.is_first = !context.data.pagination.is_prev;
            context.data.pagination.is_last = !context.data.pagination.is_next;
            context.data.pagination.offset = Math.min(src_length - 1, (page_cnt * (page - 1)));
            if (context.path_target_base.indexOf('[page]') >= 0) {
                context.path_target = context.path_target_base.replace('[page]', page);
            } else {
                context.path_target = context.path_target_base.replace('[code]', keys[context.data.pagination.offset]);
                context.data.pagination.prev = keys[Math.max(context.data.pagination.offset - page_cnt, 0)];
                context.data.pagination.next = keys[Math.min(context.data.pagination.offset + page_cnt, src_length - 1)];
            }
            callback();
        }
    } else {
        callback();
    }
}
