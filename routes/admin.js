var express = require("express");
var router = express.Router();
var courseModel = require("../models/courseModel");
var shopModel = require("../models/shopModel");
var problemModel = require("../models/problem");
var middleware = require("../middleware")

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();



router.get("/",middleware.isLoggedInandAdmin,function(req,res){

    if (req.user.isadmin == "false"){
        req.flash("error","You have not right to access admin page");
        return res.redirect("/");
    }

    if (req.user.isadmin == "true"){
	res.render("admin/admin");
}});


router.get("/courses",middleware.isLoggedInandAdmin,function(req,res){

    courseModel.find({},function(err,courseCollection){
        if(err){
            console.log(err);
        }else{

            res.render("admin/courses",{courses:courseCollection});
        }
    })

});


router.get("/courses/:id",middleware.isLoggedInandAdmin,function(req,res){
    courseModel.findById(req.params.id).exec(function(err,foundcourse){
        if(err){
            console.log(err);
        }else{
            res.render("admin/coursedetail",{course:foundcourse});
        }
    });

});


router.post("/newcourse",middleware.isLoggedInandAdmin,function(req,res){

	var name = req.body.name;
	var img = req.body.img;
	var price = req.body.price;
    var inst = req.body.inst;
    var pre = req.body.pre;
	var des = req.body.des;

    var o1 = req.body.o1;
    var o2 = req.body.o2;
    var o3 = req.body.o3;
    var o4 = req.body.o4;
    var o5 = req.body.o5;

    var sec1t = req.body.sec1title;
    var sec1d = req.body.sec1detail;
    var sec1v = req.body.sec1video;
    var sec2t = req.body.sec2title;
    var sec2d = req.body.sec2detail;
    var sec2v = req.body.sec2video;
    var sec3t = req.body.sec3title;
    var sec3d = req.body.sec3detail;
    var sec3v = req.body.sec3video;
    var sec4t = req.body.sec4title;
    var sec4d = req.body.sec4detail;
    var sec4v = req.body.sec4video;

	var newcourse = {name:name,img:img,des:des,
        price:price,inst:inst,pre:pre,

	    o1:o1,o2:o2,o3:o3,o4:o4,o5:o5,

		sec1t:sec1t,sec1d:sec1d,sec1v:sec1v,
        sec2t:sec2t,sec2d:sec2d,sec2v:sec2v,
        sec3t:sec3t,sec3d:sec3d,sec3v:sec3v,
        sec4t:sec4t,sec4d:sec4d,sec4v:sec4v
	};
	
	courseModel.create(newcourse,function(err,newlyCreated){
		if(err){
			console.log(err);
		}else{
            req.flash("success","Success, Welcome Back!");
			res.redirect("back");
		}
	})
});



router.put("/updatecourse/:id",middleware.isLoggedInandAdmin,function(req,res) {

    var objForUpdate = {};

    if (req.body.name) objForUpdate.name = req.body.name;
    if (req.body.img) objForUpdate.img = req.body.img;
    if (req.body.price) objForUpdate.price = req.body.price;

    if (req.body.inst) objForUpdate.inst = req.body.inst;
    if (req.body.pre) objForUpdate.pre = req.body.pre;
    if (req.body.des) objForUpdate.des = req.body.des;
    if (req.body.o1) objForUpdate.o1 = req.body.o1;
    if (req.body.o2) objForUpdate.o2 = req.body.o2;
    if (req.body.o3) objForUpdate.o3 = req.body.o3;
    if (req.body.o4) objForUpdate.o4 = req.body.o4;
    if (req.body.o5) objForUpdate.o5 = req.body.o5;

    if (req.body.sec1title) objForUpdate.sec1t = req.body.sec1title;
    if (req.body.sec2title) objForUpdate.sec2t = req.body.sec2title;
    if (req.body.sec3title) objForUpdate.sec3t = req.body.sec3title;
    if (req.body.sec4title) objForUpdate.sec4t = req.body.sec4title;

    if (req.body.sec1detail) objForUpdate.sec1d = req.body.sec1detail;
    if (req.body.sec2detail) objForUpdate.sec2d = req.body.sec2detail;
    if (req.body.sec3detail) objForUpdate.sec3d = req.body.sec3detail;
    if (req.body.sec4detail) objForUpdate.sec4d = req.body.sec4detail;

    if (req.body.sec1video) objForUpdate.sec1v = req.body.sec1video;
    if (req.body.sec2video) objForUpdate.sec2v = req.body.sec2video;
    if (req.body.sec3video) objForUpdate.sec3v = req.body.sec3video;
    if (req.body.sec4video) objForUpdate.sec4v = req.body.sec4video;

    var setObj = {$set: objForUpdate}

    courseModel.update({_id: req.params.id}, setObj, function (err, updated) {
        if (err) console.log("Error occured!");
        req.flash("success","The course is sucessfully updated, welcome back!");
        res.redirect("back")
    });

});






