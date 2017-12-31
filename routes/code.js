var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user")


var middleware = require("../middleware");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var problemModel = require("../models/problem");






var nodeRestClient = require('node-rest-client').Client;
var restClient = new nodeRestClient();

EXECUTOR_SERVER_URL = "http://localhost:5000/build_and_run";

//EXECUTOR_SERVER_URL = "https://leetcode.com/problemset/algorithms";

restClient.registerMethod('build_and_run', EXECUTOR_SERVER_URL, 'POST');



//-------------code handle route---------------------------------//


router.post("/problem/submit",function(req,res){

    var code = req.body.code;
    console.log(code);
    res.render("coding/editor");

});




router.get("/",function(req,res){
        problemModel.find({},function(err,problemCollection){
            if(err){
                console.log(err);
            }else{
                //console.log(problemCollection);
                res.render("coding/problems",{problems:problemCollection});
            }
     })
});







router.get("/problem/:id",function(req,res){
    problemModel.findById(req.params.id).exec(function(err,founditem){
        if(err){
            console.log(err);
        }else{
            res.render("coding/editor",{code:founditem});
        }
    });

});





router.post('/problem/build_and_run', jsonParser, function(req, res) {

    var code = req.body;

    console.log(code);

    var code1 = req.body.code1;
    var code2 = req.body.code2


    // res.json({'text': 'hello from nodejs haha'});



    restClient.methods.build_and_run(
        {
            data: {
                code1: code1,
                code2:code2
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