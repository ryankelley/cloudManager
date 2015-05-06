exports = module.exports = function setupMiddleware(app) {
    //Implements domain error handling for asynchronously thrown errors
    app.use(require('./domain'));

    // add X-Response-Time header
    app.use(require('response-time')());

    app.use(function (req, res, next) {

        if (!req.session.awsRegion) {
            req.session.awsRegion = 'us-west-2';
        }

        var aws = require('aws-sdk');
        aws.config.update({region: req.session.awsRegion});
        next();

    });

    app.get('/status', function (req, res) {
        res.json({status: 'Everything is healthy'});
    });

    // add json body parsing
    var bodyParser = require('body-parser');
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({ extended:true, limit: '50mb'}));
    app.use(bodyParser.text());
//    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

    // add access headers to every request (Access-Control-Allow-Origin, Access-Control-Allow-Headers, etc.)
    app.use(require('./headers'));
};
