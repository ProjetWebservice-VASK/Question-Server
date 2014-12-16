/**
 * Created by edouard on 16/12/14.
 */
'use strict';

var express = require('express'),
  router = express.Router(),
  bodyParser = require('body-parser'),
  parseUrlEncoded = bodyParser.urlencoded({extended: false});

router.route('/')
  .get(function(req,res){
    res.send('Good request');
  });


module.exports = router;
