var app = require('./lib/server'),
    config = require('./config'),
    http = require('http'),
    server = http.createServer(app),
    sio = require('socket.io'),
    fs = require('fs'),
    https = require('https'),
    path = require('path');

// Sequelize Config
var io = sio.listen(server);

require('./middleware')(app);
require('./lib/resExtensions');
app.set('socket-io', io);

require('otter-routes')(app, config.otterConfig, function () {

    //app.get('/auth/google', passport.authenticate('google', {scope: ['email']}));

    //app.get('/auth/google/callback', passport.authenticate('google', {
    //    successRedirect: '/',
    //    failureRedirect: '/'
    //}));

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/session', function (req, res) {
        res.json({
            user: req.user,
            loggedIn: !!req.user,
            currentRegion: req.session.awsRegion
        });
    });




    app.get('*', function (req, res) {
        res.sendFile(path.resolve(__dirname, './public/index.html'));
    });

    server.listen(config.port, function () {
        console.info('Server listening on port:', config.port);
    });

});