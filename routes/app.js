module.exports = function (app){
    app.use('/welcome',require('./welcome'));
    app.use('/login',require('./login'));
    app.use('/article',require('./grow'));
    app.use('/grow-add',require('./grow-add'));
}