module.exports = (context) => {
    //sml_operator defines
    (new (require('./sml_operator/proto'))(context)).conv();
}