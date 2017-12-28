var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user")
var courseModel = require("../models/courseModel");
var middleware = require("../middleware");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var nodeRestClient = require('node-rest-client').Client;
var restClient = new nodeRestClient();

EXECUTOR_SERVER_URL = "http://localhost:5000/build_and_run";
restClient.registerMethod('build_and_run', EXECUTOR_SERVER_URL, 'POST');



//-------------code handle route---------------------------------//


router.post("/codesubmit",function(req,res){

    var code = req.body.code;
    console.log(code);
    res.render("coding/editor");

});


router.get("/questions",function(req,res){
    res.render("coding/problems");

});


router.get("/coding/problem",function(req,res){
    res.render("coding/editor");

});



router.post('/build_and_run', jsonParser, function(req, res) {
    var code = req.body.code;

    console.log(code);

    // res.json({'text': 'hello from nodejs haha'});
    restClient.methods.build_and_run(
        {
            data: {
                code: Code,

            },
            headers: {
                'Content-Type': 'application/json'
            }
        }, (data, response) => {
        console.log('Received from execution server: ' + data);
    const text = `Build Output: ${data['build']}
    Execute output: ${data['run']}`;
    data['text'] = text;
    res.json(data);
}
    );
});



//----------------------------------------------//

module.exports = router;