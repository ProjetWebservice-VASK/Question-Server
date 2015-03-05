global.express = require('express');
global.app = require('./../app');
global.config = require('./../config');
global.mongoose = require('mongoose');
global.chance = new require('chance')();
global.Question = require('../model/question');
global.should = require('chai').should();
global.request = require('supertest');
global.Hal = require('./../lib/hal');

global.db = mongoose.connect(config.db.test, function(err) {
    if (err) {
        throw err;
    }
});

require('./halSpec');
require('./appSpec');
require('./clientSideSpec');