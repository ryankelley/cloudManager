var createDomain = require('domain').create,
	config = require('../config');

module.exports = function(req, res, next){
	var domain = createDomain();

	domain.on('error', function(err) {
		if(config.production){
			//Something bad has happened to our server and we need to restart because there's no telling what could be wrong with the app.
			//Domain information/examples: http://nodejs.org/api/domain.html
			console.log("In production mode and server encountered an error. Shutting down in 30 seconds.");
			setTimeout(function(){
				process.exit(1);
			}, 30000);
		}

		res.statusCode = 500;
		res.end(err.stack + '\n');
		console.error(err.stack);
	});

	domain.enter();
	next();
};