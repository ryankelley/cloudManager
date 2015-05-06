var express = require('express'),
    app = express(),
    path = require('path'),
    //passport = require('passport'),
    //GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    session = require('express-session'),
    config = require('../config');


// don't need in production
//if (!process.env.NODE_ENV || process.env.NODE_ENV == 'development') {
    app.use(express.static(path.resolve(__dirname, '../public')));


    app.get('/public/css/*', function(req, res){
        res.send(404);
    });

//}



app.use(function (req, res, next) {
    if (req.url === '/status') {
        return next();
    }
    return require('express-session')({
        name: 'hancho.sid',
        secret: 'Royal Jay is the mo$t aw3som3 pl@ce !n 7he h013 w0r!d',
        resave: true,
        saveUninitialized: false,
        rolling: true
    })(req, res, next);
});
//
//app.use(passport.initialize());
//app.use(passport.session());
//
//
//passport.use(new GoogleStrategy({
//    clientID: config.google_oauth.clientID,
//    clientSecret: config.google_oauth.clientSecret,
//    callbackURL: config.url + '/auth/google/callback'
//}, function (accessToken, refreshToken, profile, done) {
//    if (profile.emails[0].value.indexOf('@royaljay.net') > -1) {
//
//        var user = {
//            firstName: profile.name.givenName,
//            lastName: profile.name.familyName,
//            email: profile._json.email,
//            picture: profile._json.picture
//
//        };
//        models.User.findOne({where: {email: user.email}}).done(function (err, data) {
//            if (err) done(err);
//
//            if (!data) {
//                //create user
//                models.User.create(user).done(function (err, data) {
//                    if (err) {
//                        return res.error(err);
//                    }
//                    done(null, user);
//                });
//            } else {
//                done(null, data.toJSON());
//            }
//        });
//    } else {
//        done('Incorrect user credentials');
//    }
//}));
//
//passport.serializeUser(function (user, done) {
//    done(null, user);
//});
//
//passport.deserializeUser(function (user, done) {
//    done(null, user);
//});
//
//// TODO: Move this to middleware
//function auth(req, res, next) {
//    if (req.headers.authtoken === config.authToken || req.isAuthenticated()) {
//        next();
//    } else {
//        res.status(401).end();
//    }
//}


module.exports = app;