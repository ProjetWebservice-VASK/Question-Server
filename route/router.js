var express = require('express');
var router = express.Router();
var controler = require('./../controler/question.js');


router.get('/next',controler.get);

router.post('/1/received', controler.post);

/*router.put('/1/answer', function(req, res) {
    res.status(204);
});*/


module.exports = router;