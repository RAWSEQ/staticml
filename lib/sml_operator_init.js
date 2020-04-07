module.exports = (context) => {
    //sml_operator defines
    (new (require('./sml_operator/proto'))(context)).conv();
    (new (require('./sml_operator/html'))(context)).conv();
    (new (require('./sml_operator/attr'))(context)).conv();
    (new (require('./sml_operator/class'))(context)).conv();
    (new (require('./sml_operator/loop'))(context)).conv();
}