router.delete("/:id",middleware.isAuthorizated,function(req,res){
	courseModel.findByIdAndRemove(req.params.id,function(err){
		res.redirect("/courses");
	})
});


router.get("/shop",middleware.isLoggedInandAdmin,function(req,res){

    shopModel.find({},function(err,shopCollection){
        if(err){
            console.log(err);
        }else{

            res.render("admin/shop",{shops:shopCollection});
        }
    })

});


router.post("/newitem",middleware.isLoggedInandAdmin,function(req,res){

    var name = req.body.name;
    var img = req.body.img;
    var price = req.body.price;
    var avail = req.body.avail;
    var detail = req.body.detail;
    var des = req.body.des;

    var newitem = {name:name,img:img,des:des,
        price:price,avail:avail,detail:detail
    };

    shopModel.create(newitem,function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            req.flash("success","Success, Welcome Back!");
            res.redirect("back");
        }
    })
});



router.get("/shops/:id",middleware.isLoggedInandAdmin,function(req,res){
    shopModel.findById(req.params.id).exec(function(err,founditem){
        if(err){
            console.log(err);
        }else{
            res.render("admin/shopdetail",{shop:founditem});
        }
    });

});




router.put("/updateitem/:id",middleware.isLoggedInandAdmin,function(req,res) {

    var objForUpdate2 = {};

    if (req.body.name) objForUpdate2.name = req.body.name;

    if (req.body.img) objForUpdate2.img = req.body.img;

    if (req.body.price2) objForUpdate2.price = req.body.price2;

    if (req.body.avail) objForUpdate2.avail = req.body.avail;

    if (req.body.des) objForUpdate2.des = req.body.des;

    if (req.body.detail) objForUpdate2.detail = req.body.detail;

    var setObj2 = {$set: objForUpdate2}

    shopModel.update({_id: req.params.id},setObj2,function (err, updated) {
        if (err) console.log("Error occured!");
        req.flash("success","The item is sucessfully updated, welcome back!");
        res.redirect("back")
    });

});



router.get("/codingProblems",middleware.isLoggedInandAdmin,function(req,res){

    problemModel.find({},function(err,problemCollection){
        if(err){
            console.log(err);
        }else{
            //console.log(problemCollection);
            res.render("admin/coding_Problem", {problems:problemCollection});
        }
    })

});

router.post("/newProblem", middleware.isLoggedInandAdmin,jsonParser,function (req, res) {

    /*var id = 1;
     problemModel.find({},function(err,problemCollection){
     if(err){
     console.log(err);
     }else{
     id = problemCollection.length + 1;
     }
     })  */
    // var hint = req.body.hint;
    //var example = req.body.example;
    //var code_framework = req.body.code_framework;
    //var function_call = req.body.function_call;
    //var test_cases_problem = req.body.test_cases.split("||");
    //var anwsers = req.body.anwsers.split("||");



    var number = req.body.number;
    var title = req.body.title;
    var category = req.body.cat;
    var difficulty = req.body.diffc;
    var description = req.body.des;
    var code1 = req.body.code1;
    var code2 = req.body.code2;





    var newproblem = {
        number: number,
        title: title,
        category: category,
        difficulty: difficulty,
        description: description,



        //hint: hint,
        //example: example,
        //function_call: function_call,
        //test_cases: test_cases



        code1:code1,
        code2:code2
    }




    problemModel.create(newproblem, function (err, newlyCreatedProblem) {
        if (err) {
            console.log(err);
        }
        else {
            req.flash("success", "Success, Welcome Back!");
            res.redirect("back");

        }
    });

});





    //console.log(test_cases_problem.length);
    //console.log(anwsers.length);
    /*
    if(test_cases_problem.length != anwsers.length){
        req.flash("error","The number of test cases and anwsers do not match !");
        res.redirect("back");
    }else{
        //console.log(test_cases_problem.length);
        //console.log(anwsers.length);
        var test_cases = { test_case1 : {input : test_cases_problem[0] ? test_cases_problem[0] : null, output : anwsers[0] ? anwsers[0] : null},
            test_case2 : {input : test_cases_problem[1] ? test_cases_problem[1] : null, output : anwsers[1] ? anwsers[1] : null},
            test_case3 : {input : test_cases_problem[2] ? test_cases_problem[2] : null, output : anwsers[2] ? anwsers[2] : null}
        };

        var newproblem = {
            number: number,
            title:title,
            category:category,
            difficulty:difficulty,
            description:description,
            hint:hint,
            example:example,
            code_framework:code_framework,
            function_call:function_call,
            test_cases: test_cases
        }
        problemModel.create(newproblem, function(err, newlyCreatedProblem){
            if(err){
                console.log(err);
            }else{
                req.flash("success","Success, Welcome Back!");
                res.redirect("back");
            }
        });
    }

})

*/



module.exports = router;