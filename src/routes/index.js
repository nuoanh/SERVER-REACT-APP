
function route(app) {
    app.use('/admin', require("./admin.routes"));
    app.use('/', require("./user.routes"));
}
module.exports = route;