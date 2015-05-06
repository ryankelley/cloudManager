var express = require('express'),
    res = express.response;

res.error = function(err) {
    if(err instanceof Error){
        var newStackTrace = new Error(err.message).stack; //I want to know how we got here, so I can't just use the old error.
        console.error("An error was thrown using res.err, here's a stack trace:\n", newStackTrace);
    }
    this.status(500).json(err.message ? err.message : err);
};