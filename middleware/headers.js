exports = module.exports = function SetHeaderMiddleware(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authentication'); // X-Requested-With is only temporary
    res.setHeader('Access-Control-Allow-Methods', 'PUT, DELETE');
    next();
};