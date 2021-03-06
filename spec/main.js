process.env.NODE_ENV = 'testing';

global.express = require('express');
global.app = require('./../app');
global.config = require('./../config');
global.mongoose = require('mongoose');
global.chance = new require('chance')();
global.Question = require('../model/question');
global.should = require('chai').should();
global.expect = require('chai').expect;
global.request = require('supertest');
global.Hal = require('./../lib/hal');
global.async = require('async');

global.db = mongoose.createConnection(config.db.testing, function(err) {
    if (err) {
        throw err;
    }
});

describe('Server', function () {
    before(function () {
        app.listen(process.env.PORT || 8081,function(){
            console.log('Server started on port ' + (process.env.PORT || 8081));
        });
    });

    after(function () {
        app.close();
    });
});

require('./halSpec');
require('./appSpec');
require('./clientSideSpec');