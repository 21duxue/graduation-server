module.exports = function (app){
    app.use('/welcome',require('./welcome'));
    app.use('/login',require('./login'));
    app.use('/grow',require('./grow'));
    app.use('/growadd',require('./grow-add'));
    app.use('/grow-edit',require('./grow-edit'));
}